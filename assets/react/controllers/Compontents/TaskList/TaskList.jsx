import { TailChase } from "ldrs/react";

const TaskList = ({taskLists, loading, error, onRemoveList}) => {
    if (loading) return (
        <div className="tw:mb-2 tw:flex tw:justify-center tw:items-center">
            <TailChase size="40" speed="1.75" color="#03A9F4" />
        </div>
    );

    if (error) return <p className="text-red-500 text-center mt-4">Error loading tasks.</p>;

    if (taskLists.length === 0) {
        return (
            <div className="tw:flex tw:flex-col tw:items-center tw:justify-center  tw:p-8">
                <p className="tw:text-lg tw:text-gray-700 tw:mb-4">
                    You have no task lists yet, create your first to-do list.
                </p>
            </div>
        );
    }
    return (
        <>
            <ul>
                {taskLists.map((taskList) => (
                    <li key={taskList.node.id} className="tw:p-2 tw:font-text ">
                    <p className="tw:font-semibold tw:text-lg tw:flex tw:items-center tw:gap-2 tw:text-text-main">
                        <button className="tw:text-secondary tw:text-xl">+</button>
                        {taskList.node.name}
                    </p>
                    <p className="tw:text-text-gray">{taskList.node.description}</p>
                        <a href="#" onClick={onRemoveList.bind(this, taskList.node.id)}>Delete List</a>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default TaskList;