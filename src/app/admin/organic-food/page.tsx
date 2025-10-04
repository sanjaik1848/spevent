"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Edit, Save, Upload, Video, Image as ImageIcon, X, Leaf, Star } from "lucide-react";
import Link from "next/link";

// Types for Organic Food page data
interface OrganicFoodItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  isOrganic: boolean;
  imageUrl: string;
  rating: number;
  ingredients: string[];
  nutritionalInfo: {
    calories: string;
    protein: string;
    fiber: string;
    vitamins: string;
  };
}

interface OrganicPageSettings {
  heroBackground: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroButtonText: string;
  heroButtonLink: string;
  sectionTitle: string;
  sectionDescription: string;
}

export default function OrganicFoodAdminPage() {
  const [activeTab, setActiveTab] = useState("hero");
  const [organicFoodItems, setOrganicFoodItems] = useState<OrganicFoodItem[]>([]);
  const [organicSettings, setOrganicSettings] = useState<OrganicPageSettings>({
    heroBackground: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80",
    heroTitle: "Organic Excellence",
    heroSubtitle: "Farm to Table",
    heroDescription: "Discover the purest flavors from nature's bounty. Our organic collection brings you the freshest, most nutritious ingredients, grown with care and delivered with love.",
    heroButtonText: "Explore Organic Menu",
    heroButtonLink: "/organic-food",
    sectionTitle: "Our Organic Collection",
    sectionDescription: "Carefully curated organic products that bring you the best of nature"
  });
  
  const [editingItem, setEditingItem] = useState<OrganicFoodItem | null>(null);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newIngredient, setNewIngredient] = useState("");

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      const itemsData = localStorage.getItem('organicFoodItems');
      const settingsData = localStorage.getItem('organicSettings');

      if (itemsData) {
        setOrganicFoodItems(JSON.parse(itemsData));
      } else {
        // Default organic food items
        setOrganicFoodItems([
          {
            id: "1",
            name: "Organic Quinoa Bowl",
            description: "Nutrient-rich quinoa with fresh vegetables and herbs",
            price: "$12.99",
            category: "Main Course",
            isOrganic: true,
            imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
            rating: 4.8,
            ingredients: ["Organic Quinoa", "Fresh Vegetables", "Herbs", "Olive Oil"],
            nutritionalInfo: {
              calories: "320",
              protein: "12g",
              fiber: "6g",
              vitamins: "A, C, K"
            }
          },
          {
            id: "2",
            name: "Green Smoothie Bowl",
            description: "Fresh spinach, kale, and tropical fruits blended to perfection",
            price: "$9.99",
            category: "Smoothie",
            isOrganic: true,
            imageUrl: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&q=80",
            rating: 4.9,
            ingredients: ["Organic Spinach", "Organic Kale", "Banana", "Mango"],
            nutritionalInfo: {
              calories: "180",
              protein: "8g",
              fiber: "8g",
              vitamins: "A, C, K, Folate"
            }
          }
        ]);
      }

      if (settingsData) {
        setOrganicSettings(JSON.parse(settingsData));
      }
    };

    loadData();
  }, []);

  // Auto-save settings
  useEffect(() => {
    if (organicSettings) {
      localStorage.setItem('organicSettings', JSON.stringify(organicSettings));
    }
  }, [organicSettings]);

  // Save data to localStorage
  const saveData = (type: string, data: any) => {
    localStorage.setItem(type, JSON.stringify(data));
  };

  // Organic Food Items CRUD
  const addOrganicItem = (item: Omit<OrganicFoodItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    const updated = [...organicFoodItems, newItem];
    setOrganicFoodItems(updated);
    saveData('organicFoodItems', updated);
  };

  const updateOrganicItem = (id: string, updates: Partial<OrganicFoodItem>) => {
    const updated = organicFoodItems.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    setOrganicFoodItems(updated);
    saveData('organicFoodItems', updated);
  };

  const deleteOrganicItem = (id: string) => {
    const updated = organicFoodItems.filter(item => item.id !== id);
    setOrganicFoodItems(updated);
    saveData('organicFoodItems', updated);
  };

  // Media upload functions
  const handleMediaUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const field = event.target.getAttribute('data-field');
    if (!file || !field) return;

    // Validate file type (images and videos)
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) {
      alert('Please select a valid image or video file');
      return;
    }

    // Validate file size (max 50MB for videos, 5MB for images)
    const maxSize = isVideo ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      const fileType = isVideo ? 'Video' : 'Image';
      const maxSizeMB = isVideo ? '50MB' : '5MB';
      alert(`${fileType} size should be less than ${maxSizeMB}`);
      return;
    }

    setIsUploading(true);

    try {
      // Convert file to base64 for storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          // Update the appropriate field
          if (field === 'heroBackground') {
            setOrganicSettings(prev => ({ ...prev, heroBackground: result }));
          } else if (field.includes('itemImage')) {
            const itemId = field.replace('itemImage-', '');
            updateOrganicItem(itemId, { imageUrl: result });
          }
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading media:', error);
      alert('Error uploading media. Please try again.');
      setIsUploading(false);
    }
  };

  const handleUploadClick = (field: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('data-field', field);
      fileInputRef.current.click();
    }
  };

  const clearMedia = (field: string) => {
    if (field === 'heroBackground') {
      setOrganicSettings(prev => ({ ...prev, heroBackground: '' }));
    } else if (field.includes('itemImage')) {
      const itemId = field.replace('itemImage-', '');
      updateOrganicItem(itemId, { imageUrl: '' });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Organic Food Management</h1>
            <p className="text-gray-600">Manage organic food items and page settings</p>
          </div>
          <Link href="/organic-food" target="_blank">
            <Button variant="outline">
              <Leaf className="w-4 h-4 mr-2" />
              View Organic Food Page
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hero">Hero Settings</TabsTrigger>
            <TabsTrigger value="items">Organic Items</TabsTrigger>
            <TabsTrigger value="settings">Page Settings</TabsTrigger>
          </TabsList>

          {/* Hero Settings Tab */}
          <TabsContent value="hero" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Hero Section Settings</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Background Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Background Settings</CardTitle>
                  <CardDescription>Upload and manage hero section background</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Background Image/Video URL</Label>
                    <Input
                      value={organicSettings.heroBackground}
                      onChange={(e) => setOrganicSettings(prev => ({ ...prev, heroBackground: e.target.value }))}
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                    <div className="flex gap-2 mt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleUploadClick('heroBackground')}
                        disabled={isUploading}
                        className="flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Upload Media
                      </Button>
                      {organicSettings.heroBackground && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => clearMedia('heroBackground')}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                          Clear
                        </Button>
                      )}
                    </div>
                  </div>
                  {organicSettings.heroBackground && (
                    <div className="relative">
                      {organicSettings.heroBackground.startsWith('data:video/') ? (
                        <video
                          src={organicSettings.heroBackground}
                          className="w-full h-32 object-cover rounded-lg border"
                          controls={false}
                          muted
                        />
                      ) : (
                        <img
                          src={organicSettings.heroBackground}
                          alt="Hero background preview"
                          className="w-full h-32 object-cover rounded-lg border"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/400x200?text=Image+Not+Found";
                          }}
                        />
                      )}
                      <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        {organicSettings.heroBackground.startsWith('data:video/') ? (
                          <Video className="w-3 h-3" />
                        ) : (
                          <ImageIcon className="w-3 h-3" />
                        )}
                        {organicSettings.heroBackground.startsWith('data:') ? 'Uploaded' : 'URL'}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Content Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Content Settings</CardTitle>
                  <CardDescription>Edit hero section text content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Main Title</Label>
                    <Input
                      value={organicSettings.heroTitle}
                      onChange={(e) => setOrganicSettings(prev => ({ ...prev, heroTitle: e.target.value }))}
                      placeholder="Organic Excellence"
                    />
                  </div>
                  <div>
                    <Label>Subtitle</Label>
                    <Input
                      value={organicSettings.heroSubtitle}
                      onChange={(e) => setOrganicSettings(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                      placeholder="Farm to Table"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={organicSettings.heroDescription}
                      onChange={(e) => setOrganicSettings(prev => ({ ...prev, heroDescription: e.target.value }))}
                      rows={3}
                      placeholder="Discover the purest flavors from nature's bounty..."
                    />
                  </div>
                  <div>
                    <Label>Button Text</Label>
                    <Input
                      value={organicSettings.heroButtonText}
                      onChange={(e) => setOrganicSettings(prev => ({ ...prev, heroButtonText: e.target.value }))}
                      placeholder="Explore Organic Menu"
                    />
                  </div>
                  <div>
                    <Label>Button Link</Label>
                    <Input
                      value={organicSettings.heroButtonLink}
                      onChange={(e) => setOrganicSettings(prev => ({ ...prev, heroButtonLink: e.target.value }))}
                      placeholder="/organic-food"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Organic Items Tab */}
          <TabsContent value="items" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Organic Food Items</h2>
              <Button onClick={() => setEditingItem(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Organic Item
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {organicFoodItems.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {item.name}
                          {item.isOrganic && <Leaf className="w-4 h-4 text-green-600" />}
                        </CardTitle>
                        <CardDescription>{item.category}</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingItem(item);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteOrganicItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {item.imageUrl && (
                      <div className="relative mb-3">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2 flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs bg-black/50 text-white px-1 rounded">{item.rating}</span>
                        </div>
                      </div>
                    )}
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-green-600">{item.price}</span>
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Page Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Page Settings</h2>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Section Settings</CardTitle>
                <CardDescription>Configure the main content section</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Section Title</Label>
                  <Input
                    value={organicSettings.sectionTitle}
                    onChange={(e) => setOrganicSettings(prev => ({ ...prev, sectionTitle: e.target.value }))}
                    placeholder="Our Organic Collection"
                  />
                </div>
                <div>
                  <Label>Section Description</Label>
                  <Textarea
                    value={organicSettings.sectionDescription}
                    onChange={(e) => setOrganicSettings(prev => ({ ...prev, sectionDescription: e.target.value }))}
                    rows={3}
                    placeholder="Carefully curated organic products..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Hidden file input for media uploads */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          onChange={handleMediaUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}
