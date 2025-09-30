
'use client';

import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  const springConfig = { damping: 30, stiffness: 400, mass: 0.3 };
  
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.matches('a, button, [role="button"], input, textarea, select, .group, .cursor-pointer')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
       if (
        target.matches('a, button, [role="button"], input, textarea, select, .group, .cursor-pointer')
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* The trailing circle */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden lg:block"
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
      >
          <motion.div
              className="w-10 h-10 rounded-full border-2 border-primary -translate-x-1/2 -translate-y-1/2"
              animate={{
                  scale: isHovering ? 1.5 : 1,
                  opacity: isHovering ? 0.5 : 1,
              }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
          />
      </motion.div>
       {/* The precise dot */}
      <div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden lg:block"
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
        }}
      >
        <div className="w-2 h-2 rounded-full bg-primary -translate-x-1/2 -translate-y-1/2" />
      </div>
    </>
  );
};

export default CustomCursor;
