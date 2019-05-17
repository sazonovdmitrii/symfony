import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import NotFound from 'routes/NotFound';

import Sidebar from 'components/Sidebar';
import Pagination from 'components/Pagination';

const GET_ARTICLE = gql`
    query Article($slug: String!) {
        article(slug: $slug) {
            id
            name
        }
    }
`;

const Article = ({ match: { params: slug } }) => {
    console.log(slug, '👻');

    return (
        <Query query={GET_ARTICLE} variables={{ slug }}>
            {({ loading, error, data }) => {
                if (loading) return null;
                if (error) return `Error: ${error}`;
                if (!data) return <NotFound />;

                const { name, author, date, text } = data.article;

                return (
                    <div style={{ display: 'flex' }}>
                        <div className="article-content">
                            <h1 className="article-content__title">{name}</h1>
                            <div className="article-content__meta">
                                <span className="article-content__author">от {author}</span>
                                <span className="article-content__date">Опубликовано {date}</span>
                            </div>
                            <div className="article-content__body rte">{text}</div>
                            <Pagination type="content" />
                        </div>
                        <Sidebar type="article" />
                    </div>
                );
            }}
        </Query>
    );
};
Article.propTypes = {
    match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Article;
