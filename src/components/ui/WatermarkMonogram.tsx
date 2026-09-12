// src/components/ui/WatermarkMonogram.tsx
import type { FC } from "react";

interface WatermarkMonogramProps {
  className?: string;
  variant?: "outline" | "ghost";
}

export const WatermarkMonogram: FC<WatermarkMonogramProps> = ({
  className = "w-[40%] -top-[10%] -right-[10%]",
  variant = "outline",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute aspect-square select-none transition-opacity duration-500 ${className}`}
    >
      <svg
        viewBox="360 385 385 315"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`h-full w-full transform-gpu will-change-transform ${
          variant === "outline"
            ? "stroke-current fill-none stroke-[2.2px] opacity-[0.022] dark:opacity-[0.028]"
            : "fill-current opacity-[0.03] dark:opacity-[0.015] dark:fill-accent"
        } text-text-base`}
      >
        <g transform="matrix(1.2383915,0,0,1.2383915,-135.15622,-128.7314)">
          <g transform="translate(-12.91562,1.1333669)">
            <g transform="matrix(1.2431085,0,0,1.2431085,-135.92696,-109.26847)">
              {/* Inner triangular cutout */}
              <path
                d="m 626.41563,562.81904 -12.39764,-29.82412 h -52.33562 l -17.21714,29.82412 z"
                fill={variant === "outline" ? "none" : "currentColor"}
                stroke={variant === "outline" ? "currentColor" : "none"}
              />
              {/* YA Geometric Monogram */}
              <path
                d="m 446.52138,424.49293 58.94428,115.87296 -18.93049,35.88955 -22.78661,42.01676 h 37.90041 l 81.7372,-153.68505 26.06392,62.69789 11.48952,27.63949 11.38226,27.6395 14.42301,35.70817 h 38.92871 L 616.78067,453.37364 h -0.005 L 604.7105,424.49293 h -20.18906 -20.19063 l -39.44917,77.69024 -39.11008,-77.69024 z"
                fill={variant === "outline" ? "none" : "currentColor"}
                stroke={variant === "outline" ? "currentColor" : "none"}
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
