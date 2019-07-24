import React, { useState } from 'react';
import PropTypes from 'prop-types';
import hardtack from 'hardtack';
import { createClient } from 'lib/apollo';

const AppContext = React.createContext([{}, () => {}]);

const AppProvider = ({ children }) => {
    const token = hardtack.get('token');
    const client = createClient({ token });

    const [state, setState] = useState({
        client,
        currency: 'Руб.',
    });

    return <AppContext.Provider value={[state, setState]}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
