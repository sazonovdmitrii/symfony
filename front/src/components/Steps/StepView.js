import React from 'react';
import PropTypes from 'prop-types';

const StepView = ({ children: childrenProp, active, onChange }) => {
    let childIndex = 0;
    const { length: childLength } = childrenProp.filter(Boolean);
    const children = React.Children.map(childrenProp, child => {
        if (!React.isValidElement(child)) {
            return null;
        }

        const childProps = child.props;
        const childValue = childProps.value || childIndex;
        const childStepTitle = childProps.stepTitle;
        const selected = childValue === active;

        childIndex += 1;

        if (!selected) return null;

        return React.cloneElement(child, {
            onChange,
            active,
            selected,
            stepTitle: childStepTitle ? `Шаг ${childIndex}` : null,
            value: childValue,
            maxSteps: childLength - 1,
        });
    });

    return children;
};

StepView.propTypes = {
    children: PropTypes.node.isRequired,
    active: PropTypes.number.isRequired,
};

export default StepView;
