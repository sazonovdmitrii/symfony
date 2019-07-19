import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import AddressForm from 'components/AddressForm';

const EditAddress = props => (
    <div>
        <AddressForm {...props} />
    </div>
);

EditAddress.defaultProps = {};

EditAddress.propTypes = {};

export default withRouter(EditAddress);
