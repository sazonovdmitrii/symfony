import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import RegisterForm from 'components/RegisterForm';

export default () => (
    <div className="cabinet">
        <div className="page-header">
            <h1 className="page-header__title">Регистрация</h1>
        </div>
        <div className="cabinet-content">
            <RegisterForm />
        </div>
    </div>
);
