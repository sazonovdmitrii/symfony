import React, { useState, useDebugValue } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Checkbox = ({
    type,
    className,
    disabled,
    isError,
    label,
    name,
    onChange,
    required,
    checked: propChecked,
}) => {
    const [state, setState] = useState({
        id: `checkbox${nanoid()}`,
        checked: propChecked || false,
    });
    const { checked, id } = state;
    const rootClassName = cx(styles.root, className, { disabled });
    const checkboxClassName = cx(styles.checkbox, {
        checked,
    });
    const handleChange = event => {
        if (disabled) return;

        setState({ ...state, checked: !checked });
        onChange(event, !checked);
    };
    useDebugValue(checked ? 'checked' : 'unchecked');

    return (
        <label className={rootClassName} htmlFor={id}>
            <input
                id={id}
                type={type}
                name={name}
                className={styles.input}
                checked={checked}
                disabled={disabled}
                required={required}
                aria-invalid={isError || null}
                aria-required={required || null}
                onChange={handleChange}
            />
            <span className={checkboxClassName} />
            {label && <div className={styles.label}>{label}</div>}
        </label>
    );
};

Checkbox.defaultProps = {
    type: 'checkbox',
    checked: false,
    disabled: false,
    isError: false,
    label: null,
    className: null,
    onChange: () => {},
};

Checkbox.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
};

export default Checkbox;
