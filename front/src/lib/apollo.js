import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
// mb todo use get for better cache
// import { createPersistedQueryLink } from 'apollo-link-persisted-queries';

const isServer = process.env.SERVER;
const isBrowser = process.browser;
const isProd = process.env.NODE_ENV === 'production';
let graphQLClient = null;

const initialStore = {
    isLoggedIn: false,
};

const create = ({ token } = {}) => {
    const cache = new InMemoryCache({
        // https://github.com/apollographql/apollo-client/pull/4514
        freezeResults: !isProd,
    });
    // Create a HTTP client (both server/client). It takes the GraphQL
    // server from the `GRAPHQL` environment variable, which by default is
    // set to an external playground at https://graphqlhub.com/graphql
    const httpLink = new createHttpLink({
        credentials: 'include',
        uri: process.env.GRAPHQL,
    });

    const client = new ApolloClient({
        cache,
        // mb todo use get for better cache
        // link: createPersistedQueryLink({ useGETForHashedQueries: true }).concat({
        //     ...httpLink, // <-- just use HTTP on the server

        //     // General error handler, to log errors back to the console.
        //     // Replace this in production with whatever makes sense in your
        //     // environment. Remember you can use the global `SERVER` variable to
        //     // determine whether you're running on the server, and record errors
        //     // out to third-party services, etc
        //     onError: ({ graphQLErrors, networkError }) => {
        //         if (graphQLErrors) {
        //             graphQLErrors.map(({ message, locations, path }) =>
        //                 console.log(
        //                     `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        //                 )
        //             );
        //         }
        //         if (networkError) {
        //             console.log(`[Network error]: ${networkError}`);
        //         }
        //     },
        // }),
        resolvers: {},
        link: ApolloLink.from([
            onError(({ graphQLErrors, networkError }) => {
                if (graphQLErrors) {
                    graphQLErrors.map(({ message, locations, path }) =>
                        console.log(
                            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                        )
                    );
                }
                if (networkError) {
                    console.log(`[Network error]: ${networkError}`);
                }
            }),
            httpLink,
        ]),
        // On the server, enable SSR mode
        ssrMode: isServer,
    });

    const data = {
        ...initialStore,
        isLoggedIn: !!token,
    };

    cache.writeData({
        data,
    });

    // If we're in the browser, we'd have received initial state from the
    // server. Restore it, so the client app can continue with the same data.
    if (!isServer) {
        client.onResetStore(() => cache.writeData({ data: initialStore }));
        cache.restore(window.__APOLLO__);
    }

    return client;
};

export function createClient({ token = '' } = {}) {
    if (!isBrowser) return create({ token });

    if (!graphQLClient) {
        graphQLClient = create({ token });
    }

    return graphQLClient;
}
