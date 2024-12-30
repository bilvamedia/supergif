import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"; // Adjusted import based on the existing library
import React, { useState } from 'react';
import '../styles/background-animations.css';
import { BACKGROUND_STYLES } from '../utils/backgroundstyles';

interface BackgroundSelectorProps {
  onSelect: (background: string) => void;
  selected: string;
}
const backgrounds = Object.values(BACKGROUND_STYLES);

export const BackgroundSelector = ({ onSelect, selected }) => {
  const [selectedBackground, setSelectedBackground] = useState<string>(selected);
  const [offset, setOffset] = useState(0); // Track the current offset

  const slideLeft = () => {
    setOffset(prevOffset => prevOffset + 100); // Adjust the value based on chip width
  };

  const slideRight = () => {
    setOffset(prevOffset => prevOffset - 100); // Adjust the value based on chip width
  };
  const chipCount = backgrounds.length;
  const duplicateBackgrounds = [...backgrounds, ...backgrounds.slice(0, 3)]; // Duplicate first 3 chips
  
  return (
    <div className="cloud-slider-container">
      {/* <div className="section-title">Background Options</div> */}
      <div className="cloud-slider" style={{ transform: `translateX(${offset}px)`, transition: 'transform 0.5s ease' }}>
        <div className="slider">
          <div className="slide-track">
          {duplicateBackgrounds.map((bg, index) => (
    <div 
        key={`${bg.id}-${index}`} // Combine bg.id with the index to ensure uniqueness
        className={`slide ${bg.style}`} 
        onClick={() => {
            setSelectedBackground(bg.id);
            onSelect(bg.id);
        }}
    >
        {/* Optionally, you can add an icon or background style here */}
    </div>
))}          </div>
        </div>
      </div>
      {/* Optional navigation buttons */}
      {/* <button onClick={slideLeft}>Left</button>
      <button onClick={slideRight}>Right</button> */}
    </div>
  );}