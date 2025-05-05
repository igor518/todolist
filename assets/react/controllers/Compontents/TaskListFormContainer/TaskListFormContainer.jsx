import { useMutation } from '@apollo/client';
import TaskListForm from '../TaskListForm/TaskListForm';
import {GET_TASK_LISTS, CREATE_TASKLIST } from '../graphql_query'
function TaskListFormContainer({ userId }) {
    const [createTaskList, { loading, error }] = useMutation(CREATE_TASKLIST);

    const handleAddTaskList = async (name, description) => {
        try {
            await createTaskList({
                variables: {
                    input: {
                        name,
                        description,
                        owner: "api/users/" + userId,
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
                            owner: "api/users/" + userId
                        }
                    }
                ],
            });
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
        />
    );
}
export default TaskListFormContainer;
