import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const RadioGroup = ({ name, value = null, children, onChange }) => {
    return React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
            return null;
        }

        const checked = value === child.props.value;

        return React.cloneElement(child, {
            name,
            checked,
            onChange,
            className: styles.item,
        });
    });
};

RadioGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default RadioGroup;
