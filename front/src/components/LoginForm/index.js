import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

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
    const [error, setError] = useState(null);

    return (
        <Mutation
            mutation={LOGIN_MUTATION}
            onCompleted={onCompleted}
            onError={error => setError(error.message)}
        >
            {(auth, { data }) => <LoginForm onSubmit={auth} {...data} error={error} />}
        </Mutation>
    );
};
