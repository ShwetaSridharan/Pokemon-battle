// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonBattleApp from './components/PokemonBattleApp/PokemonBattleApp';
import { fetchPokemonData, fetchPokemonList } from './services/pokemonApi';


jest.mock('./services/pokemonApi');

const mockPokemonList = {
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  ]
};

const mockPokemon1 = {
  name: 'bulbasaur',
  sprite: 'bulbasaur.png',
  move: { name: 'tackle', power: 40 }
};

const mockPokemon2 = {
  name: 'charmander',
  sprite: 'charmander.png',
  move: { name: 'scratch', power: 40 }
};

describe('PokemonBattleApp', () => {
  beforeEach(() => {
    (fetchPokemonList as jest.Mock).mockResolvedValue(mockPokemonList);
    (fetchPokemonData as jest.Mock).mockResolvedValueOnce(mockPokemon1).mockResolvedValueOnce(mockPokemon2);
  });

  test('renders Pokemon battle app', async () => {
    render(<PokemonBattleApp />);
    
    await waitFor(() => {
      expect(screen.getByText('Pokémon Battle')).toBeInTheDocument();
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('charmander')).toBeInTheDocument();
    });
  });

  test('starts battle when button is clicked', async () => {
    render(<PokemonBattleApp />);
    
    await waitFor(() => {
      expect(screen.getByText('Start Battle!')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Start Battle!'));

    await waitFor(() => {
      expect(screen.getByText(/lands a decisive blow/)).toBeInTheDocument();
    });
  });
});
