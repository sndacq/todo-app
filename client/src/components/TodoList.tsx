import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import router from 'next/router';
import { getTodosListApi } from '@/api';
import { ITodo } from '@/utils/types';
import { useAppContext, ISortValue } from '@/context/state';
import { AddIcon, LoadingSpinner, SortHeaderArrow } from './Icons';

const TodoList = () => {
  const [itemsList, setItemsList] = useState([] as ITodo[]);
  const [filteredList, setFilteredList] = useState([] as ITodo[]);
  const {
    searchValue, sortValue, toggleSortValue, filterOptions,
  } = useAppContext();

  const { isLoading, data } = useQuery('todoDetails', () => getTodosListApi().then((res) => {
    setItemsList(res);
    return res;
  }));

  useEffect(() => {
    if (searchValue !== '') {
      const searched = itemsList.filter((item) => item.title.includes(searchValue));
      setFilteredList(searched);
    } else setFilteredList(data);
  }, [searchValue, itemsList]);

  useEffect(() => {
    if (sortValue === ISortValue.INC) {
      const sortedInc = itemsList.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        return 0;
      });
      setFilteredList(sortedInc);
    } else if (sortValue === ISortValue.DEC) {
      const sortedDec = itemsList.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;
        return 0;
      });
      setFilteredList(sortedDec);
    } else setFilteredList(data);
  }, [sortValue, itemsList]);

  useEffect(() => {
    const { status } = filterOptions;
    const { finished, unfinished } = status;
    const filteredItems = [];
    if (status.active) {
      if (finished) {
        const finishedItems = itemsList.filter((item) => item.status === true);
        filteredItems.push(...finishedItems);
      }
      if (unfinished) {
        const unfinishedItems = itemsList.filter((item) => item.status === false);
        filteredItems.push(...unfinishedItems);
      }
      setFilteredList(filteredItems);
    } else setFilteredList(data);
  }, [filterOptions, itemsList]);

  return (
    <div className="relative overflow-x-auto">
      {isLoading ? (
        <div className="w-full h-60 flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
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
                <div role="button" className="flex cursor-pointer" onClick={toggleSortValue}>
                  Created at
                  <SortHeaderArrow />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredList?.map((item) => (
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
          </tbody>
        </table>
      )}

    </div>
  );
};

export default TodoList;
