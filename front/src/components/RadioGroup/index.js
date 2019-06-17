import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const RadioGroup = ({ className, name, value, children, onChange }) => {
    const childrens = React.Children.map(children, child => {
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

    return <div className={className}>{childrens}</div>;
};

RadioGroup.defaultProps = {
    value: '',
};

RadioGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default RadioGroup;
