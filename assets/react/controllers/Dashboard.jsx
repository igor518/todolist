import React from 'react';
import { useState } from 'react';
import UserRequest from "./Compontents/User/User";
import Button from "./Compontents/Button/Button";
import TaskList from "./Compontents/TaskList/TaskList";
import {useQuery, gql, ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://todolist.dev/api/graphql',
    cache: new InMemoryCache(),
});

/**
 * TodoList dashboard
 *
 * @param id
 * @returns {Element}
 * @constructor
 */
export default function Dashboard({id}) {
    const [content, setContent] = useState('');

    const addNewTaskList = () => {
        setContent('task_list');
    }
    return(
        <>
            <ApolloProvider client={client}>
                <UserRequest userId={id}/>
                <Button onClick={addNewTaskList}>Create a new Task List</Button>
                {
                    content === 'task_list' && <TaskList userId={id} />
                }
            </ApolloProvider>
        </>
    );
}
