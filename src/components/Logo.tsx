import React from 'react';

interface LogoProps {
  theme?: 'light' | 'dark';
  width?: number | string;
  height?: number | string;
}

export const Logo: React.FC<LogoProps> = ({ theme = 'light', width = 40, height = 40 }) => {
  const strokeColor = theme === 'dark' ? '#ffffff' : '#111111';
  const circuitColor = theme === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)';
  const dotColor = theme === 'dark' ? '#ffffff' : '#111111';

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <rect x="8" y="8" width="84" height="84" rx="18" stroke={circuitColor} strokeWidth="2" />
      
      {/* Circuits connecting to outer box or edges */}
      <path d="M8 30 H 30" stroke={circuitColor} strokeWidth="2" strokeLinejoin="miter" fill="none" />
      <path d="M92 50 H 70" stroke={circuitColor} strokeWidth="2" strokeLinejoin="miter" fill="none" />
      <path d="M45 8 V 30" stroke={circuitColor} strokeWidth="2" strokeLinejoin="miter" fill="none" />
      <path d="M55 92 V 70" stroke={circuitColor} strokeWidth="2" strokeLinejoin="miter" fill="none" />
      
      {/* Additional subtle circuit traces */}
      <path d="M8 70 H 20 V 55 H 45" stroke={circuitColor} strokeWidth="1.5" strokeLinejoin="miter" fill="none" />
      <path d="M92 30 H 80 V 70 H 55" stroke={circuitColor} strokeWidth="1.5" strokeLinejoin="miter" fill="none" />

      {/* J */}
      {/* Starts at top right (45,30), goes down to 70, left to 30, up to 55 */}
      <path d="M 45 30 V 70 H 30 V 55" stroke={strokeColor} strokeWidth="6" strokeLinejoin="miter" strokeLinecap="square" fill="none" />
      
      {/* P */}
      <path d="M 55 70 V 30 H 70 V 50 H 55" stroke={strokeColor} strokeWidth="6" strokeLinejoin="miter" strokeLinecap="square" fill="none" />

      {/* Nodes / Dots */}
      <circle cx="45" cy="30" r="3" fill={dotColor} />
      <circle cx="45" cy="70" r="3" fill={dotColor} />
      <circle cx="30" cy="55" r="3" fill={dotColor} />
      
      <circle cx="55" cy="70" r="3" fill={dotColor} />
      <circle cx="55" cy="30" r="3" fill={dotColor} />
      <circle cx="70" cy="50" r="3" fill={dotColor} />
    </svg>
  );
};
