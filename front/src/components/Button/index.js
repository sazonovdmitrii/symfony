import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import Loader from 'components/Loader';

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
    outlined,
    loading,
    children,
    ...props
}) => {
    const newKind = `${outlined ? 'outlined-' : ''}${kind}`;
    const buttonClassName = cx(styles.button, className, {
        fullWidth,
        bold,
        disabled,
        uppercase,
        rounded,
        [newKind]: kind,
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
        >
            {loading ? <Loader /> : children}
        </Button>
    );
};

Button.defaultProps = {
    href: null,
    to: null,
    kind: null,
    size: null,
    fullWidth: false,
    className: '',
    outlined: false,
};

Button.propTypes = {
    href: PropTypes.string,
    to: PropTypes.string,
    kind: PropTypes.string,
    size: PropTypes.string,
    fullWidth: PropTypes.bool,
    className: PropTypes.string,
    outlined: PropTypes.bool,
};

export default Button;
