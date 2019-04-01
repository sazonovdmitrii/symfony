import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames/bind';
import RightIcon from './icons/right.svg';
import LeftIcon from './icons/left.svg';

import styles from './styles.css';

const cx = classnames.bind(styles);

class Arrow extends Component {
    static defaultProps = {
        position: 'left',
        index: 0,
        onClick: () => {},
    };

    handleClick = () => {
        const { onClick, index } = this.props;
        const newIndex = this.position('left') ? index - 1 : index + 1;

        onClick(newIndex);
    };

    position(pos) {
        const { position } = this.props;

        return position === pos;
    }

    render() {
        const buttonClassName = cx(styles.arrow, {
            left: this.position('left'),
            right: this.position('right'),
        });
        const Icon = this.position('left') ? LeftIcon : RightIcon;

        return (
            <button type="button" className={buttonClassName} onClick={this.handleClick}>
                <Icon />
            </button>
        );
    }
}

export default Arrow;

Arrow.propTypes = {
    position: PropTypes.string,
    index: PropTypes.number,
    onClick: PropTypes.func,
};
