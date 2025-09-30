export type WelcomePageData = {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  floatingCards: {
    title: string;
    subtitle: string;
    icon: string;
    position: 'top-left' | 'bottom-right';
  }[];
};

export const defaultWelcomeData: WelcomePageData = {
  title: "Welcome to",
  subtitle: "Elite Event Management",
  description: "Transform your special moments into unforgettable experiences. From intimate gatherings to grand celebrations, we orchestrate every detail with precision, creativity, and luxury service.",
  heroImage: "https://images.unsplash.com/photo-1519167758481-83f142b8fb9c?w=800&q=80",
  heroImageAlt: "Elegant event setup with beautiful decorations",
  primaryButtonText: "Enter Website",
  primaryButtonLink: "/website",
  secondaryButtonText: "Plan Your Event",
  secondaryButtonLink: "/services",
  features: [
    {
      title: "Event Planning",
      description: "Professional",
      icon: "Calendar"
    },
    {
      title: "Premium Service",
      description: "Luxury",
      icon: "Star"
    },
    {
      title: "Expert Team",
      description: "Experienced",
      icon: "Users"
    }
  ],
  floatingCards: [
    {
      title: "500+ Events",
      subtitle: "Successfully Managed",
      icon: "Heart",
      position: "top-left"
    },
    {
      title: "24/7 Support",
      subtitle: "Always Available",
      icon: "Clock",
      position: "bottom-right"
    }
  ]
};
