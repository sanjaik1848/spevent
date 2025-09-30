import { useState, useEffect } from 'react';

// Food item type
export type FoodItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  imageHint: string;
  price: string;
  prepTime: string;
  featured: boolean;
  available: boolean;
};

// Custom hook for managing food items with localStorage persistence
export const useFoodItems = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load items from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem('foodItems');
    if (savedItems) {
      try {
        setFoodItems(JSON.parse(savedItems));
      } catch (error) {
        console.error('Error parsing saved food items:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save items to localStorage whenever foodItems changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('foodItems', JSON.stringify(foodItems));
    }
  }, [foodItems, isLoading]);

  const addFoodItem = (item: FoodItem) => {
    setFoodItems(prev => [...prev, item]);
  };

  const updateFoodItem = (id: string, updatedItem: FoodItem) => {
    setFoodItems(prev => prev.map(item => 
      item.id === id ? updatedItem : item
    ));
  };

  const deleteFoodItem = (id: string) => {
    setFoodItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleAvailability = (id: string) => {
    setFoodItems(prev => prev.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const toggleFeatured = (id: string) => {
    setFoodItems(prev => prev.map(item => 
      item.id === id ? { ...item, featured: !item.featured } : item
    ));
  };

  return {
    foodItems,
    isLoading,
    addFoodItem,
    updateFoodItem,
    deleteFoodItem,
    toggleAvailability,
    toggleFeatured,
    setFoodItems
  };
};
