import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Homework Tracker",
  description: "Track homework assignments for Dindin and Bebi Elai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
