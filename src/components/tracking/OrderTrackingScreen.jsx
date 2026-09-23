"use client";

import { useState } from "react";
import { useOrder } from "@/hooks/useOrder";
import { useToast } from "@/components/ui/Toast";
import StatusCard from "@/components/tracking/StatusCard";
import ProgressTimeline from "@/components/tracking/ProgressTimeline";
import EtaBanner from "@/components/tracking/EtaBanner";
import OrderSummaryCard from "@/components/tracking/OrderSummaryCard";
import DelayNotice from "@/components/tracking/DelayNotice";
import DeliveredNotReceived from "@/components/tracking/DeliveredNotReceived";
import TrackingUnavailable from "@/components/tracking/TrackingUnavailable";
import ActionBar from "@/components/tracking/ActionBar";
import OrderDetailsSheet from "@/components/sheets/OrderDetailsSheet";
import ContactSupportSheet from "@/components/sheets/ContactSupportSheet";
import ReportIssueSheet from "@/components/sheets/ReportIssueSheet";
import TrackingSkeleton from "@/components/states/TrackingSkeleton";
import ErrorState from "@/components/states/ErrorState";
import EmptyState from "@/components/states/EmptyState";

/**
 * OrderTrackingScreen — the main tracking screen.
 * Receives `scenario` from parent (page.js) so state is shared with the switcher.
 * Handles loading, error, empty, and all scenario states.
 *
 * @param {string} scenario — current scenario id from parent state
 * @param {function} onResetScenario — called to reset back to "normal" (for retry)
 */
