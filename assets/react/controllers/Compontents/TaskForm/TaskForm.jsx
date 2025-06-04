import React, { useState } from 'react';
import {Leapfrog} from "ldrs/react";

/**
 * Component for creating a new task using an interactive form.
 * It allows users to input a task title, description, status, and other details.
 *
 * @param {Object} props - The props object.
 * @param {function} props.handleNewTask - Callback function for handling the creation of a new task.
 * @param {boolean} props.loading - Flag indicating whether the form is in a loading state.
 * @param {Error|null} props.error - An error object representing any issue that occurred during task creation. Null if no error exists.
 * @param {function} [props.onSuccess] - Optional callback function invoked after successfully creating a task.
 *
 * @return {JSX.Element} A form element that includes input fields for task details and a submit button.
 */
function TaskForm({handleNewTask, loading, error, onSuccess}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [progress, setProgress] = useState(0);
    const [dueDate, setDueDate] = useState(0);
    const [status, setStatus] = useState('open');

    const submitForm = async (e, data) => {
        e.preventDefault();
        if (!title.trim()) {
            alert('Name is required.');
            return;
        }

        try {
            await handleNewTask(title, description, progress, dueDate, status);
            setTitle('');
            setDescription('');
            setStatus('open');

            if (onSuccess) onSuccess();
        } catch {
            // Optionally handled in container already
        }
    };

    return (
        <form onSubmit={submitForm} className="tw:space-y-4">
            <h2 className="tw:font-display tw:text-primary tw:text-xl tw:font-semibold tw:text-center">New Task</h2>
            <input
                type="title"
                value={title}
                placeholder="Task title"
                onChange={(e) => setTitle(e.target.value)}
                className="tw:w-full tw:border tw:rounded tw:p-2 focus:tw:outline-none focus:tw:ring focus:tw:border-blue-300"
            />
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="tw:w-full tw:border tw:rounded tw:p-2 focus:tw:outline-none focus:tw:ring focus:tw:border-blue-300"
            >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
            </select>
            <input
                type="progress"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                placeholder="Progress"
                className="tw:w-full tw:border tw:rounded tw:p-2 focus:tw:outline-none focus:tw:ring focus:tw:border-blue-300"
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="Due date"
                className="tw:w-full tw:border tw:rounded tw:p-2 focus:tw:outline-none focus:tw:ring focus:tw:border-blue-300"
            />
            <textarea
                value={description}
                placeholder="Enter description"
                onChange={(e) => setDescription(e.target.value)}
                className="tw:w-full tw:border tw:rounded tw:p-2 focus:tw:outline-none focus:tw:ring focus:tw:border-blue-300"
            />
            <button
                type="submit"
                disabled={loading}
                className="tw:relative tw:inline-block tw:text-gray-700 tw:border tw:border-gray-400 tw:rounded-[10px] tw:px-5 tw:py-3 tw:text-lg tw:font-semibold tw:uppercase tw:tracking-wide tw:transition tw:duration-300 tw:overflow-hidden tw:hover:text-white tw:before:absolute tw:before:inset-0 tw:before:bg-white tw:before:transition tw:before:duration-300 tw:before:z-0 tw:hover:before:bg-[linear-gradient(90deg,#1A237E_-3.59%,#03A9F4_94.91%)]"
            >
                    <span className="tw:relative tw:z-10">
                        {loading
                            ? (
                                <>
                                    'Creating...'
                                    <Leapfrog
                                        size="20"
                                        speed="1.7"
                                        color="03A9F4"
                                    />
                                </>)
                            : ('Create Task')}
                    </span>
            </button>

            {error && (
                <p className="tw:text-red-500 tw:text-sm tw:text-center">
                    Failed to create Task List: {error.message}
                </p>
            )}
        </form>
    )
}
export default TaskForm;
