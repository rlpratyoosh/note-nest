import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { dark } from '@clerk/themes'

export const metadata: Metadata = {
  title: "Note-Nest",
  description: "A Nest for your Notes",
  icons: {
    icon: './nest.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{baseTheme: dark}}>
    <html lang="en">
      <body className="dark">{children}</body>
    </html>
    </ClerkProvider>
  );
}
