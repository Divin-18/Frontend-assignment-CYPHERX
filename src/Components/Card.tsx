// TaskList.js

import { useState, useEffect } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('status'); // Default grouping by status
  const [groupedTasks, setGroupedTasks] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers');
        const data = await response.json();
        setTasks(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to group tasks based on selected criteria (status, user, priority)
  useEffect(() => {
    const grouped = tasks.reduce((acc, task) => {
      const key = task[groupBy];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(task);
      return acc;
    }, {});
    setGroupedTasks(grouped);
  }, [tasks, groupBy]);

  // Function to sort tasks by title or priority across all user groups
  const sortTasks = (sortKey) => {
    if (groupBy === 'userId'||groupBy === 'priority'||groupBy === 'status') {
      const updatedGroupedTasks = {};
      Object.keys(groupedTasks).forEach(key => {
        updatedGroupedTasks[key] = groupedTasks[key].sort((a, b) => {
          if (sortKey === 'title') {
            return a.title.localeCompare(b.title);
          } else if (sortKey === 'priority') {
            return b.priority - a.priority;
          }
          return 0;
        });
      });
      setGroupedTasks(updatedGroupedTasks);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center">
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

        {groupBy === 'userId' && (
          <div className="mb-4">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2" onClick={() => sortTasks('title')}>
              Sort by Title
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => sortTasks('priority')}>
              Sort by Priority
            </button>
          </div>
        )}

        {groupBy === 'priority' && (
          <div className="mb-4">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2" onClick={() => sortTasks('title')}>
              Sort by Title
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => sortTasks('priority')}>
              Sort by Priority
            </button>
          </div>
        )} 

         {groupBy === 'status' && (
          <div className="mb-4">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2" onClick={() => sortTasks('title')}>
              Sort by Title
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => sortTasks('priority')}>
              Sort by Priority
            </button>
          </div>
        )} 

        <div className="grid grid-cols-3 gap-4">
          {Object.entries(groupedTasks).map(([key, tasksForGroup]) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
