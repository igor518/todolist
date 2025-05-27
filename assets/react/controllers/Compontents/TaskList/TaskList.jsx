import { TailChase } from "ldrs/react";

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
 *
 * @returns {JSX.Element} Renders a list of task lists. Handles loading and error states. Shows a message if no task lists are available.
 */
const TaskList = ({taskLists, loading, error, onRemoveList, selectedListId, onSelectList}) => {
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
                    <li key={taskList.node.id} className={`tw:p-2 tw:font-text tw:cursor-pointer ${
                        selectedListId === taskList.node.id ? 'tw:bg-blue-100 tw:rounded tw:shadow' : ''
                    }`} onClick={() => onSelectList(taskList.node.id)}>
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