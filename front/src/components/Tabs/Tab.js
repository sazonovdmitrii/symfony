import React, { Component } from 'react';

import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

export default class Tab extends Component {
    handleClick = () => {
        const { onClick, value } = this.props;

        onClick({ value });
    };

    render() {
        const { selected, children, className } = this.props;
        const buttonClassName = cx(styles.tab, className, {
            active: selected,
        });

        return (
            <button className={buttonClassName} type="button" onClick={this.handleClick}>
                {children}
            </button>
        );
    }
}
