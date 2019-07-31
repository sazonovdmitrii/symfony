import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const AddressItem = ({ active, actions, text, onClick, pointer }) => {
    const rootClassName = cx(styles.root, {
        active,
        pointer,
    });

    return (
        <div className={rootClassName} onClick={onClick}>
            <div className={styles.text}>{text}</div>
            {actions && <div className={styles.actions}>{actions}</div>}
        </div>
    );
};

AddressItem.defaultProps = {
    active: false,
    actions: null,
    onClick: () => {},
};

AddressItem.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
    active: PropTypes.bool,
    actions: PropTypes.node,
};

export default AddressItem;
