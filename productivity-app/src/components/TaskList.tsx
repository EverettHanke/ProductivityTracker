import React, { useState } from 'react';
import Task from './Task';
import { Task as TaskType } from '../types';

interface TaskListProps {
  tasks: TaskType[];
  toggleBulletPointCompletion: (taskIndex: number, bulletIndex: number) => void;
  deleteTask: (taskIndex: number) => void;
  isDaily: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleBulletPointCompletion, deleteTask, isDaily }) => {
  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value.toLowerCase());
  };

  const handleClearFilter = () => {
    setFilterValue('');
  };

  const filteredTasks = tasks
    .map((task, index) => ({ task, originalIndex: index })) // Include the original index
    .filter(({ task }) => {
      const matchesFilter =
        filterValue === '' ||
        task.tags.some((tag) => tag.toLowerCase().includes(filterValue)) ||
        task.title.toLowerCase().includes(filterValue);

      return matchesFilter && task.isDaily === isDaily; // Ensure it matches the isDaily filter
    });

  return (
    <div>
      <input
        type="text"
        className="filter-input"
        placeholder="Filter tasks..."
        value={filterValue}
        onChange={handleFilterChange}
      />
      <button className="clear-button" onClick={handleClearFilter}>Clear</button>
      <div className="task-list">
        {filteredTasks.map(({ task, originalIndex }) => (
          <Task
            key={originalIndex}
            task={task}
            taskIndex={originalIndex} // Pass the original index
            toggleBulletPointCompletion={toggleBulletPointCompletion}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;