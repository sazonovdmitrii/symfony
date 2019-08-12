import React from 'react';

import { useApp } from 'hooks';

import UserForm from 'components/UserForm';

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
                <UserForm type="registration" onCompleted={handleCompleted} />
            </div>
        </div>
    );
};
