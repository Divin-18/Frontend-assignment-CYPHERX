import React from 'react';
import { useTaskContext } from './Context';

// Define Task interface outside the functional component
interface Task {
  id: React.Key | null | undefined;
  title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined;
  status: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined;
  priority: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined;
  userId: any;
}

interface GroupedTasks {
  [key: string]: Task[]; // Define the structure of groupedTasks
}

interface User {
  id: number;
  name: string;
}

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

  // Assuming tasksForGroup is an array of Task
  const tasksForGroup: Task[] = tasks || [];

  // Explicitly define the type of groupedTasks
  const typedGroupedTasks: GroupedTasks = groupedTasks || {};

  // Function to render task items based on the groupedTasks
  const renderTasks = () => {
    return Object.entries(typedGroupedTasks).map(([key, groupedTaskItems]) => (
      <div key={key}>
        <h2 className="text-lg font-semibold mb-4">{key}</h2>
        {groupedTaskItems.map((task: Task) => (
          <div key={task.id} className="max-w-xs bg-white shadow-md rounded-md p-4 mb-4">
            <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
            <p className="text-gray-700">Status: {task.status}</p>
            <p className="text-gray-700">Priority: {task.priority}</p>
            <p className="text-gray-700">Assigned To: {users.find((user: User) => user.id === task.userId)?.name || 'Unassigned'}</p>
          </div>
        ))}
      </div>
    ));
  };

  // JSX structure with buttons and task display...
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center">
        {/* Rendering tasks */}
        <div className="grid grid-cols-3 gap-4">
          {renderTasks()}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
