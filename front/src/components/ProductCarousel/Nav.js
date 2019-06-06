import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Nav = ({ items, onChange, active }) => {
    if (!items.length) return;

    const handleClick = index => {
        onChange(index);
    };

    return (
        <div className={styles.nav}>
            {items.map((item, index) => {
                const imageClassName = cx(styles.navItem, {
                    active: active === index,
                });

                return (
                    <div key={item} className={imageClassName} onClick={() => handleClick(index)}>
                        <img className={styles.image} src={item} alt="" />
                    </div>
                );
            })}
        </div>
    );
};

Nav.defaultProps = {
    items: [],
};

Nav.propTypes = {
    items: PropTypes.node,
};

export default Nav;
