"use client";

import { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  X,
  Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import { menuData } from "@/lib/menu-data";

// Convert website menu data to admin format
const defaultMenuItems: MenuItem[] = [
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

const categories = ["All", "Starters", "Main Courses", "Vegetarian", "Desserts"];

interface MenuItem {
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
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(defaultMenuItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    name: "",
    description: "",
    category: "Starters",
    price: "",
    prepTime: "",
    featured: false,
    available: true
  });

  const categories = ["Starters", "Main Courses", "Vegetarian", "Desserts", "Beverages"];

  const filteredItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          const newItem: MenuItem = {
            id: `menu-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: uploadForm.name,
            description: uploadForm.description,
            category: uploadForm.category,
            imageUrl: result,
            imageHint: uploadForm.name,
            price: uploadForm.price,
            prepTime: uploadForm.prepTime,
            featured: uploadForm.featured,
            available: uploadForm.available
          };

          setMenuItems(prev => [...prev, newItem]);
          
          // Save to localStorage
          if (typeof window !== 'undefined') {
            const savedItems = localStorage.getItem('menuItems');
            const items = savedItems ? JSON.parse(savedItems) : [];
            localStorage.setItem('menuItems', JSON.stringify([...items, newItem]));
          }

          // Reset form
          setUploadForm({
            name: "",
            description: "",
            category: "Starters",
            price: "",
            prepTime: "",
            featured: false,
            available: true
          });
          setIsUploadDialogOpen(false);
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

  const handleDeleteItem = (itemId: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== itemId));
    
    // Update localStorage
    if (typeof window !== 'undefined') {
      const savedItems = localStorage.getItem('menuItems');
      const items = savedItems ? JSON.parse(savedItems) : [];
      const updatedItems = items.filter((item: MenuItem) => item.id !== itemId);
      localStorage.setItem('menuItems', JSON.stringify(updatedItems));
    }
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setIsEditDialogOpen(true);
  };

  const handleUpdateItem = () => {
    if (!editingItem) return;

    setMenuItems(prev => prev.map(item => 
      item.id === editingItem.id ? editingItem : item
    ));

    // Update localStorage
    if (typeof window !== 'undefined') {
      const savedItems = localStorage.getItem('menuItems');
      const items = savedItems ? JSON.parse(savedItems) : [];
      const updatedItems = items.map((item: MenuItem) => 
        item.id === editingItem.id ? editingItem : item
      );
      localStorage.setItem('menuItems', JSON.stringify(updatedItems));
    }

    setIsEditDialogOpen(false);
    setEditingItem(null);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
              <p className="text-gray-600 mt-1">Manage your restaurant menu items and categories.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Menu Item</DialogTitle>
                    <DialogDescription>
                      Add a new item to your menu with image upload.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Item Name</Label>
                      <Input
                        id="name"
                        value={uploadForm.name}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter item name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={uploadForm.description}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter description"
                        rows={3}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        value={uploadForm.category}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          value={uploadForm.price}
                          onChange={(e) => setUploadForm(prev => ({ ...prev, price: e.target.value }))}
                          placeholder="$12-18"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="prepTime">Prep Time</Label>
                        <Input
                          id="prepTime"
                          value={uploadForm.prepTime}
                          onChange={(e) => setUploadForm(prev => ({ ...prev, prepTime: e.target.value }))}
                          placeholder="15-20 min"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={uploadForm.featured}
                          onChange={(e) => setUploadForm(prev => ({ ...prev, featured: e.target.checked }))}
                        />
                        <Label htmlFor="featured">Featured Item</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="available"
                          checked={uploadForm.available}
                          onChange={(e) => setUploadForm(prev => ({ ...prev, available: e.target.checked }))}
                        />
                        <Label htmlFor="available">Available</Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUploadClick} disabled={isUploading}>
                      {isUploading ? 'Uploading...' : 'Select Image'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
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
                    placeholder="Search menu items..." 
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((category) => (
                <Badge 
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  {category}
                </Badge>
              ))}
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
                  <p className="text-3xl font-bold">{menuItems.length}</p>
                </div>
                <Utensils className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Starters</p>
                  <p className="text-3xl font-bold">{menuItems.filter(item => item.category === 'Starters').length}</p>
                </div>
                <ChefHat className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Main Courses</p>
                  <p className="text-3xl font-bold">{menuItems.filter(item => item.category === 'Main Courses').length}</p>
                </div>
                <Utensils className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Vegetarian</p>
                  <p className="text-3xl font-bold">{menuItems.filter(item => item.category === 'Vegetarian').length}</p>
                </div>
                <Star className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm">Desserts</p>
                  <p className="text-3xl font-bold">{menuItems.filter(item => item.category === 'Desserts').length}</p>
                </div>
                <Star className="w-8 h-8 text-pink-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm">Featured Items</p>
                  <p className="text-3xl font-bold">{menuItems.filter(item => item.featured).length}</p>
                </div>
                <Star className="w-8 h-8 text-indigo-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm">Available Items</p>
                  <p className="text-3xl font-bold">{menuItems.filter(item => item.available).length}</p>
                </div>
                <ChefHat className="w-8 h-8 text-teal-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
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
                    <Utensils className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  {item.featured && (
                    <Badge variant="secondary" className="text-xs">Featured</Badge>
                  )}
                </div>
                <div className="absolute bottom-2 left-2">
                  <Badge variant="outline" className="text-xs bg-white">{item.category}</Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                  <Badge variant={item.available ? "default" : "secondary"} className="text-xs">
                    {item.available ? "Available" : "Unavailable"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {item.prepTime}
                  </span>
                  <span className="font-semibold text-green-600">{item.price}</span>
                </div>
                <div className="flex space-x-2">
                  <Link href="/food" target="_blank">
                    <Button size="sm" variant="ghost" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View on Site
                    </Button>
                  </Link>
                  <Button size="sm" variant="ghost" onClick={() => handleEditItem(item)}>
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
                        <AlertDialogTitle>Delete Menu Item</AlertDialogTitle>
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
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
            <DialogDescription>
              Update the details for this menu item.
            </DialogDescription>
          </DialogHeader>
          {editingItem && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Item Name</Label>
                <Input
                  id="edit-name"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, name: e.target.value } : null)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingItem.description}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, description: e.target.value } : null)}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <select
                  id="edit-category"
                  value={editingItem.category}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, category: e.target.value } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-price">Price</Label>
                  <Input
                    id="edit-price"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, price: e.target.value } : null)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-prepTime">Prep Time</Label>
                  <Input
                    id="edit-prepTime"
                    value={editingItem.prepTime}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, prepTime: e.target.value } : null)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-featured"
                    checked={editingItem.featured}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, featured: e.target.checked } : null)}
                  />
                  <Label htmlFor="edit-featured">Featured Item</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-available"
                    checked={editingItem.available}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, available: e.target.checked } : null)}
                  />
                  <Label htmlFor="edit-available">Available</Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateItem}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}