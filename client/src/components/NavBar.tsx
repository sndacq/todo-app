import { useRouter } from 'next/router';
import { SearchIcon } from './Icons';
import FilterDropdown from './FilterDropdown';
import { useAppContext } from '@/context/state';

const NavBar = () => {
  const router = useRouter();
  const { searchValue, setSearchValue } = useAppContext();

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <nav className="px-2 bg-blue-700 border-gray-200">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center h-12">
          <span className="self-center text-xl text-white font-semibold">Todo App</span>
        </a>
        {router.pathname === '/' && (
        <div className="nav-items flex items-center">
          <FilterDropdown />

          <div className="search-input">
            <div className="absolute top-3.5 flex items-center pl-3 pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchValueChange}
            />
          </div>
        </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
