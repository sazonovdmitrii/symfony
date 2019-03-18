import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';

export function createClient() {
    const cache = new InMemoryCache();

    // Create a HTTP client (both server/client). It takes the GraphQL
    // server from the `GRAPHQL` environment variable, which by default is
    // set to an external playground at https://graphqlhub.com/graphql
    const httpLink = new createHttpLink({
        credentials: 'same-origin',
        uri: GRAPHQL,
    });

    // If we're in the browser, we'd have received initial state from the
    // server. Restore it, so the client app can continue with the same data.
    if (!SERVER) {
        cache.restore(window.__APOLLO__);
    }

    // Return a new Apollo Client back, with the cache we've just created,
    // and an array of 'links' (Apollo parlance for GraphQL middleware)
    // to tell Apollo how to handle GraphQL requests
    return new ApolloClient({
        cache,
        link: {
            ...httpLink, // <-- just use HTTP on the server

            // General error handler, to log errors back to the console.
            // Replace this in production with whatever makes sense in your
            // environment. Remember you can use the global `SERVER` variable to
            // determine whether you're running on the server, and record errors
            // out to third-party services, etc
            onError: ({ graphQLErrors, networkError }) => {
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
            },
        },
        // On the server, enable SSR mode
        ssrMode: SERVER,
    });
}
