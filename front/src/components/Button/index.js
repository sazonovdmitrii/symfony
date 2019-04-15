import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Button = ({ kind, scales, fullWidth, className, type: typeProps, href, to, ...props }) => {
    const buttonClassName = cx(styles.button, className, {
        fullWidth,
        [kind]: kind,
        [scales]: scales,
    });
    const Button = href ? 'a' : to ? Link : 'button';
    const role = href || to ? null : 'button';
    const type = href || to ? null : typeProps || 'button';

    return <Button role={role} className={buttonClassName} type={type} href={href} to={to} {...props} />;
};

Button.defaultProps = {
    href: null,
    to: null,
    kind: null,
    scales: null,
    fullWidth: false,
    className: '',
};

export default Button;
