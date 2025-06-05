import { TailChase } from "ldrs/react";
import { useState } from "react";

/**
 * Component for displaying a list of tasks with interactive features such as selection and removal.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.taskLists - Array of task list objects to be rendered. Each task list object includes details like `id`, `name`, and `description`.
 * @param {boolean} props.loading - Indicates whether the task lists are currently being loaded.
 * @param {string|null} props.error - Indicates if there was an error loading the task lists. If present, an error message will be displayed.
 * @param {Function} props.onRemoveList - Callback function to handle the removal of a task list. Receives the `id` of the task list to be removed as an argument.
 * @param {string} props.selectedListId - The `id` of the currently selected task list. The selected task list will be visually highlighted.
 * @param {Function} props.onSelectList - Callback function to handle the selection of a task list. Receives the `id` of the selected task list as an argument.
 * @param {number} props.currentPage - Current page number for pagination.
 * @param {number} props.totalPages - Total number of pages.
 * @param {Function} props.onPageChange - Callback function to handle page changes.
 *
 * @returns {JSX.Element} Renders a list of task lists. Handles loading and error states. Shows a message if no task lists are available.
 */
const TaskList = ({
    taskLists, 
    loading, 
    error, 
    onRemoveList, 
    selectedListId, 
    onSelectList,
    currentPage,
    totalPages,
    onPageChange
}) => {
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    if (loading) return (
        <div className="tw:mb-2 tw:flex tw:justify-center tw:items-center">
            <TailChase size="40" speed="1.75" color="#03A9F4" />
        </div>
    );

    if (error) return <p className="text-red-500 text-center mt-4">Error loading tasks.</p>;

    if (taskLists.length === 0) {
        return (
            <div className="tw:flex tw:flex-col tw:items-center tw:justify-center tw:p-8">
                <p className="tw:text-lg tw:text-gray-700 tw:mb-4">
                    You have no task lists yet, create your first to-do list.
                </p>
            </div>
        );
    }

    const handleDelete = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        if (deleteConfirmId === id) {
            onRemoveList(id);
            setDeleteConfirmId(null);
        } else {
            setDeleteConfirmId(id);
        }
    };

    const handleCancelDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDeleteConfirmId(null);
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        return (
            <div className="tw:flex tw:justify-center tw:items-center tw:gap-2 tw:mt-4 tw:mb-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`tw:p-2 tw:rounded-lg tw:transition-all tw:duration-200 tw:cursor-pointer ${
                        currentPage === 1
                            ? 'tw:text-gray-400 tw:cursor-not-allowed'
                            : 'tw:text-secondary hover:tw:bg-blue-50'
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="tw:h-5 tw:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <span className="tw:text-sm tw:font-semibold tw:text-text-main">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`tw:p-2 tw:rounded-lg tw:transition-all tw:duration-200 tw:cursor-pointer ${
                        currentPage === totalPages
                            ? 'tw:bg-gray-100 tw:text-gray-400 tw:cursor-not-allowed'
                            : 'tw:text-secondary hover:tw:bg-blue-50'
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="tw:h-5 tw:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        );
    };

    return (
        <>
            <ul className="tw:space-y-2">
                {taskLists.map((taskList) => (
                    <li 
                        key={taskList.node.id} 
                        className={`tw:p-3 tw:font-text tw:cursor-pointer tw:rounded-lg tw:border tw:border-gray-200 tw:transition-all tw:duration-200 hover:tw:border-blue-300 ${
                            selectedListId === taskList.node.id 
                                ? 'tw:p-2 tw:font-text tw:cursor-pointer tw:bg-blue-100 tw:rounded tw:shadow' 
                                : 'tw:p-2 tw:font-text tw:cursor-pointer'
                        }`} 
                        onClick={() => onSelectList(taskList.node.id)}
                    >
                        <div className="tw:flex tw:justify-between tw:items-start tw:gap-4">
                            <div className="tw:flex-1">
                                <p className="tw:font-semibold tw:text-lg tw:flex tw:items-center tw:gap-2 tw:text-text-main">
                                    <span className="tw:text-secondary tw:text-xl">+</span>
                                    {taskList.node.name}
                                </p>
                                <p className="tw:text-text-gray tw:mt-1">{taskList.node.description}</p>
                            </div>
                            <div className="tw:flex tw:items-center tw:gap-2">
                                {deleteConfirmId === taskList.node.id ? (
                                    <>
                                        <button
                                            onClick={(e) => handleDelete(e, taskList.node.id)}
                                            className="tw:px-3 tw:py-1 tw:text-sm tw:font-semibold tw:text-white tw:bg-red-500 tw:rounded hover:tw:bg-red-600 tw:transition-colors"
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            onClick={handleCancelDelete}
                                            className="tw:px-3 tw:py-1 tw:text-sm tw:font-semibold tw:text-gray-600 tw:bg-gray-100 tw:rounded hover:tw:bg-gray-200 tw:transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={(e) => handleDelete(e, taskList.node.id)}
                                        className="tw:p-1.5 tw:text-gray-400 tw:hover:text-secondary tw:rounded-full tw:transition-all"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="tw:w-5 tw:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {renderPagination()}
        </>
    );
};

export default TaskList;