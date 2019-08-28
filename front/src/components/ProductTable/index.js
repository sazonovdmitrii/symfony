import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './styles.css';

const ProductTable = ({
    url,
    image,
    brand,
    title,
    price,
    amount,
    description,
    footerActions,
    rightActions,
}) => (
    <div className={styles.root}>
        <div className={styles.inner}>
            <div className={styles.imageWrapper}>
                <img src={image} alt="" />
            </div>
            <div className={styles.info}>
                {brand && <b>{brand}</b>}
                <Link className={styles.name} to={url}>
                    {title}
                </Link>
                {description && <div className={styles.description}>{description}</div>}
                <div className={styles.footer}>
                    {footerActions && <div className={styles.amount}>{footerActions}</div>}
                    <div className={styles.price}>{+price}&nbsp;руб.</div>
                </div>
                {rightActions}
            </div>
        </div>
    </div>
);

ProductTable.defaultProps = {};

ProductTable.propTypes = {};

export default ProductTable;
