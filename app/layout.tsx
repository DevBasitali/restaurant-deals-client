import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ToastContainer } from 'react-toastify'

export const metadata: Metadata = {
  title: "DealDish",
  description: "Best deals in your area",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
        <Toaster />
      </body>
    </html>
  );
}
