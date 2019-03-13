import React, { Component } from 'react';
import nanoid from 'nanoid';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

export default class RadioButton extends Component {
    id = `radio${nanoid()}`;

    constructor(props) {
        super(props);

        this.isControlled = props.defaultChecked !== null;

        this.state = {
            checked: false,
        };
    }

    handleChange = event => {
        const { checked } = event.target;
        const { onChange } = this.props;

        this.setState({
            checked,
        });

        if (onChange) {
            onChange(event, checked);
        }
    };

    render() {
        const { name, value, required, label, className, checked: checkedProp } = this.props;
        const { checked: $checked } = this.state;

        const checked = this.isControlled ? checkedProp : $checked;
        const labelClassName = cx(styles.label, className);
        const radioClassName = cx(styles.radio, {
            checked,
        });

        return (
            <label className={labelClassName} htmlFor={this.id}>
                <input
                    className={styles.input}
                    id={this.id}
                    type="radio"
                    name={name}
                    value={value}
                    required={required}
                    checked={checked}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                />
                <span className={styles.radioWrapper}>
                    <span className={radioClassName} />
                </span>
                {label}
            </label>
        );
    }
}
