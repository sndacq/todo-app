import { useQuery } from 'react-query';
import router from 'next/router';
import { getTodosListApi } from '@/api';
import { ITodo } from '@/utils/types';
import { useAppContext } from '@/context/state';
import { AddIcon, LoadingSpinner } from './Icons';

const TodoList = () => {
  const { userData } = useAppContext();
  const { isLoading, error, data } = useQuery<ITodo[], Error>('todoDetails', () => getTodosListApi(userData.id).then((res) => res));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{`An error has occurred: ${error.message}`}</p>;

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Created at
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td className="w-full h-60 flex justify-center" colSpan={4}>
                {/* TODO: FIXME */}
                <LoadingSpinner />
              </td>
            </tr>
          ) : (
            <>
              {data?.map((item) => (
                <tr className="bg-white border-b">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      disabled
                      checked={item.status}
                      className="block flex-1 rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </td>
                  <td>
                    <div
                      className="px-6 py-4 cursor-pointer"
                      role="link"
                      onClick={() => router.push(`/todo/${item.id}`)}
                    >
                      {item.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {item.description}
                  </td>
                  <td className="px-6 py-4">
                    {item.createdAt}
                  </td>
                </tr>
              ))}
              <tr
                className="cursor-pointer"
                onClick={() => router.push('todo/create')}
              >
                <td colSpan={4}>
                  <div className="w-full flex justify-center bg-gray-50 px-4 py-5 sm:gap-4 sm:px-6 place-items-center">
                    <dt className="text-sm font-medium text-gray-500 flex">
                      <AddIcon />
                      Create new task
                    </dt>
                  </div>
                </td>
              </tr>
            </>
          )}

        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
