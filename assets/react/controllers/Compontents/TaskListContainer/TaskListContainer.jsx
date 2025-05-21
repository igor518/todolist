import {useMutation, useQuery} from '@apollo/client';
import TaskList from '../TaskList/TaskList';
import {GET_TASK_LISTS, DELETE_TASK_LIST} from '../graphql_query'
import {useEffect} from "react";

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
