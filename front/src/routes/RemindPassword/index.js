import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import RemindPassword from './RemindPassword';

const REMIND_PASSWORD_MUTATION = gql`
    mutation remindPassword($email: String!) {
        remindPassword(email: $email) {
            status
        }
    }
`;

export default () => {
    return (
        <Mutation mutation={REMIND_PASSWORD_MUTATION}>
            {(remindPassword, { data }) => (
                <div className="cabinet">
                    <div className="page-header">
                        <h1 className="page-header__title">Регистрация</h1>
                    </div>
                    <div className="cabinet-content">
                        <RemindPassword onSubmit={remindPassword} {...data} />
                    </div>
                </div>
            )}
        </Mutation>
    );
};
