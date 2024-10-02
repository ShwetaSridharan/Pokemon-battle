import React, { useState, useEffect } from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import { fetchPokemonList, fetchPokemonData } from '../../services/pokemonApi';
import { Pokemon, PokemonListItem } from '../../types/pokemon';
import './PokemonBattleApp.css';

const PokemonBattleApp: React.FC = () => {
  const [pokemon1, setPokemon1] = useState<Pokemon | null>(null);
  const [pokemon2, setPokemon2] = useState<Pokemon | null>(null);
  const [battleLog, setBattleLog] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [blast, setBlast] = useState<boolean>(false); // New state for blast animation

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  const fetchRandomPokemon = async (): Promise<void> => {
    setIsLoading(true);
    setError('');
    try {
      const pokemonList = await fetchPokemonList();
      const randomPokemon = getRandomPokemon(pokemonList.results, 2);
      const [poke1, poke2] = await Promise.all(randomPokemon.map(p => fetchPokemonData(p.url)));
      setPokemon1(poke1);
      setPokemon2(poke2);
      setBattleLog('');
    } catch (err) {
      setError('Failed to fetch Pokemon data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRandomPokemon = (pokemonList: PokemonListItem[], count: number): PokemonListItem[] => {
    const shuffled = [...pokemonList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const startBattle = (): void => {
    if (!pokemon1 || !pokemon2) return;
    const power1 = pokemon1.move.power;
    const power2 = pokemon2.move.power;

    setBlast(true); // Trigger blast animation
    setTimeout(() => setBlast(false), 500); // Remove blast after animation duration (500ms)

    if (power1 > power2) {
      setBattleLog(`${pokemon1.name} lands a decisive blow with ${pokemon1.move.name}, knocking out ${pokemon2.name}!`);
    } else if (power2 > power1) {
      setBattleLog(`${pokemon2.name} lands a decisive blow with ${pokemon2.move.name}, knocking out ${pokemon1.name}!`);
    } else {
      setBattleLog("It's a draw! Both Pokemon are evenly matched.");
    }
  };

  if (isLoading) {
    return <div className="loading">Loading Pokemon...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="pokemon-battle-app">
      <h1>Pokemon Battle</h1>
      <div className="battle-arena">
        {pokemon1 && <PokemonCard pokemon={pokemon1} isLeft={true} />}
        {pokemon2 && <PokemonCard pokemon={pokemon2} isLeft={false} />}
      </div>
      <div className="battle-controls">
        <button 
          onClick={startBattle} 
          className={`battle-button ${blast ? 'blast-animation' : ''}`}> 
          Start Battle!
        </button>
      </div>
      {battleLog && <div className="battle-log">{battleLog}</div>}
    </div>
  );
};

export default PokemonBattleApp;
