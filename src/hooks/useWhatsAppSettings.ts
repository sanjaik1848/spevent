import { useState, useEffect } from 'react';

export interface WhatsAppSettings {
  phoneNumber: string;
  businessName: string;
  welcomeMessage: string;
  isEnabled: boolean;
  position: 'bottom-right' | 'bottom-left';
  showPulse: boolean;
}

const defaultWhatsAppSettings: WhatsAppSettings = {
  phoneNumber: "+1234567890",
  businessName: "Elite Event Management",
  welcomeMessage: "Hi! How can we help you plan your perfect event?",
  isEnabled: true,
  position: 'bottom-right',
  showPulse: true
};

export function useWhatsAppSettings() {
  const [settings, setSettings] = useState<WhatsAppSettings>(defaultWhatsAppSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }
    
    try {
      const storedSettings = localStorage.getItem('whatsappSettings');
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      } else {
        setSettings(defaultWhatsAppSettings);
      }
    } catch (error) {
      console.error("Failed to load WhatsApp settings from localStorage, using default data.", error);
      setSettings(defaultWhatsAppSettings);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      localStorage.setItem('whatsappSettings', JSON.stringify(settings));
    }
  }, [settings, isLoading]);

  const updateSettings = (updatedSettings: Partial<WhatsAppSettings>) => {
    setSettings(prev => ({ ...prev, ...updatedSettings }));
  };

  const resetToDefault = () => {
    setSettings(defaultWhatsAppSettings);
  };

  return { 
    settings, 
    isLoading, 
    updateSettings, 
    resetToDefault 
  };
}
