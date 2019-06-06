import React, { useState } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import hardtack from 'hardtack';

import LoginForm from './LoginForm';

const LOGIN_MUTATION = gql`
    mutation($input: UserInput!) {
        auth(input: $input) {
            email
            hash
        }
    }
`;

export default ({ onCompleted }) => {
    return (
        <Mutation mutation={LOGIN_MUTATION} onCompleted={onCompleted} onError={error => console.warn(error)}>
            {(auth, { data, error }) => <LoginForm onSubmit={auth} {...data} />}
        </Mutation>
    );
};
