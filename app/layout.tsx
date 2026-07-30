import type { Metadata } from "next";
import { Michroma } from "next/font/google";
import "./globals.css";
import FloatingSocialButtons from "@/components/common/FloatingSocialButtons";

const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-michroma",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JKAYY",
  description:
    "JKAYY — Artist, Performer and Live Experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className={`${michroma.variable} bg-[#050505] text-white antialiased`}
      >
        {children}


  <FloatingSocialButtons />
      </body>
    </html>
  );
}