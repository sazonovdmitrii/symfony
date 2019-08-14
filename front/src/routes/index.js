import loadable from '@loadable/component';

import Loader from 'components/Loader';

import NotFound from './NotFound';

const getComponent = (component, opts) => {
    return loadable(() => import(`./${component}`), {
        fallback: Loader,
        ...opts,
    });
};

export default [
    {
        component: getComponent('Home'),
        exact: true,
        path: '/',
    },
    {
        path: '/(articles|news)/:slug.htm',
        exact: true,
        strict: true,
        component: getComponent('Article'),
    },
    {
        path: '/(articles|news)/:page?',
        exact: true,
        strict: true,
        component: getComponent('Articles'),
    },
    {
        path: '/info/:slug.htm',
        exact: true,
        strict: true,
        component: getComponent('Content'),
    },
    {
        path: '/basket',
        exact: true,
        component: getComponent('Basket'),
    },
    {
        path: '/order/success',
        exact: true,
        component: getComponent('Success'),
    },
    {
        path: '/user/:slug?',
        component: getComponent('User', { ssr: false }),
    },
    {
        path: '/brands',
        exact: true,
        component: getComponent('Brands'),
    },
    {
        path: '/sales/:slug',
        exact: true,
        component: getComponent('Sale'),
    },
    {
        path: '/sales',
        exact: true,
        component: getComponent('Sales'),
    },
    {
        path: '/search',
        exact: true,
        component: getComponent('Search'),
    },
    {
        path: '/order/:id',
        exact: true,
        component: getComponent('Order'),
    },
    {
        path: '/sales-leader',
        exact: true,
        component: getComponent('SalesLeader'),
    },
    {
        type: 'product',
        path: '/:catalog?/:subcatalog?/:product.htm',
        exact: true,
        strict: true,
        component: getComponent('Product'),
    },
    {
        type: 'catalog',
        path: '/:catalog/:subcatalog?/:filter?',
        exact: true,
        component: getComponent('Catalog'),
    },
    {
        component: NotFound,
    },
];
