import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from '@apollo/react-hoc';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Trash2 } from 'react-feather';

import { useApp } from 'hooks';
import { GET_SHORT_BASKET, GET_DELIVERY, GET_PICKUPS } from 'query';
import { UPDATE_PRODUCT_MUTATION, REMOVE_PRODUCT_MUTATION, ORDER_MUTATION } from 'mutations';

import { Dialog, DialogTitle, DialogContent } from 'components/Dialog';
import Input from 'components/Input';
import Button from 'components/Button';
import LoginForm from 'components/LoginForm';
import { StepView, StepContainer } from 'components/Steps';
import AddressList from 'components/AddressList/AddressList';
import Snackbar from 'components/Snackbar';
import Select from 'components/Select';
import Loader from 'components/Loader';
import ListItem from 'components/ListItem';
import ProductTable from 'components/ProductTable';
import Promocode from 'components/Promocode';
import SidebarBasket from 'components/SidebarBasket';
import UserForm from 'components/UserForm';
import Stripe from 'components/Stripe';

import Success from 'routes/Success';

import styles from './styles.css';

const CURRENCY = 'Руб.';
const DELIVERY_TYPES = [{ id: 'courier', label: 'Курьером' }, { id: 'pickup', label: 'Самовывоз' }];
const ERORRS = {
    city: 'Город доставки',
    address: 'Адрес',
    payment: 'Способ оплаты',
    pickup: 'Пункт выдачи',
    delivery: 'Способ доставки',
};

const isNumber = value => parseInt(value, 10) === parseInt(value, 10);

const theme = {
    title: styles.title,
    header: styles.header,
    nav: styles.nav,
};

