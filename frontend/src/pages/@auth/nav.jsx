function Nav() {
  return (
    <nav class="2xl:fixed w-full top-0 left-0">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="/satlogo1.jpeg"
            alt="AgroXSAT Logo"
            className="rounded-xl h-10"
          />
          <span class="self-center text-xl font-semibold whitespace-nowrap text-white">
            AgroXSAT
          </span>
        </a>
      </div>
    </nav>
  );
}

export default Nav;
