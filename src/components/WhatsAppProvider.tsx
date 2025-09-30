"use client";

import { useWhatsAppSettings } from "@/hooks/useWhatsAppSettings";
import WhatsAppChat from "@/components/WhatsAppChat";

export default function WhatsAppProvider({ children }: { children: React.ReactNode }) {
  const { settings } = useWhatsAppSettings();

  return (
    <>
      {children}
      {settings.isEnabled && (
        <WhatsAppChat
          phoneNumber={settings.phoneNumber}
          businessName={settings.businessName}
          welcomeMessage={settings.welcomeMessage}
        />
      )}
    </>
  );
}



