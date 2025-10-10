import { cn } from "@/lib/utils";

interface ShimmerProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "card";
  width?: string;
  height?: string;
  count?: number;
}

export function Shimmer({ 
  className, 
  variant = "rectangular",
  width,
  height,
  count = 1
}: ShimmerProps) {
  const baseClasses = "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer";
  
  const variantClasses = {
    text: "h-4 rounded",
    circular: "rounded-full aspect-square",
    rectangular: "rounded-lg",
    card: "rounded-xl h-64"
  };

  const shimmerStyle = {
    width: width || "100%",
    height: height || (variant === "text" ? "1rem" : variant === "circular" ? "3rem" : "12rem")
  };

  if (count > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={cn(baseClasses, variantClasses[variant], className)}
            style={shimmerStyle}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={shimmerStyle}
    />
  );
}

export function ShimmerCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-lg">
      <Shimmer variant="card" height="200px" />
      <div className="p-6 space-y-3">
        <Shimmer variant="text" width="60%" height="24px" />
        <Shimmer variant="text" count={3} />
        <Shimmer variant="rectangular" height="40px" width="120px" className="mt-4" />
      </div>
    </div>
  );
}

export function ShimmerGallery({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <Shimmer key={i} variant="card" height="300px" />
      ))}
    </div>
  );
}

export function ShimmerList({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Shimmer variant="circular" width="48px" height="48px" />
          <div className="flex-1 space-y-2">
            <Shimmer variant="text" width="40%" height="20px" />
            <Shimmer variant="text" width="80%" />
          </div>
        </div>
      ))}
    </div>
  );
}
