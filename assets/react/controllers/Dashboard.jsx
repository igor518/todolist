import React from 'react';
import { useState } from 'react';
import Button from "./Compontents/Button/Button";
import TaskListContainer from "./Compontents/TaskListContainer/TaskListContainer";
import TaskListFormContainer from "./Compontents/TaskListFormContainer/TaskListFormContainer";
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import User from "./User";

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
export default function ({id}) {
    const [content, setContent] = useState('');

    const addNewTaskList = () => {
        setContent('task_list');
    }
    return (
        <>
            <ApolloProvider client={client}>
                <User userId={id}/>
                <TaskListContainer />
                <Button onClick={addNewTaskList}>Create a new Task List</Button>
                {
                    content === 'task_list' && <TaskListFormContainer userId={id} />
                }
            </ApolloProvider>
        </>
    );
}
