import { useMutation, gql } from '@apollo/client';
import TaskListForm from '../TaskListForm/TaskListForm';

// GraphQL Mutation
const CREATE_TASKLIST = gql`
  mutation createTaskList($input: createTaskListInput!) {
    createTaskList(input: $input) {
      taskList {
        id
        name
        description
        created_at
        updated_at
      }
    }
  }
`;

// Define your GraphQL query to fetch task lists
const GET_TASK_LISTS = gql`
  query GetTaskLists ($first: Int!) {
    taskLists(first:$first) {
      edges {
        node {
          id
          name
          description
        }
      }
    }
  }
`;

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
                refetchQueries: [{ query: GET_TASK_LISTS, variables: { first: 10 }}],
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
