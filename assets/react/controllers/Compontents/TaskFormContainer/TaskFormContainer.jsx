import {useMutation, useQuery} from '@apollo/client';
import TaskForm from '../TaskForm/TaskForm';
import {CREATE_TASK, GET_TASK_LISTS, GET_TASKS} from '../graphql_query';

/**
 * A container component for managing the task creation workflow. Wraps a `TaskForm` component and handles the mutation logic for creating a new task.
 *
 * @param {Object} props - Props passed to the container component.
 * @param {string} props.selectedTaskList - The ID of the selected task list where the new task will be added.
 * @param {Function} props.onSuccess - Callback function to be executed upon successful task creation.
 * @param {string} props.userId - The ID of the user creating the task.
 * @return {JSX.Element} The `TaskForm` component wrapped with mutation and logic for creating a task.
 */
function TaskFormContainer({selectedTaskList, onSuccess, userId}) {
    const [createNewTask, { loading, error }] = useMutation(CREATE_TASK);

    const handleNewTask = async (title, description, progress, dueDate, status) => {
        try {
            await createNewTask({
                variables: {
                    input: {
                        title,
                        description,
                        taskList: selectedTaskList,
                        task_list: selectedTaskList,
                        progress: parseInt(progress),
                        status: status,
                        user_id: "api/users/" + userId,
                        assigned_user: "api/users/" + userId,
                        createdAt: new Date().toISOString(),
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        dueDate: new Date(dueDate).toISOString(),
                        due_date: new Date(dueDate).toISOString()
                    }
                },
                refetchQueries: [
                    {
                        query: GET_TASKS,
                        variables: {
                            first: 10,
                            taskList: selectedTaskList
                        }
                    }
                ],
            })
        } catch (err) {
            console.error('GraphQL Error:', err.graphQLErrors);
            throw err;
        }
    }
    return (
        <TaskForm
            handleNewTask={handleNewTask}
            onSuccess={onSuccess}
            loading={loading}
            error={error}
        />
    );
}

export default TaskFormContainer;
