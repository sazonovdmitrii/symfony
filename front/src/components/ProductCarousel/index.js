import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { useInterval } from 'hooks';

import Nav from './Nav';
import styles from './styles.css';

const cx = classnames.bind(styles);

const ProductCarousel = ({ items }) => {
    const [active, setActive] = useState(0);
    const getActive = index => {
        const lastIndex = items.length - 1;

        /* eslint-disable-next-line */
        return index > lastIndex ? 0 : index < 0 ? lastIndex : index;
    };

    const handleChange = index => {
        setActive(getActive(index));
    };

    const getChildrens = items.map((item, index) => {
        const activeBannerClassName = cx(styles.item, {
            active: active === index,
        });

        return (
            <div
                key={index} // eslint-disable-line
                className={activeBannerClassName}
            >
                <img className={styles.image} src={item} alt="" />
            </div>
        );
    });

    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.items}>{getChildrens}</div>
            </div>
            <Nav items={items} active={active} onChange={handleChange} />
        </div>
    );
};

ProductCarousel.defaultProps = {
    items: [],
};
ProductCarousel.propTypes = {
    items: PropTypes.node,
    interval: PropTypes.number,
};

export default ProductCarousel;
