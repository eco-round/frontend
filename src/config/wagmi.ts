import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";
import { http } from "wagmi";

const TENDERLY_RPC = process.env.NEXT_PUBLIC_RPC_URL!;

export const tenderlyBase = defineChain({
  id: 84531,
  name: "EcoRound Base (Tenderly)",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: [TENDERLY_RPC] },
  },
  blockExplorers: {
    default: { name: "Tenderly", url: "https://dashboard.tenderly.co" },
  },
});

export const config = getDefaultConfig({
  appName: "EcoRound",
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || "ecoround-dev",
  chains: [tenderlyBase],
  transports: {
    [tenderlyBase.id]: http(TENDERLY_RPC),
  },
  ssr: true,
  pollingInterval: 12_000, // 12s — avoids Tenderly rate limiting (default is 4s)
});
