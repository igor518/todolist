import React, { useState } from 'react';
import TaskListForm from '../TaskListForm/TaskListForm';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

/**
 * TaskListManager is a React component that provides functionality to create and manage task lists.
 * It allows users to open a modal, input details for a new task list, and submit the information using the provided callback.
 *
 * @param {Object} props - The properties object.
 * @param {Function} props.onAddTaskList - Callback function triggered to add a new task list.
 *                                         It accepts two parameters: the name and description of the task list.
 * @param {boolean} props.loading - A boolean indicating the loading state of the task list creation process.
 * @param {string} props.error - A message or description related to any error during the creation process.
 * @return {JSX.Element} The rendered TaskListManager component.
 */
export default function TaskListManager({ onAddTaskList, loading, error }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="tw:p-4">
            <Button onClick={() => setShowModal(true)}>
                Create a new Task List
            </Button>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <TaskListForm
                        onAddTaskList={async (name, desc) => {
                            await onAddTaskList(name, desc);
                            setShowModal(false);
                        }}
                        loading={loading}
                        error={error}
                    />
                </Modal>
            )}
        </div>
    );
}
