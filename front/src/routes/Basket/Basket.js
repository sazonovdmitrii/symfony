import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withApollo, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { useApp } from 'hooks';

import { Dialog, DialogTitle, DialogContent } from 'components/Dialog';
import Input from 'components/Input';
import Button from 'components/Button';
import LoginForm from 'components/LoginForm';
import RegisterForm from 'components/RegisterForm';
import InputGroup from 'components/InputGroup';
import RadioGroup from 'components/RadioGroup';
import RadioButton from 'components/RadioButton';
import { StepView, StepContainer } from 'components/Steps';
import AddressList from 'components/AddressList';
import Snackbar from 'components/Snackbar';

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

const theme = {
    title: 'typography__catheader float_left basket__h1',
    header: 'basket__title',
    nav: 'float_right',
};

const Basket = ({
    basket: { products: productsProps },
    directions: { data: directions },
    payments_methods: { data: paymentsMethods },
    isLoggedIn,
}) => {
    const [success, setSuccess] = useState(false);
    const [products, setProducts] = useState(productsProps);
    const [promocode, setPromocode] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [step, setStep] = useState(0);
    const [notification, setNotification] = useState(null);
    const [values, setValues] = useState({
        payment: paymentsMethods[0].id.toString(),
        direction: directions[0].id.toString(),
        comment: '',
        promocode: '',
        address_id: null,
    });
    const [currentPayment, setCurrentPayment] = useState(paymentsMethods[0]);
    const [currentDirection, setCurrentDirection] = useState(directions[0]);
    const totalSum = products.reduce((acc, item) => acc + item.price * item.qty, 0);
    const totalSumWithDirection = parseInt(currentDirection.price, 10) + totalSum;

    useEffect(() => {
        setCurrentPayment(paymentsMethods.find(({ id }) => id.toString() === values.payment));
    }, [paymentsMethods, values.payment]);
    useEffect(() => {
        setCurrentDirection(directions.find(({ id }) => id.toString() === values.direction));
    }, [directions, values.direction]);

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleCloseNotification = () => {
        setNotification(null);
    };
    const handleChangeStep = index => {
        setStep(index);
    };
    const handleChangeProducts = ({ removeBasket, updateBasket }, data = removeBasket || updateBasket) => {
        if (!data) return;

        const { products: newProducts } = data;

        setProducts(newProducts);
    };
    const handleSubmitPromocode = () => {};
    const handleChange = ({ target: { value, name } }) => {
        setValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const isValid = () => {
        // TODO validation address, delivery, payment
        return true;
    };
    const { login } = useApp();
    const handleLogInCompleted = async ({ auth }) => {
        await login(auth.hash);
    };
    const handleOrderCompleted = ({ order: { id } }) => {
        // if (id) {
        setSuccess(true);
        console.log('order done', '👍');
        // } else {
        // setNotification({ type: 'error', text: 'Упс что-то пошло не так' });
        // }
    };
    const handleChangeAddress = address_id => {
        setValues(prevState => ({ ...prevState, address_id }));
    };

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
                                                                onChange={event => {
                                                                    callback({
                                                                        variables: {
                                                                            input: {
                                                                                item_id: id,
                                                                                qty: event.target.value,
                                                                            },
                                                                        },
                                                                    });
                                                                }}
                                                                defaultValue={qty}
                                                            >
                                                                {[...new Array(10).keys()].map(item => (
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
                                            {price ? (
                                                <Fragment>
                                                    <b>{`${price * qty} ${CURRENCY}`}</b>
                                                </Fragment>
                                            ) : (
                                                'Бесплатно'
                                            )}
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
                            <tr className="gift_row">
                                <td colSpan="2" className="basket__table-tdb">
                                    <Button kind="primary" onClick={() => setOpenModal(true)} bold>
                                        <span className="basket__gifts-add">Добавить подарок</span>
                                    </Button>
                                    {openModal && (
                                        <Dialog open={openModal} onClose={handleCloseModal}>
                                            <DialogTitle>Подарки к заказу</DialogTitle>
                                            <DialogContent>gifts</DialogContent>
                                        </Dialog>
                                    )}
                                </td>
                                <td colSpan="4" className="basket__table-tdb">
                                    <div hidden>
                                        Минимальная сумма заказа по Москве и Московской области 500 руб, по
                                        регионам РФ - 1000 руб.
                                    </div>
                                </td>
                            </tr>
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
                                    <RegisterForm />
                                </div>
                            </div>
                        </div>
                    </StepContainer>
                ) : (
                    <StepContainer title="Доставка" theme={theme} nav={{ footer: true }}>
                        <div className="basket__address-shipp">
                            <div className="basket__address-shippblock">
                                <AddressList value={values.address_id} onChange={handleChangeAddress} />
                            </div>
                            <div className="basket__address-shippblock">
                                <span className="basket__address-shippblock-label">Способ доставки</span>
                                <div className="basket__address-shippblock-list">
                                    <InputGroup>
                                        <RadioGroup
                                            name="direction"
                                            type="list"
                                            value={values.direction}
                                            onChange={handleChange}
                                        >
                                            {directions.map(({ id, title }) => (
                                                <RadioButton key={id} label={title} value={id.toString()} />
                                            ))}
                                        </RadioGroup>
                                    </InputGroup>
                                </div>
                            </div>
                            {paymentsMethods && (
                                <div className="basket__address-shippblock">
                                    <span className="basket__address-shippblock-label">Способ оплаты</span>
                                    <div className="basket__address-shippblock-list">
                                        <InputGroup>
                                            <RadioGroup
                                                name="payment"
                                                type="list"
                                                value={values.payment}
                                                onChange={handleChange}
                                            >
                                                {paymentsMethods.map(({ id, name }) => (
                                                    <RadioButton
                                                        key={id}
                                                        label={name}
                                                        value={id.toString()}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </InputGroup>
                                    </div>
                                </div>
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
                            <div className="basket__confirm-info">
                                <div className="basket__confirm-info-title basket__bold">Адрес доставки</div>
                                <div data-render="confirmAddress" className="basket__confirm-info-list" />
                            </div>
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
                                                        <Fragment>
                                                            <b>{`${price * qty} ${CURRENCY}`}</b>
                                                        </Fragment>
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
                                                <tr data-render="promocodeRow">
                                                    {promocode && (
                                                        <Fragment>
                                                            <td>Скидка: {promocode} %</td>
                                                            <td className="align_right">
                                                                -
                                                                <span>
                                                                    {totalSum * (promocode.value / 100)}
                                                                </span>
                                                                руб.
                                                            </td>
                                                        </Fragment>
                                                    )}
                                                </tr>
                                                <tr className="basket__bold">
                                                    <td>Итого:</td>
                                                    <td className="align_right">
                                                        <span>{`${totalSumWithDirection} ${CURRENCY}`}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className="basket__title">
                                <div className="float_right">
                                    <Mutation mutation={ORDER_MUTATION} onCompleted={handleOrderCompleted}>
                                        {(createOrder, { error, data, loading }) => {
                                            console.log(error, data, loading);

                                            return (
                                                <Button
                                                    className="basket__button"
                                                    kind="primary"
                                                    bold
                                                    onClick={() => {
                                                        if (isValid()) {
                                                            createOrder({
                                                                variables: {
                                                                    input: { address_id: values.address_id },
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
