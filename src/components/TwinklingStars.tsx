import React from 'react';

interface TwinklingStarsProps {
  count?: number;
  className?: string;
}

const TwinklingStars: React.FC<TwinklingStarsProps> = ({ count = 15, className = "" }) => {
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 2,
    size: Math.random() * 3 + 2,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute text-white animate-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.delay}s`,
            fontSize: `${star.size}px`,
          }}
        >
          ✦
        </div>
      ))}
    </div>
  );
};

export default TwinklingStars;