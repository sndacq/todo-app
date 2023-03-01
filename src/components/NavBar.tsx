const NavBar = () => (
  <nav className="px-2 bg-blue-700 border-gray-200">
    <div className="container flex flex-wrap items-center justify-between mx-auto">
      <a href="/" className="flex items-center h-12">
        <span className="self-center text-xl text-white font-semibold">Todo App</span>
      </a>
      {/* <div>
          <span className="self-center text-xl text-white font-semibold">{`Hi User!`}</span>
        </div> */}
    </div>
  </nav>
);

export default NavBar;
