import { TailChase } from "ldrs/react";

const Task = ({tasks, loading, error}) => {
    if (loading) return (
        <div className="tw:mb-2 tw:flex tw:justify-center tw:items-center">
            <TailChase size="40" speed="1.75" color="#03A9F4" />
        </div>
    );
    if (error) return <p className="text-red-500 text-center mt-4">Error loading tasks.</p>;
    if (tasks.length === 0) {
        return (
            <div className="tw:flex tw:flex-col tw:items-center tw:justify-center  tw:p-8">
                <p className="tw:text-lg tw:text-gray-700 tw:mb-4">
                    You have no tasks yet, create your first task.
                </p>
            </div>
        );
    }
    return (
        <>
            <ul>
                {tasks.map((task) => (
                    <li key={task.node.id} className="tw:p-2 tw:font-text ">
                        <p className="tw:font-semibold tw:text-lg tw:flex tw:items-center tw:gap-2 tw:text-text-main">
                            <button className="tw:text-secondary tw:text-xl">+</button>
                        </p>
                        <p className="tw:text-text-gray">{task.node.title}</p>
                        <p className="tw:text-text-gray">{task.node.description}</p>
                        <p className="tw:text-text-gray">{task.node.status}</p>
                        <p className="tw:text-text-gray">{task.node.progress}</p>
                    </li>
                ))}
            </ul>
        </>
    );
};
export default Task;
