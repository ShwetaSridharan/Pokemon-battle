import { Pokemon } from '../types/pokemon';

export const determineBattleOutcome = (pokemon1: Pokemon, pokemon2: Pokemon): string => {
  const power1 = pokemon1.move.power;
  const power2 = pokemon2.move.power;

  if (power1 > power2) {
    return `${pokemon1.name} lands a decisive blow with ${pokemon1.move.name} knocking out ${pokemon2.name}!`;
  } else if (power2 > power1) {
    return `${pokemon2.name} lands a decisive blow with ${pokemon2.move.name} knocking out ${pokemon1.name}!`;
  } else {
    return "Draw!";
  }
};