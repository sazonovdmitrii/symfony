import React from 'react';
import PropTypes from 'prop-types';

import AddressList from 'components/AddressList';

const AddressBook = props => (
    <div>
        <AddressList />
    </div>
);

AddressBook.defaultProps = {};

AddressBook.propTypes = {};

export default AddressBook;
