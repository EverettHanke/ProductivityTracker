import React, { useState } from 'react';
import Task from './Task';
import { Task as TaskType } from '../types';

interface TaskListProps {
  tasks: TaskType[];
  toggleBulletPointCompletion: (taskIndex: number, bulletIndex: number) => void;
  deleteTask: (taskIndex: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleBulletPointCompletion, deleteTask }) => {

  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value.toLowerCase());
  }

  const handleClearFilter = () => {
    setFilterValue('');
  }

  const filteredTasks = (filterValue === '') ? tasks : tasks.filter((task) => 
      task.tags.some((tag) => tag.toLowerCase().includes(filterValue)) || 
      task.title.toLowerCase().includes(filterValue)
  )
  return (
    <div>
      <input type="text" className="filter-input" placeholder="Filter tasks..." value={filterValue} onChange={handleFilterChange}/>
      {/*<button className="filter-button" onClick={() => setFilterValue(filterValue)}>Filter</button>*/}
      <button className="clear-button" onClick={handleClearFilter}>Clear</button>
      <div className="task-list">
        {filteredTasks.map((task, taskIndex) => (
          <Task
            key={taskIndex}
            task={task}
            taskIndex={taskIndex}
            toggleBulletPointCompletion={toggleBulletPointCompletion}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
    
  );
};

export default TaskList;