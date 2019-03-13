import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader/root';
import { Switch, Route, withRouter } from 'react-router';

import routes from './routes';

import Header from './components/Header';
import Footer from './components/Footer';
import Container from './components/Container';
import Breadcrumbs from './components/Breadcrumbs';
import ScrollToTop from './components/ScrollToTop';

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
