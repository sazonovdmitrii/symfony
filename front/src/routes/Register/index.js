import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Register from './Register';

const CREATE_USER_MUTATION = gql`
    mutation createUser(
        $firstname: String!
        $lastname: String!
        $email: String!
        $password: String!
        $gender: String!
    ) {
        createUser(
            firstname: $firstname
            lastname: $lastname
            email: $email
            password: $password
            gender: $gender
        ) {
            id
            token
        }
    }
`;

export default () => {
    return (
        <Mutation mutation={CREATE_USER_MUTATION}>
            {(createUser, { data }) => (
                <div className="cabinet">
                    <div className="page-header">
                        <h1 className="page-header__title">Регистрация</h1>
                    </div>
                    <div className="cabinet-content">
                        <Register onSubmit={createUser} {...data} />
                    </div>
                </div>
            )}
        </Mutation>
    );
};
