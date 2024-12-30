import React from 'react';
import './CloudSlider.css';

interface TransportSelectorProps {
  selected: string[];
  onSelect: (transport: string) => void;
}

const transportOptions = [
  {
    name: 'Bicycle',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="none">
        <circle cx="5.5" cy="17.5" r="3.5" fill="#4CAF50"/>
        <circle cx="18.5" cy="17.5" r="3.5" fill="#4CAF50"/>
        <path d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5V14l-3-3 4-3 2 3h2" fill="#2E7D32" stroke="#2E7D32" strokeWidth="1.5"/>
      </svg>
    ),
    animation: 'wheel-spin'
  },
  {
    name: 'Car',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="none">
        <path d="M7 17h10M5 17H4v-4l1-5h14l1 5v4h-1M7 17a2 2 0 104 0m6 0a2 2 0 104 0" stroke="#E53935" strokeWidth="1.5"/>
        <path d="M3 13h18" stroke="#E53935" strokeWidth="1.5"/>
        <path d="M5 13l1-5h12l1 5" fill="#F44336"/>
      </svg>
    ),
    animation: 'drive'
  },
  {
    name: 'Bus',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="none">
        <path d="M4 12V6a2 2 0 012-2h12a2 2 0 012 2v6M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6" fill="#1976D2"/>
        <path d="M7 12h10M7 7h10" stroke="#FFFFFF" strokeWidth="1.5"/>
        <circle cx="7" cy="17" r="1" fill="#FFFFFF"/>
        <circle cx="17" cy="17" r="1" fill="#FFFFFF"/>
      </svg>
    ),
    animation: 'bounce'
  },
  {
    name: 'Airplane',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="none">
        <path d="M22 2L2 22M14.5 9.5L4 20l1.5 1.5L20 8l2-6z" fill="#03A9F4"/>
        <path d="M4.5 13.5L14 4l-1.5-1.5L2 16l2.5-2.5z" fill="#0288D1"/>
      </svg>
    ),
    animation: 'fly'
  },
  {
    name: 'Ship',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="none">
        <path d="M3 17h18v2H3z" fill="#455A64"/>
        <path d="M20.33 12.04C20.33 7.05 12 2 12 2S3.67 7.05 3.67 12.04L3 17h18l-.67-4.96z" fill="#546E7A"/>
        <path d="M7 7c5-3 5-3 10 0" stroke="#90A4AE" strokeWidth="1.5"/>
      </svg>
    ),
    animation: 'float'
  },
  {
    name: 'Helicopter',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="none">
        <path d="M12 3v18M5 7h14M7 11h10M9 15h6" stroke="#9C27B0" strokeWidth="2"/>
        <circle cx="12" cy="3" r="2" fill="#7B1FA2"/>
        <path d="M4 7h16" stroke="#9C27B0" strokeWidth="4"/>
      </svg>
    ),
    animation: 'hover'
  },
  {
    name: 'Train',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="none">
        <rect x="4" y="5" width="16" height="14" rx="2" fill="#FFC107"/>
        <path d="M4 15h16M12 5v10" stroke="#FFA000" strokeWidth="1.5"/>
        <path d="M8 19l-2 3M16 19l2 3" stroke="#FFA000" strokeWidth="1.5"/>
        <circle cx="8" cy="12" r="1" fill="#FFA000"/>
        <circle cx="16" cy="12" r="1" fill="#FFA000"/>
      </svg>
    ),
    animation: 'chug'
  },
  {
    name: 'Rocket',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="none">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" fill="#FF5722"/>
        <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" fill="#F4511E"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" fill="#FF7043"/>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" fill="#FF7043"/>
      </svg>
    ),
    animation: 'blast-off'
  }
];

export const TransportSelector: React.FC<TransportSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="cloud-slider-container">
      {/* <div className="section-title">Transport Options</div> */}
      <div className="cloud-slider">
        <div className="slider">
          <div className="slide-track">
            {[...transportOptions, ...transportOptions].map((transport, index) => (
              <div
                key={`${transport.name}-${index}`}
                className={`slide ${selected.includes(transport.name) ? 'selected' : ''}`}
                onClick={() => onSelect(transport.name)}
                title={transport.name}
              >
                <div className={`cloud-icon ${transport.animation}`}>
                  {transport.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportSelector;
