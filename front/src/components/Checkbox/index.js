import React, { Component } from 'react';
import nanoid from 'nanoid';

export default class Checkbox extends Component {
    static defaultProps = {
        checked: false,
    };

    id = `checkbox${nanoid()}`;

    handleChange = event => {
        const { checked } = event.target;
        const { onChange } = this.props;

        if (onChange) {
            onChange(event, checked);
        }
    };

    render() {
        const { name, className, value, checked } = this.props;

        return (
            <label className={className} htmlFor={this.id}>
                <input
                    id={this.id}
                    type="checkbox"
                    name={name}
                    value={value}
                    onChange={this.handleChange}
                    checked={checked}
                />
                Получать уведомления о новых распродажах
            </label>
        );
    }
}
