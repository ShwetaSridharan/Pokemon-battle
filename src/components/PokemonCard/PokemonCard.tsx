import React from 'react';
import { Pokemon } from '../../types/pokemon';
import './PokemonCard.css';

interface PokemonCardProps {
  pokemon: Pokemon;
  isLeft: boolean;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, isLeft }) => {
  return (
    <div className={`pokemon-card ${isLeft ? 'left' : 'right'}`}>
      {isLeft ? (
        <>
          <div className="pokemon-info">
            <h2>{pokemon.name}</h2>
            <span className="move">{pokemon.move.name}: {pokemon.move.power}</span>
          </div>
          <img src={pokemon.sprite} alt={pokemon.name} className="pokemon-sprite" />
        </>
      ) : (
        <>
          <img src={pokemon.sprite} alt={pokemon.name} className="pokemon-sprite" />
          <div className="pokemon-info">
            <h2>{pokemon.name}</h2>
            <span className="move">{pokemon.move.name}: {pokemon.move.power}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonCard;