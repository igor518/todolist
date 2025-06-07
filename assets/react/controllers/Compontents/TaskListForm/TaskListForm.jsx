import React, { useState } from 'react';
import { Leapfrog } from 'ldrs/react';
import 'ldrs/react/Leapfrog.css';

/**
 *
 * @param onAddTaskList
 * @param loading
 * @param error
 * @param onSuccess
 * @returns {Element}
 * @constructor
 */
function TaskListForm({ onAddTaskList, loading, error, onSuccess }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            alert('Name is required.');
            return;
        }

        try {
            await onAddTaskList(name, description);
            setName('');
            setDescription('');

            if (onSuccess) onSuccess();
        } catch {
            // Optionally handled in container already
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="tw:space-y-4">
                <h2 className="tw:font-display tw:text-primary tw:text-xl tw:font-semibold tw:text-center">New Task List</h2>
                <input
                    type="text"
                    value={name}
                    placeholder="Enter task list name"
                    onChange={(e) => setName(e.target.value)}
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
                    className="tw:relative tw:inline-block tw:w-full tw:text-gray-700 tw:border tw:border-gray-400 tw:rounded-[10px] tw:px-5 tw:py-3 tw:text-lg tw:font-semibold tw:uppercase tw:tracking-wide tw:transition tw:duration-300 tw:overflow-hidden tw:hover:text-white tw:before:absolute tw:before:inset-0 tw:before:bg-white tw:before:transition tw:before:duration-300 tw:before:z-0 tw:hover:before:bg-[linear-gradient(90deg,#1A237E_-3.59%,#03A9F4_94.91%)]"
                >
                    <span class="tw:relative tw:z-10">
                        {loading 
                        ? (
                            <>
                            Creating... 
                            <Leapfrog
                                size="20"
                                speed="1.7"
                                color="03A9F4" 
                            />
                            </>)
                        : ('Create Task List')}
                    </span>
                </button>
                {error && (
                    <p className="tw:text-red-500 tw:text-sm tw:text-center">
                        Failed to create Task List: {error.message}
                    </p>
                )}
            </form>

        </>
    );
}
export default TaskListForm;
