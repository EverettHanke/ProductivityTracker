import React from 'react';
import Task from './Task';
import { Task as TaskType } from '../types';

interface TaskListProps {
  tasks: TaskType[];
  toggleBulletPointCompletion: (taskIndex: number, bulletIndex: number) => void;
  deleteTask: (taskIndex: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleBulletPointCompletion, deleteTask }) => {
  return (
    <div className="task-list">
      {tasks.map((task, taskIndex) => (
        <Task
          key={taskIndex}
          task={task}
          taskIndex={taskIndex}
          toggleBulletPointCompletion={toggleBulletPointCompletion}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;