import { useState, useEffect } from 'react';
import { 
  defaultWebsiteContent, 
  defaultReviews, 
  defaultBookings, 
  defaultStarClients, 
  defaultStats,
  WebsiteContent,
  Review,
  Booking,
  StarClient,
  WebsiteStats
} from '@/lib/website-content';

// Website Content Hook
export function useWebsiteContent() {
  const [content, setContent] = useState<WebsiteContent>(defaultWebsiteContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }
    
    try {
      const storedContent = localStorage.getItem('websiteContent');
      if (storedContent) {
        setContent(JSON.parse(storedContent));
      } else {
        setContent(defaultWebsiteContent);
      }
    } catch (error) {
      console.error("Failed to load website content from localStorage, using default data.", error);
      setContent(defaultWebsiteContent);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      localStorage.setItem('websiteContent', JSON.stringify(content));
    }
  }, [content, isLoading]);

  const updateContent = (section: keyof WebsiteContent, updatedData: any) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], ...updatedData }
    }));
  };

  const resetContent = () => {
    setContent(defaultWebsiteContent);
  };

  return { content, isLoading, updateContent, resetContent };
}

// Reviews Hook
export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }
    
    try {
      const storedReviews = localStorage.getItem('reviews');
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      } else {
        setReviews(defaultReviews);
      }
    } catch (error) {
      console.error("Failed to load reviews from localStorage, using default data.", error);
      setReviews(defaultReviews);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      localStorage.setItem('reviews', JSON.stringify(reviews));
    }
  }, [reviews, isLoading]);

  const addReview = (review: Omit<Review, 'id'>) => {
    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}`
    };
    setReviews(prev => [...prev, newReview]);
  };

  const updateReview = (id: string, updatedReview: Partial<Review>) => {
    setReviews(prev => prev.map(review => 
      review.id === id ? { ...review, ...updatedReview } : review
    ));
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(review => review.id !== id));
  };

  const toggleFeatured = (id: string) => {
    setReviews(prev => prev.map(review => 
      review.id === id ? { ...review, featured: !review.featured } : review
    ));
  };

  return { reviews, isLoading, addReview, updateReview, deleteReview, toggleFeatured };
}

// Bookings Hook
export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>(defaultBookings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }
    
    try {
      const storedBookings = localStorage.getItem('bookings');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      } else {
        setBookings(defaultBookings);
      }
    } catch (error) {
      console.error("Failed to load bookings from localStorage, using default data.", error);
      setBookings(defaultBookings);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      localStorage.setItem('bookings', JSON.stringify(bookings));
    }
  }, [bookings, isLoading]);

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...booking,
      id: `booking-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBookings(prev => [...prev, newBooking]);
  };

  const updateBooking = (id: string, updatedBooking: Partial<Booking>) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, ...updatedBooking } : booking
    ));
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    ));
  };

  return { bookings, isLoading, addBooking, updateBooking, deleteBooking, updateBookingStatus };
}

// Star Clients Hook
export function useStarClients() {
  const [starClients, setStarClients] = useState<StarClient[]>(defaultStarClients);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }
    
    try {
      const storedClients = localStorage.getItem('starClients');
      if (storedClients) {
        setStarClients(JSON.parse(storedClients));
      } else {
        setStarClients(defaultStarClients);
      }
    } catch (error) {
      console.error("Failed to load star clients from localStorage, using default data.", error);
      setStarClients(defaultStarClients);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      localStorage.setItem('starClients', JSON.stringify(starClients));
    }
  }, [starClients, isLoading]);

  const addStarClient = (client: Omit<StarClient, 'id'>) => {
    const newClient: StarClient = {
      ...client,
      id: `client-${Date.now()}`
    };
    setStarClients(prev => [...prev, newClient]);
  };

  const updateStarClient = (id: string, updatedClient: Partial<StarClient>) => {
    setStarClients(prev => prev.map(client => 
      client.id === id ? { ...client, ...updatedClient } : client
    ));
  };

  const deleteStarClient = (id: string) => {
    setStarClients(prev => prev.filter(client => client.id !== id));
  };

  const toggleFeatured = (id: string) => {
    setStarClients(prev => prev.map(client => 
      client.id === id ? { ...client, featured: !client.featured } : client
    ));
  };

  return { starClients, isLoading, addStarClient, updateStarClient, deleteStarClient, toggleFeatured };
}

// Stats Hook
export function useStats() {
  const [stats, setStats] = useState<WebsiteStats>(defaultStats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }
    
    try {
      const storedStats = localStorage.getItem('websiteStats');
      if (storedStats) {
        setStats(JSON.parse(storedStats));
      } else {
        setStats(defaultStats);
      }
    } catch (error) {
      console.error("Failed to load stats from localStorage, using default data.", error);
      setStats(defaultStats);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      localStorage.setItem('websiteStats', JSON.stringify(stats));
    }
  }, [stats, isLoading]);

  const updateStats = (updatedStats: Partial<WebsiteStats>) => {
    setStats(prev => ({ ...prev, ...updatedStats }));
  };

  const resetStats = () => {
    setStats(defaultStats);
  };

  return { stats, isLoading, updateStats, resetStats };
}
