import {useMutation, useQuery} from '@apollo/client';
import Task from '../Task/Task';
import {GET_TASKS, DELETE_TASK} from '../graphql_query'

/**
 * Component to fetch and display a list of tasks associated with a specific task list and status.
 *
 * @param {Object} props The props object for the component.
 * @param {string} props.taskListId The ID of the task list for which tasks are fetched.
 * @param {string} props.status The status of tasks to display ('open', 'in_progress', or 'done').
 * @return {JSX.Element} The rendered Task component with fetched tasks, loading status, and error information.
 */
function TaskContainer({taskListId, status}) {
    const [deleteTask] = useMutation(DELETE_TASK);
    const {data, loading, error} = useQuery(GET_TASKS, {
        variables: {
            first: 10,
            taskList: taskListId || ''
        }
    });

    const filteredTasks = data?.tasks?.edges.filter(task => task.node.status === status) || [];

    const onRemoveTask = async (itemId) => {
        console.dir(itemId);
        try {
            await deleteTask({
                variables: {
                    input: {
                        "id": itemId
                    },
                },
                refetchQueries: [
                    {
                        query: GET_TASKS,
                        variables: {
                            first: 10,
                            taskList: taskListId
                        }
                    }
                ]
            });
        } catch (err) {
            console.dir("An error occured while deleting a task: ", err);
        }
    }

    return (
        <Task
            tasks={filteredTasks}
            loading={loading}
            error={error}
            onRemoveTask={onRemoveTask}
            status={status}
        />
    );
}
export default TaskContainer;
