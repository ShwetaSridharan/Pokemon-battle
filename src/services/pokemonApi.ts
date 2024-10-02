import { Pokemon, Move, PokemonListResponse } from '../types/pokemon';

export const fetchPokemonList = async (): Promise<PokemonListResponse> => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20');
  return await response.json();
};

export const fetchPokemonData = async (url: string): Promise<Pokemon> => {
  const response = await fetch(url);
  const data = await response.json();
  const moveData = await fetchMoveData(data.moves[Math.floor(Math.random() * data.moves.length)].move.name);
  
  return {
    name: data.name,
    sprite: data.sprites.front_default,
    move: moveData
  };
};

export const fetchMoveData = async (moveName: string): Promise<Move> => {
  const response = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);
  const data = await response.json();
  return {
    name: data.name,
    power: data.power || 0
  };
};