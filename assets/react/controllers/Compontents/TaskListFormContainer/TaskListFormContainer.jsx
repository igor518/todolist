import { useMutation, useApolloClient } from '@apollo/client';
import TaskListForm from '../TaskListForm/TaskListForm';
import {GET_TASK_LISTS, CREATE_TASKLIST } from '../graphql_query';

/**
 * Wrap apollo creating a new list
 *
 * @param userId
 * @param onSuccess
 * @returns {JSX.Element}
 * @constructor
 */
function TaskListFormContainer({ userId, onSuccess }) {
    const [createTaskList, { loading, error }] = useMutation(CREATE_TASKLIST);
    const client = useApolloClient();

    const handleAddTaskList = async (name, description) => {
        try {
            const result = await createTaskList({
                variables: {
                    input: {
                        name,
                        description,
                        owner: "/api/users/" + userId,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    },
                },
                refetchQueries: [
                    {
                        query: GET_TASK_LISTS,
                        variables: {
                            first: 10,
                            owner: "/api/users/" + userId
                        }
                    }
                ],
            });
            console.log('Mutation result:', result);
            // Force a refetch of the task lists query
            await client.refetchQueries({
                include: [GET_TASK_LISTS]
            });
            return result.data.createTaskList.taskList.id;
        } catch (err) {
            console.error('GraphQL Error:', err.graphQLErrors);
            throw err;
        }
    };
    return (
        <TaskListForm
            onAddTaskList={handleAddTaskList}
            loading={loading}
            error={error}
            onSuccess={onSuccess}
        />
    );
}
export default TaskListFormContainer;
