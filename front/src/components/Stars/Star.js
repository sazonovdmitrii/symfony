import React, { useState } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Star = ({ checked, label, name, value, hidden, disabled, onChange }) => {
    const [id] = useState(`radio${nanoid()}`);
    const labelClassName = cx(styles.label, {
        active: checked,
    });

    if (hidden) {
        return (
            <input
                id={id}
                type="radio"
                name={name}
                value={value}
                className={styles.input}
                hidden={hidden}
                disabled={disabled}
                checked={checked}
            />
        );
    }

    return (
        <>
            <input
                className={styles.input}
                id={id}
                type="radio"
                name={name}
                value={value}
                hidden={hidden}
                checked={checked}
                disabled={disabled}
                onChange={onChange}
            />
            <label className={labelClassName} htmlFor={id}>
                {label}
            </label>
        </>
    );
};

Star.defaultProps = {
    name: null,
    checked: false,
    value: null,
    onChange: () => {},
};

Star.propTypes = {
    checked: PropTypes.bool,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default Star;
