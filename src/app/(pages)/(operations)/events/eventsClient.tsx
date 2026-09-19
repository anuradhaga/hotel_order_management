"use client";

import dynamic from "next/dynamic";

const EventsComponent = dynamic(
  () => import("@/components/pages/operations/events/events"),
  {
    ssr: false,
    loading: () => (
      <div className="page-wrapper d-flex align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Events...</span>
        </div>
      </div>
    ),
  }
);

export default function EventsClient() {
  return <EventsComponent />;
}
