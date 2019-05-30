import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames/bind';
import RightIcon from './icons/right.svg';
import LeftIcon from './icons/left.svg';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Arrow = ({ position, onClick, index }) => {
    const checkPosition = pos => position === pos;
    const handleClick = () => {
        const newIndex = checkPosition('left') ? index - 1 : index + 1;

        onClick(newIndex);
    };
    const buttonClassName = cx(styles.arrow, {
        left: checkPosition('left'),
        right: checkPosition('right'),
    });
    const Icon = checkPosition('left') ? LeftIcon : RightIcon;

    return (
        <button type="button" className={buttonClassName} onClick={handleClick}>
            <Icon />
        </button>
    );
};

Arrow.defaultProps = {
    position: 'left',
    index: 0,
    onClick: () => {},
};

Arrow.propTypes = {
    position: PropTypes.string,
    index: PropTypes.number,
    onClick: PropTypes.func,
};

export default Arrow;
