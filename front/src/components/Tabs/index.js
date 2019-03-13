import React from 'react';
import styles from './styles.css';

export default ({ children: childrenProp, value, onChange }) => {
    let childIndex = 0;
    const children = React.Children.map(childrenProp, child => {
        if (!React.isValidElement(child)) {
            return null;
        }

        const childValue = child.props.value || childIndex;
        const selected = childValue === value;

        childIndex += 1;

        return React.cloneElement(child, {
            selected,
            onClick: onChange,
            visited: value > childValue,
            index: childIndex,
            value: childValue,
        });
    });

    return <div className={styles.row}>{children}</div>;
};
