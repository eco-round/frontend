import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Web3Provider from "@/providers/Web3Provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoRound | No-Loss Esports Predictions",
  description: "Predict esports match winners with no risk. Deposit USDC, earn yield via Morpho vaults on Base. Winners take the yield, everyone gets their principal back. Powered by Chainlink CRE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0F1923] text-[#ECE8E1]`}
      >
        <Web3Provider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Web3Provider>
      </body>
    </html>
  );
}
