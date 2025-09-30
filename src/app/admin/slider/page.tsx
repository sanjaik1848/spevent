"use client";

import { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  Image as ImageIcon, 
  Search, 
  Filter, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Upload,
  ExternalLink,
  Play,
  Pause,
  ArrowUp,
  ArrowDown,
  Star,
  X
} from "lucide-react";
import Link from "next/link";
import { slideshowImages } from "@/lib/slideshow-images";

interface SliderItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  imageHint: string;
  order: number;
  active: boolean;
  duration: number; // in seconds
  uploadedAt: string;
  views: number;
  featured: boolean;
}

// Convert website slideshow data to admin format
const defaultSliderItems: SliderItem[] = slideshowImages.map((item, index) => ({
  id: item.id,
  title: item.description,
  description: `Professional event photography - ${item.description}`,
  imageUrl: item.imageUrl,
  imageHint: item.imageHint,
  order: index + 1,
  active: true,
  duration: 5,
  uploadedAt: "2024-01-15",
  views: Math.floor(Math.random() * 1000) + 100,
  featured: index < 3
}));

export default function SliderPage() {
  const [sliderItems, setSliderItems] = useState<SliderItem[]>(defaultSliderItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SliderItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    duration: 5,
    featured: false,
    active: true
  });

  const filteredItems = sliderItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      for (const file of Array.from(files)) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert(`File ${file.name} is not a valid image`);
          continue;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          alert(`File ${file.name} is too large. Maximum size is 10MB`);
          continue;
        }

        // Convert file to base64
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (result) {
            const newItem: SliderItem = {
              id: `uploaded-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              title: uploadForm.title || file.name.split('.')[0],
              description: uploadForm.description || `Uploaded hero image`,
              imageUrl: result,
              imageHint: uploadForm.title || file.name.split('.')[0],
              order: sliderItems.length + 1,
              active: uploadForm.active,
              duration: uploadForm.duration,
              uploadedAt: new Date().toISOString().split('T')[0],
              views: 0,
              featured: uploadForm.featured
            };

            setSliderItems(prev => [...prev, newItem]);
            
            // Save to localStorage
            if (typeof window !== 'undefined') {
              const savedItems = localStorage.getItem('sliderItems');
              const items = savedItems ? JSON.parse(savedItems) : [];
              localStorage.setItem('sliderItems', JSON.stringify([...items, newItem]));
            }
          }
        };
        reader.readAsDataURL(file);
      }

      // Reset form
      setUploadForm({
        title: "",
        description: "",
        duration: 5,
        featured: false,
        active: true
      });
      setIsUploadDialogOpen(false);
      
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteItem = (itemId: string) => {
    setSliderItems(prev => prev.filter(item => item.id !== itemId));
    
    // Update localStorage
    if (typeof window !== 'undefined') {
      const savedItems = localStorage.getItem('sliderItems');
      const items = savedItems ? JSON.parse(savedItems) : [];
      const updatedItems = items.filter((item: SliderItem) => item.id !== itemId);
      localStorage.setItem('sliderItems', JSON.stringify(updatedItems));
    }
  };

  const handleEditItem = (item: SliderItem) => {
    setEditingItem(item);
    setIsEditDialogOpen(true);
  };

  const handleUpdateItem = () => {
    if (!editingItem) return;

    setSliderItems(prev => prev.map(item => 
      item.id === editingItem.id ? editingItem : item
    ));

    // Update localStorage
    if (typeof window !== 'undefined') {
      const savedItems = localStorage.getItem('sliderItems');
      const items = savedItems ? JSON.parse(savedItems) : [];
      const updatedItems = items.map((item: SliderItem) => 
        item.id === editingItem.id ? editingItem : item
      );
      localStorage.setItem('sliderItems', JSON.stringify(updatedItems));
    }

    setIsEditDialogOpen(false);
    setEditingItem(null);
  };

  const handleReorder = (itemId: string, direction: 'up' | 'down') => {
    setSliderItems(prev => {
      const items = [...prev];
      const currentIndex = items.findIndex(item => item.id === itemId);
      
      if (direction === 'up' && currentIndex > 0) {
        [items[currentIndex], items[currentIndex - 1]] = [items[currentIndex - 1], items[currentIndex]];
      } else if (direction === 'down' && currentIndex < items.length - 1) {
        [items[currentIndex], items[currentIndex + 1]] = [items[currentIndex + 1], items[currentIndex]];
      }
      
      // Update order numbers
      items.forEach((item, index) => {
        item.order = index + 1;
      });
      
      return items;
    });
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
              <h1 className="text-3xl font-bold text-gray-900">Hero Slider Management</h1>
              <p className="text-gray-600 mt-1">Manage your homepage hero slider images and settings.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Images
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Upload Hero Images</DialogTitle>
                    <DialogDescription>
                      Add new images to your hero slider. These will appear on your homepage.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={uploadForm.title}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter title for the image"
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
                      <Label htmlFor="duration">Duration (seconds)</Label>
                      <Input
                        id="duration"
                        type="number"
                        min="1"
                        max="10"
                        value={uploadForm.duration}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, duration: parseInt(e.target.value) || 5 }))}
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          checked={uploadForm.featured}
                          onCheckedChange={(checked) => setUploadForm(prev => ({ ...prev, featured: checked }))}
                        />
                        <Label htmlFor="featured">Mark as featured</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="active"
                          checked={uploadForm.active}
                          onCheckedChange={(checked) => setUploadForm(prev => ({ ...prev, active: checked }))}
                        />
                        <Label htmlFor="active">Active</Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUploadClick} disabled={isUploading}>
                      {isUploading ? 'Uploading...' : 'Select Images'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Slide
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
                    placeholder="Search slides..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Link href="/website" target="_blank">
                  <Button variant="outline">
                    <Play className="w-4 h-4 mr-2" />
                    Preview Slideshow
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Slides</p>
                  <p className="text-3xl font-bold">{sliderItems.length}</p>
                </div>
                <ImageIcon className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Active Slides</p>
                  <p className="text-3xl font-bold">{sliderItems.filter(item => item.active).length}</p>
                </div>
                <Play className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Featured</p>
                  <p className="text-3xl font-bold">{sliderItems.filter(item => item.featured).length}</p>
                </div>
                <Star className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Total Views</p>
                  <p className="text-3xl font-bold">{sliderItems.reduce((sum, item) => sum + item.views, 0).toLocaleString()}</p>
                </div>
                <Eye className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Slideshow Preview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Hero Slider Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
              <img 
                src={sliderItems[0]?.imageUrl} 
                alt={sliderItems[0]?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-xl font-bold mb-2">{sliderItems[0]?.title}</h3>
                  <p className="text-sm opacity-90">Slide 1 of {sliderItems.length}</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {sliderItems.slice(0, 5).map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-white' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Slides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative bg-gradient-to-br from-gray-100 to-gray-200">
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="text-xs bg-white">
                    #{item.order}
                  </Badge>
                </div>
                <div className="absolute top-2 left-2">
                  {item.featured && (
                    <Badge variant="secondary" className="text-xs">Featured</Badge>
                  )}
                </div>
                <div className="absolute bottom-2 left-2">
                  <Badge variant={item.active ? "default" : "secondary"} className="text-xs">
                    {item.active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                </div>
                {item.description && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>{item.duration}s duration</span>
                  <span>{item.views} views</span>
                </div>
                <div className="flex space-x-2">
                  <Link href="/website" target="_blank">
                    <Button size="sm" variant="ghost" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View on Site
                    </Button>
                  </Link>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleReorder(item.id, 'up')}
                    disabled={index === 0}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleReorder(item.id, 'down')}
                    disabled={index === filteredItems.length - 1}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
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
                        <AlertDialogTitle>Delete Slide</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{item.title}"? This action cannot be undone.
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
            <DialogTitle>Edit Slide</DialogTitle>
            <DialogDescription>
              Update the details for this hero slide.
            </DialogDescription>
          </DialogHeader>
          {editingItem && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, title: e.target.value } : null)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, description: e.target.value } : null)}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-duration">Duration (seconds)</Label>
                <Input
                  id="edit-duration"
                  type="number"
                  min="1"
                  max="10"
                  value={editingItem.duration}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, duration: parseInt(e.target.value) || 5 } : null)}
                />
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-featured"
                    checked={editingItem.featured}
                    onCheckedChange={(checked) => setEditingItem(prev => prev ? { ...prev, featured: checked } : null)}
                  />
                  <Label htmlFor="edit-featured">Mark as featured</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-active"
                    checked={editingItem.active}
                    onCheckedChange={(checked) => setEditingItem(prev => prev ? { ...prev, active: checked } : null)}
                  />
                  <Label htmlFor="edit-active">Active</Label>
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