import React from 'react';
import { useState } from 'react';
import Button from "./Compontents/Button/Button";
import TaskListContainer from "./Compontents/TaskListContainer/TaskListContainer";
import TaskListFormContainer from "./Compontents/TaskListFormContainer/TaskListFormContainer";
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import User from './Compontents/User/User'
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
                <div className='tw:flex'>
                    <aside className="tw:fixed tw:flex tw:flex-col tw:top-[96px] tw:left-0 tw:h-[calc(100vh-96px)] tw:w-[360px] tw:bg-gradient-to-b tw:from-[#E3F2FD] tw:to-[#F8FAFC] tw:text-text-main tw:p-4 tw:shadow-lg">
                        <div className="tw:mt-auto">
                            <User userId={id} />
                        </div>
                    </aside> 
                    <main className="tw:ml-[360px] tw:p-4">
                        <TaskListContainer userId={id} />
                        <Button onClick={addNewTaskList}>Create a new Task List</Button>
                        {
                            content === 'task_list' && <TaskListFormContainer userId={id} />
                        }
                    </main>

                </div>
                    
            </ApolloProvider>
        </>
    );
}
