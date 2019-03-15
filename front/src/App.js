import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader/root';
import { Switch, Route, withRouter } from 'react-router';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import routes from './routes';

import Header from './components/Header';
import Footer from './components/Footer';
import Container from './components/Container';
import Breadcrumbs from './components/Breadcrumbs';
import ScrollToTop from './components/ScrollToTop';

const TEST = gql`
    {
        productitem(id: 1) {
            id
            name
        }
    }
`;

const App = props => (
    <div>
        <ScrollToTop />
        <Helmet>
            <title>
                Интернет магазин парфюмерии и косметики - низкие цены, большой каталог, фото и отзывы. Купить
                духи с доставкой по Москве и России - Laparfumerie.ru
            </title>
        </Helmet>
        <Container>
            <Query query={TEST}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div>
                            id: {data.id} name:{data.name}
                        </div>
                    );
                }}
            </Query>
            <Header />
            <Breadcrumbs items={[{ name: 'Главная', url: '/' }, { name: 'Парфюмерия' }]} />
            <Switch>
                {routes.map((route, index) => (
                    <Route key={index} {...route} />
                ))}
            </Switch>
            <Footer />
        </Container>
        <div className="scroll-to-top" data-behavior="scrollToTop" />
    </div>
);

export default hot(withRouter(App));
