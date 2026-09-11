import type { FC } from "react";

interface DepthSeparatorProps {
  variant?: "sink" | "lift";
  className?: string;
}

export const DepthSeparator: FC<DepthSeparatorProps> = ({
  variant = "sink",
  className = "",
}) => {
  if (variant === "sink") {
    return (
      <div
        aria-hidden="true"
        className={`relative w-full select-none pointer-events-none ${className}`}
      >
     

        {/* Soft, micro-falloff drop shadow */}
        <div className="h-4 w-full bg-gradient-to-b from-black/[0.04] to-canvas dark:from-black/30 dark:to-canvas" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`relative w-full select-none pointer-events-none ${className}`}
    >
      {/* Soft micro-shadow rising from below */}
      <div className="h-4 w-full bg-gradient-to-t from-black/[0.04] to-canvas dark:from-black/30 dark:to-canvas" />

 
    </div>
  );
};
