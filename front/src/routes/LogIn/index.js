import React from 'react';
import { Mutation, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import hardtack from 'hardtack';

import { IS_LOGGED_IN } from 'query';

import Snackbar from 'components/Snackbar';

import LogIn from './LogIn';

const LOGIN_MUTATION = gql`
    mutation($input: UserInput!) {
        auth(input: $input) {
            email
            hash
        }
    }
`;

export default withApollo(props => {
    const _confirm = ({ auth }) => {
        if (auth && auth.hash) {
            const date = new Date();
            const currentYear = date.getFullYear();

            date.setFullYear(currentYear + 1);
            hardtack.set('token', auth.hash, {
                path: '/',
                expires: date.toUTCString(),
            });
            props.client.writeData({ data: { isLoggedIn: true } });
            props.history.push('/');
        }
    };

    return (
        <Mutation mutation={LOGIN_MUTATION} onCompleted={_confirm} onError={error => console.warn(error)}>
            {(auth, { data, error }) => (
                <div className="cabinet">
                    {error && <Snackbar text={error.message} active={!!error} theme="error" />}
                    <div className="page-header">
                        <h1 className="page-header__title">Авторизация</h1>
                    </div>
                    <div className="cabinet-content">
                        <LogIn onSubmit={auth} {...data} />
                    </div>
                </div>
            )}
        </Mutation>
    );
});
