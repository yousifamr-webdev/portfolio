import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface ProjectGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  images: string[];
  initialIndex?: number;
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.2, ease: "easeIn" },
  }),
};

export function ProjectGalleryModal({
  isOpen,
  onClose,
  projectTitle,
  images,
  initialIndex = 0,
}: ProjectGalleryModalProps) {
  const [[currentIndex, direction], setPage] = useState([initialIndex, 0]);

  useEffect(() => {
    if (isOpen) {
      setPage([initialIndex, 0]);
    }
  }, [isOpen, initialIndex]);

  // Lock body scroll when gallery is active
  useEffect(() => {
    if (!isOpen) return;
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prev]) => {
        const next = prev + newDirection;
        if (next < 0) return [images.length - 1, newDirection];
        if (next >= images.length) return [0, newDirection];
        return [next, newDirection];
      });
    },
    [images.length],
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, paginate]);

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-canvas/90 p-4 backdrop-blur-md sm:p-6 sm:backdrop-blur-xl md:p-8 cursor-default"
      >
        {/* Top Header Bar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex w-full max-w-6xl items-center justify-between cursor-default"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 bg-surface text-accent">
              <Images size={16} />
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-text-base sm:text-base">
                {projectTitle}
              </h3>
              <p className="font-mono text-xs text-text-muted">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-surface/70 text-text-muted transition-colors hover:border-accent hover:bg-surface-elevated hover:text-text-base cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Central Display Stage */}
        <div className="relative flex w-full max-w-5xl flex-1 items-center justify-center overflow-hidden py-4">
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
              aria-label="Previous image"
              className="absolute left-2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-surface-elevated/80 text-text-base shadow-lg backdrop-blur-md transition-all hover:border-accent hover:scale-105 sm:left-4 sm:h-12 sm:w-12 cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <div className="relative flex h-full max-h-[70vh] w-full items-center justify-center pointer-events-none">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`${projectTitle} screenshot ${currentIndex + 1}`}
                loading="lazy"
                decoding="async"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                className="pointer-events-auto aspect-[16/10] max-h-full max-w-full rounded-2xl border border-border/80 object-contain shadow-2xl cursor-default"
              />
            </AnimatePresence>
          </div>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
              aria-label="Next image"
              className="absolute right-2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-surface-elevated/80 text-text-base shadow-lg backdrop-blur-md transition-all hover:border-accent hover:scale-105 sm:right-4 sm:h-12 sm:w-12 cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Bottom Thumbnail Strip */}
        {images.length > 1 && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex max-w-full gap-2 overflow-x-auto rounded-2xl border border-border/70 bg-surface/50 p-2 backdrop-blur-md cursor-default"
          >
            {images.map((img, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={img}
                  type="button"
                  onClick={() =>
                    setPage([index, index > currentIndex ? 1 : -1])
                  }
                  className={`relative aspect-[16/10] h-12 shrink-0 overflow-hidden rounded-lg border transition-all sm:h-14 cursor-pointer ${
                    isActive
                      ? "border-accent ring-2 ring-accent/50 scale-105"
                      : "border-border/60 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt="thumbnail"
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] h-full w-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
