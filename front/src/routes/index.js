import loadable from '@loadable/component';

import Product from './Product';
import Catalog from './Catalog';
import Loader from 'components/Loader';
import NotFound from './NotFound';

const getComponent = (component, async = !SERVER) =>
    loadable(() => import(`./${component}`), {
        fallback: Loader,
    });

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
        path: '/user/:slug?',
        exact: true,
        component: getComponent('User'),
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
        component: Product,
    },
    {
        type: 'catalog',
        path: '/:catalog/:subcatalog?/:filter?',
        exact: true,
        component: Catalog,
    },
    {
        component: NotFound,
    },
];
