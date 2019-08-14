import React from 'react';
import { withRouter, Switch, Route } from 'react-router';
import Helmet from 'react-helmet';

import NotifyDevGraphql from 'utils/NotifyDevGraphql';

import routes from 'routes';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Container from 'components/Container';
import Breadcrumbs from 'components/Breadcrumbs';
import ScrollToTop from 'components/ScrollToTop';

const FAVS = [
    {
        sizes: '16x16',
        path: '/favicons/favicon-16x16.png',
    },
    {
        sizes: '32x32',
        path: '/favicons/favicon-32x32.png',
    },
    {
        sizes: '96x96',
        path: '/favicons/favicon-96x96.png',
    },
];

const APPLE_TOUCH_ICON = [
    {
        path: '/favicons/apple-icon.png',
    },
    {
        sizes: '57x57',
        path: '/favicons/apple-icon-57x57.png',
    },
    {
        sizes: '60x60',
        path: '/favicons/apple-icon-60x60.png',
    },
    {
        sizes: '72x72',
        path: '/favicons/apple-icon-72x72.png',
    },
    {
        sizes: '76x76',
        path: '/favicons/apple-icon-76x76.png',
    },
    {
        sizes: '114x114',
        path: '/favicons/apple-icon-114x114.png',
    },
    {
        sizes: '120x120',
        path: '/favicons/apple-icon-120x120.png',
    },
    {
        sizes: '144x144',
        path: '/favicons/apple-icon-144x144.png',
    },
    {
        sizes: '152x152',
        path: '/favicons/apple-icon-152x152.png',
    },
    {
        sizes: '180x180',
        path: '/favicons/apple-icon-180x180.png',
    },
];

const App = props => {
    const isHomePage = props.location.pathname === '/';

    return (
        <>
            <ScrollToTop />
            <Helmet
                defaultTitle="Интернет магазин парфюмерии и косметики - низкие цены, большой каталог, фото и отзывы. Купить духи с доставкой по Москве и России - Laparfumerie.ru"
                titleTemplate="%s | Интернет магазин парфюмерии и косметики – Laparfumerie.ru"
            >
                <link rel="shortcut icon" href="/favicon.ico" />
                {FAVS.map(({ sizes, path }, index) => (
                    <link key={index} rel="icon" type="image/png" sizes={sizes} href={path} />
                ))}
                {APPLE_TOUCH_ICON.map(({ sizes, path }, index) => (
                    <link key={index} rel="apple-touch-icon" sizes={sizes} href={path} />
                ))}
                <link rel="manifest" href="/manifest.json" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png" />
                <meta name="msapplication-config" content="/browserconfig.xml" />
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
            <NotifyDevGraphql />
        </>
    );
};

export default withRouter(App);
