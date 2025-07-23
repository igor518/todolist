import {useMutation, useQuery} from '@apollo/client';
import Task from '../Task/Task';
import {GET_TASKS, DELETE_TASK, UPDATE_TASK} from '../graphql_query'

/**
 * Component to fetch and display a list of tasks associated with a specific task list and status.
 *
 * @param {Object} props The props object for the component.
 * @param {string} props.taskListId The ID of the task list for which tasks are fetched.
 * @param {string} props.status The status of tasks to display ('open', 'in_progress', or 'done').
 * @return {JSX.Element} The rendered Task component with fetched tasks, loading status, and error information.
 */
function TaskContainer({taskListId, status, onTaskClick, activeTask}) {
    const [deleteTask] = useMutation(DELETE_TASK);
    const [updateTask] = useMutation(UPDATE_TASK);
    const {data, loading, error} = useQuery(GET_TASKS, {
        variables: {
            first: 10,
            taskList: taskListId
        }
    });

    const filteredTasks = data?.tasks?.edges.filter(task => task.node.status === status) || [];

    const onRemoveTask = async (itemId) => {
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
            console.dir("An error occurred while deleting a task: ", err);
        }
    }

    const onUpdateStatus = async (taskId, newStatus) => {
        try {
            if (taskId && taskListId) {
                await updateTask({
                    variables: {
                        input: {
                            id: taskId,
                            status: newStatus,
                            updatedAt: new Date().toISOString(),
                            updated_at: new Date().toISOString()
                        }
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
            }
        } catch (err) {
            console.error("An error occurred while updating task status: ", err);
        }
    };

    const onUpdateProgress = async (taskId, newProgress) => {
        try {
            if (taskId) {
                await updateTask({
                    variables: {
                        input: {
                            id: taskId,
                            progress: newProgress,
                            updatedAt: new Date().toISOString(),
                            updated_at: new Date().toISOString()
                        }
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
            }
        } catch (err) {
            console.error("An error occurred while updating task progress: ", err);
        }
    };

    return (
        <Task
            tasks={filteredTasks}
            loading={loading}
            error={error}
            onRemoveTask={onRemoveTask}
            onUpdateStatus={onUpdateStatus}
            onUpdateProgress={onUpdateProgress}
            status={status}
            onTaskClick={onTaskClick}
            activeTask={activeTask}
        />
    );
}
export default TaskContainer;
