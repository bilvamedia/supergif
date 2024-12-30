import React from 'react';
import { characterIcons, IconConfig } from '../utils/iconConfig';
import '../styles/carousel.css';

interface CharacterSelectorProps {
  onSelect: (character: string) => void;
  selectedCharacter: string;
  selectedSmileys: string[];
  toggleSmileySelection: (smiley: string) => void;
}

const CharacterSelector: React.FC<CharacterSelectorProps> = ({
  onSelect,
  selectedCharacter,
  selectedSmileys,
  toggleSmileySelection,
}) => {
  const handleSelect = (id: string) => {
    onSelect(id);
  };

  // Double the icons array for seamless loop
  const duplicatedIcons = [...characterIcons, ...characterIcons];

  return (
    <div className="cloud-slider-container">
      {/* <div className="section-title">Icons</div> */}
      <div className="cloud-slider">
        <div className="slider">
          <div className="slide-track">
            {duplicatedIcons.map((character, index) => (
              <button
                key={`${character.id}-${index}`}
                onClick={() => handleSelect(character.id)}
                className={`character-button ${
                  selectedCharacter === character.id 
                    ? 'bg-primary text-primary-foreground' 
                    : ''
                }`}
              >
                <span className="emoji-display">{character.path}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelector;