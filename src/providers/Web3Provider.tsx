"use client";

import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/config/wagmi";

import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

const valorantTheme = darkTheme({
  accentColor: "#FF4655",
  accentColorForeground: "white",
  borderRadius: "small",
  fontStack: "system",
});

valorantTheme.colors.modalBackground = "#1A2634";
valorantTheme.colors.profileForeground = "#0F1923";

export default function Web3Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={valorantTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
