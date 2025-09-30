"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  Utensils, 
  Search, 
  Filter, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Upload,
  ExternalLink,
  ChefHat,
  Clock,
  Star,
  Save,
  X,
  Image as ImageIcon,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { menuData } from "@/lib/menu-data";
import { useFoodItems, FoodItem } from "@/hooks/useFoodItems";

// Convert website menu data to admin format
const initialMenuItems: FoodItem[] = [
  ...menuData.starters.map((item, index) => ({
    id: `starter-${index}`,
    name: item.name,
    description: item.description,
    category: "Starters",
    imageUrl: item.imageUrl,
    imageHint: item.imageHint,
    price: "$12-18",
    prepTime: "15-20 min",
    featured: index < 2,
    available: true
  })),
  ...menuData.mainCourses.map((item, index) => ({
    id: `main-${index}`,
    name: item.name,
    description: item.description,
    category: "Main Courses",
    imageUrl: item.imageUrl,
    imageHint: item.imageHint,
    price: "$18-28",
    prepTime: "25-35 min",
    featured: index < 2,
    available: true
  })),
  ...menuData.veg.map((item, index) => ({
    id: `veg-${index}`,
    name: item.name,
    description: item.description,
    category: "Vegetarian",
    imageUrl: item.imageUrl,
    imageHint: item.imageHint,
    price: "$15-25",
    prepTime: "20-30 min",
    featured: index < 2,
    available: true
  })),
  ...menuData.desserts.map((item, index) => ({
    id: `dessert-${index}`,
    name: item.name,
    description: item.description,
    category: "Desserts",
    imageUrl: item.imageUrl,
    imageHint: item.imageHint,
    price: "$8-15",
    prepTime: "10-15 min",
    featured: index < 1,
    available: true
  }))
];

const categories = ["Starters", "Main Courses", "Vegetarian", "Desserts"];

// Food Item Form Component
const FoodItemForm = ({ 
  item, 
  onSave, 
  onCancel, 
  isEdit = false 
}: { 
  item?: FoodItem; 
  onSave: (item: FoodItem) => void; 
  onCancel: () => void;
  isEdit?: boolean;
}) => {
  const [formData, setFormData] = useState<FoodItem>(item || {
    id: '',
    name: '',
    description: '',
    category: 'Starters',
    imageUrl: '',
    imageHint: '',
    price: '',
    prepTime: '',
    featured: false,
    available: true
  });

  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Convert file to base64 for storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setFormData({ ...formData, imageUrl: result });
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setFormData({ ...formData, imageUrl: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEdit) {
      formData.id = `${formData.category.toLowerCase().replace(' ', '-')}-${Date.now()}`;
    }
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter food item name"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Category</label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter food description"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Price</label>
          <Input
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="e.g., $15-25"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Prep Time</label>
          <Input
            value={formData.prepTime}
            onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
            placeholder="e.g., 20-30 min"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Image URL</label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="Enter image URL"
                required
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleUploadClick}
                disabled={isUploading}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload
              </Button>
              {formData.imageUrl && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={clearImage}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                  Clear
                </Button>
              )}
            </div>
            {formData.imageUrl && (
              <div className="relative">
                <img
                  src={formData.imageUrl}
                  alt="Food preview"
                  className="w-full h-32 object-cover rounded border"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/400x200?text=Image+Not+Found";
                  }}
                />
                <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  {formData.imageUrl.startsWith('data:') ? 'Uploaded' : 'URL'}
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Image Hint</label>
          <Input
            value={formData.imageHint}
            onChange={(e) => setFormData({ ...formData, imageHint: e.target.value })}
            placeholder="Enter image description"
            required
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="rounded"
          />
          <span className="text-sm font-medium text-gray-700">Featured</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.available}
            onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
            className="rounded"
          />
          <span className="text-sm font-medium text-gray-700">Available</span>
        </label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button type="submit">
          <Save className="w-4 h-4 mr-2" />
          {isEdit ? 'Update' : 'Create'} Item
        </Button>
      </div>
    </form>
  );
};

