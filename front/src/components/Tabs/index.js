import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const Tabs = ({ children: childrenProp, value, onChange }) => {
    let childIndex = 0;
    const children = React.Children.map(childrenProp, child => {
        if (!React.isValidElement(child)) {
            return null;
        }

        const childValue = child.props.value || childIndex;
        const active = childValue === value;

        childIndex += 1;

        return React.cloneElement(child, {
            active,
            onClick: onChange,
            value: childValue,
        });
    });

    return <div className={styles.row}>{children}</div>;
};

Tabs.defaultProps = {
    onChange: () => {},
    children: [],
};

Tabs.propTypes = {
    onChange: PropTypes.func,
    children: PropTypes.node,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default Tabs;
