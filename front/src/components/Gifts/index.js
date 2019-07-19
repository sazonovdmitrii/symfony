import React from 'react';
import { Query } from 'react-apollo';

import { GET_GIFTS } from 'query';
import Loader from 'components/Loader';

export default () => (
    <Query query={GET_GIFTS}>
        {({ loading, error, data }) => {
            if (loading || error) return <Loader />;

            return <Component {...data} />;
        }}
    </Query>
);
