import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withApollo, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import hardtack from 'hardtack';

import { Dialog, DialogTitle, DialogContent } from 'components/Dialog';
import Input from 'components/Input';
import Button from 'components/Button';
import LoginForm from 'components/LoginForm';
import RegisterForm from 'components/RegisterForm';
import AddressForm from 'components/AddressForm';
import InputGroup from 'components/InputGroup';
import RadioGroup from 'components/RadioGroup';
import RadioButton from 'components/RadioButton';
import { StepView, StepContainer } from 'components/Steps';
import AddressList from 'components/AddressList';

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
    mutation {
        order {
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
    client,
    basket: { products: productsProps, total, deliveryDays, delivery },
    directions: { data: directions },
    payments_methods: { data: paymentsMethods },
    isLoggedIn,
}) => {
    const [products, setProducts] = useState(productsProps);
    const [promocode, setPromocode] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [comment, setComment] = useState('');
    const [step, setStep] = useState(0);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [values, setValues] = useState({
        payment: paymentsMethods[0].id.toString(),
        direction: directions[0].id.toString(),
    });
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleChangeStep = index => {
        setStep(index);
    };
    const handleRemoveProduct = ({ removeBasket: { products: newProducts } }) => {
        console.log(newProducts);
        setProducts(newProducts);
    };
    const handleChangeAmount = () => {};
    const handleSubmitPromocode = () => {};
    const handleChange = ({ target: { value, name } }) => {
        console.log(name, value);
        setValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const isValid = () => {
        // TODO validation address, delivery, payment
    };
    const handleLogInCompleted = ({ auth }) => {
        if (auth && auth.hash) {
            const date = new Date();
            const currentYear = date.getFullYear();

            date.setFullYear(currentYear + 1);
            hardtack.set('token', auth.hash, {
                path: '/',
                expires: date.toUTCString(),
            });
            client.writeData({ data: { isLoggedIn: true } });
            // handleCloseModal();
        }
    };
    const handleOrderCompleted = () => {};

    const findPayment = () => paymentsMethods.find(({ id }) => id.toString() === values.payment);

    const [currentPayment, setCurrentPayment] = useState(findPayment());
    useEffect(() => {
        setCurrentPayment(findPayment());
    }, [values.payment]);

    console.log(currentPayment);

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
                                <td className="basket__table-tdh">Скидка</td>
                                <td className="basket__table-tdh">Цена</td>
                                <td className="basket__table-tdh">Сумма</td>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(({ product_name: productName, name, item_id: id, qty }) => (
                                <tr key={id} className="basket__table-tr">
                                    <td width="10%" align="center" className="basket__table-tdb">
                                        <Link to="/" className="cart-tbl__link hide-on-mobile">
                                            <img src="https://placehold.it/60x60/000" height="60" alt="" />
                                        </Link>
                                    </td>
                                    <td width="50%" className="basket__table-tdb">
                                        <strong className="basket__bold hide-on-mobile">Estee Lauder</strong>
                                        <Link className="basket__productname" to="/">
                                            {productName} {name}
                                        </Link>
                                        <div className="basket__table-navitem hide-on-mobile">
                                            <Mutation
                                                mutation={REMOVE_PRODUCT_MUTATION}
                                                onCompleted={handleRemoveProduct}
                                            >
                                                {(remove, { error, data, loading }) => {
                                                    console.log(error, data, loading);

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
                                                onCompleted={handleChangeAmount}
                                            >
                                                {(callback, { error, data, loading }) => {
                                                    console.log(error, data, loading);

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
                                            <span className="basket__count-label">{qty}</span>
                                        </div>
                                    </td>
                                    <td width="10%" className="basket__table-tdb">
                                        {/* {item.discount} */}66%
                                    </td>
                                    <td width="10%" className="basket__table-tdb">
                                        <span className="cart-price cart-price_role_original">
                                            {/* {item.old_price} */}666 {CURRENCY}
                                        </span>
                                        <span className="cart-price cart-price_role_final">
                                            {/* {item.price} */}666 {CURRENCY}
                                        </span>
                                    </td>
                                    <td width="10%" className="basket__table-tdb">
                                        <span className="cart-subtotal criteo-cart">
                                            {/* {item.final_price} */}666
                                        </span>
                                        {CURRENCY}
                                        <Mutation
                                            mutation={REMOVE_PRODUCT_MUTATION}
                                            onCompleted={handleRemoveProduct}
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
                            ))}
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
                                                <td>
                                                    <span className="show-on-mobile">Доставка: </span>
                                                    <span className="hide-on-mobile">
                                                        Стоимость доставки по Москве:
                                                    </span>
                                                </td>
                                                <td className="align_right">
                                                    <span>Бесплатно</span>
                                                </td>
                                            </tr>
                                            <tr data-render="promocodeRow" />
                                            <tr className="basket__bold">
                                                <td>Итого:</td>
                                                <td className="align_right">
                                                    <span>4111</span> <span>{CURRENCY}</span>
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
                {!isLoggedIn && (
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
                )}
                {isLoggedIn && (
                    <StepContainer title="Доставка" theme={theme} nav={{ footer: true }}>
                        <div className="basket__address-shipp">
                            <div className="basket__address-shippblock">
                                {showAddressForm ? (
                                    <AddressForm
                                        actions={
                                            <Button
                                                kind="secondary"
                                                bold
                                                onClick={() => setShowAddressForm(false)}
                                            >
                                                Назад
                                            </Button>
                                        }
                                    />
                                ) : (
                                    <Fragment>
                                        <div style={{ right: '15px', position: 'absolute' }}>
                                            <Button
                                                kind="primary"
                                                bold
                                                onClick={() => setShowAddressForm(true)}
                                            >
                                                Добавить адрес
                                            </Button>
                                        </div>
                                        <span className="basket__address-shippblock-label">
                                            Адреса доставки
                                        </span>
                                        <AddressList />
                                    </Fragment>
                                )}
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
                                        name="code"
                                        theme={{ input: styles.input, label: styles.inputLabel }}
                                        label="Промо-код"
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
                                        type="textarea"
                                        className="basket__textarea"
                                        name="comment"
                                        value={comment}
                                        onChange={handleChange}
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
                                    {products.map(({ product_name: productName, name, item_id: id, qty }) => (
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
                                                <strong className="basket__bold hide-on-mobile">
                                                    Estee Lauder
                                                </strong>
                                                <Link className="basket__productname" to="/">
                                                    {productName} {name}
                                                </Link>
                                            </td>
                                            <td width="10%" className="basket__table-tdb">
                                                <div className="basket__count">
                                                    <span className="basket__count-label">{qty}</span>
                                                </div>
                                            </td>
                                            <td width="10%" className="basket__table-tdb">
                                                {/* {item.discount} */}66%
                                            </td>
                                            <td width="10%" className="basket__table-tdb">
                                                <span className="cart-price cart-price_role_original">
                                                    {/* {item.old_price} */}666 {CURRENCY}
                                                </span>
                                                <span className="cart-price cart-price_role_final">
                                                    {/* {item.price} */}666 {CURRENCY}
                                                </span>
                                            </td>
                                            <td width="10%" className="basket__table-tdb">
                                                <span className="cart-subtotal criteo-cart">
                                                    {/* {item.final_price} */}666
                                                </span>
                                                {CURRENCY}
                                            </td>
                                        </tr>
                                    ))}
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
                                                <span data-render="deliveryDate">{deliveryDays}</span>
                                            </p>
                                        </td>
                                        <td colSpan="3" className="basket__table-tdf">
                                            <table width="100%">
                                                <tr>
                                                    <td>
                                                        <span className="show-on-mobile">Доставка: </span>
                                                        <span className="hide-on-mobile">
                                                            Стоимость доставки по Москве:
                                                        </span>
                                                    </td>
                                                    <td className="align_right">
                                                        <span>
                                                            {delivery
                                                                ? `${delivery} ${CURRENCY}`
                                                                : 'бесплатно'}
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr data-render="promocodeRow">
                                                    {promocode && (
                                                        <Fragment>
                                                            <td>Скидка: {promocode} %</td>
                                                            <td className="align_right">
                                                                -
                                                                <span>{total * (promocode.value / 100)}</span>
                                                                руб.
                                                            </td>
                                                        </Fragment>
                                                    )}
                                                </tr>
                                                <tr className="basket__bold">
                                                    <td>Итого:</td>
                                                    <td className="align_right">
                                                        <span>{total}666</span>
                                                        <span>{CURRENCY}</span>
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
                                                        if (isValid()) createOrder();
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
    client: PropTypes.objectOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
            PropTypes.array,
            PropTypes.func,
            PropTypes.bool,
        ])
    ).isRequired,
    directions: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.string])).isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    basket: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]))
        .isRequired,
    payments_methods: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

export default withApollo(Basket);
