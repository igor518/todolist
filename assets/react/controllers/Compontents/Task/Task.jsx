import { TailChase } from "ldrs/react";

/**
 * A React functional component for displaying and managing a list of tasks.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.tasks - Array of tasks to display. Each task should contain properties such as id, title, description, status, and progress.
 * @param {Function} props.onRemoveTask - Callback function to remove a task. Should be called with the task ID as an argument.
 * @param {boolean} props.loading - A boolean indicating if the task data is currently loading. If true, a loading spinner will be displayed.
 * @param {string|null} props.error - Error message to display when task data fails to load. If `null`, no error message will be shown.
 * @param {string} props.status - The status of tasks being displayed ('open', 'in_progress', or 'done').
 * @returns {JSX.Element} The rendered task list or appropriate UI for loading, error, or empty states.
 */
const Task = ({tasks, onRemoveTask, loading, error, status}) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'open':
                return 'tw:border-blue-200';
            case 'in_progress':
                return 'tw:border-yellow-200';
            case 'done':
                return 'tw:border-green-200';
            default:
                return 'tw:border-gray-200';
        }
    };

    if (loading) return (
        <div className="tw:mb-2 tw:flex tw:justify-center tw:items-center">
            <TailChase size="40" speed="1.75" color="#03A9F4" />
        </div>
    );
    if (error) return <p className="tw:text-red-500 tw:text-center tw:mt-4">Error loading tasks.</p>;
    if (tasks.length === 0) {
        return (
            <div className="tw:flex tw:flex-col tw:items-center tw:justify-center tw:p-4">
                <p className="tw:text-sm tw:text-gray-500">
                    No {status.replace('_', ' ')} tasks
                </p>
            </div>
        );
    }
    return (
        <div className="tw:space-y-2">
            {tasks.map((task) => (
                <div 
                    key={task.node.id} 
                    className={`tw:bg-white tw:rounded-lg tw:p-4 tw:border-l-4 ${getStatusColor(status)} tw:shadow-sm hover:tw:shadow-md tw:transition-shadow`}
                >
                    <div className="tw:flex tw:justify-between tw:items-start tw:mb-2">
                        <h3 className="tw:font-semibold tw:text-lg tw:text-gray-800">{task.node.title}</h3>
                        <button 
                            onClick={() => onRemoveTask(task.node.id)}
                            className="tw:text-gray-400 hover:tw:text-red-500 tw:transition-colors"
                        >
                            ×
                        </button>
                    </div>
                    {task.node.description && (
                        <p className="tw:text-gray-600 tw:mb-2">{task.node.description}</p>
                    )}
                    <div className="tw:flex tw:flex-wrap tw:gap-2 tw:text-sm tw:text-gray-500">
                        <span className="tw:flex tw:items-center">
                            <svg className="tw:w-4 tw:h-4 tw:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Progress: {task.node.progress}%
                        </span>
                        <span className="tw:flex tw:items-center">
                            <svg className="tw:w-4 tw:h-4 tw:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Due: {new Date(task.node.dueDate).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default Task;
