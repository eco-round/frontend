export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export interface ApiMatch {
  id: number;
  on_chain_match_id: number;
  vault_address: string;
  team_a_name: string;
  team_a_tag: string;
  team_b_name: string;
  team_b_tag: string;
  status: "open" | "locked" | "finished" | "cancelled";
  best_of: number;
  event: string;
  start_time: string;
  created_at: string;
  updated_at: string;
  results?: ApiMatchResult[];
}

export interface ApiMatchResult {
  id: number;
  match_id: number;
  source: string;
  match_status: "upcoming" | "started" | "ended";
  winner: string;
  score_a: number;
  score_b: number;
  map_count: number;
  reported_at: string;
}
