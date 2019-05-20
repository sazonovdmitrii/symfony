import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Button = ({
    kind,
    size,
    fullWidth,
    className,
    type: typeProps,
    href,
    to,
    bold,
    disabled,
    uppercase,
    rounded,
    ...props
}) => {
    const buttonClassName = cx(styles.button, className, {
        fullWidth,
        bold,
        disabled,
        uppercase,
        rounded,
        [kind]: kind,
        [size]: size,
    });
    const Button = href ? 'a' : to ? Link : 'button';
    const role = href || to ? null : 'button';
    const type = href || to ? null : typeProps || 'button';

    return (
        <Button
            role={role}
            className={buttonClassName}
            type={type}
            href={href}
            to={to}
            disabled={disabled}
            {...props}
        />
    );
};

Button.defaultProps = {
    href: null,
    to: null,
    kind: null,
    size: null,
    fullWidth: false,
    className: '',
};

Button.propTypes = {
    href: PropTypes.string,
    to: PropTypes.string,
    kind: PropTypes.string,
    size: PropTypes.string,
    fullWidth: PropTypes.bool,
    className: PropTypes.string,
};

export default Button;
