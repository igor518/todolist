import React, { useEffect, useState, useCallback, useMemo } from 'react';
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
    const client = useMemo(() => {
        return new ApolloClient({
          uri: `https://${host}/api/graphql`,
          cache: new InMemoryCache(),
        });
      }, [host]);

    const [content, setContent] = useState('');

    const addNewTaskList = useCallback(() => {
        console.log("Add new task clicked");
        setContent('task_list');
    }, []);

    useEffect(() => {
        console.log("Form mounted");
    }, []);

    return (
        <>
            <ApolloProvider client={client}>
                <div className='tw:flex'>
                    <aside className="tw:fixed tw:flex tw:flex-col tw:top-[96px] tw:left-0 tw:h-[calc(100vh-96px)] tw:w-[360px] tw:bg-gradient-to-b tw:from-[#E3F2FD] tw:to-[#F8FAFC] tw:text-text-main tw:p-4 tw:shadow-lg">
                        <>
                            <TaskListContainer userId={id} />
                            <Button onClick={addNewTaskList}>Create a new Task List</Button>
                            {
                                content === 'task_list' && <TaskListFormContainer userId={id} />
                            }
                        </>
                        <div className="tw:mt-auto">
                            <User userId={id} />
                        </div>
                    </aside> 
                    <main className="tw:ml-[360px] tw:p-4">
                        
                    </main>

                </div>
                    
            </ApolloProvider>
        </>
    );
}