export default function FoodManagementPage() {
  const { 
    foodItems, 
    isLoading, 
    addFoodItem, 
    updateFoodItem, 
    deleteFoodItem, 
    toggleAvailability, 
    toggleFeatured,
    setFoodItems 
  } = useFoodItems();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state for new item
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    category: "Starters",
    price: "",
    prepTime: "",
    featured: false,
    available: true
  });

  const categories = ["All", "Starters", "Main Courses", "Vegetarian", "Desserts", "Beverages"];

  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Convert file to base64 for storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          const foodItem: FoodItem = {
            id: `food-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: newItem.name,
            description: newItem.description,
            category: newItem.category,
            imageUrl: result,
            imageHint: newItem.name,
            price: newItem.price,
            prepTime: newItem.prepTime,
            featured: newItem.featured,
            available: newItem.available
          };

          addFoodItem(foodItem);

          // Reset form
          setNewItem({
            name: "",
            description: "",
            category: "Starters",
            price: "",
            prepTime: "",
            featured: false,
            available: true
          });
          setIsCreateDialogOpen(false);
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Initialize with default data if no items exist
  useEffect(() => {
    if (!isLoading && foodItems.length === 0) {
      setFoodItems(initialMenuItems);
    }
  }, [isLoading, foodItems.length, setFoodItems]);

  // CRUD Operations
  const handleCreateItem = (newItem: FoodItem) => {
    addFoodItem(newItem);
    setIsCreateDialogOpen(false);
  };

  const handleUpdateItem = (updatedItem: FoodItem) => {
    updateFoodItem(updatedItem.id, updatedItem);
    setEditingItem(null);
  };

  const handleDeleteItem = (itemId: string) => {
    deleteFoodItem(itemId);
  };

  const handleToggleAvailability = (itemId: string) => {
    toggleAvailability(itemId);
  };

  const handleToggleFeatured = (itemId: string) => {
    toggleFeatured(itemId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading food items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Food Management</h1>
              <p className="text-gray-600 mt-1">Manage your restaurant menu items with full CRUD operations.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/food" target="_blank">
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Site
                </Button>
              </Link>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Food Item</DialogTitle>
                  </DialogHeader>
                  <FoodItemForm 
                    onSave={handleCreateItem}
                    onCancel={() => setIsCreateDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input 
                    placeholder="Search food items..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Total Items</p>
                  <p className="text-3xl font-bold">{foodItems.length}</p>
                </div>
                <Utensils className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Available</p>
                  <p className="text-3xl font-bold">{foodItems.filter(item => item.available).length}</p>
                </div>
                <ChefHat className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Featured</p>
                  <p className="text-3xl font-bold">{foodItems.filter(item => item.featured).length}</p>
                </div>
                <Star className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Categories</p>
                  <p className="text-3xl font-bold">{categories.length}</p>
                </div>
                <Utensils className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative bg-gradient-to-br from-gray-100 to-gray-200">
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  {item.featured && (
                    <Badge variant="secondary" className="text-xs">Featured</Badge>
                  )}
                  <Badge variant={item.available ? "default" : "secondary"} className="text-xs">
                    {item.available ? "Available" : "Unavailable"}
                  </Badge>
                </div>
                <div className="absolute bottom-2 left-2">
                  <Badge variant="outline" className="text-xs bg-white">{item.category}</Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {item.prepTime}
                  </span>
                  <span className="font-semibold text-green-600">{item.price}</span>
                </div>
                <div className="flex space-x-1">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => handleToggleAvailability(item.id)}
                    className={item.available ? "text-green-600" : "text-red-600"}
                  >
                    {item.available ? "✓" : "✗"}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => handleToggleFeatured(item.id)}
                    className={item.featured ? "text-yellow-600" : "text-gray-600"}
                  >
                    <Star className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setEditingItem(item)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Food Item</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{item.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDeleteItem(item.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Food Item</DialogTitle>
            </DialogHeader>
            {editingItem && (
              <FoodItemForm 
                item={editingItem}
                onSave={handleUpdateItem}
                onCancel={() => setEditingItem(null)}
                isEdit={true}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
