import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';

const NorifyGraphql = ({ client }) => {
    if (typeof document !== 'undefined') {
        return (
            <pre
                style={{
                    background: '#ccc',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                    margin: '40px 25px',
                    padding: '12px 16px',
                    margin: '10px',
                }}
            >
                {JSON.stringify(client.extract())}
            </pre>
        );
    }

    return null;
};

NorifyGraphql.propTypes = {};

export default withApollo(NorifyGraphql);
