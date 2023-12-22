// TaskList.js

import { useState, useEffect } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

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

  // Group tasks by status
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {});

  return (
    <div className="flex justify-center">
      {Object.entries(groupedTasks).map(([status, tasksForStatus]) => (
        <div key={status} className="p-4">
          <h2 className="text-lg font-semibold mb-4">{status}</h2>
          {tasksForStatus.map(task => (
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
  );
};

export default TaskList;
