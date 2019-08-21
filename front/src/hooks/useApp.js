import { useState, useContext } from 'react';
import hardtack from 'hardtack';
import nanoid from 'nanoid';

import { createClient } from 'lib/apollo';
import { AppContext } from 'AppContext';

const useApp = () => {
    const [state, setState] = useContext(AppContext);

    const createSession = () => {
        const sessionKey = hardtack.get('session_key');

        if (!sessionKey) {
            const date = new Date();
            const currentYear = date.getFullYear();

            date.setFullYear(currentYear + 1);
            hardtack.set('session_key', nanoid(), {
                path: '/',
                expires: date.toUTCString(),
            });
        }
    };

    const init = token => {
        const client = createClient({ token });

        setState(prevState => ({
            ...prevState,
            client,
        }));

        return client;
    };

    const login = token => {
        if (!token) return;

        const date = new Date();
        const currentYear = date.getFullYear();

        date.setFullYear(currentYear + 1);
        hardtack.set('token', token, {
            path: '/',
            expires: date.toUTCString(),
        });

        const client = init(token);
        client.writeData({ data: { isLoggedIn: true } });
    };

    const logout = () => {
        hardtack.remove('token', { path: '/' });

        const client = init();
        client.writeData({ data: { isLoggedIn: false } });
    };

    return {
        init,
        logout,
        login,
        createSession,
        client: state.client,
    };
};

export default useApp;

