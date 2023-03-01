import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context/state';
import TodoList from '@/components/TodoList';
import NavBar from '@/components/NavBar';

export default function Home() {
  const router = useRouter();
  const { token } = useAppContext();

  useEffect(() => {
    if (!token) router.push('/login');
  }, []);

  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <TodoList />
    </>
  );
}
