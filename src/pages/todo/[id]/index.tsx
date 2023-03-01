import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { deleteTodoApi, getTodoDetailsApi, updateTodoApi } from '@/api';
import { ITodo } from '@/utils/types';
import NavBar from '@/components/NavBar';
import Modal from '@/components/Modal';

const Todo = () => {
  const router = useRouter();
  const [data, setData] = useState({} as ITodo);
  const [formData, setFormData] = useState({} as ITodo);
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    const id = router.query.id as string;

    getTodoDetailsApi(id).then((res) => {
      setData(res);
      setFormData(res);
    }).catch((err) => {
      console.error(err);
    });
  }, [router.isReady]);

  const handleStatusChange = () => {
    setFormData({ ...formData, status: !formData.status });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const handleEditClick = () => {
    setEdit(true);
    setFormData(data);
  };

  const handleSaveClick = () => {
    const id = data.id as string;
    updateTodoApi(id, { ...formData }).then((res) => {
      setData(res);
      setFormData(res);
      setEdit(false);
      // TODO: show success message here
    }).catch((err) => {
      // TODO: show error here
      console.error(err);
    });
  };

  const handleDeleteClick = () => {
    const id = data.id as string;
    deleteTodoApi(id).then((res) => {
      setShowModal(false);
      router.push('/');
      // TODO: show success message here
    }).catch((err) => {
      // TODO: show error here
      console.error(err);
    });
  };

  return (
    <>
      <Head>
        <title>Task Information</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className="overflow-hidden bg-white shadow sm:rounded-lg grid">
        <div className="px-4 py-5 sm:px-6 flex justify-between">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Task Information</h3>
          <div>
            <button
              className={`text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 w-15 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${edit && 'opacity-50 cursor-not-allowed'}`}
              type="button"
              onClick={() => setShowModal(true)}
              disabled={edit}
            >
              Delete
            </button>
            <button
              className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 w-15 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${edit && 'opacity-50 cursor-not-allowed'}`}
              type="button"
              onClick={handleEditClick}
              disabled={edit}
            >
              Edit
            </button>
          </div>

        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Title</dt>
              {edit ? (
                <input
                  className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Title"
                  type="text"
                  onChange={handleTitleChange}
                  value={formData.title}
                />
              ) : (
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data?.title}</dd>
              )}
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              {edit ? (
                <input
                  className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Description"
                  type="text"
                  onChange={handleDescriptionChange}
                  value={formData.description}
                />
              ) : (
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data?.description}</dd>
              )}
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Created at</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data?.createdAt}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Updated at</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data?.updatedAt}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <input
                  className={`rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${!edit && 'opacity-50 cursor-not-allowed'}`}
                  type="checkbox"
                  disabled={!edit}
                  checked={edit ? formData?.status : data?.status}
                  onChange={handleStatusChange}
                />
              </dd>
            </div>

            {/* <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">Attachments</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
          <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
            <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
              <div className="flex w-0 flex-1 items-center">
                <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clip-rule="evenodd" />
                </svg>
                <span className="ml-2 w-0 flex-1 truncate">resume_back_end_developer.pdf</span>
              </div>
              <div className="ml-4 flex-shrink-0">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
              </div>
            </li>
            <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
              <div className="flex w-0 flex-1 items-center">
                <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clip-rule="evenodd" />
                </svg>
                <span className="ml-2 w-0 flex-1 truncate">coverletter_back_end_developer.pdf</span>
              </div>
              <div className="ml-4 flex-shrink-0">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
              </div>
            </li>
          </ul>
        </dd>
      </div> */}
          </dl>
        </div>
        {edit && (
        <div className="justify-self-end px-6">
          <button
            className="mr-2 text-blue-700 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={() => setEdit(false)}
          >
            Cancel
          </button>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={handleSaveClick}
          >
            Save
          </button>
        </div>
        )}

      </div>
      {showModal && (<Modal handleClose={() => setShowModal(false)} handleConfirm={handleDeleteClick} />)}
    </>
  );
};

export default Todo;
