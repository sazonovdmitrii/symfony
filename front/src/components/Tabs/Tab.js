import React, { Component } from 'react';

import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

export default class Tab extends Component {
    handleClick = () => {
        const { onClick, value, visited } = this.props;

        onClick({ step: value, visited });
    };

    render() {
        const { selected, visited, children } = this.props;
        const buttonClassName = cx(styles.button, {
            visited,
            active: selected,
        });

        return (
            <button className={buttonClassName} type="button" onClick={this.handleClick}>
                {children}
            </button>
        );
    }
}
