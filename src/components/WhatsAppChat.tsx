"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, Send, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WhatsAppChatProps {
  phoneNumber?: string;
  businessName?: string;
  welcomeMessage?: string;
}

export default function WhatsAppChat({
  phoneNumber = "+1234567890", // Default phone number
  businessName = "Elite Event Management",
  welcomeMessage = "Hi! How can we help you plan your perfect event?"
}: WhatsAppChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  // Format phone number for WhatsApp (remove spaces, dashes, etc.)
  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/[\s\-\(\)]/g, '');
  };

  // Generate WhatsApp URL
  const getWhatsAppUrl = (message: string = "") => {
    const formattedPhone = formatPhoneNumber(phoneNumber);
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const whatsappUrl = getWhatsAppUrl(message);
      window.open(whatsappUrl, '_blank');
      setMessage("");
      setIsOpen(false);
    }
  };

  const handleQuickMessage = (quickMessage: string) => {
    const whatsappUrl = getWhatsAppUrl(quickMessage);
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const handleCall = () => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  // Quick message templates
  const quickMessages = [
    "I'm interested in your event planning services",
    "Can you help me plan a wedding?",
    "I need a quote for a corporate event",
    "What packages do you offer?",
    "I'd like to schedule a consultation"
  ];

  return (
    <>
      {/* WhatsApp Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {isOpen && (
          <Card className="w-80 h-96 bg-white shadow-2xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-yellow-500 animate-pulse" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-sm font-semibold">
                      {businessName}
                    </CardTitle>
                    <p className="text-yellow-100 text-xs animate-pulse">Online now</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="text-white hover:bg-yellow-600 p-1 transition-all duration-300 hover:scale-110"
                  >
                    <div className={`w-3 h-3 transition-transform ${isMinimized ? 'rotate-180' : ''}`}>
                      ▾
                    </div>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-yellow-600 p-1 transition-all duration-300 hover:scale-110"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {!isMinimized && (
              <CardContent className="p-4 h-full flex flex-col">
                {/* Welcome Message */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{welcomeMessage}</p>
                </div>

                {/* Quick Messages */}
                <div className="flex-1 overflow-y-auto mb-4">
                  <p className="text-xs text-gray-500 mb-2 font-medium">Quick messages:</p>
                  <div className="space-y-2">
                    {quickMessages.map((msg, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickMessage(msg)}
                        className="w-full text-left justify-start text-xs h-auto p-2 hover:bg-yellow-50 hover:border-yellow-200 transition-all duration-300 hover:scale-105"
                      >
                        {msg}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Message Input */}
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 hover:scale-110"
                      size="sm"
                      suppressHydrationWarning
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Call Button */}
                  <Button
                    onClick={handleCall}
                    variant="outline"
                    className="w-full text-yellow-600 border-yellow-200 hover:bg-yellow-50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    size="sm"
                    suppressHydrationWarning
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call {phoneNumber}
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {/* WhatsApp Button */}
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse"
            size="icon"
            suppressHydrationWarning
          >
            <MessageCircle className="w-8 h-8 text-white animate-bounce" />
          </Button>
        )}
      </div>

      {/* Pulse Animation */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <div className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-ping opacity-75"></div>
        </div>
      )}
    </>
  );
}
