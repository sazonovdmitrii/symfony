import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);
const text = {
    city: 'г.',
    corp: 'корп.',
    flat: 'кв.',
    house: 'д.',
    street: 'ул.',
    zip: 'индекс:',
};

const AddressItem = props => {
    const { id, street, house, zip, city, corp, flat, actions, active, onClick } = props;
    const rootClassName = cx(styles.root, {
        active,
    });

    return (
        <div className={rootClassName} onClick={() => onClick(props)}>
            <div className={styles.text}>
                {`${text.city} ${city}, ${text.zip} ${zip}, ${text.street} ${street}, ${
                    text.house
                } ${house}, ${text.corp} ${corp}, ${text.flat} ${flat}`}
            </div>
            {actions && <div className={styles.actions}>{actions}</div>}
        </div>
    );
};

AddressItem.defaultProps = {
    street: null,
    house: null,
    zip: null,
    city: null,
    flat: null,
    corp: null,
    actions: null,
    onClick: () => {},
};

AddressItem.propTypes = {
    id: PropTypes.number.isRequired,
    street: PropTypes.string,
    house: PropTypes.string,
    city: PropTypes.string,
    zip: PropTypes.string,
    flat: PropTypes.string,
    corp: PropTypes.string,
    actions: PropTypes.node,
};

export default AddressItem;
