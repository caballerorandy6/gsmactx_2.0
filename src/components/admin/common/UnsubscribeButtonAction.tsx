"use client";

import { useTransition, useState } from "react";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { unsubscribeFromCampaignAction } from "@/app/actions/campaignAction";
import {
  authPrimaryButtonClass,
  authSecondaryLinkClass,
} from "@/components/auth/AuthShell";
import ButtonSpinner from "@/components/ui/ButtonSpinner";

const UnsubscribeButtonAction = ({ token }: { token: string }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleUnsubscribe = () => {
    setError(null);
    startTransition(async () => {
      try {
        const result = await unsubscribeFromCampaignAction(token);
        if (result.success) {
          setIsSuccess(true);
        } else {
          setError(result.message);
        }
      } catch {
        setError("Something went wrong. Please try again.");
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="text-center" role="status">
        <CheckCircleIcon aria-hidden="true" className="mx-auto mb-4 size-10 text-green-400" />
        <h1 className="text-2xl font-bold tracking-tight text-balance text-white mb-3">
          You&apos;re unsubscribed
        </h1>
        <p className="text-gray-300 mb-6">
          You won&apos;t receive any more marketing emails from GSM A/C.
        </p>
        <Link href="/" className={authSecondaryLinkClass}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold tracking-tight text-balance text-white mb-3">
        Unsubscribe from our emails
      </h1>
      <p className="text-gray-300 mb-8">
        You&apos;ll stop receiving offers and seasonal reminders from GSM A/C.
        Appointment confirmations aren&apos;t affected.
      </p>
      <button
        type="button"
        onClick={handleUnsubscribe}
        disabled={isPending}
        className={authPrimaryButtonClass}
      >
        {isPending ? <ButtonSpinner label="Unsubscribing" /> : "Unsubscribe"}
      </button>
      {error && (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {error}
        </p>
      )}
      <div className="mt-6">
        <Link href="/" className={authSecondaryLinkClass}>
          Keep me subscribed
        </Link>
      </div>
    </div>
  );
};

export default UnsubscribeButtonAction;
