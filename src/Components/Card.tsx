// TaskList.js

import React from 'react';
import { useTaskContext } from './Context';

const TaskList = () => {
  const {
    tasks,
    users,
    groupBy,
    setGroupBy,
    groupedTasks,
    sortBy,
    setSortBy,
    sortTasks,
  } = useTaskContext();

  // Function to render task items based on the groupedTasks
  const renderTasks = () => {
    return Object.entries(groupedTasks).map(([key, tasksForGroup]) => (
      <div key={key}>
        <h2 className="text-lg font-semibold mb-4">{key}</h2>
        {tasksForGroup.map(task => (
          <div key={task.id} className="max-w-xs bg-white shadow-md rounded-md p-4 mb-4">
            <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
            <p className="text-gray-700">Status: {task.status}</p>
            <p className="text-gray-700">Priority: {task.priority}</p>
            <p className="text-gray-700">Assigned To: {users.find(user => user.id === task.userId)?.name || 'Unassigned'}</p>
          </div>
        ))}
      </div>
    ));
  };

  // JSX structure with buttons and task display...
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center">
        {/* Buttons for grouping */}
        <div className="mb-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setGroupBy('status')}>
            Group by Status
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2" onClick={() => setGroupBy('userId')}>
            Group by User
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setGroupBy('priority')}>
            Group by Priority
          </button>
        </div>

        {/* Buttons for sorting based on groupBy */}
        {(groupBy === 'userId' || groupBy === 'priority' || groupBy === 'status') && (
          <div className="mb-4">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2" onClick={() => sortTasks('title')}>
              Sort by Title
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => sortTasks('priority')}>
              Sort by Priority
            </button>
          </div>
        )}

        {/* Rendering tasks */}
        <div className="grid grid-cols-3 gap-4">
          {renderTasks()}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
