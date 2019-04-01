import React, { Component } from 'react';
import { IMaskMixin } from 'react-imask';
import classnames from 'classnames/bind';
import nanoid from 'nanoid';

import styles from './styles.css';

const cx = classnames.bind(styles);

const MaskedInput = IMaskMixin(({ inputRef, ...props }) => <input ref={inputRef} {...props} />);

export default class $Input extends Component {
    static defaultProps = {
        type: 'text',
        theme: {},
    };

    id = `input${nanoid()}`;

    state = {
        filled: false,
        focused: false,
        error: false,
        text: null,
    };

    componentWillReceiveProps(nextProps) {
        const { name } = this.props;
        const { errorObj } = nextProps;
        if (!errorObj) return;

        const text = errorObj[name] ? errorObj[name] : null;

        if (text) {
            this.setState({
                error: !!text,
                text,
            });
        }
    }

    handleFocus = () => {
        this.setState({
            filled: true,
            focused: true,
        });
    };

    handleBlur = event => {
        this.setState({
            focused: false,
        });

        const { onBlur } = this.props;
        const elem = event.target;
        let error = false;

        if (onBlur) {
            error = onBlur(elem);
        }

        this.setState({ error, focused: false, filled: !!elem.value });
    };

    render() {
        const { type, label, required, mask, min, max, value, name, onChange, theme } = this.props;
        const { focused, filled, error, text } = this.state;
        const labelClassName = cx(styles.label, theme.label, {
            focused,
            filled: filled || !!value,
            error,
        });
        const inputClassName = cx(styles.input, theme.input, {
            error,
        });
        const textClassName = cx(styles.text, theme.text, {
            error,
        });

        const Input = mask ? MaskedInput : 'input';

        return (
            <div className={styles.wrapper}>
                {label && (
                    <label className={labelClassName} htmlFor={this.id}>
                        {required ? `${label}*` : label}
                    </label>
                )}
                <Input
                    id={this.id}
                    className={inputClassName}
                    type={type}
                    name={name}
                    value={value}
                    mask={mask}
                    max={max}
                    min={min}
                    aria-required={required}
                    required={required}
                    onChange={onChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />
                {text && <div className={textClassName}>{text}</div>}
            </div>
        );
    }
}
