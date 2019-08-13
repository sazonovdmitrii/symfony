import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withApollo, Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Trash2 } from 'react-feather';

import { useApp } from 'hooks';

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

const UPDATE_PRODUCT_MUTATION = gql`
    mutation updateProduct($input: UpdateBasketInput!) {
        updateBasket(input: $input) {
            products {
                item_id
                qty
                name
                product_name
                price
            }
        }
    }
`;

const REMOVE_PRODUCT_MUTATION = gql`
    mutation removeProduct($input: AddBasketInput!) {
        removeBasket(input: $input) {
            products {
                item_id
                qty
                name
                product_name
                price
            }
        }
    }
`;

const ORDER_MUTATION = gql`
    mutation createOrder($input: OrderInput) {
        order(input: $input) {
            id
        }
    }
`;

const GET_PICKUPS = gql`
    query pickups($city_id: Int) {
        pickups(city_id: $city_id) {
            data {
                id
                direction_title
                address
                price
                latitude
                longitude
                phones
                schedule
                delivery_days
                delivery_days_source
                min_order_sum
                retail
                pvz_id
                visible
                comment
                payments_methods {
                    id
                }
            }
        }
    }
`;

const GET_DELIVERY = gql`
    query delivery($city_id: Int) {
        couriers(city_id: $city_id) {
            data {
                id
                direction_title
                price
                delivery_days
                delivery_days_source
                min_order_sum
                visible
                comment
                payments_methods {
                    id
                }
            }
        }
    }
`;

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
    const [showLogin, setShowLogin] = useState(false);
    const [step, setStep] = useState(0);
    const [notification, setNotification] = useState(null);
    // TODO check active key
    const [values, setValues] = useState({
        deliveryType: 'courier',
        city: {},
        payment: {},
        delivery: {},
        pickup: {},
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
    const cities = citiesProps.sort((a, b) => {
        if (a.title < b.title) {
            return -1;
        }

        return 0;
    });
    const citiesForSelect = cities
        .map(({ id, title, visible, ...any }) => {
            if (visible) return { id, value: title, ...any };
            return null;
        })
        .filter(Boolean);

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
        setValues(prevState => ({
            ...prevState,
            city: data,
        }));
    };
    const handleChangeProducts = ({ removeBasket, updateBasket }, data = removeBasket || updateBasket) => {
        if (!data) return;

        const { products: newProducts } = data;

        setProducts(newProducts);
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
    const handleLogInCompleted = async ({ auth: { hash } }) => {
        await login(hash);
    };
    const handleRegisterCompleted = async ({ register: { hash } }) => {
        await login(hash);
    };
    const handleOrderCompleted = ({ order: { id } }) => {
        if (id) setSuccess(id);
    };
    const handleError = data => {
        setNotification({
            type: 'error',
            text: data.graphQLErrors[0].message,
        });
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
                                footerActions={
                                    <>
                                        x&nbsp;
                                        <Mutation
                                            mutation={UPDATE_PRODUCT_MUTATION}
                                            onCompleted={handleChangeProducts}
                                        >
                                            {(callback, { error, data, loading }) => {
                                                return (
                                                    <select
                                                        name="products-qty"
                                                        className={styles.amountSelect}
                                                        onChange={({ target: { value } }) => {
                                                            callback({
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
                                                );
                                            }}
                                        </Mutation>
                                        &nbsp;шт.
                                    </>
                                }
                                rightActions={
                                    <Mutation
                                        mutation={REMOVE_PRODUCT_MUTATION}
                                        onCompleted={handleChangeProducts}
                                    >
                                        {(remove, { error, data, loading }) => {
                                            console.log(error, data, loading);

                                            return (
                                                <Button
                                                    type="button"
                                                    className={styles.removeButton}
                                                    onClick={() =>
                                                        remove({
                                                            variables: { input: { item_id: id } },
                                                        })
                                                    }
                                                    bold
                                                >
                                                    <Trash2 size="20px" />
                                                </Button>
                                            );
                                        }}
                                    </Mutation>
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
                        {values.city.id && values.deliveryType && (
                            <Query
                                query={isCourier ? GET_DELIVERY : GET_PICKUPS}
                                variables={{
                                    city_id: values.city.id,
                                }}
                            >
                                {({ loading, error, data: { couriers, pickups } }) => {
                                    if (error) return null;
                                    if (loading) return <Loader />;

                                    const myData = couriers || pickups;
                                    const { payments_methods: newPaymentsMethods = [] } = currentDelivery;
                                    const allIdsPaymentMethods = newPaymentsMethods.map(({ id }) => id);
                                    const paymentsMethods = paymentsMethodsProps.filter(
                                        ({ id }) => allIdsPaymentMethods.indexOf(id) !== -1
                                    );

                                    return (
                                        <>
                                            <div className={styles.block}>
                                                <div className={styles.blockTitle}>
                                                    {isCourier ? 'Способ доставки' : 'Самовывозы'}
                                                </div>

                                                <div>
                                                    {collapse[values.deliveryType] &&
                                                    myData.data.length > 1 ? (
                                                        <div>
                                                            <ListItem
                                                                title={currentDelivery.direction_title}
                                                                description={
                                                                    isCourier ? (
                                                                        <>
                                                                            <p>
                                                                                {
                                                                                    currentDelivery.delivery_days_source
                                                                                }
                                                                                :{' '}
                                                                                {
                                                                                    currentDelivery.delivery_days
                                                                                }
                                                                            </p>
                                                                            {currentDelivery.comment && (
                                                                                <p>
                                                                                    {currentDelivery.comment}
                                                                                </p>
                                                                            )}
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <p>
                                                                                {
                                                                                    currentDelivery.delivery_days_source
                                                                                }
                                                                                :{' '}
                                                                                {
                                                                                    currentDelivery.delivery_days
                                                                                }
                                                                            </p>
                                                                            <p>
                                                                                Адрес:{' '}
                                                                                {currentDelivery.address}
                                                                            </p>
                                                                            <p>
                                                                                Время работы:{' '}
                                                                                {currentDelivery.schedule}
                                                                            </p>
                                                                            {currentDelivery.comment && (
                                                                                <p>
                                                                                    {currentDelivery.comment}
                                                                                </p>
                                                                            )}
                                                                        </>
                                                                    )
                                                                }
                                                                actions={
                                                                    <b>
                                                                        {currentDelivery.price}&nbsp;
                                                                        {CURRENCY}
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
                                                                Показать еще ({myData.data.length})
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        myData.data.map(item => {
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
                                                                                    {deliveryDaysSource}:{' '}
                                                                                    {deliveryDays}
                                                                                </p>
                                                                                {comment && <p>{comment}</p>}
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <p>
                                                                                    {deliveryDaysSource}:{' '}
                                                                                    {deliveryDays}
                                                                                </p>
                                                                                <p>Адрес: {address}</p>
                                                                                <p>
                                                                                    Время работы: {schedule}
                                                                                </p>

                                                                                {comment && <p>{comment}</p>}
                                                                            </>
                                                                        )
                                                                    }
                                                                    actions={
                                                                        <b>
                                                                            {price}&nbsp;{CURRENCY}
                                                                        </b>
                                                                    }
                                                                    active={currentDelivery.id === id}
                                                                    onClick={() => {
                                                                        handleClickListItem({
                                                                            type: isCourier
                                                                                ? 'delivery'
                                                                                : 'pickup',
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
                                            {currentDelivery.id && paymentsMethods && paymentsMethods.length && (
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
                                    );
                                }}
                            </Query>
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
                    deliveryPrice={step !== 0 && currentDelivery.price}
                    actions={
                        step === 1 ? (
                            <Mutation
                                mutation={ORDER_MUTATION}
                                onCompleted={handleOrderCompleted}
                                onError={handleError}
                            >
                                {(createOrder, { error, loading, data }) => {
                                    return (
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
                                    );
                                }}
                            </Mutation>
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
