import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import UserRequest from './UserRequest';

export default function Dashboard({id, url}) {
    const client = new ApolloClient({
        uri: 'https://todolist.dev/api/graphql',
        cache: new InMemoryCache(),

    });
    return(
        <>
            <ApolloProvider client={client}>
                <UserRequest userId={id}/>
            </ApolloProvider>
        </>
    );
}

