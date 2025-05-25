import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Button from "./Compontents/Button/Button";
import TaskListContainer from "./Compontents/TaskListContainer/TaskListContainer";
import TaskContainer from "./Compontents/TaskContainer/TaskContainer";
import TaskListFormContainer from "./Compontents/TaskListFormContainer/TaskListFormContainer";
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import User from './Compontents/User/User'
import Modal from './Compontents/Modal/Modal';
import TaskFormContainer from './Compontents/TaskFormContainer/TaskFormContainer';

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

    const [showModal, setShowModal] = useState(false);
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const [selectedTaskList, setSelectedTaskList]  = useState(null);
    const openModal = useCallback(() => setShowModal(true), []);
    const openNewTaskModal = useCallback(() => setShowNewTaskModal(true), []);
    const closeNewTaskModal = useCallback(() => setShowNewTaskModal(false), []);
    const closeModal = useCallback(() => setShowModal(false), []);

    const handleSelectList = (id) => {
        setSelectedTaskList(id);
    };

    useEffect(() => {
        console.log("Form mounted");
    }, []);

    return (
        <>
            <ApolloProvider client={client}>
                <div className='tw:flex'>
                    <aside className="tw:fixed tw:flex tw:flex-col tw:top-[96px] tw:left-0 tw:h-[calc(100vh-96px)] tw:w-[360px] tw:bg-gradient-to-b tw:from-[#E3F2FD] tw:to-[#F8FAFC] tw:text-text-main tw:p-4 tw:shadow-lg">
                        <>
                            <TaskListContainer userId={id} selectedListId={selectedTaskList} selectTaskListCallback={handleSelectList}  />
                            <Button onClick={openModal}>Create a new Task List</Button>
                                {showModal && (
                                    <Modal onClose={closeModal}>
                                        <TaskListFormContainer userId={id} onSuccess={closeModal} />
                                    </Modal>
                                )}
                        </>
                        <div className="tw:mt-auto">
                            <User userId={id} />
                        </div>
                    </aside> 
                    <main className="tw:ml-[360px] tw:p-4">
                        <TaskContainer taskListId={selectedTaskList} />
                        <Button onClick={openNewTaskModal}>Create a new Task</Button>
                        {showNewTaskModal && (
                            <Modal onClose={closeNewTaskModal}>
                                <TaskFormContainer selectedTaskList={selectedTaskList} userId={id} onSuccess={closeNewTaskModal}/>
                            </Modal>
                        )}
                    </main>
                </div>
            </ApolloProvider>
        </>
    );
}
