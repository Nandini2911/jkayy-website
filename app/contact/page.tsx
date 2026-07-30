import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";


export const metadata: Metadata = {
  title: "Contact JKAYY | Bookings & Collaborations",
  description:
    "Contact JKAYY for festivals, weddings, corporate events, private celebrations and luxury events worldwide.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}