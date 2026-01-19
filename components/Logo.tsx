import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="haven logo"
    >
      {/* Central Petal */}
      <path
        d="M50 20C50 20 70 45 70 65C70 80 60 90 50 90C40 90 30 80 30 65C30 45 50 20 50 20Z"
        className="fill-serene-500"
      />
      
      {/* Left Petal */}
      <path
        d="M50 90C50 90 20 80 15 55C12 45 25 35 35 50C40 58 50 75 50 90Z"
        className="fill-serene-400"
        opacity="0.9"
      />
      
      {/* Right Petal */}
      <path
        d="M50 90C50 90 80 80 85 55C88 45 75 35 65 50C60 58 50 75 50 90Z"
        className="fill-serene-400"
        opacity="0.9"
      />
      
      {/* Lower Details */}
      <path
        d="M50 90C50 90 35 88 25 75"
        className="stroke-serene-300"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M50 90C50 90 65 88 75 75"
        className="stroke-serene-300"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Floating Mindfulness Dot */}
      <circle cx="50" cy="12" r="4" className="fill-serene-300" />
    </svg>
  );
};

export default Logo;