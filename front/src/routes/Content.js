import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import NotFound from 'routes/NotFound';

import Loader from 'components/Loader';

const GET_CONTENT = gql`
    query Content($slug: String!) {
        content(slug: $slug) {
            id
            name
        }
    }
`;

const Content = ({ match: { params: slug } }) => (
    <Query query={GET_CONTENT} variables={{ slug }}>
        {({ loading, error, data }) => {
            if (loading) return <Loader />;
            if (error || !data) return <NotFound />;

            const { content } = data;

            return <div className="rte">{content}</div>;
        }}
    </Query>
);

Content.propTypes = {
    match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Content;
