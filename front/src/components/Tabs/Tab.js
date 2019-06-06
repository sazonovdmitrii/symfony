import React, { Component } from 'react';

import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Tab = ({ onClick, value, selected, children, className }) => {
    const buttonClassName = cx(styles.tab, className, {
        active: selected,
    });

    return (
        <button className={buttonClassName} type="button" onClick={() => onClick({ value })}>
            {children}
        </button>
    );
};

export default Tab;
