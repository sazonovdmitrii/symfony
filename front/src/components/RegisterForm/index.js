import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Register from './Register';

const CREATE_USER_MUTATION = gql`
    mutation register($input: RegisterInput!) {
        register(input: $input) {
            hash
        }
    }
`;

export default ({ onCompleted }) => {
    return (
        <Mutation mutation={CREATE_USER_MUTATION} onCompleted={onCompleted}>
            {(createUser, { data }) => <Register onSubmit={createUser} {...data} />}
        </Mutation>
    );
};
