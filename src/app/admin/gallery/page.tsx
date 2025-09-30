"use client";

import { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  Camera, 
  Search, 
  Filter, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Upload,
  Grid3X3,
  List,
  Image as ImageIcon,
  Video,
  Download,
  ExternalLink,
  X
} from "lucide-react";
import Link from "next/link";
import { placeholderImages } from "@/lib/placeholder-images";
import { mediaData } from "@/lib/media";

interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  type: "image" | "video";
  filename: string;
  size: string;
  uploadedAt: string;
  tags: string[];
  views: number;
  featured: boolean;
  imageUrl: string;
  imageHint: string;
}

// Convert website data to admin format
const defaultGalleryItems: GalleryItem[] = [
  // From placeholder images (main gallery categories)
  ...placeholderImages.map((item, index) => ({
    id: `placeholder-${index}`,
    title: item.description,
    description: `Professional ${item.category.toLowerCase()} photography`,
    category: item.category,
    type: "image" as const,
    filename: `${item.id}.jpg`,
    size: "2.4 MB",
    uploadedAt: "2024-01-15",
    tags: [item.category.toLowerCase()],
    views: Math.floor(Math.random() * 100) + 20,
    featured: index < 2,
    imageUrl: item.imageUrl,
    imageHint: item.imageHint
  })),
  // From media data (additional gallery items)
  ...Object.entries(mediaData).flatMap(([category, data]) =>
    data.items.map((item, index) => ({
      id: `${category}-${index}`,
      title: item.title,
      description: `Professional ${data.name.toLowerCase()} photography`,
      category: data.name,
      type: item.type,
      filename: `${category}_${index}.${item.type === 'image' ? 'jpg' : 'mp4'}`,
      size: item.type === 'image' ? "2.4 MB" : "45.2 MB",
      uploadedAt: "2024-01-15",
      tags: [category.toLowerCase()],
      views: Math.floor(Math.random() * 100) + 20,
      featured: index === 0,
      imageUrl: item.src,
      imageHint: item.title
    }))
  )
];

