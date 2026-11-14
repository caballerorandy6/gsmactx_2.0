import Link from "next/link";

const NotFound = () => {
  return (
    <main className="grid min-h-svh place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-4xl font-semibold text-primary-500">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
          Sorry, we couldn’t find that service page.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/services"
            className="inline-flex w-full items-center justify-center rounded-md bg-primary-600 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 sm:w-auto"
          >
            View all services
          </Link>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-md px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/25 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 sm:w-auto"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
