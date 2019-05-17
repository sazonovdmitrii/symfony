import React from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';

const NorifyGraphql = props => (
    <ApolloConsumer>
        {client => {
            console.log(client);
            return (
                <div>
                    <h1>The current cache is:</h1>
                    <pre>{/*client.extract()*/}</pre>
                </div>
            );
        }}
    </ApolloConsumer>
);

NorifyGraphql.propTypes = {};

export default NorifyGraphql;
