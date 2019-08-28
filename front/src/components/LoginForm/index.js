import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { useApp } from 'hooks';

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
    const { createNotification } = useApp();

    return (
        <Mutation
            mutation={LOGIN_MUTATION}
            onCompleted={onCompleted}
            onError={error => createNotification({ type: 'error', message: error.message })}
        >
            {(auth, { data }) => <LoginForm onSubmit={auth} {...data} />}
        </Mutation>
    );
};
