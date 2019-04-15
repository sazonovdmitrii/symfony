import React from 'react';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Button = ({
    primary,
    secondary,
    large,
    small,
    fullWidth,
    className,
    type: typeProps,
    href,
    ...props
}) => {
    const buttonClassName = cx(styles.button, className, {
        primary,
        secondary,
        fullWidth,
        large,
        small,
    });
    const Button = href ? 'a' : 'button';
    const role = href ? null : 'button';
    const type = href ? null : typeProps || 'button';

    return <Button role={role} className={buttonClassName} type={type} href={href || null} {...props} />;
};

Button.defaultProps = {
    primary: false,
    secondary: false,
    large: false,
    small: false,
    fullWidth: false,
    className: '',
};

export default Button;
