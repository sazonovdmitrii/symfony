import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from 'components/Button';

import styles from './styles.css';

const AddressItem = ({ id, street, house, postcode, city, phone, housing, apartment }) => {
    const handleDelete = () => {
        // TODO mutation for delete addres by id
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.text}>
                г. {city}, индекс: {postcode}, ул. {street}, д. {house}, корп. {housing}, кв. {apartment},
                тел. {phone}
            </div>
            <div className="pull-right">
                <Button
                    className={`${styles.button} flaticon-pencil41`}
                    to={`/user/addressbook/edit/${id}`}
                    kind="primary"
                    size="small"
                    outlined
                />
                <Button
                    className={`${styles.button} flaticon-delete96`}
                    onClick={handleDelete}
                    kind="primary"
                    size="small"
                    outlined
                />
            </div>
        </div>
    );
};

AddressItem.defaultProps = {
    street: null,
    house: null,
    postcode: null,
    city: null,
    phone: null,
    apartment: null,
    housing: null,
};

AddressItem.propTypes = {
    id: PropTypes.number.isRequired,
    street: PropTypes.string,
    house: PropTypes.string,
    postcode: PropTypes.string,
    city: PropTypes.string,
    phone: PropTypes.string,
    apartment: PropTypes.string,
    housing: PropTypes.string,
};

export default AddressItem;
