import { useQuery } from 'react-query';
import router from 'next/router';
import { getTodosListApi } from '@/api';
import { ITodo } from '@/utils/types';
import { useAppContext } from '@/context/state';

const TodoList = () => {
  const { userData } = useAppContext();
  const { isLoading, error, data } = useQuery<ITodo[], Error>('todoDetails', () => getTodosListApi(userData.id).then((res) => res));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{`An error has occurred: ${error.message}`}</p>;

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
          {data?.map((item) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" onClick={() => router.push(`/todo/${item.id}`)}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <input type="checkbox" disabled checked={item.status} className="block flex-1 rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </th>
              <td className="px-6 py-4">
                {item.title}
              </td>
              <td className="px-6 py-4">
                {item.description}
              </td>
              <td className="px-6 py-4">
                {item.createdAt}
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
