import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form action="" className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="User"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="submit"
            className="py-2 px-4 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
