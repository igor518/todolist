import { TailChase } from "ldrs/react";

const TaskList = ({taskLists, loading, error}) => {
    if (loading) return (
        <TailChase size="40" speed="1.75" color="#03A9F4" />
    );

    if (error) return <p>Error loading tasks.</p>;
    return (
        <>
            <ul>
                {taskLists.map((taskList) => (
                <li key={taskList.node.id}>
                    <p>
                        {taskList.node.name}
                    </p>
                    <p>
                        {taskList.node.description}
                    </p>
                </li>
                ))}
            </ul>
        </>
    );
};

export default TaskList;