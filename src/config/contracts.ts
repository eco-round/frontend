export const FACTORY_ADDRESS = "0x6038d1fdaa71b793ba01fa57e0e8e854597e52d7" as const;
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

export const VAULT_ABI = [{"type":"constructor","name":"","stateMutability":"","constant":false,"inputs":[{"type":"address","name":"_owner","simpleType":"address"},{"type":"address","name":"_oracle","simpleType":"address"},{"type":"uint256","name":"_matchId","simpleType":"uint"},{"type":"string","name":"_teamA","simpleType":"string"},{"type":"string","name":"_teamB","simpleType":"string"}],"id":"b3ddfc75-c6dd-4d19-a26b-deff85bd9217"},{"type":"function","name":"setForwarderAddress","stateMutability":"nonpayable","constant":false,"inputs":[{"type":"address","name":"_forwarder","simpleType":"address"}],"id":"0xd777cc6d"},{"type":"function","name":"totalYield","stateMutability":"view","constant":false,"outputs":[{"type":"uint256","name":"","simpleType":"uint"}],"id":"0x01418205"},{"type":"function","name":"onReport","stateMutability":"nonpayable","constant":false,"inputs":[{"type":"bytes","name":"metadata","simpleType":"bytes"},{"type":"bytes","name":"report","simpleType":"bytes"}],"id":"0x805f2132"},{"type":"function","name":"teamBName","stateMutability":"view","constant":false,"outputs":[{"type":"string","name":"","simpleType":"string"}],"id":"0x11aa09b1"},{"type":"function","name":"lockMatch","stateMutability":"nonpayable","constant":false,"id":"0xc49df529"},{"type":"function","name":"owner","stateMutability":"view","constant":false,"outputs":[{"type":"address","name":"","simpleType":"address"}],"id":"0x8da5cb5b"},{"type":"function","name":"MATCH_ID","stateMutability":"view","constant":false,"outputs":[{"type":"uint256","name":"","simpleType":"uint"}],"id":"0x75e10829"},{"type":"function","name":"totalTeamA","stateMutability":"view","constant":false,"outputs":[{"type":"uint256","name":"","simpleType":"uint"}],"id":"0x669b96e2"},{"type":"function","name":"setOracle","stateMutability":"nonpayable","constant":false,"inputs":[{"type":"address","name":"_newOracle","simpleType":"address"}],"id":"0x7adbf973"},{"type":"function","name":"getUserTotalDeposit","stateMutability":"view","constant":false,"inputs":[{"type":"address","name":"user","simpleType":"address"}],"outputs":[{"type":"uint256","name":"","simpleType":"uint"}],"id":"0xa4c828dc"},{"type":"function","name":"getTotalDeposits","stateMutability":"view","constant":false,"outputs":[{"type":"uint256","name":"","simpleType":"uint"}],"id":"0x168a4822"},{"type":"function","name":"totalTeamB","stateMutability":"view","constant":false,"outputs":[{"type":"uint256","name":"","simpleType":"uint"}],"id":"0x2288fc2b"},{"type":"function","name":"oracle","stateMutability":"view","constant":false,"outputs":[{"type":"address","name":"","simpleType":"address"}],"id":"0x7dc0d1d0"},{"type":"function","name":"getExpectedPayout","stateMutability":"view","constant":false,"inputs":[{"type":"address","name":"user","simpleType":"address"}],"outputs":[{"type":"uint256","name":"","simpleType":"uint"}],"id":"0x98eca55f"},{"type":"function","name":"renounceOwnership","stateMutability":"nonpayable","constant":false,"id":"0x715018a6"},{"type":"function","name":"setExpectedAuthor","stateMutability":"nonpayable","constant":false,"inputs":[{"type":"address","name":"_author","simpleType":"address"}],"id":"0xd60c884b"},{"type":"function","name":"teamAName","stateMutability":"view","constant":false,"outputs":[{"type":"string","name":"","simpleType":"string"}],"id":"0x4e108c19"},{"type":"function","name":"hasClaimed","stateMutability":"view","constant":false,"inputs":[{"type":"address","name":"","simpleType":"address"}],"outputs":[{"type":"bool","name":"","simpleType":"bool"}],"id":"0x73b2e80e"},{"type":"function","name":"USDC","stateMutability":"view","constant":false,"outputs":[{"type":"address","name":"","simpleType":"address"}],"id":"0x89a30271"},{"type":"function","name":"unpause","stateMutability":"nonpayable","constant":false,"id":"0x3f4ba83a"},{"type":"function","name":"getExpectedAuthor","stateMutability":"view","constant":false,"outputs":[{"type":"address","name":"","simpleType":"address"}],"id":"0x3397cf67"},{"type":"function","name":"resolveMatch","stateMutability":"nonpayable","constant":false,"inputs":[{"type":"uint8","name":"_winner","simpleType":"uint"}],"id":"0x7986ad49"},{"type":"function","name":"paused","stateMutability":"view","constant":false,"outputs":[{"type":"bool","name":"","simpleType":"bool"}],"id":"0x5c975abb"},{"type":"function","name":"setExpectedWorkflowName","stateMutability":"nonpayable","constant":false,"inputs":[{"type":"string","name":"_name","simpleType":"string"}],"id":"0xbc1fc27a"},{"type":"function","name":"getExpectedWorkflowId","stateMutability":"view","constant":false,"outputs":[{"type":"bytes32","name":"","simpleType":"bytes"}],"id":"0xf5c793ef"},{"type":"function","name":"deposit","stateMutability":"nonpayable","constant":false,"inputs":[{"type":"uint8","name":"team","simpleType":"uint"},{"type":"uint256","name":"amount","simpleType":"uint"}],"id":"0xf4d4c9d7"},{"type":"function","name":"supportsInterface","stateMutability":"view","constant":false,"inputs":[{"type":"bytes4","name":"interfaceId","simpleType":"bytes"}],"outputs":[{"type":"bool","name":"","simpleType":"bool"}],"id":"0x01ffc9a7"},{"type":"function","name":"MORPHO_VAULT","stateMutability":"view","constant":false,"outputs":[{"type":"address","name":"","simpleType":"address"}],"id":"0x5bca49d2"},{"type":"function","name":"winner","stateMutability":"view","constant":false,"outputs":[{"type":"uint8","name":"","simpleType":"uint"}],"id":"0xdfbf53ae"},{"type":"function","name":"transferOwnership","stateMutability":"nonpayable","constant":false,"inputs":[{"type":"address","name":"newOwner","simpleType":"address"}],"id":"0xf2fde38b"},{"type":"function","name":"emergencyWithdrawFromYield","stateMutability":"nonpayable","constant":false,"id":"0x0e070cb0"},{"type":"function","name":"status","stateMutability":"view","constant":false,"outputs":[{"type":"uint8","name":"","simpleType":"uint"}],"id":"0x200d2ed2"},{"type":"function","name":"getForwarderAddress","stateMutability":"view","constant":false,"outputs":[{"type":"address","name":"","simpleType":"address"}],"id":"0x3441856f"},{"type":"function","name":"userDeposits","stateMutability":"view","constant":false,"inputs":[{"type":"address","name":"","simpleType":"address"},{"type":"uint8","name":"","simpleType":"uint"}],"outputs":[{"type":"uint256","name":"","simpleType":"uint"}],"id":"0x42db5e35"},{"type":"function","name":"setExpectedWorkflowId","stateMutability":"nonpayable","constant":false,"inputs":[{"type":"bytes32","name":"_id","simpleType":"bytes"}],"id":"0xc3c44ac2"},{"type":"function","name":"claim","stateMutability":"nonpayable","constant":false,"id":"0x4e71d92d"},{"type":"function","name":"emergencyRefund","stateMutability":"nonpayable","constant":false,"inputs":[{"type":"address","name":"user","simpleType":"address"}],"id":"0x045f7019"},{"type":"function","name":"pause","stateMutability":"nonpayable","constant":false,"id":"0x8456cb59"},{"type":"function","name":"getYieldBalance","stateMutability":"view","constant":false,"outputs":[{"type":"uint256","name":"","simpleType":"uint"}],"id":"0x489cc20c"},{"type":"function","name":"getExpectedWorkflowName","stateMutability":"view","constant":false,"outputs":[{"type":"bytes10","name":"","simpleType":"bytes"}],"id":"0xa619d818"},{"type":"event","name":"ExpectedWorkflowNameUpdated","stateMutability":"","constant":false,"inputs":[{"type":"bytes10","name":"previousName","simpleType":"bytes"},{"type":"bytes10","name":"newName","simpleType":"bytes"}],"id":"0x1e7ddd09d504c82dcfc784a464b167469f5aad967606ec4822d848ef9141dfa5"},{"type":"event","name":"Paused","stateMutability":"","constant":false,"inputs":[{"type":"address","name":"account","simpleType":"address"}],"id":"0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258"},{"type":"event","name":"MatchResolved","stateMutability":"","constant":false,"inputs":[{"type":"uint256","name":"matchId","simpleType":"uint"},{"type":"uint8","name":"winner","simpleType":"uint"}],"id":"0xde1c752173fee6bd3976fb1f165361c647fffc7a33987556b7f54b6a2de08ece"},{"type":"event","name":"EmergencyRefund","stateMutability":"","constant":false,"inputs":[{"type":"address","name":"user","simpleType":"address"},{"type":"uint256","name":"amount","simpleType":"uint"}],"id":"0xdf36e221948da014ebe0f9f6bb96696776424780da298e7f05e2f362dcd4289a"},{"type":"event","name":"Deposited","stateMutability":"","constant":false,"inputs":[{"type":"address","name":"user","simpleType":"address"},{"type":"uint8","name":"team","simpleType":"uint"},{"type":"uint256","name":"amount","simpleType":"uint"}],"id":"0x1d0787aee899a49ef81d0b11da9aca5455b46aefed042a41bd398d74619cab00"},{"type":"event","name":"MatchLocked","stateMutability":"","constant":false,"inputs":[{"type":"uint256","name":"matchId","simpleType":"uint"}],"id":"0x2f5f86d0163c8f8ac2745a053af228bf204225ec58d747c366151e05fc7a73a8"},{"type":"event","name":"Unpaused","stateMutability":"","constant":false,"inputs":[{"type":"address","name":"account","simpleType":"address"}],"id":"0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa"},{"type":"event","name":"ForwarderAddressUpdated","stateMutability":"","constant":false,"inputs":[{"type":"address","name":"previousForwarder","simpleType":"address"},{"type":"address","name":"newForwarder","simpleType":"address"}],"id":"0x039ad854736757070884dd787ef1a7f58db33546639d1f3efddcf4a33fb8997e"},{"type":"event","name":"SecurityWarning","stateMutability":"","constant":false,"inputs":[{"type":"string","name":"message","simpleType":"string"}],"id":"0x704da7db165c79c1e33d542c079333bbde970a733032d2f95fec8fb7d770cbf7"},{"type":"event","name":"ExpectedWorkflowIdUpdated","stateMutability":"","constant":false,"inputs":[{"type":"bytes32","name":"previousId","simpleType":"bytes"},{"type":"bytes32","name":"newId","simpleType":"bytes"}],"id":"0x0dbedcdf21925e053b4c574eae180d7f2883235ab4976ecc0873598a2a999b03"},{"type":"event","name":"OracleUpdated","stateMutability":"","constant":false,"inputs":[{"type":"address","name":"oldOracle","simpleType":"address"},{"type":"address","name":"newOracle","simpleType":"address"}],"id":"0x078c3b417dadf69374a59793b829c52001247130433427049317bde56607b1b7"},{"type":"event","name":"OwnershipTransferred","stateMutability":"","constant":false,"inputs":[{"type":"address","name":"previousOwner","simpleType":"address"},{"type":"address","name":"newOwner","simpleType":"address"}],"id":"0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"},{"type":"event","name":"EmergencyYieldWithdrawn","stateMutability":"","constant":false,"inputs":[{"type":"uint256","name":"amount","simpleType":"uint"}],"id":"0x32f0f1630e950fbc850f76becff89beb4eac3e75d09ee1abcf4a231fa783a65a"},{"type":"event","name":"ExpectedAuthorUpdated","stateMutability":"","constant":false,"inputs":[{"type":"address","name":"previousAuthor","simpleType":"address"},{"type":"address","name":"newAuthor","simpleType":"address"}],"id":"0x3321cda85c145617e47418aa14255e9dcbec53a753778e57591703b89a3cad31"},{"type":"event","name":"Claimed","stateMutability":"","constant":false,"inputs":[{"type":"address","name":"user","simpleType":"address"},{"type":"uint256","name":"principal","simpleType":"uint"},{"type":"uint256","name":"yieldShare","simpleType":"uint"}],"id":"0x987d620f307ff6b94d58743cb7a7509f24071586a77759b77c2d4e29f75a2f9a"}]
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
