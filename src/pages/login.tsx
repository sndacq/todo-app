import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { loginApi } from '@/api';
import { useAppContext } from '@/context/state';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token, storeSession } = useAppContext();

  useEffect(() => {
    if(token !== '') router.push('/') 
  }, [token])

  const registerUser = () => {
    console.log('session');
  };

  const loginUser = () => {
    loginApi({ email, password }).then((data) => {
      storeSession(data);
    }).catch((err) => {
      // TODO: handle login errors
      console.log(err.response.data);
    });
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <input
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={handleUserChange}
            />
          </div>
          <div>
            <input
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="button"
            onClick={registerUser}
          >
            Register
          </button>
          <button
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
            onClick={loginUser}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
