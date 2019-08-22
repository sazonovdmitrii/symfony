import React, { useState } from 'react';
import PropTypes from 'prop-types';
import hardtack from 'hardtack';
import { createClient } from 'lib/apollo';

const initialState = {
    currency: 'Руб.',
    notifications: [],
    maxNotifications: 3,
};

const AppContext = React.createContext([initialState, () => {}]);

const AppProvider = ({ children }) => {
    const token = hardtack.get('token');
    const client = createClient({ token });

    const [state, setState] = useState({
        ...initialState,
        client,
    });

    return <AppContext.Provider value={[state, setState]}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
