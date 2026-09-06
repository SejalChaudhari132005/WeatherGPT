import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showText?: boolean;
}

export const WeatherGptLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const iconSizeMap = {
    sm: 'h-9 w-auto',
    md: 'h-14 w-auto',
    lg: 'h-24 w-auto',
    xl: 'h-36 w-auto',
    hero: 'h-44 sm:h-56 w-auto',
  };

  const textSizeMap = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
    hero: 'text-4xl sm:text-5xl',
  };

  const currentIconSize = iconSizeMap[size] || iconSizeMap.md;
  const currentTextSize = textSizeMap[size] || textSizeMap.md;

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Sun + Cloud Thought Bubble Icon Image */}
      <img
        src="/assets/logo-icon.png"
        alt="WeatherGPT Logo"
        className={`${currentIconSize} object-contain drop-shadow-md transition-transform duration-300 hover:scale-105`}
      />

      {/* "WeatherGPT" Text written in solid BLACK underneath the logo in Arimo font */}
      {showText && (
        <h1 className={`font-black font-['Arimo'] tracking-tight mt-3 ${currentTextSize} text-black`}>
          WeatherGPT
        </h1>
      )}
    </div>
  );
};
