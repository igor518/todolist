import React, { useState } from 'react';
import TaskListForm from '../TaskListForm/TaskListForm';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

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
