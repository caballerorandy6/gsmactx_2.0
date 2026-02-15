import Link from "next/link";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";

interface EmptyDashboardStateProps {
  userName: string;
}

const EmptyDashboardState = ({ userName }: EmptyDashboardStateProps) => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <DashboardHeader />

      <div className="flex items-center justify-center min-h-screen pt-20">
        <div className="text-center text-gray-400 max-w-md mx-auto p-8">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-4">
            Welcome, {userName}!
          </h2>

          <p className="text-gray-400 mb-6">
            No campaigns available. Start by creating your first email campaign
            to engage with your customers.
          </p>

          <Link
            href="/create-campaign"
            className="inline-flex items-center gap-2 rounded-md bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-400 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Your First Campaign
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EmptyDashboardState;
