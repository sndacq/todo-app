import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NavBar from '@/components/NavBar';
import { ITodo } from '@/utils/types';
import { createTodoApi } from '@/api';

const Create = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ status: true } as ITodo);

  const handleStatusChange = () => {
    setFormData({ ...formData, status: !formData.status });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const handleCreateClick = () => {
    createTodoApi({ ...formData }).then((res) => {
      router.push(`/todo/${res.id}`);
      // TODO: show success message here
    }).catch((err) => {
      // TODO: show error here
      console.error(err);
    });
  };

  return (
    <>
      <Head>
        <title>Create Task</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className="overflow-hidden bg-white shadow sm:rounded-lg grid">
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Title</dt>
              <input
                className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Title"
                type="text"
                onChange={handleTitleChange}
                value={formData.title}
              />
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <input
                className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Description"
                type="text"
                onChange={handleDescriptionChange}
                value={formData.description}
              />
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Created at</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">-</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Updated at</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">-</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <input
                  className="rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  type="checkbox"
                  checked={formData.status}
                  onChange={handleStatusChange}
                />
              </dd>
            </div>
          </dl>
        </div>
        <div className="justify-self-end px-6">
          <button
            className="mr-2 text-blue-700 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            type="button"
            onClick={() => router.push('/')}
          >
            Cancel
          </button>
          <button
            className="justify-self-end mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            type="button"
            onClick={handleCreateClick}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default Create;
