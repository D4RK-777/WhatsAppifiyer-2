import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import Card from '../common/Card';

interface LoginFormProps {
  onToggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-whatsapp focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-whatsapp focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />
        </div>
        
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          className="mb-4"
        >
          Log In
        </Button>
        
        <p className="text-center text-sm">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onToggleForm}
            className="text-whatsapp hover:underline"
          >
            Sign Up
          </button>
        </p>
      </form>
    </Card>
  );
};

export default LoginForm;
