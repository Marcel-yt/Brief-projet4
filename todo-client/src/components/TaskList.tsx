import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

interface Task {
  id: number;
  title: string;
  description: string;  // Added description field
  completed: boolean;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        withCredentials: true
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Similarly, update handleDelete and handleToggle
  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/tasks/${id}`, {  // Removed the extra 'api' from the path
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        withCredentials: true
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggle = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/tasks/${id}/toggle`, {}, {  // Removed the extra 'api' from the path
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        withCredentials: true
      });
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);



  return (
    <div className="max-w-2xl mx-auto p-4">
      <TaskForm onTaskAdded={fetchTasks} />
      <div className="mt-6">
        {tasks.map(task => (
          <TaskItem 
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;