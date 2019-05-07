import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Select = ({ items, label, active, onChange }) => {
    const [openList, setList] = useState(false);
    const [selectedValue, setValue] = useState(active);
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
        }, [onChange, selectedValue, selectedValue.id]);
    }

    return (
        <div className={styles.wrapper}>
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