const categories = ["Weddings", "Corporate Events", "Private Parties", "Galas & Fundraisers", "Entertainment"];

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(defaultGalleryItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    featured: false
  });

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      for (const file of Array.from(files)) {
        // Validate file type
        if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
          alert(`File ${file.name} is not a valid image or video`);
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
            const newItem: GalleryItem = {
              id: `uploaded-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              title: uploadForm.title || file.name.split('.')[0],
              description: uploadForm.description || `Uploaded ${file.type.startsWith('image/') ? 'image' : 'video'}`,
              category: uploadForm.category || "General",
              type: file.type.startsWith('image/') ? 'image' : 'video',
              filename: file.name,
              size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
              uploadedAt: new Date().toISOString().split('T')[0],
              tags: uploadForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
              views: 0,
              featured: uploadForm.featured,
              imageUrl: result,
              imageHint: uploadForm.title || file.name.split('.')[0]
            };

            setGalleryItems(prev => [newItem, ...prev]);
            
            // Save to localStorage
            if (typeof window !== 'undefined') {
              const savedItems = localStorage.getItem('galleryItems');
              const items = savedItems ? JSON.parse(savedItems) : [];
              localStorage.setItem('galleryItems', JSON.stringify([newItem, ...items]));
            }
          }
        };
        reader.readAsDataURL(file);
      }

      // Reset form
      setUploadForm({
        title: "",
        description: "",
        category: "",
        tags: "",
        featured: false
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
    setGalleryItems(prev => prev.filter(item => item.id !== itemId));
    
    // Update localStorage
    if (typeof window !== 'undefined') {
      const savedItems = localStorage.getItem('galleryItems');
      const items = savedItems ? JSON.parse(savedItems) : [];
      const updatedItems = items.filter((item: GalleryItem) => item.id !== itemId);
      localStorage.setItem('galleryItems', JSON.stringify(updatedItems));
    }
  };

  const handleEditItem = (item: GalleryItem) => {
    setEditingItem(item);
    setIsEditDialogOpen(true);
  };

  const handleUpdateItem = () => {
    if (!editingItem) return;

    setGalleryItems(prev => prev.map(item => 
      item.id === editingItem.id ? editingItem : item
    ));

    // Update localStorage
    if (typeof window !== 'undefined') {
      const savedItems = localStorage.getItem('galleryItems');
      const items = savedItems ? JSON.parse(savedItems) : [];
      const updatedItems = items.map((item: GalleryItem) => 
        item.id === editingItem.id ? editingItem : item
      );
      localStorage.setItem('galleryItems', JSON.stringify(updatedItems));
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
              <h1 className="text-3xl font-bold text-gray-900">Event Portfolio</h1>
              <p className="text-gray-600 mt-1">Manage your professional event gallery and showcase your best work.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Files
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Upload New Media</DialogTitle>
                    <DialogDescription>
                      Add new images or videos to your gallery. You can upload multiple files at once.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={uploadForm.title}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter title for the media"
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
                      <Select value={uploadForm.category} onValueChange={(value) => setUploadForm(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input
                        id="tags"
                        value={uploadForm.tags}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, tags: e.target.value }))}
                        placeholder="wedding, ceremony, reception"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={uploadForm.featured}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, featured: e.target.checked }))}
                        className="rounded"
                      />
                      <Label htmlFor="featured">Mark as featured</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUploadClick} disabled={isUploading}>
                      {isUploading ? 'Uploading...' : 'Select Files'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Album
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
                    placeholder="Search gallery items..." 
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
                <div className="flex border rounded-lg">
                  <Button 
                    variant={viewMode === "grid" ? "default" : "ghost"} 
                    size="sm" 
                    className="rounded-r-none"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant={viewMode === "list" ? "default" : "ghost"} 
                    size="sm" 
                    className="rounded-l-none"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["All", ...categories].map((category) => (
                <Badge 
                  key={category}
                  variant={category === selectedCategory ? "default" : "outline"}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Items</p>
                  <p className="text-3xl font-bold">{galleryItems.length}</p>
                </div>
                <Camera className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Images</p>
                  <p className="text-3xl font-bold">{galleryItems.filter(item => item.type === 'image').length}</p>
                </div>
                <ImageIcon className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Videos</p>
                  <p className="text-3xl font-bold">{galleryItems.filter(item => item.type === 'video').length}</p>
                </div>
                <Video className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Featured</p>
                  <p className="text-3xl font-bold">{galleryItems.filter(item => item.featured).length}</p>
                </div>
                <Camera className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gallery Grid */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`relative bg-gradient-to-br from-gray-100 to-gray-200 ${viewMode === 'grid' ? 'aspect-square' : 'h-48'}`}>
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    {item.type === 'image' ? (
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    ) : (
                      <Video className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  {item.featured && (
                    <Badge variant="secondary" className="text-xs">Featured</Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                  <Badge variant="outline" className="text-xs">{item.category}</Badge>
                </div>
                {item.description && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>{item.size}</span>
                  <span>{item.views} views</span>
                </div>
                <div className="flex space-x-2">
                  <Link href={`/gallery/${item.category.toLowerCase().replace(/\s+/g, '-')}`} target="_blank">
                    <Button size="sm" variant="ghost" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View on Site
                    </Button>
                  </Link>
                  <Button size="sm" variant="ghost" onClick={() => handleEditItem(item)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Download className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Media Item</AlertDialogTitle>
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
            <DialogTitle>Edit Media Item</DialogTitle>
            <DialogDescription>
              Update the details for this media item.
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
                <Label htmlFor="edit-category">Category</Label>
                <Select 
                  value={editingItem.category} 
                  onValueChange={(value) => setEditingItem(prev => prev ? { ...prev, category: value } : null)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-featured"
                  checked={editingItem.featured}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, featured: e.target.checked } : null)}
                  className="rounded"
                />
                <Label htmlFor="edit-featured">Mark as featured</Label>
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