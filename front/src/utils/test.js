import React from 'react';
import { Route } from 'react-router-dom';

import NotFound from 'routes/NotFound';

export default ({ status = 404 }) => (
    <Route
        component={({ staticContext = {} }) => {
            staticContext.status = status;

            return <NotFound />;
        }}
    />
);
