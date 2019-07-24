import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames/bind';

import { useOnClickOutside } from 'hooks';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Select = ({ items, label, value, onChange }) => {
    const ref = useRef();
    const [openList, setList] = useState(false);
    const [selectedValue, setValue] = useState(items.find(({ id }) => id === value) || {});
    const listClassName = cx(styles.list, {
        openList,
    });
    const labelClassName = cx(styles.label, {
        activeLabel: openList || selectedValue.id,
    });
    const handleSelect = item => {
        setValue(item);
        setList(false);
    };
    if (onChange) {
        useEffect(() => {
            onChange(selectedValue);
        }, [selectedValue, selectedValue.id]);
    }
    useOnClickOutside(ref, () => setList(false));

    return (
        <div className={styles.wrapper} ref={ref}>
            {label && <div className={labelClassName}>{label}</div>}
            <div className={styles.inner} onClick={() => setList(!openList)}>
                <div className={styles.value}>{selectedValue.value}</div>
            </div>
            <div className={listClassName}>
                {items.map(item => {
                    const itemClassName = cx(styles.item, {
                        activeItem: item.id === selectedValue.id,
                    });

                    return (
                        <div key={item.id} className={itemClassName} onClick={() => handleSelect(item)}>
                            {item.value}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

Select.defaultProps = {
    active: {},
    items: [],
    label: null,
    onChange: null,
};

Select.propTypes = {
    active: PropTypes.object,
    items: PropTypes.arrayOf(PropTypes.object),
    label: PropTypes.string,
    onChange: PropTypes.func,
};

export default Select;
