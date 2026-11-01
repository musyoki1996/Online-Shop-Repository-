import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'mark' | 'horizontal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light';
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  theme = 'light',
  className = '',
  onClick
}) => {
  // Dimensions
  const markDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }[size];

  const fontSize = {
    sm: 'text-base tracking-[0.22em]',
    md: 'text-lg tracking-[0.25em]',
    lg: 'text-2xl tracking-[0.28em]',
    xl: 'text-3xl tracking-[0.3em]'
  }[size];

  const textColor = theme === 'dark' ? 'text-white' : 'text-[#104D49]';

  return (
    <div 
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none group ${className}`}
      onClick={onClick}
    >
      {/* Precision SVG Monogram matching official uploaded logo */}
      <div className={`relative ${markDimensions} rounded-lg bg-[#104D49] flex items-center justify-center p-1.5 shadow-xs overflow-hidden transition-transform duration-300 group-hover:scale-105`}>
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Architectural Serif Stem with Copper-Gold Gradients */}
          <defs>
            <linearGradient id="kavoraGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2A676" />
              <stop offset="50%" stopColor="#D99A68" />
              <stop offset="100%" stopColor="#C99A62" />
            </linearGradient>
            <linearGradient id="kavoraCopperDeep" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B67B48" />
              <stop offset="100%" stopColor="#E5AB7B" />
            </linearGradient>
          </defs>

          {/* Left Vertical Architectural Column */}
          <path
            d="M26 18 H46 V24 H38 V76 H46 V82 H26 V76 H34 V24 H26 Z"
            fill="url(#kavoraGold)"
          />
          {/* Inner column shadow accent */}
          <rect x="34" y="24" width="4" height="52" fill="#B67B48" opacity="0.6" />

          {/* Upper Diagonal Arm */}
          <path
            d="M45 52 L68 24 H80 L54 57 Z"
            fill="url(#kavoraGold)"
          />

          {/* Signature Elegant Arched Loop & Botanical Tail */}
          <path
            d="M36 54 C48 42, 64 42, 74 54 C82 64, 82 78, 77 82 C72 79, 68 70, 64 64 C56 52, 46 56, 36 57 Z"
            fill="url(#kavoraCopperDeep)"
          />
        </svg>
      </div>

      {variant !== 'mark' && (
        <div className="flex flex-col">
          <span className={`font-display font-semibold uppercase leading-none ${fontSize} ${textColor} transition-colors`}>
            KAVORA
          </span>
          {size === 'lg' || size === 'xl' ? (
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C99A62] font-medium mt-1">
              Shop Beyond Ordinary
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
};
