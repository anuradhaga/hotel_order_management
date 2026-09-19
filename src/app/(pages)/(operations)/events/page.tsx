import { getPageMetadata } from "@/config/metadata";
import EventsClient from "./eventsClient";

export const generateMetadata = () => {
  return getPageMetadata("Special Events & Banquets");
};

export default function EventsPage() {
  return (
    <>
      <EventsClient />
    </>
  );
}
