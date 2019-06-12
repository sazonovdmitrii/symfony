import React, { useState } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Star = ({ checked, label, name, value, onChange }) => {
    const [id] = useState(`radio${nanoid()}`);
    const labelClassName = cx(styles.label, {
        active: checked,
    });

    return (
        <label className={labelClassName} htmlFor={id}>
            <input
                className={styles.input}
                id={id}
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            {label}
        </label>
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