const Basket = ({
    basket: { products: productsProps },
    gifts = [],
    cities: { data: citiesProps },
    payments_methods: { data: paymentsMethodsProps },
    addresses,
    isLoggedIn,
}) => {
    const { login } = useApp();
    const [success, setSuccess] = useState(false);
    const [products, setProducts] = useState(productsProps);
    const [promocode, setPromocode] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [step, setStep] = useState(0);
    const [notification, setNotification] = useState(null);
    const [values, setValues] = useState({
        deliveryType: 'courier',
        city: {},
        payment: {},
        delivery: null,
        pickup: null,
        comment: '',
        address: addresses && addresses.data.length ? addresses.data[0] : null,
    });
    const [collapse, setCollapse] = useState({
        pickup: false,
        delivery: false,
    });

    const isCourier = values.deliveryType === 'courier';
    const currentDelivery = isCourier ? values.delivery : values.pickup;
    const totalSum = products.reduce((acc, item) => acc + item.price * item.qty, 0);
    const citiesForSelect = citiesProps
        .map(({ id, title, visible, ...any }) => {
            if (visible) return { id, value: title, ...any };
            return null;
        })
        .filter(Boolean);

    const handleChangeProducts = ({ removeBasket, updateBasket }, data = removeBasket || updateBasket) => {
        if (!data) return;

        const { products: newProducts } = data;

        setProducts(newProducts);
    };

    //* MUTATIONS
    const [handleChangeQty] = useMutation(UPDATE_PRODUCT_MUTATION, {
        onCompleted: handleChangeProducts,
        update(
            cache,
            {
                data: { updateBasket },
            }
        ) {
            cache.writeQuery({
                query: GET_SHORT_BASKET,
                data: {
                    basket: {
                        products: updateBasket.products,
                        __typename: 'Basket',
                    },
                },
            });
        },
    });
    const [handleRemoveProduct] = useMutation(REMOVE_PRODUCT_MUTATION, {
        onCompleted: handleChangeProducts,
        update(
            cache,
            {
                data: { removeBasket },
            }
        ) {
            cache.writeQuery({
                query: GET_SHORT_BASKET,
                data: {
                    basket: {
                        products: removeBasket.products,
                        __typename: 'Basket',
                    },
                },
            });
        },
    });

    const [createOrder] = useMutation(ORDER_MUTATION, {
        onCompleted({ order: { id } }) {
            if (id) setSuccess(id);
        },
        onError(data) {
            setNotification({
                type: 'error',
                text: data.graphQLErrors[0].message,
            });
        },
    });
    //* MUTATIONS

    //* QUERY delivery
    const [
        loadDeliveries,
        { called: calledDeliveries, loading: loadingDeliveries, data: { couriers, pickups } = {} },
    ] = useLazyQuery(isCourier ? GET_DELIVERY : GET_PICKUPS);
    const deliveries = couriers || pickups;
    const { payments_methods: newPaymentsMethods = [] } = currentDelivery || {};
    const allIdsPaymentMethods = newPaymentsMethods.map(({ id }) => id);
    const paymentsMethods = paymentsMethodsProps.filter(({ id }) => allIdsPaymentMethods.indexOf(id) !== -1);
    //* QUERY delivery

    // useEffect(() => {
    //     if (totalSum < 500) {
    //         setNotification({
    //             errorType: 'lowPrice',
    //             type: 'error',
    //             text:
    //                 'Минимальная сумма заказа по Москве и Московской области 500 руб, по регионам РФ - 1000 руб.',
    //         });
    //     }
    // }, [totalSum]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);

    useEffect(() => {
        setCollapse({
            pickup: false,
            delivery: false,
        });
    }, [values.city.id]);

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleCloseNotification = () => {
        setNotification(null);
    };
    const handleChangeStep = index => {
        if (notification && notification.errorType === 'lowPrice') return;

        setStep(index);
    };
    const handleChangeSelect = data => {
        loadDeliveries({
            variables: {
                city_id: data.id,
            },
        });

        setValues(prevState => ({
            ...prevState,
            city: data,
        }));
    };
    const handleSubmitAddress = data => {
        if (data.id) {
            setValues(prevState => ({
                ...prevState,
                address: data,
            }));
        }
    };
    const handleChange = ({ target: { value, name } }) => {
        setValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const isValid = () => {
        const fields = isCourier ? ['delivery', 'address'] : ['pickup'];
        const requiredFields = ['city', ...fields, 'payment'];

        const valid = requiredFields
            .map(field => {
                const value = values[field];

                if (!value) return field;

                if (isNumber(value) || (typeof value === 'object' && value.id)) {
                    return null;
                }

                return field;
            })
            .filter(Boolean);

        if (valid.length) {
            const name = [...valid].shift();

            setNotification({
                type: 'error',
                text: ERORRS[name],
            });
        }

        return !valid.length;
    };
    const handleLogInCompleted = ({ auth: { hash } }) => {
        login(hash);
    };
    const handleRegisterCompleted = ({ register: { hash } }) => {
        login(hash);
    };
    const handleChangeAddress = data => {
        setValues(prevState => ({ ...prevState, address: data }));
    };
    const handleClickListItem = ({ data, type }) => {
        setValues(prevState => ({
            ...prevState,
            [type]: data,
        }));
    };
    const handleSubmitPromocode = (e, { promocode, error }) => {
        e.preventDefault();

        console.log('submit promocode', promocode, error);
    };
    const handleRemovePromocode = () => {};

    // console.log(values.pickup, values.delivery, values.payment, values.address_id, '🔥');

    if (success) {
        return <Success id={success} />;
    }

    if (!products.length) {
        return (
            <Stripe className={styles.empty} kind="secondary">
                В данный момент ваша корзина пуста.
            </Stripe>
        );
    }

    return (
        <div className={styles.root}>
            {notification && (
                <Snackbar
                    text={notification.text}
                    active={!!notification}
                    theme={notification.type}
                    onClose={handleCloseNotification}
                />
            )}
            <StepView active={step} onChange={handleChangeStep}>
                <StepContainer title="Моя корзина" theme={theme}>
                    {products.map(
                        ({
                            product_name: productName,
                            item_id: id,
                            name,
                            qty,
                            brand_name,
                            discount,
                            price,
                            url,
                        }) => (
                            <ProductTable
                                key={id}
                                id={id}
                                type="basket"
                                brand={brand_name}
                                image="https://placehold.it/150x150"
                                title={productName}
                                description={name}
                                price={price}
                                url={url}
                                footerActions={
                                    <>
                                        x&nbsp;
                                        <select
                                            name="products-qty"
                                            className={styles.amountSelect}
                                            onChange={({ target: { value } }) => {
                                                handleChangeQty({
                                                    variables: {
                                                        input: {
                                                            item_id: id,
                                                            qty: value,
                                                        },
                                                    },
                                                });
                                            }}
                                            defaultValue={qty}
                                        >
                                            {[...new Array(11).keys()].slice(1).map(item => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                        &nbsp;шт.
                                    </>
                                }
                                rightActions={
                                    <Button
                                        type="button"
                                        className={styles.removeButton}
                                        onClick={() =>
                                            handleRemoveProduct({
                                                variables: { input: { item_id: id } },
                                            })
                                        }
                                        bold
                                    >
                                        <Trash2 size="20px" />
                                    </Button>
                                }
                            />
                        )
                    )}
                    <div className={styles.productsFooter}>
                        <div className={styles.productsFooterItem}>
                            <Promocode
                                {...promocode}
                                onSubmit={handleSubmitPromocode}
                                onRemove={handleRemovePromocode}
                            />
                        </div>
                        <div className={styles.productsFooterItem}>
                            <Button kind="primary" onClick={() => setOpenModal(true)} bold>
                                Добавить подарок
                            </Button>
                            {openModal && (
                                <Dialog open={openModal} onClose={handleCloseModal}>
                                    <DialogTitle>Подарки к заказу</DialogTitle>
                                    <DialogContent>gifts</DialogContent>
                                </Dialog>
                            )}
                        </div>
                    </div>
                </StepContainer>
                {isLoggedIn ? (
                    <StepContainer title="Оформление заказа" theme={theme}>
                        <div className={styles.block}>
                            <Select
                                label="Город*"
                                items={citiesForSelect}
                                value={values.city.id}
                                onChange={handleChangeSelect}
                            />
                        </div>
                        <div className={styles.block}>
                            <div className={styles.blockTitle}>Способ получения</div>
                            {DELIVERY_TYPES.map(({ id, label }) => {
                                return (
                                    <ListItem
                                        key={id}
                                        title={label}
                                        active={values.deliveryType === id}
                                        onClick={() =>
                                            handleClickListItem({
                                                type: 'deliveryType',
                                                data: id,
                                            })
                                        }
                                        pointer
                                    />
                                );
                            })}
                        </div>
                        {!calledDeliveries ? null : loadingDeliveries ? (
                            <Loader />
                        ) : (
                            <>
                                <div className={styles.block}>
                                    <div className={styles.blockTitle}>
                                        {isCourier ? 'Способ доставки' : 'Самовывозы'}
                                    </div>

                                    <div>
                                        {collapse[values.deliveryType] &&
                                        deliveries.data.length > 1 &&
                                        currentDelivery ? (
                                            <div>
                                                <ListItem
                                                    title={currentDelivery.direction_title}
                                                    description={
                                                        isCourier ? (
                                                            <>
                                                                <p>
                                                                    {currentDelivery.delivery_days_source}:{' '}
                                                                    {currentDelivery.delivery_days}
                                                                </p>
                                                                {currentDelivery.comment && (
                                                                    <p>{currentDelivery.comment}</p>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p>
                                                                    {currentDelivery.delivery_days_source}:{' '}
                                                                    {currentDelivery.delivery_days}
                                                                </p>
                                                                <p>Адрес: {currentDelivery.address}</p>
                                                                <p>
                                                                    Время работы: {currentDelivery.schedule}
                                                                </p>
                                                                {currentDelivery.comment && (
                                                                    <p>{currentDelivery.comment}</p>
                                                                )}
                                                            </>
                                                        )
                                                    }
                                                    actions={
                                                        <b>
                                                            {currentDelivery.price === '0'
                                                                ? 'Бесплатно'
                                                                : `${currentDelivery.price} ${CURRENCY}`}
                                                        </b>
                                                    }
                                                    active
                                                />
                                                <Button
                                                    kind="primary"
                                                    onClick={() =>
                                                        setCollapse(prevState => ({
                                                            ...prevState,
                                                            [values.deliveryType]: false,
                                                        }))
                                                    }
                                                    bold
                                                >
                                                    Показать еще ({deliveries.data.length})
                                                </Button>
                                            </div>
                                        ) : (
                                            deliveries.data.map(item => {
                                                const {
                                                    direction_title: title,
                                                    delivery_days: deliveryDays,
                                                    delivery_days_source: deliveryDaysSource,
                                                    id,
                                                    address,
                                                    schedule,
                                                    price,
                                                    visible,
                                                    comment,
                                                } = item;
                                                if (!visible) return null;

                                                return (
                                                    <ListItem
                                                        key={id}
                                                        title={title}
                                                        description={
                                                            isCourier ? (
                                                                <>
                                                                    <p>
                                                                        {deliveryDaysSource}: {deliveryDays}
                                                                    </p>
                                                                    {comment && <p>{comment}</p>}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <p>
                                                                        {deliveryDaysSource}: {deliveryDays}
                                                                    </p>
                                                                    <p>Адрес: {address}</p>
                                                                    <p>Время работы: {schedule}</p>

                                                                    {comment && <p>{comment}</p>}
                                                                </>
                                                            )
                                                        }
                                                        actions={
                                                            <b>
                                                                {price === '0'
                                                                    ? 'Бесплатно'
                                                                    : `${price} ${CURRENCY}`}
                                                            </b>
                                                        }
                                                        active={currentDelivery && currentDelivery.id === id}
                                                        onClick={() => {
                                                            handleClickListItem({
                                                                type: isCourier ? 'delivery' : 'pickup',
                                                                data: item,
                                                            });
                                                            setCollapse(prevState => ({
                                                                ...prevState,
                                                                [values.deliveryType]: true,
                                                            }));
                                                            // set default first payment
                                                            setValues(prevState => ({
                                                                ...prevState,
                                                                payment: item.payments_methods[0],
                                                            }));
                                                        }}
                                                        pointer
                                                    />
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                                {isCourier && (
                                    <div className={styles.block}>
                                        <div className={styles.blockTitle}>Адреса</div>
                                        <AddressList
                                            items={addresses ? addresses.data : []}
                                            onChange={handleChangeAddress}
                                            onSubmit={handleSubmitAddress}
                                            value={values.address ? values.address.id : null}
                                        />
                                    </div>
                                )}
                                {currentDelivery &&
                                    currentDelivery.id &&
                                    paymentsMethods &&
                                    paymentsMethods.length && (
                                        <div className={styles.block}>
                                            <div className={styles.blockTitle}>Способ оплаты</div>
                                            {paymentsMethods.map(item => {
                                                const { id, name } = item;

                                                return (
                                                    <ListItem
                                                        key={id}
                                                        title={name}
                                                        active={values.payment.id === id}
                                                        onClick={() => {
                                                            handleClickListItem({
                                                                type: 'payment',
                                                                data: item,
                                                            });
                                                        }}
                                                        pointer
                                                    />
                                                );
                                            })}
                                        </div>
                                    )}
                            </>
                        )}
                        <div className={styles.block}>
                            <div className={styles.blockTitle}>Коментарии</div>
                            <Input
                                className="basket__textarea"
                                name="comment"
                                value={values.comment}
                                onChange={handleChange}
                                rows="2"
                                multiline
                            />
                        </div>
                    </StepContainer>
                ) : (
                    <StepContainer title="Вход в личный кабинет" theme={theme}>
                        <div className="basket__users">
                            <div className="basket__node">
                                <div className="basket__form">
                                    <h3 className={styles.blockTitle}>Я зарегистрирован на La Parfumerie</h3>
                                    <LoginForm onCompleted={handleLogInCompleted} />
                                </div>
                            </div>
                            <div className="basket__node">
                                <div className="basket__form">
                                    <h3 className={styles.blockTitle}>Я новый пользователь</h3>
                                    <div style={{ textAlign: 'left' }}>
                                        <UserForm type="registration" onCompleted={handleRegisterCompleted} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </StepContainer>
                )}
            </StepView>
            {step === 1 && !isLoggedIn ? null : (
                <SidebarBasket
                    total={totalSum}
                    className={styles.sidebar}
                    step={step}
                    count={step === 0 && products.length}
                    deliveryPrice={step !== 0 && currentDelivery && currentDelivery.price}
                    actions={
                        step === 1 ? (
                            <Button
                                className="basket__button"
                                kind="primary"
                                bold
                                onClick={() => {
                                    if (isValid()) {
                                        const input = isCourier
                                            ? {
                                                  courier_id: values.delivery.id,
                                                  address_id: values.address.id,
                                              }
                                            : {
                                                  pvz_id: values.pickup.id,
                                              };

                                        createOrder({
                                            variables: {
                                                input: {
                                                    ...input,
                                                    payment_method_id: values.payment.id,
                                                    comment: values.comment,
                                                },
                                            },
                                        });
                                    }
                                }}
                            >
                                Оформить Заказ
                            </Button>
                        ) : (
                            <Button
                                kind="primary"
                                bold
                                onClick={() => step === 0 && handleChangeStep(step + 1)}
                            >
                                Перейти к оформлению
                            </Button>
                        )
                    }
                />
            )}
        </div>
    );
};

Basket.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    basket: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]))
        .isRequired,
    cities: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.string])).isRequired,
};

export default withApollo(Basket);
