export const FACTORY_ADDRESS = "0x602473fc59ff5eefbe5d6c86d3af5c64ac7987bc" as const;
export const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as const;
export const MORPHO_VAULT_ADDRESS = "0x050cE30b927Da55177A4914EC73480238BAD56f0" as const;

export const FACTORY_ABI = [
  {
    type: "function",
    name: "getVault",
    stateMutability: "view",
    inputs: [{ type: "uint256", name: "_matchId" }],
    outputs: [{ type: "address", name: "" }],
  },
  {
    type: "function",
    name: "totalMatches",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256", name: "" }],
  },
  {
    type: "function",
    name: "nextMatchId",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256", name: "" }],
  },
  {
    type: "function",
    name: "vaults",
    stateMutability: "view",
    inputs: [{ type: "uint256", name: "" }],
    outputs: [{ type: "address", name: "" }],
  },
  {
    type: "function",
    name: "allVaults",
    stateMutability: "view",
    inputs: [{ type: "uint256", name: "" }],
    outputs: [{ type: "address", name: "" }],
  },
] as const;

export const VAULT_ABI = [
  {
    type: "function",
    name: "deposit",
    stateMutability: "nonpayable",
    inputs: [
      { type: "uint8", name: "team" },
      { type: "uint256", name: "amount" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "claim",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "totalTeamA",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256", name: "" }],
  },
  {
    type: "function",
    name: "totalTeamB",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256", name: "" }],
  },
  {
    type: "function",
    name: "status",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint8", name: "" }],
  },
  {
    type: "function",
    name: "winner",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint8", name: "" }],
  },
  {
    type: "function",
    name: "getExpectedPayout",
    stateMutability: "view",
    inputs: [{ type: "address", name: "user" }],
    outputs: [{ type: "uint256", name: "" }],
  },
  {
    type: "function",
    name: "userDeposits",
    stateMutability: "view",
    inputs: [
      { type: "address", name: "" },
      { type: "uint8", name: "" },
    ],
    outputs: [{ type: "uint256", name: "" }],
  },
  {
    type: "function",
    name: "getUserTotalDeposit",
    stateMutability: "view",
    inputs: [{ type: "address", name: "user" }],
    outputs: [{ type: "uint256", name: "" }],
  },
  {
    type: "function",
    name: "hasClaimed",
    stateMutability: "view",
    inputs: [{ type: "address", name: "" }],
    outputs: [{ type: "bool", name: "" }],
  },
  {
    type: "function",
    name: "getYieldBalance",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256", name: "" }],
  },
  {
    type: "function",
    name: "getTotalDeposits",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256", name: "" }],
  },
  {
    type: "function",
    name: "totalYield",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256", name: "" }],
  },
  {
    type: "function",
    name: "teamAName",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "string", name: "" }],
  },
  {
    type: "function",
    name: "teamBName",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "string", name: "" }],
  },
  {
    type: "function",
    name: "MATCH_ID",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256", name: "" }],
  },
  {
    type: "function",
    name: "paused",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "bool", name: "" }],
  },
] as const;

export const ERC20_ABI = [
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { type: "address", name: "spender" },
      { type: "uint256", name: "amount" },
    ],
    outputs: [{ type: "bool", name: "" }],
  },
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      { type: "address", name: "owner" },
      { type: "address", name: "spender" },
    ],
    outputs: [{ type: "uint256", name: "" }],
  },
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ type: "address", name: "account" }],
    outputs: [{ type: "uint256", name: "" }],
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint8", name: "" }],
  },
] as const;
