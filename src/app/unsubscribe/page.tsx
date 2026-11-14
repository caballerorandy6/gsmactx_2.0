import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import AuthShell, { authSecondaryLinkClass } from "@/components/auth/AuthShell";
import UnsubscribeButtonAction from "@/components/admin/common/UnsubscribeButtonAction";
import { businessInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Unsubscribe - GSM A/C",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const UnsubscribePage = async (props: { searchParams: SearchParams }) => {
  const { token } = await props.searchParams;

  if (!token) {
    return (
      <AuthShell>
        <div className="text-center">
          <ExclamationTriangleIcon
            aria-hidden="true"
            className="mx-auto mb-4 size-10 text-amber-400"
          />
          <h1 className="text-2xl font-bold tracking-tight text-balance text-white mb-3">
            This unsubscribe link is incomplete
          </h1>
          <p className="text-gray-300">
            Use the unsubscribe link at the bottom of any of our emails. If it
            still doesn&apos;t work, call us at{" "}
            <a
              href={`tel:${businessInfo.phone}`}
              className="whitespace-nowrap font-semibold text-white underline underline-offset-4 decoration-white/30 hover:decoration-white"
            >
              (281) 235-4684
            </a>{" "}
            and we&apos;ll remove you.
          </p>
        </div>
        <div className="mt-6 text-center">
          <Link href="/" className={authSecondaryLinkClass}>
            <ArrowLeftIcon aria-hidden="true" className="size-4" />
            Back to Home
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <UnsubscribeButtonAction token={Array.isArray(token) ? token[0] : token} />
    </AuthShell>
  );
};

export default UnsubscribePage;
