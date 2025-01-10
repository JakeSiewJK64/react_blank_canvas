export const Home = () => {
  return (
    <div className="flex flex-col gap-2 w-[50%]">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="/login">
        Go to login
      </a>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Button
      </button>
      <button
        className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        onClick={() => {
          const something = undefined;
          console.log(something[0].something);
        }}
      >
        <svg
          className="me-2 h-3 w-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 14"
        >
          <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
        </svg>
        Crashing Button
      </button>
    </div>
  );
};
