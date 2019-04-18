import React, { Fragment } from 'react';
import { withRouter, Switch, Route } from 'react-router';
import Helmet from 'react-helmet';

import routes from './routes';

import Header from './components/Header';
import Footer from './components/Footer';
import Container from './components/Container';
import Breadcrumbs from './components/Breadcrumbs';
import ScrollToTop from './components/ScrollToTop';

const App = props => {
    const isHomePage = props.location.pathname === '/';

    return (
        <Fragment>
            <ScrollToTop />
            <Helmet>
                <title>
                    Интернет магазин парфюмерии и косметики - низкие цены, большой каталог, фото и отзывы.
                    Купить духи с доставкой по Москве и России - Laparfumerie.ru
                </title>
            </Helmet>
            <Container>
                <Header />
                {!isHomePage && (
                    <Breadcrumbs items={[{ name: 'Главная', url: '/' }, { name: 'Парфюмерия' }]} />
                )}
                <Switch>
                    {routes.map((route, index) => (
                        <Route key={index} {...route} />
                    ))}
                </Switch>
                <Footer />
            </Container>
            <div className="scroll-to-top" data-behavior="scrollToTop" />
        </Fragment>
    );
};

export default withRouter(App);
