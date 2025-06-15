import {useMutation, useQuery} from '@apollo/client';
import TaskList from '../TaskList/TaskList';
import {GET_TASK_LISTS, DELETE_TASK_LIST, GET_TASKS} from '../graphql_query'
import {useEffect, useState} from "react";

/**
 * TaskListContainer is a container component that fetches and manages task lists for a specific user.
 * It handles fetching data, deletion of task lists, and selection logic.
 *
 * @param {Object} props - Component props.
 * @param {string} props.userId - The ID of the user for whom the task lists are being fetched.
 * @param {string|null} props.selectedListId - The ID of the currently selected task list. Can be null if no list is selected.
 * @param {Function} props.selectTaskListCallback - Callback function to set the currently selected task list.
 * @return {React.Element} Returns a rendered TaskList component with necessary data and callbacks.
 */
function TaskListContainer({userId, selectedListId, selectTaskListCallback}) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const { data, loading, error } = useQuery(GET_TASK_LISTS, {
        variables: {
            first: 100,
            owner: "api/users/" + userId
        }
    });
    const [deleteTaskList] = useMutation(DELETE_TASK_LIST);

    const taskLists = data?.taskLists?.edges || [];
    const totalPages = Math.ceil(taskLists.length / itemsPerPage);

    
    // Get current page items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = taskLists.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        if (!loading) {
            if (data?.taskLists?.edges.length === 0 && selectedListId !== null) {
                // No lists left, reset selection
                selectTaskListCallback(null);
            } else if (data?.taskLists?.edges.length && selectedListId == null) {
                // Select the first list if none is selected
                selectTaskListCallback(data?.taskLists?.edges[0].node.id);
            }
        }
    }, [selectedListId, data, loading, selectTaskListCallback]);

    const onRemoveList = async (itemId) => {
        try {
            await deleteTaskList({
                variables: {
                    input: {
                        "id": itemId
                    },
                },
                refetchQueries: [
                    {
                        query: GET_TASK_LISTS,
                        variables: {
                            first: 100,
                            owner: "api/users/" + userId
                        }
                    },
                    {
                        query: GET_TASKS,
                        variables: {
                            first: 10,
                            taskList: selectedListId
                        }
                    }
                ],
            });

            // If we're on a page with no items after deletion, go to previous page
            if (currentItems.length === 1 && currentPage > 1) {
                setCurrentPage(prev => prev - 1);
            }
        } catch (err) {
            console.error('GraphQL Error:', err.graphQLErrors);
            throw err;
        }
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <TaskList
            taskLists={currentItems}
            loading={loading}
            error={error}
            onSelectList={selectTaskListCallback}
            selectedListId={selectedListId}
            onRemoveList={onRemoveList}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
    );
}
export default TaskListContainer;
