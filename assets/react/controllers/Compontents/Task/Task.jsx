import { TailChase } from "ldrs/react";
import { useState } from 'react';

/**
 * A React functional component for displaying and managing a list of tasks.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.tasks - Array of tasks to display. Each task should contain properties such as id, title, description, status, and progress.
 * @param {Function} props.onRemoveTask - Callback function to remove a task. Should be called with the task ID as an argument.
 * @param {Function} props.onUpdateStatus - Callback function to update the status of a task. Should be called with the task ID and new status as arguments.
 * @param {Function} props.onUpdateProgress - Callback function to update the progress of a task.
 * @param {boolean} props.loading - A boolean indicating if the task data is currently loading. If true, a loading spinner will be displayed.
 * @param {string|null} props.error - Error message to display when task data fails to load. If `null`, no error message will be shown.
 * @param {string} props.status - The status of tasks being displayed ('open', 'in_progress', or 'done').
 * @returns {JSX.Element} The rendered task list or appropriate UI for loading, error, or empty states.
 */
const Task = ({tasks, onRemoveTask, onUpdateStatus, onUpdateProgress, loading, error, status, onTaskClick, activeTask}) => {
    console.log('Task props:', { onTaskClick, activeTask });
    const [editingProgress, setEditingProgress] = useState(null);
    const [progressValue, setProgressValue] = useState(0);

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

    const getStatusColor = (status) => {
        switch (status) {
            case 'open':
                return 'tw:border-[#A78BFA]';
            case 'in_progress':
                return 'tw:border-yellow-500';
            case 'done':
                return 'tw:border-green-500';
            default:
                return 'tw:border-gray-500';
        }
    };

    const getStatusButtons = (task) => {
        switch (status) {
            case 'open':
                return (
                    <button
                        onClick={(e) => { e.stopPropagation(); onUpdateStatus(task.node.id, 'in_progress'); }}
                        className="tw:bg-gradient-to-r tw:from-[#FACC15] tw:to-[#F59E0B] tw:text-white tw:px-4 tw:py-1 tw:rounded tw:transition-all tw:duration-300 tw:hover:shadow-lg tw:hover:scale-105 tw:hover:from-[#F59E0B] tw:hover:to-[#D97706]"
                    >
                        Start
                    </button>
                );
            case 'in_progress':
                return (
                    <div className="tw:flex tw:gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); onUpdateStatus(task.node.id, 'open'); }}
                            className="tw:bg-gradient-to-r tw:from-[#A78BFA] tw:to-[#8B5CF6] tw:text-white tw:px-4 tw:py-1 tw:rounded tw:transition-all tw:duration-300 tw:hover:shadow-lg tw:hover:scale-105 tw:hover:from-[#8B5CF6] tw:hover:to-[#7C3AED]"
                        >
                            Stop
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onUpdateStatus(task.node.id, 'done'); }}
                            className="tw:bg-gradient-to-r tw:from-[#10B981] tw:to-[#059669] tw:text-white tw:px-4 tw:py-1 tw:rounded tw:transition-all tw:duration-300 tw:hover:shadow-lg tw:hover:scale-105 tw:hover:from-[#059669] tw:hover:to-[#047857]"
                        >
                            Done
                        </button>
                    </div>
                );
            case 'done':
                return (
                    <button
                        onClick={(e) => { e.stopPropagation(); onUpdateStatus(task.node.id, 'open'); }}
                        className="tw:bg-gradient-to-r tw:from-[#A78BFA] tw:to-[#8B5CF6] tw:text-white tw:px-4 tw:py-1 tw:rounded tw:transition-all tw:duration-300 tw:hover:shadow-lg tw:hover:scale-105 tw:hover:from-[#8B5CF6] tw:hover:to-[#7C3AED]"
                    >
                        Reopen
                    </button>
                );
            default:
                return null;
        }
    };

    const handleProgressClick = (task) => {
        setEditingProgress(task.node.id);
        setProgressValue(task.node.progress);
    };

    const handleProgressSubmit = (taskId) => {
        onUpdateProgress(taskId, progressValue);
        setEditingProgress(null);
    };

    const handleProgressKeyDown = (e, taskId) => {
        if (e.key === 'Enter') {
            handleProgressSubmit(taskId);
        } else if (e.key === 'Escape') {
            setEditingProgress(null);
        }
    };

    return (
        <div className="tw:space-y-2">
            {tasks.map((task) => {
                const isActive = activeTask && activeTask.id === task.node.id;
                return (
                <div 
                    key={task.node.id} 
                    className={`tw:bg-white tw:rounded-lg tw:p-4 tw:border-l-4 ${getStatusColor(status)} tw:shadow-sm tw:hover:shadow-md tw:transition-shadow ${isActive ? 'tw:ring-2 tw:ring-blue-500' : ''}`}
                    onClick={() => {
                        console.log('Task clicked:', task.node);
                        onTaskClick(task.node);
                    }}
                >
                    <div className="tw:flex tw:justify-between tw:items-start tw:mb-2">
                        <h3 className="tw:font-semibold tw:text-lg tw:text-gray-800">{task.node.title}</h3>
                        <div className="tw:flex tw:items-center tw:gap-2">
                            {getStatusButtons(task)}
                            <button 
                                onClick={(e) => { e.stopPropagation(); onRemoveTask(task.node.id); }}
                                className="tw:text-gray-400 tw:hover:text-secondary tw:transition-colors"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                    {task.node.description && (
                        <p className="tw:text-gray-600 tw:mb-2">{task.node.description}</p>
                    )}
                    <div className="tw:flex tw:flex-wrap tw:gap-4 tw:items-center tw:mt-3">
                        <div className="tw:flex tw:items-center tw:gap-2 tw:flex-1">
                            <div className="tw:flex tw:items-center tw:gap-2 tw:min-w-[200px]">
                                <svg className="tw:w-4 tw:h-4 tw:text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {editingProgress === task.node.id ? (
                                    <div className="tw:flex tw:items-center tw:gap-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={progressValue}
                                            onChange={(e) => setProgressValue(parseInt(e.target.value))}
                                            className="tw:w-24 tw:accent-[#3B82F6]"
                                        />
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={progressValue}
                                            onChange={(e) => setProgressValue(parseInt(e.target.value))}
                                            onKeyDown={(e) => handleProgressKeyDown(e, task.node.id)}
                                            className="tw:w-16 tw:px-2 tw:py-1 tw:border tw:border-[#3B82F6] tw:rounded tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-[#3B82F6] tw:focus:border-transparent"
                                        />
                                        <button
                                            onClick={() => handleProgressSubmit(task.node.id)}
                                            className="tw:bg-gradient-to-r tw:from-[#3B82F6] tw:to-[#2563EB] tw:text-white tw:px-3 tw:py-1 tw:rounded tw:transition-all tw:duration-300 tw:hover:shadow-lg tw:hover:scale-105 tw:hover:from-[#2563EB] tw:hover:to-[#1D4ED8] tw:min-w-[60px]"
                                        >
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <div 
                                        className="tw:flex tw:items-center tw:gap-2 tw:cursor-pointer tw:hover:text-[#3B82F6]"
                                        onClick={() => handleProgressClick(task)}
                                    >
                                        <div className="tw:w-24 tw:bg-gray-100 tw:rounded-full tw:h-2">
                                            <div 
                                                className="tw:bg-gradient-to-r tw:from-[#3B82F6] tw:to-[#2563EB] tw:rounded-full tw:h-2 tw:transition-all tw:duration-300" 
                                                style={{width: `${task.node.progress}%`}}
                                            />
                                        </div>
                                        <span className="tw:text-[#3B82F6] tw:font-medium">{task.node.progress}%</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="tw:flex tw:items-center tw:gap-2 tw:text-sm tw:text-[#6B7280]">
                            <svg className="tw:w-4 tw:h-4 tw:text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Due: {new Date(task.node.dueDate).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            )})}
        </div>
    );
};

export default Task;
