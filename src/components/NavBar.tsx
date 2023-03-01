const NavBar = () => (
  <nav className="px-2 bg-blue-700 border-gray-200 dark:bg-gray-900 dark:border-gray-700">
    <div className="container flex flex-wrap items-center justify-between mx-auto">
      <a href="/" className="flex items-center h-12">
        <span className="self-center text-xl text-white font-semibold dark:text-white">Todo App</span>
      </a>
      {/* <div>
          <span className="self-center text-xl text-white font-semibold dark:text-white">{`Hi User!`}</span>
        </div> */}
    </div>
  </nav>
);

export default NavBar;
