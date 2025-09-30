import { useState, useEffect } from 'react';

export interface LogoData {
  headerLogo: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  footerLogo: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  favicon: {
    url: string;
    alt: string;
  };
}

const defaultLogoData: LogoData = {
  headerLogo: {
    url: '',
    alt: 'Elite Event Management Logo',
    width: 40,
    height: 40
  },
  footerLogo: {
    url: '',
    alt: 'Elite Event Management Logo',
    width: 120,
    height: 40
  },
  favicon: {
    url: '',
    alt: 'Elite Event Management Favicon'
  }
};

export function useLogoData() {
  const [logoData, setLogoData] = useState<LogoData>(defaultLogoData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }
    
    try {
      const storedData = localStorage.getItem('logoData');
      if (storedData) {
        setLogoData(JSON.parse(storedData));
      } else {
        setLogoData(defaultLogoData);
      }
    } catch (error) {
      console.error("Failed to load logo data from localStorage, using default data.", error);
      setLogoData(defaultLogoData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      localStorage.setItem('logoData', JSON.stringify(logoData));
    }
  }, [logoData, isLoading]);

  const updateLogo = (type: keyof LogoData, updatedData: Partial<LogoData[keyof LogoData]>) => {
    setLogoData(prev => ({
      ...prev,
      [type]: { ...prev[type], ...updatedData }
    }));
  };

  const resetToDefault = () => {
    setLogoData(defaultLogoData);
  };

  return { 
    logoData, 
    isLoading, 
    updateLogo, 
    resetToDefault 
  };
}
