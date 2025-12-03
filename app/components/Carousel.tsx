"use client";
import { useRef, useState } from "react";

export default function Carousel({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const goLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -1200, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };
  const goRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 1200, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          onClick={goLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-scroll scrollbar-hide"
      >
        {children}
      </div>
      {canScrollRight && (
        <button
          onClick={goRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}