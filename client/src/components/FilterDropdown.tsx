import { useState } from 'react';
import { FilterIcon } from './Icons';
import { useAppContext } from '@/context/state';

const FilterDropdown = () => {
  const [active, setActive] = useState(false);
  const { filterOptions, setFilterOptions } = useAppContext();
  const { status } = filterOptions;

  const handleFilterChange = () => {
    setFilterOptions({ ...filterOptions, status: { ...status, active: !status?.active } });
  };
  const handleStatusTrueChange = () => {
    setFilterOptions({ ...filterOptions, status: { ...status, finished: !status?.finished } });
  };
  const handleStatusFalseChange = () => {
    setFilterOptions({ ...filterOptions, status: { ...status, unfinished: !status?.unfinished } });
  };

  return (
    <>
      <div
        role="button"
        onClick={() => setActive(!active)}
        className="bg-white mr-2 h-8 w-fit rounded-md cursor-pointer hover:bg-gray-200 flex items-center"
      >
        <FilterIcon />
      </div>
      <div className={`z-10 absolute top-14 bg-white divide-y divide-gray-100 rounded-lg shadow w-50 ${!active && 'hidden'}`}>
        <p className="m-2">Filter by</p>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          <li>
            <div className={`flex px-4 py-2 ${!status?.active && 'opacity-50 cursor-not-allowed'}`}>
              <div className="flex h-4">
                <input
                  type="checkbox"
                  checked={status?.active}
                  onChange={handleFilterChange}
                  className="w-4 h-4 rounded border-gray-300 sm:text-sm"
                />
                <p className="text-sm ml-2 flex itemsfont-medium text-gray-900 dark:text-gray-300">Status</p>

              </div>
              <div className="flex items-center ml-2">
                <input
                  type="checkbox"
                  checked={status?.finished}
                  onChange={handleStatusTrueChange}
                  className="w-4 h-4 rounded border-gray-300 sm:text-sm"
                />
                <p className="text-xs font-medium text-gray-900 dark:text-gray-300">True</p>
              </div>
              <div className="flex items-center ml-2">
                <input
                  type="checkbox"
                  checked={status?.unfinished}
                  onChange={handleStatusFalseChange}
                  className="w-4 h-4 rounded border-gray-300 sm:text-sm"
                />
                <p className="text-xs font-medium text-gray-900 dark:text-gray-300">False</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>

  );
};

export default FilterDropdown;
