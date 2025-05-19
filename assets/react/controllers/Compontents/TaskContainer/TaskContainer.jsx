import {useQuery} from '@apollo/client';
import Task from '../Task/Task';
import {GET_TASKS} from '../graphql_query'


function TaskContainer({taskListId}) {
    const { data, loading, error } = useQuery(GET_TASKS, {
        variables: {
            first: 10,
            taskList: taskListId
        }
    });
    return (
        <Task
            tasks={data?.tasks?.edges || []}
            loading={loading}
            error={error}
        />
    );
}
export default TaskContainer;
