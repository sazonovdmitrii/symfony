import React from 'react';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

export default ({ primary, secondary, large, small, fullWidth, className, href, ...props }) => {
    const buttonClassName = cx(styles.button, className, {
        primary,
        secondary,
        fullWidth,
        large,
        small,
    });
    const Button = href ? 'a' : 'button';
    const role = href ? null : 'button';

    return <Button role={role} className={buttonClassName} href={href || null} {...props} />;
};
