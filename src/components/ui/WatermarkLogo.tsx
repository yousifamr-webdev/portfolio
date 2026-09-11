import type { FC } from "react";
import { PersonalLogo } from "./Logo";

interface WatermarkLogoProps {
  position?: "right" | "left" | "center" | "";
  /** Responsive width classes (e.g. "w-[90%] sm:w-[65%] lg:w-[40%]") or a direct percentage (e.g. "70%") */
  size?: string;
  /** Opacity class (e.g. "opacity-[0.08] dark:opacity-[0.05]") or raw number (e.g. 0.07) */
  opacity?: string | number;
  className?: string;
}

const positionClasses: Record<string, string> = {
  right: "top-[50%] -translate-y-[50%] right-[-30%]",
  left: "top-[50%] -translate-y-[50%] left-[-30%]",
  center: "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
  "": "",
};

export const WatermarkLogo: FC<WatermarkLogoProps> = ({
  position = "",
  size = "w-[85%] sm:w-[60%] lg:w-[40%]",
  opacity,
  className = "",
}) => {
  const isClassSize = size.startsWith("w-") || size.includes(" ");
  const opacityStyle = typeof opacity === "number" ? { opacity } : undefined;
  const opacityClass = typeof opacity === "string" ? opacity : "";

  return (
    <div
      aria-hidden="true"
      style={{
        ...(!isClassSize && size ? { width: size } : {}),
        ...opacityStyle,
      }}
      className={`pointer-events-none absolute z-0 select-none ${positionClasses[position]} ${isClassSize ? size : ""} ${opacityClass} ${className}`}
    >
      <div className="aspect-square w-full">
        <PersonalLogo className="h-full w-full text-text-base" />
      </div>
    </div>
  );
};
