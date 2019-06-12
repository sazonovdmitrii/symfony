import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Tab = ({ onClick, value, active, children, className }) => {
    if (!children.length) return null;

    const buttonClassName = cx(styles.tab, className, {
        active,
    });

    return (
        <button className={buttonClassName} type="button" onClick={() => onClick({ value })}>
            {children}
        </button>
    );
};

Tab.defaultProps = {
    onClick: () => {},
    children: [],
    className: null,
    active: false,
};

Tab.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    active: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default Tab;
