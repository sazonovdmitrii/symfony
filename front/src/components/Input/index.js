import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IMaskMixin } from 'react-imask';
import classnames from 'classnames/bind';
import nanoid from 'nanoid';

import styles from './styles.css';

const cx = classnames.bind(styles);

const MaskedInput = IMaskMixin(({ inputRef, ...props }) => <input ref={inputRef} {...props} />);

const Input = ({
    disabled,
    error: errorProp,
    label,
    mask,
    max,
    min,
    name,
    placeholder,
    required,
    text,
    theme,
    type,
    value,
    multiline,
    rows,
    rowsMax,
    onChange,
    onBlur,
}) => {
    const [id] = useState(`input${nanoid()}`);
    const [{ focused, filled, error }, setState] = useState({
        filled: false,
        focused: false,
        error: errorProp,
    });
    const [height, setHeight] = useState(null);
    const textAreaNode = useRef(null);

    const labelClassName = cx(styles.label, theme.label, {
        focused,
        error,
        filled: filled || !!value,
    });
    const inputClassName = cx(styles.input, theme.input, {
        multiline,
        error,
    });
    const textClassName = cx(styles.text, theme.text, {
        error,
    });
    const $Input = mask ? MaskedInput : 'input';

    // TODO autoheight
    // useEffect(() => {
    //     if (textAreaNode.current) {
    //         const { scrollHeight } = textAreaNode.current;
    //         const currentHeight = textAreaNode.current.clientHeight;

    //         if (scrollHeight > currentHeight) {
    //             console.log('resize', currentHeight + meh, scrollHeight);
    //             setHeight(currentHeight + meh);
    //         }
    //     }
    // }, [textAreaNode, value]);

    const handleFocus = () => {
        setState(prevState => ({
            ...prevState,
            filled: true,
            focused: true,
        }));
    };

    const handleBlur = event => {
        setState(prevState => ({
            ...prevState,
            focused: false,
        }));

        const elem = event.target;
        let newError = false;

        if (onBlur) {
            newError = onBlur(elem);
        }

        setState(prevState => ({
            ...prevState,
            error: newError,
            focused: false,
            filled: !!elem.value,
        }));
    };

    if (multiline)
        return (
            <div className={styles.wrapper}>
                {label && (
                    <label className={labelClassName} htmlFor={id}>
                        {required ? `${label}*` : label}
                    </label>
                )}
                <textarea
                    ref={textAreaNode}
                    id={id}
                    className={inputClassName}
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    aria-required={required}
                    required={required}
                    disabled={disabled}
                    rows={rows}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{ height }}
                />
                {text && <div className={textClassName}>{text}</div>}
            </div>
        );

    return (
        <div className={styles.wrapper}>
            {label && (
                <label className={labelClassName} htmlFor={id}>
                    {required ? `${label}*` : label}
                </label>
            )}
            <$Input
                id={id}
                className={inputClassName}
                type={type}
                name={name}
                value={value}
                mask={mask}
                max={max}
                min={min}
                placeholder={placeholder}
                aria-required={required}
                required={required}
                disabled={disabled}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {text && <div className={textClassName}>{text}</div>}
        </div>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    mask: PropTypes.string,
    max: PropTypes.string,
    min: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    text: PropTypes.string,
    rows: PropTypes.string,
    rowsMax: PropTypes.string,
    theme: PropTypes.objectOf(PropTypes.string),
    type: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
};

Input.defaultProps = {
    label: null,
    mask: null,
    max: null,
    min: null,
    placeholder: null,
    required: null,
    value: '',
    text: null,
    theme: {},
    rows: null,
    rowsMax: null,
    type: 'text',
    disabled: false,
    onChange: () => {},
    onBlur: () => {},
};

export default Input;
