import React, { useState } from 'react';

function TaskListForm({ onAddTaskList, loading, error }) {
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
        } catch {
            // Optionally handled in container already
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={name}
                    placeholder="Enter task list name"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded p-2"
                />
                <textarea
                    value={description}
                    placeholder="Enter description"
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded p-2"
                />
                <button
                    type="button"
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                    {loading ? 'Creating...' : 'Create TaskList'}
                </button>

                {error && (
                    <p className="text-red-500 text-sm">
                        Failed to create Task List: {error.message}
                    </p>
                )}
            </form>
        </>
    );
}
export default TaskListForm;
