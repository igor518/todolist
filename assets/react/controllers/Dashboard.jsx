import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import UserRequest from './UserRequest';

const client = new ApolloClient({
    uri: 'https://todolist.dev/api/graphql',
    cache: new InMemoryCache(),

});
const root = ReactDOM.createRoot(document.getElementById('root'));

if (root) {
    root.render(
        <ApolloProvider client={client}>
            <UserRequest/>
        </ApolloProvider>,
    );
}
