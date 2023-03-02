import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  deleteTodoApi, getTodoDetailsApi, updateTodoApi, getCommentsListApi, createCommentApi,
} from '@/api';
import { ITodo, IComment } from '@/utils/types';
import NavBar from '@/components/NavBar';
import Modal from '@/components/Modal';
import Comment from '@/components/Comment';
import { AddIcon, CancelIcon, ConfirmIcon } from '@/components/Icons';

const TodoDetails = () => {
  const router = useRouter();

  const [data, setData] = useState({} as ITodo);
  const [formData, setFormData] = useState({} as ITodo);
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState([] as IComment[]);
  const [commentForm, setCommentForm] = useState({} as IComment);
  const [newComment, setNewComment] = useState(false);

  const getCommentsApi = (id: string) => {
    getCommentsListApi(id).then((res) => {
      setComments(res);
    }).catch((err) => console.error(err));
  };
  let routerQueryId = '';

  useEffect(() => {
    if (!router.isReady) return;
    routerQueryId = router.query.id as string
    getTodoDetailsApi(routerQueryId).then((res) => {
      setData(res);
      setFormData(res);
    }).catch((err) => console.error(err));

    getCommentsApi(routerQueryId);
  }, [router.isReady]);

  const { refetch } = useQuery('commentsList', () => getCommentsApi(routerQueryId), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

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

  const handleDeleteTodo = () => {
    const id = data.id as string;
    deleteTodoApi(id).then(() => {
      setShowModal(false);
      router.push('/');
      // TODO: show success message here
    }).catch((err) => {
      // TODO: show error here
      console.error(err);
    });
  };
  const [confirmDelete, setConfirmDelete] = useState(() => handleDeleteTodo);

  const handleDeleteTodoButton = () => {
    setShowModal(true);
    setConfirmDelete(() => handleDeleteTodo);
  };

  const handleNewCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentForm({ ...commentForm, comment: e.target.value });
  };

  const handleNewCommentClick = () => {
    setCommentForm({} as IComment);
    setNewComment(true);
  };

  const handleSaveCommentClick = () => {
    createCommentApi(commentForm, routerQueryId)
      .then(() => {
        setCommentForm({} as IComment);
        setNewComment(false);
        refetch();
      }).catch((err) => console.error(err));
  };

  return (
    <>
      <Head>
        <title>{data.title}</title>
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
              onClick={handleDeleteTodoButton}
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
                  className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                  className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Comments</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                  {comments?.map((item) => (
                    <Comment
                      data={{ ...item, todoId: routerQueryId }}
                      setConfirmDelete={setConfirmDelete}
                      setShowModal={setShowModal}
                      refetch={refetch}
                    />
                  ))}
                  <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                    <div className="flex w-0 flex-1 items-center">
                      {newComment ? (
                        <>
                          <input
                            className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Comment"
                            type="text"
                            onChange={handleNewCommentChange}
                            value={commentForm.comment}
                          />
                          <div className="ml-4 flex">

                            <div role="button" onClick={() => setNewComment(false)}>
                              <CancelIcon />
                            </div>
                            <div role="button" onClick={handleSaveCommentClick}>
                              <ConfirmIcon />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div
                          role="button"
                          onClick={handleNewCommentClick}
                          className="w-full flex justify-center bg-gray-50 px-4 py-5 sm:gap-4 sm:px-6 place-items-center"
                        >
                          <dt className="text-sm font-medium text-gray-500 flex">
                            <AddIcon />
                            Add new comment
                          </dt>
                        </div>
                      )}
                    </div>

                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
        {edit && (
        <div className="justify-self-end px-6">
          <button
            className="mr-2 text-blue-700 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            type="button"
            onClick={() => setEdit(false)}
          >
            Cancel
          </button>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            type="button"
            onClick={handleSaveClick}
          >
            Save
          </button>
        </div>
        )}

      </div>
      {showModal && (
        <Modal
          handleClose={() => setShowModal(false)}
          handleConfirm={confirmDelete}
        />
      )}
    </>
  );
};

export default TodoDetails;
