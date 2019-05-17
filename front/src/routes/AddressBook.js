import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AddressItem from 'components/AddressItem';

export default class AddressBook extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <AddressItem />;
    }
}
