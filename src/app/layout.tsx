import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/common/Navbar";

export const metadata: Metadata = {
  title: "KaribuVeld | Gamified ZAR-KES Liquidity & Remittance",
  description: "Next-gen peer-to-peer liquidity and instant cross-border settlement between South African Rand and Kenyan Shillings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
