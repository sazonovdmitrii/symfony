import React from 'react';

export default ({ children: childrenProp, index }) => {
    let childIndex = 0;
    const children = React.Children.map(childrenProp, child => {
        if (!React.isValidElement(child)) {
            return null;
        }

        const childProps = child.props;
        const childValue = childProps.value || childIndex;
        const active = childValue === index;

        childIndex += 1;

        if (!active) return null;

        return React.cloneElement(child, {
            active,
            value: childValue,
        });
    });

    return children;
};
