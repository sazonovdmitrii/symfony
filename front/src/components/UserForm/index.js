import React from 'react';

import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import UserForm from './UserForm';

const GET_USER = gql`
    {
        user {
            email
        }
    }
`;

const CREATE_USER_MUTATION = gql`
    mutation register($input: RegisterInput!) {
        register(input: $input) {
            hash
        }
    }
`;

export default ({ type, onSubmit, onCompleted }) => {
    switch (type) {
        case 'personal':
            // return (
            //     <Mutation onCompleted={onCompleted}>
            //         {save => {
            //             return (
            //                 <Query query={GET_USER} ssr={false}>
            //                     {({ loading, error, data }) => {
            //                         console.log(data);

            return (
                <UserForm
                    type={type}
                    // data={data}
                    // onSubmit={() =>
                    //     save({
                    //         variables: {
                    //             input: {
                    //                 // todo
                    //             },
                    //         },
                    //     })
                    // }
                />
            );
        //                 }}
        //             </Query>
        //         );
        //     }}
        // </Mutation>
        // );
        case 'registration':
            return (
                <Mutation mutation={CREATE_USER_MUTATION} onCompleted={onCompleted}>
                    {createUser => (
                        <UserForm
                            type={type}
                            onSubmit={({ firstname, lastname, phone, email, password, gender }) => {
                                createUser({
                                    variables: {
                                        input: {
                                            firstname,
                                            lastname,
                                            phone,
                                            email,
                                            password,
                                            gender,
                                            confirm_password: password,
                                        },
                                    },
                                });
                            }}
                        />
                    )}
                </Mutation>
            );
        default:
            return <UserForm type={type} onSubmit={onSubmit} />;
    }
};