export default function OrderTrackingScreen({ scenario, onResetScenario }) {
  const { data, loading, error, refetch, currentScenario } = useOrder({
    scenario,
    autoFetch: true,
  });
  const addToast = useToast();

  // Sheet open states
  const [showDetails, setShowDetails] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showReport, setShowReport] = useState(false);

  // ── Shared sheets fragment (H3) ──────────────────────────
  // Defined once and rendered in every branch so sheets are always available
  const sheetsFragment = (
    <>
      <OrderDetailsSheet
        open={showDetails}
        onClose={() => setShowDetails(false)}
        order={data}
      />
      <ContactSupportSheet
        open={showSupport}
        onClose={() => setShowSupport(false)}
        onStartChat={() => addToast({ type: "info", message: "Opening live chat..." })}
        onCall={() => addToast({ type: "info", message: "Dialing support..." })}
        onEmail={() => {
          window.location.href = "mailto:support@shop.com";
          addToast({ type: "info", message: "Opening email client..." });
        }}
      />
      <ReportIssueSheet
        open={showReport}
        onClose={() => setShowReport(false)}
        initialReason="not_received"
      />
    </>
  );

  // ── Loading state ────────────────────────────────────────
  if (loading || currentScenario === "loading") {
    return (
      <div className="pb-20">
        <TrackingSkeleton />
        {sheetsFragment}
      </div>
    );
  }

  // ── Error state ──────────────────────────────────────────
  if (error || currentScenario === "error") {
    const handleRetry = () => {
      if (currentScenario === "error") {
        onResetScenario();
        addToast({ type: "info", message: "Returning to normal tracking..." });
      } else {
        refetch();
      }
    };

    return (
      <div className="flex flex-col gap-4 pb-20">
        <ErrorState
          message={data?.errorMessage || error?.message || "Something went wrong"}
          onRetry={handleRetry}
        />
        {sheetsFragment}
      </div>
    );
  }

  // ── No data ──────────────────────────────────────────────
  if (!data) {
    return (
      <div className="pb-20">
        <EmptyState />
        {sheetsFragment}
      </div>
    );
  }

  // ── Tracking unavailable (order confirmed, no steps yet) ─
  if (data.status === "tracking_unavailable") {
    return (
      <div className="flex flex-col gap-4 pb-20">
        <StatusCard
          status="tracking_unavailable"
          headline="Order Confirmed"
          subMessage={data.dispatchWindowLabel || "We're preparing your order."}
        />
        <TrackingUnavailable
          order={data}
          onNotifyMe={() =>
            addToast({ type: "success", message: "You'll be notified when tracking updates!" })
          }
        />
        <OrderSummaryCard order={data} onViewDetails={() => setShowDetails(true)} />
        <ProgressTimeline
          completedSteps={data.completedSteps}
          trackingHistory={data.trackingHistory}
          currentStatus={data.status}
          variant="tracking_unavailable"
        />
        <ActionBar onContactSupport={() => setShowSupport(true)} onChat={() => setShowSupport(true)} />
        {sheetsFragment}
      </div>
    );
  }

  // ── Delayed order ────────────────────────────────────────
  if (data.status === "delayed") {
    return (
      <div className="flex flex-col gap-4 pb-20">
        <StatusCard
          status="delayed"
          headline="Delivery Delayed"
          subMessage={data.delayLabel || "Your delivery is running late."}
        />
        <EtaBanner
          label={data.etaLabel || "ETA unavailable"}
          variant="delayed"
        />
        <DelayNotice
          order={data}
          onContactSupport={() => setShowSupport(true)}
          onGetNotified={() =>
            addToast({ type: "info", message: "You'll be notified of any changes." })
          }
        />
        <OrderSummaryCard order={data} onViewDetails={() => setShowDetails(true)} />
        <ProgressTimeline
          completedSteps={data.completedSteps}
          trackingHistory={data.trackingHistory}
          currentStatus={data.status}
          variant="delayed"
        />
        <ActionBar onContactSupport={() => setShowSupport(true)} onChat={() => setShowSupport(true)} />
        {sheetsFragment}
      </div>
    );
  }

  // ── Delivered but not received ───────────────────────────
  if (data.status === "delivered_not_received") {
    return (
      <div className="flex flex-col gap-4 pb-20">
        <StatusCard
          status="delivered_not_received"
          headline="Delivered — Not Yet Received"
          subMessage="We marked this as delivered, but you haven't received it."
        />
        <DeliveredNotReceived
          order={data}
          onReportIssue={() => setShowReport(true)}
          onContactSupport={() => setShowSupport(true)}
        />
        <OrderSummaryCard order={data} onViewDetails={() => setShowDetails(true)} />
        <ProgressTimeline
          completedSteps={data.completedSteps}
          trackingHistory={data.trackingHistory}
          currentStatus={data.status}
          variant="delivered_not_received"
        />
        <ActionBar onContactSupport={() => setShowSupport(true)} onChat={() => setShowSupport(true)} />
        {sheetsFragment}
      </div>
    );
  }

  // ── Normal in-transit (including delivered) ───────────────
  // Determine headline/sub-message based on status
  const getStatusDisplay = () => {
    switch (data.status) {
      case "order_confirmed":
        return { headline: "Order Confirmed", sub: "We've received your order." };
      case "processing":
        return { headline: "Processing", sub: "Your order is being prepared." };
      case "shipped":
        return { headline: "Shipped", sub: "Your package is on its way." };
      case "out_for_delivery":
        return { headline: "Out for Delivery", sub: "Your package will arrive soon!" };
      case "delivered":
        return { headline: "Delivered", sub: "Your package has been delivered." };
      default:
        return { headline: "In Transit", sub: "" };
    }
  };

  const { headline, sub } = getStatusDisplay();

  return (
    <div className="flex flex-col gap-4 pb-20">
      {/* Main status card */}
      <StatusCard status={data.status} headline={headline} subMessage={sub} />

      {/* ETA banner (only if ETA exists) */}
      {data.eta && (
        <EtaBanner
          label={data.etaLabel || `Estimated: ${data.eta.toLocaleString()}`}
          variant={data.status === "delivered" ? "info" : "normal"}
        />
      )}

      {/* Progress timeline */}
      <ProgressTimeline
        completedSteps={data.completedSteps}
        trackingHistory={data.trackingHistory}
        currentStatus={data.status}
      />

      {/* Order summary */}
      <OrderSummaryCard order={data} onViewDetails={() => setShowDetails(true)} />

      {/* Sticky action bar */}
      <ActionBar onContactSupport={() => setShowSupport(true)} onChat={() => setShowSupport(true)} />

      {/* Sheets */}
      {sheetsFragment}
    </div>
  );
}
