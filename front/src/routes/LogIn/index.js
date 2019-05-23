import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

// import Snackbar from 'components/Snackbar';

import LogIn from './LogIn';

const LOGIN_MUTATION = gql`
    mutation($input: UserInput!) {
        auth(input: $input) {
            hash
        }
    }
`;

export default props => {
    const _confirm = data => {
        console.log(data);
        if (data.hash) {
            props.history.push('/');
        }
    };

    return (
        <Mutation mutation={LOGIN_MUTATION} onCompleted={data => _confirm(data)}>
            {(auth, { data, error }) => (
                <div className="cabinet">
                    {error && error.message}
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
};
