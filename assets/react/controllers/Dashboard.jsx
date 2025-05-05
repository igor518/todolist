import React from 'react';
import { useState } from 'react';
import Button from "./Compontents/Button/Button";
import TaskListContainer from "./Compontents/TaskListContainer/TaskListContainer";
import TaskListFormContainer from "./Compontents/TaskListFormContainer/TaskListFormContainer";
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import User from "./Compontents/User/User";

/**
 * TodoList dashboard
 *
 * @param id
 * @param host
 * @returns {Element}
 * @constructor
 */
export default function ({id, host}) {

    const client = new ApolloClient({
        uri: "https://"+ host + "/api/graphql",
        cache: new InMemoryCache(),
    });

    const [content, setContent] = useState('');

    const addNewTaskList = () => {
        setContent('task_list');
    }
    return (
        <>
            <ApolloProvider client={client}>
                <User userId={id} />
                <TaskListContainer userId={id} />
                <Button onClick={addNewTaskList}>Create a new Task List</Button>
                {
                    content === 'task_list' && <TaskListFormContainer userId={id} />
                }
            </ApolloProvider>
        </>
    );
}
