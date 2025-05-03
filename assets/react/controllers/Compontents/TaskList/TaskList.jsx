const TaskList = ({taskLists, loading, error}) => {
    if (loading) return <p>Loading...</p>;
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