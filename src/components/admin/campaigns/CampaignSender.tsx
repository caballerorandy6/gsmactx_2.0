"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  initializeCampaignEmailLogsAction,
  sendCampaignBatchAction,
  getCampaignStatsAction,
  retryFailedEmailsAction,
} from "@/app/actions/sendCampaignEmailAction";
import {
  ArrowPathIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import ConfirmDialog from "@/components/admin/common/ConfirmDialog";
import CampaignStatTiles, { percentOf } from "./CampaignStatTiles";

interface CampaignSenderProps {
  campaignId: string;
  campaignTitle: string;
}

interface CampaignStats {
  total: number;
  sent: number;
  failed: number;
  pending: number;
  emailsSentToday: number;
  remainingQuota: number;
}

export default function CampaignSender({
  campaignId,
  campaignTitle,
}: CampaignSenderProps) {
  const [stats, setStats] = useState<CampaignStats | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmingInit, setConfirmingInit] = useState(false);

  // Load stats on mount and after operations
  const loadStats = async () => {
    try {
      const data = await getCampaignStatsAction(campaignId);
      setStats(data);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();

    // Auto-refresh stats every 15 seconds if campaign is not complete
    const interval = setInterval(() => {
      if (stats && stats.pending > 0) {
        loadStats();
      }
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignId, stats?.pending]);

  const handleInitialize = async () => {
    setIsInitializing(true);
    try {
      const result = await initializeCampaignEmailLogsAction(campaignId);
      if (result.success) {
        toast.success(result.message);
        setConfirmingInit(false);
        await loadStats();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Couldn't queue the campaign. Try again.");
    } finally {
      setIsInitializing(false);
    }
  };

  const handleSendBatch = async () => {
    setIsSending(true);
    try {
      const result = await sendCampaignBatchAction(campaignId);
      if (result.success) {
        toast.success(result.message);
        await loadStats();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to send batch");
    } finally {
      setIsSending(false);
    }
  };

  const handleRetryFailed = async () => {
    setIsRetrying(true);
    try {
      const result = await retryFailedEmailsAction(campaignId);
      if (result.success) {
        toast.success(result.message);
        await loadStats();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to retry emails");
    } finally {
      setIsRetrying(false);
    }
  };

  if (isLoading) {
    return (
      <div
        role="status"
        className="space-y-4 rounded-xl border border-white/10 bg-gray-800/50 p-6 motion-safe:animate-pulse"
      >
        <span className="sr-only">Loading sending status…</span>
        <div className="h-5 w-1/3 rounded bg-white/10" />
        <div className="h-4 w-1/2 rounded bg-white/10" />
      </div>
    );
  }

  const isInitialized = stats && stats.total > 0;
  const isComplete = stats && stats.pending === 0 && stats.total > 0;
  const progress = stats && stats.total > 0 ? (stats.sent / stats.total) * 100 : 0;
  const quotaUsed = stats ? Math.min(stats.emailsSentToday, 100) : 0;

  return (
    <section
      aria-labelledby="sending-heading"
      className="space-y-6 rounded-xl border border-white/10 bg-gray-800/50 p-4 sm:p-6"
    >
      <div>
        <h2 id="sending-heading" className="text-lg font-semibold text-white">
          Sending
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Emails go out in batches of up to 100 a day, the limit of our email
          provider.
        </p>
      </div>

      {isInitialized && stats && (
        <>
          <CampaignStatTiles
            stats={[
              { label: "Recipients", value: stats.total },
              { label: "Sent", value: stats.sent, note: percentOf(stats.sent, stats.total) },
              { label: "Failed", value: stats.failed, alert: stats.failed > 0 },
              { label: "Waiting", value: stats.pending },
            ]}
          />

          <div>
            <div className="mb-2 flex justify-between text-sm text-gray-400">
              <span id="progress-label">Progress</span>
              <span className="tabular-nums">{Math.round(progress)}%</span>
            </div>
            <div
              role="progressbar"
              aria-labelledby="progress-label"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              className="h-2 w-full overflow-hidden rounded-full bg-white/10"
            >
              <div
                className="h-full bg-primary-500 transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </>
      )}

      {stats && (
        <div className="border-t border-white/10 pt-4">
          <div className="flex items-baseline justify-between gap-4 text-sm">
            <span className="text-gray-300">Today&apos;s sending limit</span>
            <span className="tabular-nums text-gray-400">
              <span
                className={
                  stats.remainingQuota === 0 ? "font-semibold text-red-400" : "font-semibold text-white"
                }
              >
                {stats.remainingQuota}
              </span>{" "}
              of 100 left
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className={
                stats.remainingQuota === 0
                  ? "h-full rounded-full bg-red-500"
                  : "h-full rounded-full bg-gray-400"
              }
              style={{ width: `${quotaUsed}%` }}
            />
          </div>
        </div>
      )}

      {!isInitialized && (
        <p className="flex gap-2 text-sm text-gray-300">
          <InformationCircleIcon aria-hidden="true" className="size-5 shrink-0 text-primary-300" />
          Nothing has been sent yet. Queue the campaign to prepare one email per
          subscriber, then send it in batches.
        </p>
      )}

      {stats && stats.remainingQuota === 0 && stats.pending > 0 && (
        <p className="flex gap-2 text-sm text-gray-300">
          <ExclamationTriangleIcon aria-hidden="true" className="size-5 shrink-0 text-amber-400" />
          <span>
            <strong className="font-semibold text-white">Daily limit reached.</strong>{" "}
            The remaining {stats.pending} emails go out with tomorrow
            morning&apos;s automatic send, or you can send them by hand then.
          </span>
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        {!isInitialized ? (
          <button
            type="button"
            onClick={() => setConfirmingInit(true)}
            className="rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            Queue campaign
          </button>
        ) : isComplete ? (
          <p className="flex items-center gap-2 text-sm font-medium text-white">
            <CheckCircleIcon aria-hidden="true" className="size-5 text-green-400" />
            Every email has been processed.
          </p>
        ) : (
          <>
            <button
              type="button"
              onClick={handleSendBatch}
              disabled={isSending || stats?.remainingQuota === 0}
              className="flex items-center justify-center gap-2 rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <EnvelopeIcon aria-hidden="true" className="size-5" />
              {isSending ? "Sending…" : "Send next batch"}
            </button>

            {stats && stats.failed > 0 && (
              <button
                type="button"
                onClick={handleRetryFailed}
                disabled={isRetrying}
                className="flex items-center justify-center gap-2 rounded-md bg-white/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ArrowPathIcon aria-hidden="true" className="size-5" />
                {isRetrying ? "Retrying…" : `Retry ${stats.failed} failed`}
              </button>
            )}
          </>
        )}
      </div>

      <ConfirmDialog
        open={confirmingInit}
        onClose={() => setConfirmingInit(false)}
        onConfirm={handleInitialize}
        tone="primary"
        title="Queue this campaign for every subscriber?"
        description={
          <>
            <strong className="font-semibold text-white">{campaignTitle}</strong>{" "}
            gets one email per subscriber. Emails go out in daily batches of up
            to 100 and can&apos;t be recalled once sent.
          </>
        }
        confirmLabel="Queue campaign"
        pendingLabel="Queuing…"
        isPending={isInitializing}
      />
    </section>
  );
}
