# EcoRound — Frontend

Next.js 16 + React 19 + TailwindCSS 4 frontend for the EcoRound no-loss prediction platform. Valorant-themed dark UI with wallet integration via wagmi + RainbowKit.

## Pages

| Route | Description |
|---|---|
| `/` | Hero landing page |
| `/matches` | Browse all matches with status filters |
| `/match/[id]` | Match detail — deposit USDC, view pool stats, claim rewards |
| `/my-predictions` | Portfolio view of all user positions |
| `/faucet` | Mint test USDC and ETH (Tenderly faucet) |

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TailwindCSS 4 |
| Wallet | wagmi v2, viem, RainbowKit |
| Chain | Base (Tenderly virtual fork, Chain ID 84531) |

## Setup

```bash
cd frontend
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local:
#   NEXT_PUBLIC_RPC_URL=https://virtual.rpc.tenderly.co/ecoround/...
#   NEXT_PUBLIC_WC_PROJECT_ID=<WalletConnect project ID>
#   NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1

npm run dev
# Open http://localhost:3000
```

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_RPC_URL` | Tenderly fork RPC URL (also used as faucet endpoint) |
| `NEXT_PUBLIC_WC_PROJECT_ID` | WalletConnect project ID from [cloud.walletconnect.com](https://cloud.walletconnect.com) |
| `NEXT_PUBLIC_API_URL` | api-simulator base URL |

## Key Hooks

| Hook | Description |
|---|---|
| `useMatches` | Fetch all matches from api-simulator |
| `useMatch(id)` | Fetch single match with results |
| `useVaultData(vaultAddr)` | Read on-chain vault stats (deposits, yield, status) |
| `useUserPosition(vaultAddr)` | Read user's deposit amounts per team |
| `useDeposit(vaultAddr)` | Approve USDC + call `deposit(team, amount)` |
| `useClaim(vaultAddr)` | Call `claim()` to receive payout |
| `useFaucet` | Mint 10,000 USDC via `tenderly_addErc20Balance` |
| `useEthFaucet` | Mint 1 ETH via `tenderly_addBalance` |

## Wallet Configuration

Wagmi is configured with a 12-second polling interval to avoid hitting Tenderly's rate limit when running alongside the admin panel:

```ts
// src/config/wagmi.ts
pollingInterval: 12_000
```

## Contract Addresses

Defined in `src/config/contracts.ts`:

| Constant | Address |
|---|---|
| `FACTORY_ADDRESS` | `0x602473fc59ff5eefbe5d6c86d3af5c64ac7987bc` |
| `USDC_ADDRESS` | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` |

## Adding MetaMask Network

In MetaMask, add a custom network:

| Field | Value |
|---|---|
| Network Name | EcoRound Base (Tenderly) |
| RPC URL | `https://virtual.rpc.tenderly.co/ecoround/...` |
| Chain ID | `84531` |
| Currency Symbol | `ETH` |
