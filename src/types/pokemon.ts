export interface Move {
  name: string;
  power: number;
}

export interface Pokemon {
  name: string;
  sprite: string;
  move: Move;
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}