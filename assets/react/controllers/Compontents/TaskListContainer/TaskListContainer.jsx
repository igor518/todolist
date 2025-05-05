import { useQuery } from '@apollo/client';
import TaskList from '../TaskList/TaskList';
import { GET_TASK_LISTS } from '../graphql_query'

function TaskListContainer({userId}) {
    const { data, loading, error } = useQuery(GET_TASK_LISTS, {
        variables: {
            first: 10,
            owner: "api/users/" + userId
        }
    });
    return (
        <TaskList
            taskLists={data?.taskLists?.edges || []}
            loading={loading}
            error={error}
        />
    );
}
export default TaskListContainer;
