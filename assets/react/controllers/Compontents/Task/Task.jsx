import { TailChase } from "ldrs/react";

/**
 * A React functional component for displaying and managing a list of tasks.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.tasks - Array of tasks to display. Each task should contain properties such as id, title, description, status, and progress.
 * @param {Function} props.onRemoveTask - Callback function to remove a task. Should be called with the task ID as an argument.
 * @param {boolean} props.loading - A boolean indicating if the task data is currently loading. If true, a loading spinner will be displayed.
 * @param {string|null} props.error - Error message to display when task data fails to load. If `null`, no error message will be shown.
 * @returns {JSX.Element} The rendered task list or appropriate UI for loading, error, or empty states.
 */
const Task = ({tasks, onRemoveTask, loading, error}) => {
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
                        <p className="tw:text-text-gray">Task status: {task.node.status}</p>
                        <p className="tw:text-text-gray">Progress: {task.node.progress}</p>
                        <p className="tw:text-text-gray">Complete due Date: {new Date(task.node.dueDate).toLocaleDateString()}</p>
                        <a href="#" onClick={onRemoveTask.bind(this, task.node.id)}>Delete Task</a>
                    </li>
                ))}
            </ul>
        </>
    );
};
export default Task;
