import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  tight?: boolean; // Set to true for tight navbar integration without empty margins
}

export const PersonalLogo: React.FC<LogoProps> = ({
  className = "w-10 h-10 text-[var(--accent)]",
  tight = false,
  ...props
}) => {
  return (
    <svg
      // 0 0 1080 1080 preserves the original centered canvas (great for the Intro splash).
      // 360 385 385 315 trims the whitespace (ideal for the docked Navbar).
      viewBox={tight ? "360 385 385 315" : "0 0 1080 1080"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g
        transform="matrix(1.2383915,0,0,1.2383915,-135.15622,-128.7314)"
        fill="currentColor"
      >
        <g transform="translate(-12.91562,1.1333669)">
          <g transform="matrix(1.2431085,0,0,1.2431085,-135.92696,-109.26847)">
            {/* Inner triangular cutout */}
            <path
              d="m 626.41563,562.81904 -12.39764,-29.82412 h -52.33562 l -17.21714,29.82412 z"
              fill="currentColor"
            />
            {/* YA Geometric Monogram */}
            <path
              d="m 446.52138,424.49293 58.94428,115.87296 -18.93049,35.88955 -22.78661,42.01676 h 37.90041 l 81.7372,-153.68505 26.06392,62.69789 11.48952,27.63949 11.38226,27.6395 14.42301,35.70817 h 38.92871 L 616.78067,453.37364 h -0.005 L 604.7105,424.49293 h -20.18906 -20.19063 l -39.44917,77.69024 -39.11008,-77.69024 z"
              fill="currentColor"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
