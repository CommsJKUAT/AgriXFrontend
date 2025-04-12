function Nav() {
  return (
    <nav class="2xl:fixed w-full top-0 left-10">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-0 pl-0 p-4">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse ml-0">
          <img
            src="/satlogo1.jpeg"
            alt="AgroXSAT Logo"
            className="rounded-xl h-10"
          />
          <span class="self-center text-xl font-semibold whitespace-nowrap text-white">
            AgriX Cubesat
          </span>
        </a>
      </div>
    </nav>
  );
}

export default Nav;
