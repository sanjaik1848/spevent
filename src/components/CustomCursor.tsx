
'use client';

import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      {/* Outer circle */}
      <div 
        ref={cursorRef}
        className="w-[30px] h-[30px] border-2 border-yellow-400 rounded-full fixed pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out z-[9999] shadow-lg"
      />
      {/* Center dot */}
      <div 
        ref={cursorDotRef}
        className="w-[6px] h-[6px] bg-yellow-400 rounded-full fixed pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[10000] shadow-lg"
      />
    </>
  );
};

export default CustomCursor;
