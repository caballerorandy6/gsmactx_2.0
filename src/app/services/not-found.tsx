import Link from "next/link";

const NotFound = async () => {
  return (
    <div className="grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 custom-blue min-h-screen overflow-y-scroll">
      <div className="text-center">
        <p className="text-4xl font-semibold text-primary-600">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/#home"
            className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
