import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router';

import AddressList from 'components/AddressList';
import EditAddress from 'routes/EditAddress';
import Button from 'components/Button';

const AddressBook = props => (
    <div>
        <AddressList />
    </div>
);

AddressBook.defaultProps = {};

AddressBook.propTypes = {};

export default AddressBook;
