import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { useApp } from 'hooks';

import RegisterForm from 'components/RegisterForm';

export default ({ history }) => {
    const { login } = useApp();
    const handleCompleted = async ({ register: { hash } }) => {
        await login(hash);
        history.push('/');
    };

    return (
        <div className="cabinet">
            <div className="page-header">
                <h1 className="page-header__title">Регистрация</h1>
            </div>
            <div className="cabinet-content">
                <RegisterForm onCompleted={handleCompleted} />
            </div>
        </div>
    );
};
