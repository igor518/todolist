import {useMutation, useQuery} from '@apollo/client';
import TaskList from '../TaskList/TaskList';
import {GET_TASK_LISTS, DELETE_TASK_LIST, GET_TASKS} from '../graphql_query'
import {useEffect} from "react";

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
    const { data, loading, error } = useQuery(GET_TASK_LISTS, {
        variables: {
            first: 10,
            owner: "api/users/" + userId
        }
    });
    const [deleteTaskList] = useMutation(DELETE_TASK_LIST);

    useEffect(() => {
        if (!loading && data?.taskLists?.edges.length && selectedListId == null) {
            selectTaskListCallback(data?.taskLists?.edges[0].node.id);
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
                            first: 10,
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
        } catch (err) {
            console.error('GraphQL Error:', err.graphQLErrors);
            throw err;
        }
    }

    return (
        <TaskList
            taskLists={data?.taskLists?.edges || []}
            loading={loading}
            error={error}
            onSelectList={selectTaskListCallback}
            selectedListId={selectedListId}
            onRemoveList={onRemoveList}
        />
    );
}
export default TaskListContainer;
