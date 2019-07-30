import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from 'components/Button';

const Order = ({ id, orderItems, show: showProp }) => {
    const [show, setShow] = useState(showProp);
    const totalSum = orderItems.reduce((acc, { item: { price }, qty }) => acc + price * qty, 0);

    return (
        <table className="cabinet__order">
            <thead className="cabinet__order-data">
                <tr>
                    <td className="cart-tbl__th" colSpan="3">
                        <h2 className="typography__subheader">Заказ №{id}</h2>
                        <p>Состояние: New</p>
                        <p>
                            <strong className="basket__bold">Сумма: {totalSum} руб.</strong>
                        </p>
                    </td>
                    <td className="cart-tbl__th for_profile cart-tbl__th_align_center" width="165px">
                        2019-02-18 17:27:17
                        <br />
                        <br />
                        <Button onClick={() => setShow(!show)} kind="secondary">
                            Подробнее
                        </Button>
                    </td>
                </tr>
            </thead>
            {show && (
                <tbody>
                    <tr>
                        <td className="cart-tbl__td basket__bold">Наименование товара</td>
                        <td className="cart-tbl__td basket__bold">Цена</td>
                        <td className="cart-tbl__td align_right basket__bold">Количество</td>
                        <td className="cart-tbl__td align_right basket__bold">Сумма</td>
                    </tr>
                    {orderItems.map(({ id, qty, item: { name, price } }) => (
                        <tr key={id}>
                            <td className="cart-tbl__td">
                                <Link
                                    to="/cosmetics/uhod-za-kozhej/dlya-lica/antivozrastnye-sredstva/-novosvit-gialur-kislotakollagen-koncentrat-aqua-gel-24-chasa--4578.htm"
                                    className="cart-tbl__link"
                                >
                                    {name}
                                </Link>
                            </td>
                            <td className="cart-tbl__td" />
                            <td className="cart-tbl__td align_right">{qty} шт.</td>
                            <td className="cart-tbl__td align_right">{price} руб.</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="cart-tbl__td">Ожидаемое время отгрузки: до 14 дней</td>
                        <td className="cart-tbl__td align_center" />
                        <td className="cart-tbl__td align_right basket__bold">Доставка:</td>
                        <td className="cart-tbl__td align_right">бесплатно</td>
                    </tr>
                    <tr>
                        <td className="cart-tbl__td" />
                        <td className="cart-tbl__td" />
                        <td className="cart-tbl__td align_right basket__bold">Итого:</td>
                        <td className="cart-tbl__td align_right">{totalSum} руб.</td>
                    </tr>
                </tbody>
            )}
        </table>
    );
};

Order.defaultProps = {
    show: false,
};

Order.propTypes = {
    show: PropTypes.bool,
};

export default Order;
