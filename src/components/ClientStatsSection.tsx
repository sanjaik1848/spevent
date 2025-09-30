"use client";

import { useClientStats } from "@/hooks/useClientStats";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClientStatsSection() {
  const { stats, isLoading } = useClientStats();

  if (isLoading) {
    return (
      <section className="section-padding bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container-professional">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-16 w-32 mx-auto mb-4 bg-white/20" />
                <Skeleton className="h-6 w-24 mx-auto bg-white/20" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="container-professional">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Events Planned */}
          <div className="text-center group">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-all duration-300">
              <span className="text-3xl font-bold">{stats.eventsPlanned}+</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Events Planned</h3>
            <p className="text-blue-100">Successful events delivered</p>
          </div>

          {/* Client Satisfaction */}
          <div className="text-center group">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-all duration-300">
              <span className="text-3xl font-bold">{stats.clientSatisfaction}%</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Client Satisfaction</h3>
            <p className="text-blue-100">Happy clients rate us</p>
          </div>

          {/* Average Rating */}
          <div className="text-center group">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-all duration-300">
              <span className="text-3xl font-bold">{stats.averageRating}</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Average Rating</h3>
            <p className="text-blue-100">Out of 5 stars</p>
          </div>
        </div>
      </div>
    </section>
  );
}
