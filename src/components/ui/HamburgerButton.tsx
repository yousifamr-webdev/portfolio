import type { ButtonHTMLAttributes, FC } from "react";

interface HamburgerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
  onToggle: () => void;
  size?: number; // Visual icon size in px (matches Lucide icons, default: 18)
  className?: string;
}

export const HamburgerButton: FC<HamburgerButtonProps> = ({
  isOpen,
  onToggle,
  size = 18,
  className = "",
  ...props
}) => {
  // Base SVG path width is 26px; compute scale factor so `size` matches Lucide px sizing
  const scale = size / 26;

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      onClick={onToggle}
      className={`animated-hamburger-btn group relative flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-surface/60 text-text-base backdrop-blur-md transition-all hover:border-accent focus:outline-none lg:hidden ${
        isOpen ? "active text-accent" : ""
      } ${className}`}
      {...props}
    >
      <style>{`
        .animated-hamburger-btn {
          -webkit-tap-highlight-color: transparent;
        }
        .animated-hamburger-svg {
          width: 64px;
          height: 48px;
          position: absolute;
          top: 50%;
          left: 50%;
          stroke: currentColor;
          stroke-width: 3px;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
          pointer-events: none;
        }
        .animated-hamburger-svg path {
          transition: 
            stroke-dasharray 0.85s ease, 
            stroke-dashoffset 0.85s ease;
          stroke-dasharray: 26px 100px;
          stroke-dashoffset: 126px;
          transform: translateZ(0);
        }
        .animated-hamburger-svg path:nth-child(2) {
          transition: 
            stroke-dasharray 0.7s ease-in, 
            stroke-dashoffset 0.7s ease-in;
          stroke-dashoffset: 100px;
          stroke-dasharray: 26px 74px;
        }
        .animated-hamburger-svg path:nth-child(3) {
          stroke-dashoffset: 133px;
          stroke-dasharray: 26px 107px;
        }
        .animated-hamburger-btn.active .animated-hamburger-svg path {
          stroke-dashoffset: 57px;
        }
        .animated-hamburger-btn.active .animated-hamburger-svg path:nth-child(1),
        .animated-hamburger-btn.active .animated-hamburger-svg path:nth-child(3) {
          transition-delay: 0.15s;
          transition-timing-function: cubic-bezier(0.2, 0.4, 0.2, 1.1);
        }
        .animated-hamburger-btn.active .animated-hamburger-svg path:nth-child(2) {
          transition-duration: 0.4s;
          stroke-dashoffset: 2px;
          stroke-dasharray: 1px 74px;
        }
        .animated-hamburger-btn.active .animated-hamburger-svg path:nth-child(3) {
          stroke-dashoffset: 58px;
        }
      `}</style>

      <svg
        viewBox="0 0 64 48"
        className="animated-hamburger-svg"
        style={{
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <path d="M19,15 L45,15 C70,15 58,-2 49.0177126,7 L19,37" />
        <path d="M19,24 L45,24 C61.2371586,24 57,49 41,33 L32,24" />
        <path d="M45,33 L19,33 C-8,33 6,-2 22,14 L45,37" />
      </svg>
    </button>
  );
};
