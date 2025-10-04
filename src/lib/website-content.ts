export type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  event: string;
  featured: boolean;
};

export type Booking = {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  location: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  specialRequests: string;
  createdAt: string;
};

export type StarClient = {
  id: string;
  name: string;
  company: string;
  imageUrl: string;
  testimonial: string;
  rating: number;
  eventType: string;
  featured: boolean;
};

export type WebsiteStats = {
  totalBookings: number;
  completedBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  starClients: number;
  yearsExperience: number;
};

export type WebsiteContent = {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
    ctaText: string;
    ctaLink: string;
  };
  about: {
    title: string;
    description: string;
    features: string[];
    imageUrl: string;
  };
  services: {
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
      icon: string;
      price: string;
    }[];
  };
  contact: {
    title: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
  footer: {
    quickLinksTitle: string;
    connectTitle: string;
    description: string;
    socialLinks: {
      instagram: string;
      facebook: string;
      twitter: string;
      linkedin: string;
      youtube: string;
    };
    contactInfo: {
      phone: string;
      email: string;
      address: string;
      website: string;
    };
  };
};

export const defaultWebsiteContent: WebsiteContent = {
  hero: {
    title: "SP Events",
    subtitle: "A contemporary event management company with authentic event planning expertise. We serve freshly prepared experiences in a backdrop designed for a majestic celebration, especially for you!",
    description: "Our menu has evolved through the handed-down home-style event planning technique, with an emphasis on natural elegance. We focus on retaining the authenticity of each celebration by preparing them using indigenous creativity and timeless recipes. Join us for a traditional wedding ceremony, a quintessential corporate gathering, an authentic birthday celebration and a scrumptious gala experience.",
    backgroundImage: "https://images.unsplash.com/photo-1519167758481-83f142b8fb9c?w=1200&q=80",
    ctaText: "Explore Our Services",
    ctaLink: "/services"
  },
  about: {
    title: "About SP Events",
    description: "With over 15 years of experience in event management, we specialize in creating extraordinary celebrations that exceed expectations. Our team of expert planners brings creativity, precision, and luxury service to every event.",
    features: [
      "Professional Event Planning",
      "Luxury Venue Coordination",
      "Expert Vendor Management",
      "Customizable Event Packages",
      "24/7 Event Support"
    ],
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80"
  },
  services: {
    title: "Our Services",
    description: "We offer comprehensive event management services for all types of celebrations, ensuring flawless execution and unforgettable experiences.",
    items: [
      {
        title: "Wedding Planning",
        description: "Complete wedding coordination from venue selection to vendor management",
        icon: "Heart",
        price: "From $2,500"
      },
      {
        title: "Corporate Events",
        description: "Professional event management for business meetings and conferences",
        icon: "Users",
        price: "From $1,500"
      },
      {
        title: "Birthday Parties",
        description: "Fun and memorable celebrations for all ages",
        icon: "Star",
        price: "From $800"
      },
      {
        title: "Special Occasions",
        description: "Anniversaries, graduations, and milestone celebrations",
        icon: "Calendar",
        price: "From $1,200"
      }
    ]
  },
  contact: {
    title: "Contact Us",
    description: "Ready to create an unforgettable event experience? Get in touch with our expert team today!",
    phone: "+1 (555) 123-4567",
    email: "info@spevents.com",
    address: "123 Event Plaza, Downtown District, City 12345",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 4:00 PM"
  },
  footer: {
    quickLinksTitle: "Quick Links",
    connectTitle: "Connect With Us",
    description: "Crafting unforgettable experiences with elegance and precision.",
    socialLinks: {
      instagram: "https://instagram.com/spevents",
      facebook: "https://facebook.com/spevents",
      twitter: "https://twitter.com/spevents",
      linkedin: "https://linkedin.com/company/spevents",
      youtube: "https://youtube.com/spevents"
    },
    contactInfo: {
      phone: "+1-234-567-8900",
      email: "info@spevents.com",
      address: "SP Events Center, Downtown District",
      website: "https://spevents.com"
    }
  }
};

export const defaultReviews: Review[] = [
  {
    id: "review-1",
    name: "Sarah Johnson",
    rating: 5,
    comment: "Absolutely amazing event management! Our wedding was flawless from start to finish. The team's attention to detail and professionalism exceeded all expectations.",
    date: "2024-01-15",
    event: "Wedding Reception",
    featured: true
  },
  {
    id: "review-2",
    name: "Michael Chen",
    rating: 5,
    comment: "Best event management company in the city! Our corporate conference was perfectly organized and executed. Highly recommended for any business event.",
    date: "2024-01-10",
    event: "Corporate Conference",
    featured: true
  },
  {
    id: "review-3",
    name: "Emily Rodriguez",
    rating: 4,
    comment: "Great service and professional team. Our daughter's birthday party was magical and everything went smoothly. Will definitely use them again.",
    date: "2024-01-08",
    event: "Birthday Party",
    featured: false
  },
  {
    id: "review-4",
    name: "David Thompson",
    rating: 5,
    comment: "Exceptional event planning service! Our anniversary celebration was unforgettable. The team brought our vision to life perfectly.",
    date: "2024-01-05",
    event: "Anniversary Celebration",
    featured: true
  }
];

export const defaultBookings: Booking[] = [
  {
    id: "booking-1",
    clientName: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+1 (555) 123-4567",
    eventType: "Wedding Reception",
    eventDate: "2024-02-15",
    guestCount: 150,
    location: "Grand Ballroom, Downtown",
    status: "confirmed",
    totalAmount: 3750,
    specialRequests: "Vegetarian menu only, no nuts",
    createdAt: "2024-01-15"
  },
  {
    id: "booking-2",
    clientName: "Rajesh Kumar",
    email: "rajesh.kumar@company.com",
    phone: "+1 (555) 234-5678",
    eventType: "Corporate Event",
    eventDate: "2024-02-20",
    guestCount: 75,
    location: "Conference Center",
    status: "pending",
    totalAmount: 1125,
    specialRequests: "Lunch buffet, coffee service",
    createdAt: "2024-01-18"
  },
  {
    id: "booking-3",
    clientName: "Meera Patel",
    email: "meera.patel@email.com",
    phone: "+1 (555) 345-6789",
    eventType: "Birthday Party",
    eventDate: "2024-02-25",
    guestCount: 50,
    location: "Community Center",
    status: "completed",
    totalAmount: 1000,
    specialRequests: "Kids-friendly options",
    createdAt: "2024-01-20"
  }
];

export const defaultStarClients: StarClient[] = [
  {
    id: "client-1",
    name: "Priya Sharma",
    company: "Tech Solutions Inc.",
    imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&q=80",
    testimonial: "SP Events made our wedding reception absolutely perfect. The authentic flavors and professional service exceeded our expectations.",
    rating: 5,
    eventType: "Wedding",
    featured: true
  },
  {
    id: "client-2",
    name: "Rajesh Kumar",
    company: "Global Enterprises",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    testimonial: "Outstanding catering service for our corporate events. The team is professional and the food is consistently excellent.",
    rating: 5,
    eventType: "Corporate",
    featured: true
  },
  {
    id: "client-3",
    name: "Meera Patel",
    company: "Community Center",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
    testimonial: "Perfect for family celebrations! The traditional dishes brought joy to our special day.",
    rating: 4,
    eventType: "Family Event",
    featured: true
  }
];

export const defaultStats: WebsiteStats = {
  totalBookings: 156,
  completedBookings: 142,
  pendingBookings: 14,
  totalRevenue: 45680,
  averageRating: 4.8,
  totalReviews: 89,
  starClients: 45,
  yearsExperience: 15
};
