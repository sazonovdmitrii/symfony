import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withApollo, Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';

import { useApp } from 'hooks';

import { Dialog, DialogTitle, DialogContent } from 'components/Dialog';
import Input from 'components/Input';
import Button from 'components/Button';
import LoginForm from 'components/LoginForm';
import RegisterForm from 'components/RegisterForm';
import { StepView, StepContainer } from 'components/Steps';
import AddressList from 'components/AddressList/AddressList';
import Snackbar from 'components/Snackbar';
import Select from 'components/Select';
import Loader from 'components/Loader';
import ListItem from 'components/ListItem';

import Success from 'routes/Success';

import styles from './styles.css';

import infoIcon from './images/info.png';
import carIcon from './images/car.png';

const CURRENCY = 'Руб.';

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
                    name
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
                    name
                }
            }
        }
    }
`;

const theme = {
    title: 'typography__catheader basket__h1',
    header: 'basket__title',
    nav: styles.nav,
};

const text = {
    city: 'г.',
    corp: 'корп.',
    flat: 'кв.',
    house: 'д.',
    street: 'ул.',
    zip: 'индекс:',
};

const Basket = ({
    basket: { products: productsProps },
    gifts = [],
    cities: { data: cities },
    addresses,
    isLoggedIn,
}) => {
    const [success, setSuccess] = useState(false);
    const [products, setProducts] = useState(productsProps);
    const [promocode, setPromocode] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [step, setStep] = useState(1);
    const [notification, setNotification] = useState(null);
    const [values, setValues] = useState({
        deliveryType: 'courier',
        city: null,
        payment: {},
        delivery: {},
        pickup: {},
        comment: '',
        promocode: '',
        address_id: addresses && addresses.data.length ? addresses.data[0].id : null,
    });
    const isCourier = values.deliveryType === 'courier';
    const [collapse, setCollapse] = useState({
        pickup: false,
        delivery: false,
    });
    const [currentPayment, setCurrentPayment] = useState({});
    const [currentDirection, setCurrentDirection] = useState({});
    const [currentAddress, setCurrentAddress] = useState(addresses ? addresses.data[0] : null);
    const totalSum = products.reduce((acc, item) => acc + item.price * item.qty, 0);
    const totalSumWithDirection = parseInt(currentDirection.price, 10) + totalSum;
    const citiesForSelect = cities
        .map(({ id, title, visible }) => {
            if (visible) return { id, value: title };
            return null;
        })
        .filter(Boolean);

    // console.log(currentAddress);
    // useEffect(() => {
    //     setCurrentPayment(paymentsMethods.find(({ id }) => id.toString() === values.payment));
    // }, [paymentsMethods, values.payment]);
    // useEffect(() => {
    //     setCurrentDirection(directions.find(({ id }) => id.toString() === values.direction));
    // }, [directions, values.direction]);

    useEffect(() => {
        if (totalSum < 500) {
            setNotification({
                errorType: 'lowPrice',
                type: 'error',
                text:
                    'Минимальная сумма заказа по Москве и Московской области 500 руб, по регионам РФ - 1000 руб.',
            });
        }
    }, [totalSum]);

    useEffect(() => {
        setCollapse({
            pickup: false,
            delivery: false,
        });
        // setValues(prevState => ({
        //     ...prevState,
        //     // address_id: null,
        //     delivery: {},
        //     payment: {},
        //     pickup: {},
        // }));
    }, [values.city]);

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
    const handleChangeSelect = ({ id }) => {
        setValues(prevState => ({
            ...prevState,
            city: id,
        }));
    };
    const handleChangeProducts = ({ removeBasket, updateBasket }, data = removeBasket || updateBasket) => {
        if (!data) return;

        const { products: newProducts } = data;

        setProducts(newProducts);
    };
    const handleSubmitAddress = data => {
        // console.log(data);
        if (data.id) {
            setValues(prevState => ({
                ...prevState,
                address_id: data.id,
            }));
            setCurrentAddress(data);
        }
    };
    const handleSubmitPromocode = () => {};
    const handleChange = ({ target: { value, name } }) => {
        setValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const isValid = () => {
        const fields = isCourier ? [values.delivery, values.address_id] : [values.pickup];
        const valid = [values.city, ...fields, values.payment].every(item => {
            console.log(item);
            if (item && typeof item === 'object') return item.id;

            return item;
        });

        // TODO validation address, delivery, payment
        return valid;
    };
    const { login } = useApp();
    const handleLogInCompleted = async ({ auth }) => {
        await login(auth.hash);
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
        setCurrentAddress(data);
        setValues(prevState => ({ ...prevState, address_id: data.id }));
    };

    const handleClickListItem = ({ data, type }) => {
        setValues(prevState => ({
            ...prevState,
            [type]: data,
        }));
    };

    // console.log(values.pickup, values.delivery, values.payment, values.address_id, '🔥');

    if (success) {
        return <Success id={success} />;
    }

    if (!products.length) {
        return (
            <div
                style={{
                    margin: '20px 0',
                    textAlign: 'center',
                    fontSize: '18px',
                    lineHeight: '48px',
                    background: '#f6f6f6',
                }}
            >
                В данный момент ваша корзина пуста.
            </div>
        );
    }

    return (
        <div>
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
                    <table className="basket__table">
                        <thead>
                            <tr>
                                <td colSpan="2" className="basket__table-tdh">
                                    Наименование
                                </td>
                                <td className="basket__table-tdh">
                                    <span className="show-on-mobile">Кол-во</span>
                                    <span className="hide-on-mobile">Количество</span>
                                </td>
                                <td className="basket__table-tdh">{promocode && 'Скидка'}</td>
                                <td className="basket__table-tdh">Цена</td>
                                <td className="basket__table-tdh">Сумма</td>
                            </tr>
                        </thead>
                        <tbody>
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
                                    <tr key={id} className="basket__table-tr">
                                        <td width="10%" align="center" className="basket__table-tdb">
                                            <Link to="/" className="cart-tbl__link hide-on-mobile">
                                                <img
                                                    src="https://placehold.it/60x60/000"
                                                    height="60"
                                                    alt=""
                                                />
                                            </Link>
                                        </td>
                                        <td width="50%" className="basket__table-tdb">
                                            {brand_name && (
                                                <strong className="basket__bold hide-on-mobile">
                                                    {brand_name}
                                                </strong>
                                            )}
                                            <Link className="basket__productname" to="/">
                                                {productName} {name}
                                            </Link>
                                            <div className="basket__table-navitem hide-on-mobile">
                                                <Mutation
                                                    mutation={REMOVE_PRODUCT_MUTATION}
                                                    onCompleted={handleChangeProducts}
                                                >
                                                    {(remove, { error, data, loading }) => {
                                                        return (
                                                            <Button
                                                                className="basket__bold basket__table-navitem-del"
                                                                onClick={() =>
                                                                    remove({
                                                                        variables: { input: { item_id: id } },
                                                                    })
                                                                }
                                                                bold
                                                            >
                                                                ✖ Удалить покупку
                                                            </Button>
                                                        );
                                                    }}
                                                </Mutation>
                                            </div>
                                        </td>
                                        <td width="10%" className="basket__table-tdb">
                                            <div className="basket__count">
                                                <i className="basket__count-arrow">▼</i>
                                                <Mutation
                                                    mutation={UPDATE_PRODUCT_MUTATION}
                                                    onCompleted={handleChangeProducts}
                                                >
                                                    {(callback, { error, data, loading }) => {
                                                        return (
                                                            <select
                                                                className="basket__count-select"
                                                                name="products-qty"
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
                                                                {[...new Array(11).keys()]
                                                                    .slice(1)
                                                                    .map(item => (
                                                                        <option key={item} value={item}>
                                                                            {item}
                                                                        </option>
                                                                    ))}
                                                            </select>
                                                        );
                                                    }}
                                                </Mutation>
                                            </div>
                                        </td>
                                        <td width="10%" className="basket__table-tdb">
                                            {discount}
                                        </td>
                                        <td width="10%" className="basket__table-tdb">
                                            {/* <span className="cart-price cart-price_role_original">
                                                666 {CURRENCY}
                                            </span> */}
                                            <span className="cart-price cart-price_role_final">
                                                {price ? `${price} ${CURRENCY}` : 'Бесплатно'}
                                            </span>
                                        </td>
                                        <td width="10%" className="basket__table-tdb">
                                            {price ? <b>{`${price * qty} ${CURRENCY}`}</b> : 'Бесплатно'}
                                            <Mutation
                                                mutation={REMOVE_PRODUCT_MUTATION}
                                                onCompleted={handleChangeProducts}
                                            >
                                                {(remove, { error, data, loading }) => {
                                                    console.log(error, data, loading);

                                                    return (
                                                        <Button
                                                            className="show-on-mobile"
                                                            style={{ float: 'right' }}
                                                            onClick={() =>
                                                                remove({
                                                                    variables: { input: { item_id: id } },
                                                                })
                                                            }
                                                            bold
                                                        >
                                                            ✖
                                                        </Button>
                                                    );
                                                }}
                                            </Mutation>
                                        </td>
                                    </tr>
                                )
                            )}
                            {gifts.length ? (
                                <tr className="gift_row">
                                    <td colSpan="2" className="basket__table-tdb">
                                        <Fragment>
                                            <Button kind="primary" onClick={() => setOpenModal(true)} bold>
                                                <span className="basket__gifts-add">Добавить подарок</span>
                                            </Button>
                                            {openModal && (
                                                <Dialog open={openModal} onClose={handleCloseModal}>
                                                    <DialogTitle>Подарки к заказу</DialogTitle>
                                                    <DialogContent>gifts</DialogContent>
                                                </Dialog>
                                            )}
                                        </Fragment>
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3" className="basket__table-tdf">
                                    <img className="basket__icon hide-on-mobile" src={carIcon} alt="" />
                                    <p className="basket__table-time">
                                        <strong className="basket__bold">
                                            Ожидаемое время доставки по Москве:
                                        </strong>
                                        <br />
                                        <span>до 14 дней</span>
                                    </p>
                                </td>
                                <td colSpan="3" className="basket__table-tdf">
                                    <table width="100%">
                                        <tbody>
                                            <tr>
                                                <td>Доставка:</td>
                                                <td className="align_right">
                                                    <span>
                                                        {currentDirection.price
                                                            ? `${currentDirection.price} ${CURRENCY}`
                                                            : 'Бесплатно'}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr data-render="promocodeRow" />
                                            <tr className="basket__bold">
                                                <td>Итого:</td>
                                                <td className="align_right">
                                                    <span>{totalSumWithDirection}</span>{' '}
                                                    <span>{CURRENCY}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="basket__table-tdf">
                                    <div>
                                        <ul className="basket__table-list">
                                            <li className="basket__table-list-pt">
                                                ✔ Удобные споcобы оплаты
                                            </li>
                                            <li className="basket__table-list-pt">✔ Бесплатная доставка</li>
                                            <li className="basket__table-list-pt">✔ Гарантия качества</li>
                                            <li className="basket__table-list-pt">✔ Бесплатный возврат</li>
                                        </ul>
                                    </div>
                                </td>
                                <td colSpan="3" className="basket__table-tdf">
                                    <div className="basket__table-list basket__table-infoblock float_right">
                                        <img className="basket__icon" src={infoIcon} alt="" />
                                        <p className="basket__table-infoblock-text">
                                            <span>
                                                Вы сможете ввести промо-код на стадии &quot;Подтверждения
                                                заказа&quot;
                                            </span>
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </StepContainer>
                {!isLoggedIn ? (
                    <StepContainer title="Оформление заказа" theme={theme}>
                        <div className="basket__users">
                            <div className="basket__node">
                                <div className="basket__form">
                                    <h3 className="basket__formtitle">Я зарегистрирован на La Parfumerie</h3>
                                    <LoginForm onCompleted={handleLogInCompleted} />
                                </div>
                            </div>
                            <div className="basket__node">
                                <div className="basket__form">
                                    <h3 className="basket__formtitle">Я новый пользователь</h3>
                                    <RegisterForm onCompleted={handleRegisterCompleted} />
                                </div>
                            </div>
                        </div>
                    </StepContainer>
                ) : (
                    <StepContainer title="Доставка" theme={theme} nav={{ footer: true }}>
                        <div className="basket__address-shipp">
                            <div className="basket__address-shippblock">
                                <Select
                                    label="Город*"
                                    items={citiesForSelect}
                                    value={values.city}
                                    onChange={handleChangeSelect}
                                />
                            </div>
                            <div className="basket__address-shippblock">
                                <div className={styles.sectionTitle}>Способ получения</div>
                                <div className="basket__address-shippblock-list">
                                    {[
                                        { id: 'courier', label: 'Курьером' },
                                        { id: 'pickup', label: 'Самовывоз' },
                                    ].map(({ id, label }) => {
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
                            </div>
                            {values.city && values.deliveryType && (
                                <Query
                                    query={isCourier ? GET_DELIVERY : GET_PICKUPS}
                                    variables={{
                                        city_id: values.city,
                                    }}
                                >
                                    {({ loading, error, data: { couriers, pickups } }) => {
                                        if (error) return null;
                                        if (loading) return <Loader />;

                                        const myData = couriers || pickups;
                                        const currentPayments = myData.data.reduce(
                                            (obj, { id, payments_methods }) => {
                                                return {
                                                    ...obj,
                                                    [id]: payments_methods,
                                                };
                                            },
                                            {}
                                        );
                                        const currentValue = isCourier ? values.delivery : values.pickup;
                                        const payments = currentValue.id
                                            ? currentPayments[currentValue.id]
                                            : [];
                                        // console.log(currentValue, payments, '🤯');

                                        return (
                                            <Fragment>
                                                <div className="basket__address-shippblock">
                                                    <div className={styles.sectionTitle}>
                                                        {isCourier ? 'Способ доставки' : 'Самовывоз'}
                                                    </div>
                                                    <div className="basket__address-shippblock-list">
                                                        <div>
                                                            {collapse[values.deliveryType] ? (
                                                                <div>
                                                                    <ListItem
                                                                        title={currentValue.direction_title}
                                                                        description={
                                                                            isCourier ? (
                                                                                <Fragment>
                                                                                    <p>
                                                                                        {
                                                                                            currentValue.delivery_days_source
                                                                                        }
                                                                                        :{' '}
                                                                                        {
                                                                                            currentValue.delivery_days
                                                                                        }
                                                                                    </p>
                                                                                    {currentValue.comment && (
                                                                                        <p>
                                                                                            {
                                                                                                currentValue.comment
                                                                                            }
                                                                                        </p>
                                                                                    )}
                                                                                </Fragment>
                                                                            ) : (
                                                                                <Fragment>
                                                                                    <p>
                                                                                        {
                                                                                            currentValue.delivery_days_source
                                                                                        }
                                                                                        :{' '}
                                                                                        {
                                                                                            currentValue.delivery_days
                                                                                        }
                                                                                    </p>
                                                                                    <p>
                                                                                        Адрес:{' '}
                                                                                        {currentValue.address}
                                                                                    </p>
                                                                                    <p>
                                                                                        Время работы:{' '}
                                                                                        {
                                                                                            currentValue.schedule
                                                                                        }
                                                                                    </p>
                                                                                </Fragment>
                                                                            )
                                                                        }
                                                                        actions={
                                                                            <b>
                                                                                {currentValue.price}&nbsp;
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
                                                                    >
                                                                        Показать еще ({myData.data.length})
                                                                    </Button>
                                                                </div>
                                                            ) : (
                                                                myData.data.map(item => {
                                                                    const {
                                                                        id,
                                                                        direction_title,
                                                                        address,
                                                                        schedule,
                                                                        price,
                                                                        delivery_days,
                                                                        delivery_days_source,
                                                                        visible,
                                                                        comment,
                                                                    } = item;
                                                                    if (!visible) return null;

                                                                    return (
                                                                        <ListItem
                                                                            key={id}
                                                                            title={direction_title}
                                                                            description={
                                                                                isCourier ? (
                                                                                    <Fragment>
                                                                                        <p>
                                                                                            {
                                                                                                delivery_days_source
                                                                                            }
                                                                                            : {delivery_days}
                                                                                        </p>
                                                                                        {comment && (
                                                                                            <p>{comment}</p>
                                                                                        )}
                                                                                    </Fragment>
                                                                                ) : (
                                                                                    <Fragment>
                                                                                        <p>
                                                                                            {
                                                                                                delivery_days_source
                                                                                            }
                                                                                            : {delivery_days}
                                                                                        </p>
                                                                                        <p>
                                                                                            Адрес: {address}
                                                                                        </p>
                                                                                        <p>
                                                                                            Время работы:{' '}
                                                                                            {schedule}
                                                                                        </p>
                                                                                    </Fragment>
                                                                                )
                                                                            }
                                                                            actions={
                                                                                <b>
                                                                                    {price}&nbsp;{CURRENCY}
                                                                                </b>
                                                                            }
                                                                            active={currentValue.id === id}
                                                                            onClick={() => {
                                                                                setCollapse(prevState => ({
                                                                                    ...prevState,
                                                                                    [values.deliveryType]: true,
                                                                                }));
                                                                                handleClickListItem({
                                                                                    type: isCourier
                                                                                        ? 'delivery'
                                                                                        : 'pickup',
                                                                                    data: item,
                                                                                });
                                                                            }}
                                                                            pointer
                                                                        />
                                                                    );
                                                                })
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                {currentValue.id && payments && payments.length && (
                                                    <div className="basket__address-shippblock">
                                                        <div className={styles.sectionTitle}>
                                                            Способ оплаты
                                                        </div>
                                                        <div className="basket__address-shippblock-list">
                                                            <div>
                                                                {payments.map(item => {
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
                                                        </div>
                                                    </div>
                                                )}
                                                {isCourier && (
                                                    <div className="basket__address-shippblock">
                                                        <AddressList
                                                            items={addresses.data}
                                                            onChange={handleChangeAddress}
                                                            onSubmit={handleSubmitAddress}
                                                            value={values.address_id}
                                                        />
                                                    </div>
                                                )}
                                            </Fragment>
                                        );
                                    }}
                                </Query>
                            )}
                        </div>
                        <div className="basket__payment-promo">
                            <div className="basket__payment-promo-code">
                                <form onSubmit={handleSubmitPromocode} className={styles.promocode}>
                                    <Input
                                        name="promocode"
                                        value={values.promocode}
                                        theme={{ input: styles.input, label: styles.inputLabel }}
                                        label="Промо-код"
                                        onChange={handleChange}
                                    />
                                    <Button
                                        type="submit"
                                        className="basket__button basket__bold button button-red button-litegrey"
                                        kind="secondary"
                                        bold
                                    >
                                        Применить
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </StepContainer>
                )}
                {isLoggedIn && (
                    <StepContainer title="Подтверждение" theme={theme}>
                        <div className="basket__confirm-data float_left">
                            {currentAddress && (
                                <div className="basket__confirm-info">
                                    <div className="basket__confirm-info-title basket__bold">
                                        Адрес доставки
                                    </div>
                                    <div className="basket__confirm-info-list">{`${text.city} ${
                                        currentAddress.city
                                    }, ${text.zip} ${currentAddress.zip}, ${text.street} ${
                                        currentAddress.street
                                    }, ${text.house} ${currentAddress.house}, ${text.corp} ${
                                        currentAddress.corp
                                    }, ${text.flat} ${currentAddress.flat}`}</div>
                                </div>
                            )}
                            {currentPayment && (
                                <div className="basket__confirm-info">
                                    <div className="basket__confirm-info-title basket__bold">Оплата</div>
                                    <div className="basket__confirm-info-list">
                                        <span>{currentPayment.name}</span>
                                    </div>
                                </div>
                            )}
                            <div className="basket__confirm-info">
                                <div className="basket__confirm-info-title basket__bold">Коментарии</div>
                                <div className="basket__confirm-info-list">
                                    <Input
                                        className="basket__textarea"
                                        name="comment"
                                        value={values.comment}
                                        onChange={handleChange}
                                        rows="2"
                                        multiline
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="basket__confirm-items float_right">
                            <table className="basket__table">
                                <thead>
                                    <tr>
                                        <td colSpan="2" className="basket__table-tdh">
                                            Наименование
                                        </td>
                                        <td className="basket__table-tdh">
                                            <span className="show-on-mobile">Кол-во</span>
                                            <span className="hide-on-mobile">Количество</span>
                                        </td>
                                        <td className="basket__table-tdh">{promocode && 'Скидка'}</td>
                                        <td className="basket__table-tdh">Цена</td>
                                        <td className="basket__table-tdh">Сумма</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(
                                        ({
                                            product_name: productName,
                                            name,
                                            item_id: id,
                                            qty,
                                            brand_name,
                                            discount,
                                            price,
                                        }) => (
                                            <tr key={id} className="basket__table-tr">
                                                <td width="10%" align="center" className="basket__table-tdb">
                                                    <Link to="/" className="cart-tbl__link hide-on-mobile">
                                                        <img
                                                            src="https://placehold.it/60x60/000"
                                                            height="60"
                                                            alt=""
                                                        />
                                                    </Link>
                                                </td>
                                                <td width="50%" className="basket__table-tdb">
                                                    {brand_name && (
                                                        <strong className="basket__bold hide-on-mobile">
                                                            Estee Lauder
                                                        </strong>
                                                    )}
                                                    <Link className="basket__productname" to="/">
                                                        {productName} {name}
                                                    </Link>
                                                </td>
                                                <td width="10%" className="basket__table-tdb">
                                                    {qty}
                                                </td>
                                                <td width="10%" className="basket__table-tdb">
                                                    {discount}
                                                </td>
                                                <td width="10%" className="basket__table-tdb">
                                                    {/* <span className="cart-price cart-price_role_original">
                                                        {old_price}{CURRENCY}
                                                    </span> */}
                                                    <span className="cart-price cart-price_role_final">
                                                        {price ? `${price} ${CURRENCY}` : 'Бесплатно'}
                                                    </span>
                                                </td>
                                                <td width="10%" className="basket__table-tdb">
                                                    {price ? (
                                                        <b>{`${price * qty} ${CURRENCY}`}</b>
                                                    ) : (
                                                        'Бесплатно'
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="3" className="basket__table-tdf">
                                            <img
                                                className="basket__icon hide-on-mobile"
                                                src={carIcon}
                                                alt=""
                                            />
                                            <p className="basket__table-time">
                                                <strong className="basket__bold">
                                                    Ожидаемое время доставки:
                                                </strong>
                                                <br />
                                                <span>{currentDirection.delivery_days}</span>
                                            </p>
                                        </td>
                                        <td colSpan="3" className="basket__table-tdf">
                                            <table width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td>Доставка:</td>
                                                        <td className="align_right">
                                                            <span>
                                                                {currentDirection.price
                                                                    ? `${currentDirection.price} ${CURRENCY}`
                                                                    : 'Бесплатно'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    {promocode && (
                                                        <tr>
                                                            <td>Скидка: {promocode} %</td>
                                                            <td className="align_right">
                                                                -
                                                                <span>
                                                                    {totalSum * (promocode.value / 100)}
                                                                </span>
                                                                руб.
                                                            </td>
                                                        </tr>
                                                    )}
                                                    <tr className="basket__bold">
                                                        <td>Итого:</td>
                                                        <td className="align_right">
                                                            <span>{`${totalSumWithDirection} ${CURRENCY}`}</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className="basket__title--right">
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
                                                                  address_id: values.address_id,
                                                              }
                                                            : {
                                                                  pvz_id: values.pickup.id,
                                                              };

                                                        createOrder({
                                                            variables: {
                                                                input: {
                                                                    ...input,
                                                                    // payment_id: values.payment.id
                                                                    // comment: values.comment
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
                            </div>
                        </div>
                    </StepContainer>
                )}
            </StepView>
        </div>
    );
};

Basket.propTypes = {
    directions: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.string])).isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    basket: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]))
        .isRequired,
    payments_methods: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number])
    ).isRequired,
};

export default withApollo(Basket);
