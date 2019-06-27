import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { useOnClickOutside } from 'hooks';

import downIcon from './images/down.png';

const styles = {
    wrapper: 'filtertiles__item',
    list: 'filtertiles__dropmenu',
    open: 'openfilter',
    activeItem: 'active-1',
};
const cx = classnames.bind(styles);

const Select = ({ label, active, items: itemsProp }) => {
    const ref = useRef();
    const [items, setItems] = useState(itemsProp);
    const [openList, setList] = useState(false);
    const [selectedValue, setValue] = useState(active);
    const wrapperClassName = cx(styles.wrapper, {
        open: openList,
    });
    const labelClassName = cx(styles.label, {
        activeLabel: openList || selectedValue.id,
    });
    useOnClickOutside(ref, () => setList(false));
    const handleAutocomplite = event => {
        const { value } = event.target;
        if (!value) setItems(itemsProp);

        setItems(itemsProp.filter(item => item.name.indexOf(value) >= 0));
    };

    return (
        <div className={wrapperClassName} ref={ref}>
            <div className="filtertiles__item-name" onClick={() => setList(!openList)}>
                <span className="filtertiles__item-name-link">{label}</span>
                <i className="filtertiles__item-name-i" />
                <img src={downIcon} />
            </div>
            <div className="filtertiles__dropmenu">
                <input
                    type="text"
                    className="filtertiles__dropmenu-search"
                    placeholder="Найти"
                    onChange={handleAutocomplite}
                />
                <ul data-render="taglist" className="filtertiles__dropmenu_list list">
                    {items.map(item => {
                        const itemClassName = cx('filtertiles__dropmenu_item', {
                            activeItem: item.id === selectedValue.id,
                        });

                        return (
                            <li key={item.id} className="filtertiles__dropmenu_item active-0">
                                <Link to={item.url} className="js-filter">
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
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
