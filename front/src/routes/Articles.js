import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import NotFound from 'routes/NotFound';

import ArticleCard from 'components/ArticleCard';
import Loader from 'components/Loader';

const GET_ARTICLES = gql`
    query Articles($offset: Int!, $limit: Int!) {
        articles(offset: $offset, limit: $limit) {
            id
            name
        }
    }
`;

const Articles = ({ limit, match }) => {
    const isPage = Object.values(match.params).indexOf(/page-\d{1,}/);
    let offset = 0;
    let currentPage = 1;

    if (isPage) {
        currentPage = +match.url.match(/\d+/);

        offset = (currentPage - 1) * limit;
    }

    return (
        <Query query={GET_ARTICLES} variables={{ offset, limit }}>
            {({ loading, error, data }) => {
                if (loading) return <Loader />;
                if (error || !data) return <NotFound />;

                const { articles } = data;

                return articles.map(item => (
                    <div className="article-item">
                        <ArticleCard key={item.id} {...item} />
                    </div>
                ));
            }}
        </Query>
    );
};

Articles.defaultProps = {
    limit: 20,
};

Articles.propTypes = {
    match: PropTypes.shape({ isExact: PropTypes.bool }).isRequired,
    limit: PropTypes.number,
};

export default Articles;
