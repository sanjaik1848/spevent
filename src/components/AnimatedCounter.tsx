
"use client";

import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

type AnimatedCounterProps = {
  from?: number;
  to: number;
};

function formatNumber(value: number) {
    // If it's a whole number, format with commas.
    if (value % 1 === 0) {
        return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    // If it's a decimal, format with commas and keep two decimal places.
    return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d)\.)/g, ",");
}

export default function AnimatedCounter({ from = 0, to }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration: 1.5,
        onUpdate(value) {
          if(ref.current) {
            ref.current.textContent = formatNumber(value);
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to]);

  return <span ref={ref}>{formatNumber(from)}</span>;
}
