import React from 'react';
import { Query } from 'react-apollo';

import { IS_LOGGED_IN } from 'query';

import User from './User';

export default () => {
    return (
        <Query query={IS_LOGGED_IN}>
            {({ data }) => {
                return <User {...data} />;
            }}
        </Query>
    );
};
