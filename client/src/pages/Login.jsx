import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PageContainer from '../components/PageContainer';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('authenticated', 'true');

        navigate('/');
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <PageContainer>
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8"
      >
        <h1 className="mb-6 text-3xl font-bold text-white">
          Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="
            mb-4
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-950
            p-3
            text-white
            focus:border-orange-500
            focus:outline-none
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            mb-4
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-950
            p-3
            text-white
            focus:border-orange-500
            focus:outline-none
          "
        />

        {error && (
          <div className="mb-4 text-red-500">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="
            w-full
            rounded-xl
            bg-orange-500
            p-3
            font-semibold
            text-white
            hover:bg-orange-600
          "
        >
          Sign In
        </button>
      </form>

    </div>
    </PageContainer>
  );
}