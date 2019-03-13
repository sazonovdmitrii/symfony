import React, { Component } from 'react';

import styles from './styles.css';

export default class RadioGroup extends Component {
    handleRadioChange = (event, checked) => {
        const { onChange } = this.props;

        if (checked && onChange) {
            onChange(event, event.target.value);
        }
    };

    render() {
        const { name, value, children, onChange } = this.props;

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
    }
}
