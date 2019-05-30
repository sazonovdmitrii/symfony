import React from 'react';
import { Query } from 'react-apollo';

import { IS_LOGGED_IN } from 'query';

import UserMenu from './UserMenu';

export default () => {
    return (
        <Query query={IS_LOGGED_IN}>
            {({ client, data }) => {
                return <UserMenu {...data} client={client} />;
            }}
        </Query>
    );
};
