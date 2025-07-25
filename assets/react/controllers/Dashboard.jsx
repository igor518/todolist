import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Button from "./Compontents/Button/Button";
import TaskListContainer from "./Compontents/TaskListContainer/TaskListContainer";
import TaskContainer from "./Compontents/TaskContainer/TaskContainer";
import TaskListFormContainer from "./Compontents/TaskListFormContainer/TaskListFormContainer";
import {ApolloClient, InMemoryCache, ApolloProvider, useQuery} from '@apollo/client';
import User from './Compontents/User/User'
import Modal from './Compontents/Modal/Modal';
import TaskFormContainer from './Compontents/TaskFormContainer/TaskFormContainer';
import { GET_TASK_LISTS, GET_USER } from './Compontents/graphql_query';

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
        // Use the same protocol as the current page
        const protocol = window.location.protocol;
        return new ApolloClient({
          uri: `${protocol}//${host}/api/graphql`,
          cache: new InMemoryCache(),
        });
      }, [host]);

    return (
        <ApolloProvider client={client}>
            <DashboardContent userId={id} />
        </ApolloProvider>
    );
}

function DashboardContent({userId}) {
    const [showModal, setShowModal] = useState(false);
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const [selectedTaskList, setSelectedTaskList] = useState(null);
    const openModal = useCallback(() => setShowModal(true), []);
    const openNewTaskModal = useCallback(() => setShowNewTaskModal(true), []);
    const closeNewTaskModal = useCallback(() => setShowNewTaskModal(false), []);
    const closeModal = useCallback(() => setShowModal(false), []);

    const { data: taskListsData } = useQuery(GET_TASK_LISTS, {
        variables: {
            first: 10,
            owner: "api/users/" + userId
        }
    });

    const { data: userData } = useQuery(GET_USER, {
        variables: {
            id: "api/users/" + userId
        }
    });

    useEffect(() => {
        if (userData?.user) {
            const { firstname, lastname } = userData.user;
            const path = `/dashboard/${firstname}-${lastname}`;
            const url = new URL(window.location);
            url.pathname = path;
            window.history.pushState({}, '', url);
        }
    }, [userData]);

    const hasTaskLists = taskListsData?.taskLists?.edges?.length > 0;

    const handleSelectList = (id) => {
        setSelectedTaskList(id);
    };

    return (
        <div className='tw:flex'>
            <aside className="tw:fixed tw:flex tw:flex-col tw:top-[96px] tw:left-0 tw:h-[calc(100vh-96px)] tw:w-[360px] tw:bg-gradient-to-b tw:from-[#E3F2FD] tw:to-[#F8FAFC] tw:text-text-main tw:p-4 tw:shadow-lg">
                <>
                    <TaskListContainer userId={userId} selectedListId={selectedTaskList} selectTaskListCallback={handleSelectList} />
                </>
                <div className="tw:mt-auto">
                    <div className='tw:mb-[15px]'>
                        <div className="tw:w-full">
                            <Button onClick={openModal}>Create a new Task List</Button>
                        </div>
                        {showModal && (
                        <Modal onClose={closeModal}>
                            <TaskListFormContainer userId={userId} onSuccess={closeModal} />
                        </Modal>
                        )}
                    </div>
                    <User userId={userId} />
                </div>
            </aside>
            <main className="tw:ml-[360px] tw:mt-[96px] tw:flex-1 tw:p-4">
                {(!hasTaskLists || !selectedTaskList) ? (
                    <div className="tw:flex tw:flex-col tw:items-center tw:justify-center tw:h-[calc(100vh-200px)]">
                        <div className="tw:text-center">
                            <h2 className="tw:text-2xl tw:font-semibold tw:text-gray-700 tw:mb-4">Welcome to Your Task Manager</h2>
                            <p className="tw:text-gray-500 tw:mb-6">Please create your first task list using the button in the sidebar to get started</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="tw:mb-4 tw:w-[220px]">
                            <Button onClick={openNewTaskModal}>Create a new Task</Button>
                            {showNewTaskModal && (
                                <Modal onClose={closeNewTaskModal}>
                                    <TaskFormContainer selectedTaskList={selectedTaskList} userId={userId} onSuccess={closeNewTaskModal}/>
                                </Modal>
                            )}
                        </div>
                        <div className="tw:flex tw:gap-4">
                            <div className="tw:flex-1 tw:min-w-0">
                                <div className="tw:bg-gray-50 tw:rounded-lg tw:p-4">
                                    <h2 className="tw:text-lg tw:font-semibold tw:mb-4 tw:text-[#A78BFA]">Open</h2>
                                    <TaskContainer taskListId={selectedTaskList} status="open" />
                                </div>
                            </div>
                            <div className="tw:flex-1 tw:min-w-0">
                                <div className="tw:bg-gray-50 tw:rounded-lg tw:p-4">
                                    <h2 className="tw:text-lg tw:font-semibold tw:mb-4 tw:text-yellow-500">In Progress</h2>
                                    <TaskContainer taskListId={selectedTaskList} status="in_progress" />
                                </div>
                            </div>
                            <div className="tw:flex-1 tw:min-w-0">
                                <div className="tw:bg-gray-50 tw:rounded-lg tw:p-4">
                                    <h2 className="tw:text-lg tw:font-semibold tw:mb-4 tw:text-[#22C55E]">Done</h2>
                                    <TaskContainer taskListId={selectedTaskList} status="done" />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
