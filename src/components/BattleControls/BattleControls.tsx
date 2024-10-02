import React from 'react';
import './BattleControls.css';

interface BattleControlsProps {
  onStartBattle: () => void;
  onNewPokemon: () => void;
}

const BattleControls: React.FC<BattleControlsProps> = ({ onStartBattle, onNewPokemon }) => {
  return (
    <div className="battle-controls">
      <button onClick={onStartBattle} className="battle-button">Start Battle</button>
      <button onClick={onNewPokemon} className="new-pokemon-button">New Pokémon</button>
    </div>
  );
};

export default BattleControls;