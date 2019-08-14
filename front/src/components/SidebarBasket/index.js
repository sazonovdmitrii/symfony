import React from 'react';

import styles from './styles.css';

export default ({ className, step, total, deliveryPrice = '0', count, actions }) => {
    const totalWithDelivery = parseInt(deliveryPrice, 10) + parseInt(total, 10);

    return (
        <div className={className}>
            <div className={styles.container}>
                <div className={styles.inner}>
                    <div className={styles.left}>
                        {deliveryPrice ? (
                            <div className={styles.leftItem}>
                                <div className={styles.leftItemLabel}>Стоимость доставки:</div>
                                <div className={styles.price}>
                                    {deliveryPrice === '0' ? 'Бесплатно' : `${deliveryPrice} руб.`}
                                </div>
                            </div>
                        ) : null}
                        <div className={styles.leftItem}>
                            <div className={styles.leftItemLabel}>Итого:</div>
                            <div className={styles.price}>{totalWithDelivery}&nbsp;руб.</div>
                        </div>
                        {count && (
                            <div className={styles.leftItem}>
                                <div className={styles.leftItemLabel}>Количество:</div>
                                <div className={styles.amount}>{count}&nbsp;шт</div>
                            </div>
                        )}
                    </div>
                    {actions}
                </div>
            </div>
        </div>
    );
};
