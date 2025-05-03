import { useQuery, gql } from '@apollo/client';
import TaskList from '../TaskList/TaskList';

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

function TaskListContainer() {
    const { data, loading, error } = useQuery(GET_TASK_LISTS, {
        variables: { first: 10 }});
    return (
        <TaskList
            taskLists={data?.taskLists?.edges || []}
            loading={loading}
            error={error}
        />
    );
}
export default TaskListContainer;