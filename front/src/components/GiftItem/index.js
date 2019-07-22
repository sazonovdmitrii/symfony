import React from 'react';

import Button from 'components/Button';

import styles from './styles.css';

export default ({ name, img, id }) => {
    const handleAddToCart = () => {};

    return (
        <div className={styles.root}>
            <div className={styles.image}>
                <img src={img} alt="" />
            </div>
            <div className={styles.body}>
                <div className={styles.name}>{name}</div>
                <div className={styles.actions}>
                    <Button kind="secondary" onClick={handleAddToCart}>
                        Для получения подарка не&nbsp;хватает <strong>-330&nbsp;руб.</strong>
                    </Button>
                </div>
            </div>
        </div>
    );
};
