import type { Metadata } from "next";
import "./globals.css";
import 'react-loading-skeleton/dist/skeleton.css'
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Home",
  description: "ExcellenceMW Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
        <body className="">
            <Toaster position="bottom-right" />
            {children}
        </body>
    </html>
  );
}
