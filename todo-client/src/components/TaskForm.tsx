import { useState } from 'react';
import axios from '../utils/axios';

interface TaskFormProps {
  onTaskAdded: () => void;
}

const TaskForm = ({ onTaskAdded }: TaskFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/tasks', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setFormData({ title: '', description: '' });
      onTaskAdded();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          placeholder="Task title"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Task description"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button 
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;