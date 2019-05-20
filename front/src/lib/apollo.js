import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
// mb todo use get for better cache
// import { createPersistedQueryLink } from 'apollo-link-persisted-queries';

let apolloClient = null;

const create = ({ token }) => {
    const cache = new InMemoryCache();
    // Create a HTTP client (both server/client). It takes the GraphQL
    // server from the `GRAPHQL` environment variable, which by default is
    // set to an external playground at https://graphqlhub.com/graphql
    const httpLink = new createHttpLink({
        credentials: 'same-origin',
        uri: process.env.GRAPHQL,
    });

    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists

        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        };
    });

    // If we're in the browser, we'd have received initial state from the
    // server. Restore it, so the client app can continue with the same data.
    if (!process.env.SERVER) {
        cache.restore(window.__APOLLO__);
    }

    return new ApolloClient({
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
            authLink.concat(httpLink),
        ]),
        // On the server, enable SSR mode
        ssrMode: process.env.SERVER,
    });
};

export function createClient({ token = '' }) {
    // todo
    // if (!apolloClient) {
    apolloClient = create({ token });
    // }

    // Return a new Apollo Client back, with the cache we've just created,
    // and an array of 'links' (Apollo parlance for GraphQL middleware)
    // to tell Apollo how to handle GraphQL requests
    return apolloClient;
}
