import React from 'react';

interface PyramidLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}

export const PyramidLogo: React.FC<PyramidLogoProps> = ({
  className = "",
  size = 40,
  showText = false,
  textColor = "text-emerald-950"
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-xs"
      >
        {/* Triangle Outer Border */}
        <polygon
          points="50,12 88,84 12,84"
          stroke="#087F43"
          strokeWidth="6"
          strokeLinejoin="round"
          fill="#FFFFFF"
        />
        
        {/* Inner Silhouettes of Dog and Cat */}
        <g fill="#111827">
          {/* Dog Silhouette */}
          <path d="M 44 38 C 42 34, 38 34, 36 36 C 35 37, 36 39, 38 40 C 37 42, 38 45, 41 46 C 40 48, 40 52, 42 56 L 42 74 C 42 76, 44 76, 45 76 L 49 76 C 50 76, 50 74, 50 72 L 50 62 L 53 62 L 53 72 C 53 74, 54 76, 56 76 L 59 76 C 60 76, 61 74, 61 72 L 61 54 C 63 50, 62 44, 58 41 C 55 39, 48 39, 44 38 Z" />
          
          {/* Dog Ear detail */}
          <path d="M 37 36 C 35 34, 33 36, 34 39 C 36 41, 38 38, 37 36 Z" fill="#087F43" />
          
          {/* Cat Silhouette nested on left/front */}
          <path d="M 46 54 C 45 52, 43 51, 42 53 C 41 54, 42 56, 43 57 L 43 74 C 43 76, 44 76, 45 76 L 48 76 L 48 64 L 50 64 L 50 76 L 52 76 C 53 76, 53 74, 53 72 L 53 58 C 51 56, 48 56, 46 54 Z" />
          <path d="M 41 51 L 43 47 L 44 51 Z" />
          <path d="M 45 51 L 47 48 L 48 52 Z" />
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col justify-center leading-tight">
          <span className={`font-bold tracking-tight text-base sm:text-lg ${textColor}`}>
            Pyramid Veterinary Surgery
          </span>
          <span className="text-xs font-medium text-emerald-700">
            Gordonvale, QLD
          </span>
        </div>
      )}
    </div>
  );
};
