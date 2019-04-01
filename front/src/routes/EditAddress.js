import React, { Component } from 'react';

export default class EditAddress extends Component {
    constructor(props) {
        super(props);

        console.log(this.props.match.params);
    }
    render() {
        return <div>EditAddress</div>;
    }
}
