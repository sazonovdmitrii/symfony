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
            <Helmet
                defaultTitle="Интернет магазин парфюмерии и косметики - низкие цены, большой каталог, фото и отзывы. Купить духи с доставкой по Москве и России - Laparfumerie.ru"
                // titleTemplate="%s"
            >
                <link rel="apple-touch-icon" sizes="57x57" href="/fav/apple-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/fav/apple-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/fav/apple-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/fav/apple-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/fav/apple-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/fav/apple-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/fav/apple-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/fav/apple-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/fav/apple-icon-180x180.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/fav/android-icon-192x192.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/fav/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/fav/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/fav/favicon-16x16.png" />
                <link rel="manifest" href="/fav/manifest.json" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/fav/ms-icon-144x144.png" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="author" content="Laparfumerie.Ru" />
                <meta name="wmail-verification" content="9bfc3f8e92e7da82009fa3fd0e7ca511" />
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
