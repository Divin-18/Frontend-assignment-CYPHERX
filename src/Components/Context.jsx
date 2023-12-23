// TaskContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

// @ts-ignore
const TaskContext = createContext();

export const useTaskContext = () => {
  return useContext(TaskContext);
};

// @ts-ignore
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [groupedTasks, setGroupedTasks] = useState({});
  const [sortBy, setSortBy] = useState('priority'); // Default sort by priority

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

  useEffect(() => {
    const grouped = tasks.reduce((acc, task) => {
      /**
       * @type {string | number}
       */
      const key = task[groupBy];
      if (!acc[key]) {
        // @ts-ignore
        acc[key] = [];
      }
      // @ts-ignore
      acc[key].push(task);
      return acc;
    }, {});
    setGroupedTasks(grouped);
  }, [tasks, groupBy]);

  const sortTasks = (/** @type {string} */ sortKey) => {
    const updatedGroupedTasks = {};
    Object.keys(groupedTasks).forEach(key => {
      // @ts-ignore
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
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        users,
        setUsers,
        groupBy,
        setGroupBy,
        groupedTasks,
        sortBy,
        setSortBy,
        sortTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
