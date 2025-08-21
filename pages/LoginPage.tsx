
import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { ROUTES, RESTAURANT_NAME } from '../constants';
import { LockClosedIcon } from '@heroicons/react/24/solid';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(ROUTES.PROFILE);
    }
  }, [user, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) {
      setError('Email and Name are required.');
      return;
    }
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email address.');
        return;
    }
    setError('');
    login(email, name); // Simulated login
    navigate(ROUTES.PROFILE); // Redirect to profile page after login
  };

  return (
    <div className="min-h-[calc(100vh-20rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <LockClosedIcon className="mx-auto h-12 w-auto text-primary-DEFAULT" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary-dark">
            Sign in to {RESTAURANT_NAME}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <span className="font-medium text-primary-DEFAULT hover:text-primary-dark cursor-default">
              continue as a guest (some features limited)
            </span>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
          <TextInput
            label="Full Name"
            id="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
          />
          <TextInput
            label="Email address"
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          
          <div>
            <Button type="submit" variant="primary" size="lg" className="w-full">
              Sign In / Register
            </Button>
          </div>
        </form>
         <p className="mt-4 text-center text-xs text-gray-500">
            For demonstration purposes, no actual password is required. Your name and email will be stored locally.
          </p>
      </div>
    </div>
  );
};

export default LoginPage;
