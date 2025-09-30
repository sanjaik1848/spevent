"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useWelcomeData } from "@/hooks/useWelcomeData";
import { Eye, Save, RotateCcw, Plus, Trash2, ExternalLink, Upload, Image as ImageIcon, X } from "lucide-react";
import Link from "next/link";

const iconOptions = [
  "ChefHat", "Camera", "Calendar", "Utensils", "Heart", "Star", "Users", "Clock", "MapPin", "Phone"
];

const positionOptions = [
  { value: "top-left", label: "Top Left" },
  { value: "bottom-right", label: "Bottom Right" }
];

export default function WelcomeAdminPage() {
  const { welcomeData, isLoading, updateWelcomeData, updateFeature, updateFloatingCard, resetToDefault } = useWelcomeData();
  const [activeTab, setActiveTab] = useState("general");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
          updateWelcomeData({ heroImage: result });
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
    updateWelcomeData({ heroImage: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Page Editor</h1>
          <p className="text-gray-600 mt-2">Customize your welcome page content and design</p>
        </div>
        <div className="flex gap-3">
          <Link href="/" target="_blank">
            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset Welcome Page</AlertDialogTitle>
                <AlertDialogDescription>
                  This will reset all welcome page content to default values. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetToDefault}>
                  Reset to Default
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { id: "general", label: "General" },
          { id: "buttons", label: "Buttons" },
          { id: "features", label: "Features" },
          { id: "cards", label: "Floating Cards" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* General Tab */}
      {activeTab === "general" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Content</CardTitle>
              <CardDescription>Main text and messaging</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={welcomeData.title}
                  onChange={(e) => updateWelcomeData({ title: e.target.value })}
                  placeholder="Welcome to"
                />
              </div>
              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={welcomeData.subtitle}
                  onChange={(e) => updateWelcomeData({ subtitle: e.target.value })}
                  placeholder="Tamil Kitchen"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={welcomeData.description}
                  onChange={(e) => updateWelcomeData({ description: e.target.value })}
                  placeholder="Experience the authentic flavors..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hero Image</CardTitle>
              <CardDescription>Main background image for the welcome page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Upload Section */}
              <div className="space-y-3">
                <Label>Upload Image</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleUploadClick}
                    disabled={isUploading}
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    {isUploading ? 'Uploading...' : 'Choose Image'}
                  </Button>
                  {welcomeData.heroImage && (
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
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <p className="text-xs text-gray-500">
                  Supported formats: JPG, PNG, GIF. Max size: 5MB
                </p>
              </div>

              <Separator className="my-4" />

              {/* URL Input Section */}
              <div className="space-y-3">
                <Label htmlFor="heroImage">Or enter Image URL</Label>
                <Input
                  id="heroImage"
                  value={welcomeData.heroImage}
                  onChange={(e) => updateWelcomeData({ heroImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <Label htmlFor="heroImageAlt">Alt Text</Label>
                <Input
                  id="heroImageAlt"
                  value={welcomeData.heroImageAlt}
                  onChange={(e) => updateWelcomeData({ heroImageAlt: e.target.value })}
                  placeholder="Traditional Tamil Nadu cuisine"
                />
              </div>

              {/* Image Preview */}
              {welcomeData.heroImage && (
                <div className="mt-4">
                  <Label>Preview</Label>
                  <div className="relative">
                    <img
                      src={welcomeData.heroImage}
                      alt={welcomeData.heroImageAlt}
                      className="w-full h-48 object-cover rounded-lg border"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/400x200?text=Image+Not+Found";
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {welcomeData.heroImage.startsWith('data:') ? 'Uploaded' : 'URL'}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Buttons Tab */}
      {activeTab === "buttons" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Primary Button</CardTitle>
              <CardDescription>Main call-to-action button</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="primaryButtonText">Button Text</Label>
                <Input
                  id="primaryButtonText"
                  value={welcomeData.primaryButtonText}
                  onChange={(e) => updateWelcomeData({ primaryButtonText: e.target.value })}
                  placeholder="Enter Website"
                />
              </div>
              <div>
                <Label htmlFor="primaryButtonLink">Button Link</Label>
                <Input
                  id="primaryButtonLink"
                  value={welcomeData.primaryButtonLink}
                  onChange={(e) => updateWelcomeData({ primaryButtonLink: e.target.value })}
                  placeholder="/website"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Secondary Button</CardTitle>
              <CardDescription>Secondary action button</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="secondaryButtonText">Button Text</Label>
                <Input
                  id="secondaryButtonText"
                  value={welcomeData.secondaryButtonText}
                  onChange={(e) => updateWelcomeData({ secondaryButtonText: e.target.value })}
                  placeholder="View Menu"
                />
              </div>
              <div>
                <Label htmlFor="secondaryButtonLink">Button Link</Label>
                <Input
                  id="secondaryButtonLink"
                  value={welcomeData.secondaryButtonLink}
                  onChange={(e) => updateWelcomeData({ secondaryButtonLink: e.target.value })}
                  placeholder="/food"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Features Tab */}
      {activeTab === "features" && (
        <Card>
          <CardHeader>
            <CardTitle>Feature Icons</CardTitle>
            <CardDescription>Small feature highlights below the buttons</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {welcomeData.features.map((feature, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Feature {index + 1}</h4>
                  <Badge variant="secondary">{feature.icon}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={feature.title}
                      onChange={(e) => updateFeature(index, { title: e.target.value })}
                      placeholder="Authentic Recipes"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input
                      value={feature.description}
                      onChange={(e) => updateFeature(index, { description: e.target.value })}
                      placeholder="Traditional"
                    />
                  </div>
                  <div>
                    <Label>Icon</Label>
                    <Select value={feature.icon} onValueChange={(value) => updateFeature(index, { icon: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((icon) => (
                          <SelectItem key={icon} value={icon}>
                            {icon}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Floating Cards Tab */}
      {activeTab === "cards" && (
        <Card>
          <CardHeader>
            <CardTitle>Floating Cards</CardTitle>
            <CardDescription>Small cards that appear over the hero image</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {welcomeData.floatingCards.map((card, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Card {index + 1}</h4>
                  <Badge variant="secondary">{card.position}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={card.title}
                      onChange={(e) => updateFloatingCard(index, { title: e.target.value })}
                      placeholder="Traditional"
                    />
                  </div>
                  <div>
                    <Label>Subtitle</Label>
                    <Input
                      value={card.subtitle}
                      onChange={(e) => updateFloatingCard(index, { subtitle: e.target.value })}
                      placeholder="Recipes"
                    />
                  </div>
                  <div>
                    <Label>Icon</Label>
                    <Select value={card.icon} onValueChange={(value) => updateFloatingCard(index, { icon: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((icon) => (
                          <SelectItem key={icon} value={icon}>
                            {icon}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Position</Label>
                    <Select value={card.position} onValueChange={(value: any) => updateFloatingCard(index, { position: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {positionOptions.map((pos) => (
                          <SelectItem key={pos.value} value={pos.value}>
                            {pos.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Save Status */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 text-sm text-green-600">
          <Save className="w-4 h-4" />
          Changes are saved automatically
        </div>
      </div>
    </div>
  );
}
