'use client';

import { useRouter } from 'next/navigation';
import React from 'react'

function LoginPage() {
  const route = useRouter();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const form = { email, password };
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!response.ok) {
        setError('Failed to authenticate user');
        return;
      };
      const data = await response.json();
      console.log(data)
      if (data?.token) {
        route.push('/');
      } else {
        setError('Failed to authenticate user');
      }
    } catch (err) {
      setEmail('Failed to authenticate user');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <img src="./logo.jpeg" alt="Logo" className="w-32 mb-8" />

      <div className="bg-white p-8 rounded shadow-md w-72">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-semibold text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value || '')}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value || '')}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default LoginPage

