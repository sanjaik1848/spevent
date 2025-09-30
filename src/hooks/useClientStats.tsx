"use client";

import { useState, useEffect } from 'react';

export interface ClientStats {
  eventsPlanned: number;
  clientSatisfaction: number;
  averageRating: number;
}

const defaultStats: ClientStats = {
  eventsPlanned: 500,
  clientSatisfaction: 99,
  averageRating: 5
};

export function useClientStats() {
  const [stats, setStats] = useState<ClientStats>(defaultStats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedStats = localStorage.getItem('clientStats');
        if (savedStats) {
          setStats(JSON.parse(savedStats));
        }
      } catch (error) {
        console.error('Failed to load client stats:', error);
        localStorage.removeItem('clientStats');
      }
    }
    setIsLoading(false);
  }, []);

  const updateStats = (newStats: Partial<ClientStats>) => {
    const updatedStats = { ...stats, ...newStats };
    setStats(updatedStats);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('clientStats', JSON.stringify(updatedStats));
    }
  };

  const resetStats = () => {
    setStats(defaultStats);
    if (typeof window !== 'undefined') {
      localStorage.setItem('clientStats', JSON.stringify(defaultStats));
    }
  };

  return {
    stats,
    isLoading,
    updateStats,
    resetStats
  };
}
