"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useLogoData } from "@/hooks/useLogoData";
import { Save, RotateCcw, Upload, Eye, Image as ImageIcon, Monitor, Smartphone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LogoManagementPage() {
  const { logoData, isLoading, updateLogo, resetToDefault } = useLogoData();
  const [activeTab, setActiveTab] = useState("header");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const logoType = event.target.getAttribute('data-logo-type');
    if (!file || !logoType) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (max 2MB for logos)
    if (file.size > 2 * 1024 * 1024) {
      alert('Logo size should be less than 2MB');
      return;
    }

    setIsUploading(true);

    try {
      // Convert file to base64 for storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          updateLogo(logoType as keyof typeof logoData, { url: result });
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading logo:', error);
      alert('Error uploading logo. Please try again.');
      setIsUploading(false);
    }
  };

  const handleUploadClick = (logoType: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('data-logo-type', logoType);
      fileInputRef.current.click();
    }
  };

  const clearLogo = (logoType: string) => {
    updateLogo(logoType as keyof typeof logoData, { url: '' });
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
          </div>
        </div>
      </div>
    );
  }

  const handleLogoUpdate = (type: keyof typeof logoData, field: string, value: string | number) => {
    updateLogo(type, { [field]: value });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Logo Management</h1>
          <p className="text-gray-600 mt-2">Manage your website logos for header, footer, and favicon</p>
        </div>
        <div className="flex gap-3">
          <Link href="/" target="_blank">
            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview Website
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset All Logos</AlertDialogTitle>
                <AlertDialogDescription>
                  This will reset all logos to default values. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetToDefault}>
                  Reset All Logos
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Logo Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="header" className="flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            Header Logo
          </TabsTrigger>
          <TabsTrigger value="footer" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Footer Logo
          </TabsTrigger>
          <TabsTrigger value="favicon" className="flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            Favicon
          </TabsTrigger>
        </TabsList>

        {/* Header Logo Tab */}
        <TabsContent value="header" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Header Logo Settings</CardTitle>
              <CardDescription>
                Configure the logo displayed in the website header/navigation bar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Logo Preview */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Logo Preview</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                    {logoData.headerLogo.url ? (
                      <div className="flex items-center justify-center">
                        <Image
                          src={logoData.headerLogo.url}
                          alt={logoData.headerLogo.alt}
                          width={logoData.headerLogo.width}
                          height={logoData.headerLogo.height}
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No logo uploaded</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Logo Settings */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="header-logo-url">Logo URL</Label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          id="header-logo-url"
                          value={logoData.headerLogo.url}
                          onChange={(e) => handleLogoUpdate('headerLogo', 'url', e.target.value)}
                          placeholder="https://example.com/logo.png"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleUploadClick('headerLogo')}
                          disabled={isUploading}
                          className="flex items-center gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          Upload
                        </Button>
                        {logoData.headerLogo.url && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => clearLogo('headerLogo')}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                            Clear
                          </Button>
                        )}
                      </div>
                      {logoData.headerLogo.url && (
                        <div className="relative">
                          <img
                            src={logoData.headerLogo.url}
                            alt="Header logo preview"
                            className="w-32 h-16 object-contain border rounded"
                            onError={(e) => {
                              e.currentTarget.src = "https://via.placeholder.com/128x64?text=Logo+Not+Found";
                            }}
                          />
                          <div className="absolute top-1 right-1 bg-black/50 text-white px-1 py-0.5 rounded text-xs">
                            {logoData.headerLogo.url.startsWith('data:') ? 'Uploaded' : 'URL'}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="header-logo-alt">Alt Text</Label>
                    <Input
                      id="header-logo-alt"
                      value={logoData.headerLogo.alt}
                      onChange={(e) => handleLogoUpdate('headerLogo', 'alt', e.target.value)}
                      placeholder="Company Logo"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="header-logo-width">Width (px)</Label>
                      <Input
                        id="header-logo-width"
                        type="number"
                        value={logoData.headerLogo.width}
                        onChange={(e) => handleLogoUpdate('headerLogo', 'width', parseInt(e.target.value) || 40)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="header-logo-height">Height (px)</Label>
                      <Input
                        id="header-logo-height"
                        type="number"
                        value={logoData.headerLogo.height}
                        onChange={(e) => handleLogoUpdate('headerLogo', 'height', parseInt(e.target.value) || 40)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Footer Logo Tab */}
        <TabsContent value="footer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Footer Logo Settings</CardTitle>
              <CardDescription>
                Configure the logo displayed in the website footer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Logo Preview */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Logo Preview</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                    {logoData.footerLogo.url ? (
                      <div className="flex items-center justify-center">
                        <Image
                          src={logoData.footerLogo.url}
                          alt={logoData.footerLogo.alt}
                          width={logoData.footerLogo.width}
                          height={logoData.footerLogo.height}
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No logo uploaded</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Logo Settings */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="footer-logo-url">Logo URL</Label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          id="footer-logo-url"
                          value={logoData.footerLogo.url}
                          onChange={(e) => handleLogoUpdate('footerLogo', 'url', e.target.value)}
                          placeholder="https://example.com/footer-logo.png"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleUploadClick('footerLogo')}
                          disabled={isUploading}
                          className="flex items-center gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          Upload
                        </Button>
                        {logoData.footerLogo.url && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => clearLogo('footerLogo')}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                            Clear
                          </Button>
                        )}
                      </div>
                      {logoData.footerLogo.url && (
                        <div className="relative">
                          <img
                            src={logoData.footerLogo.url}
                            alt="Footer logo preview"
                            className="w-32 h-16 object-contain border rounded"
                            onError={(e) => {
                              e.currentTarget.src = "https://via.placeholder.com/128x64?text=Logo+Not+Found";
                            }}
                          />
                          <div className="absolute top-1 right-1 bg-black/50 text-white px-1 py-0.5 rounded text-xs">
                            {logoData.footerLogo.url.startsWith('data:') ? 'Uploaded' : 'URL'}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="footer-logo-alt">Alt Text</Label>
                    <Input
                      id="footer-logo-alt"
                      value={logoData.footerLogo.alt}
                      onChange={(e) => handleLogoUpdate('footerLogo', 'alt', e.target.value)}
                      placeholder="Company Logo"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="footer-logo-width">Width (px)</Label>
                      <Input
                        id="footer-logo-width"
                        type="number"
                        value={logoData.footerLogo.width}
                        onChange={(e) => handleLogoUpdate('footerLogo', 'width', parseInt(e.target.value) || 120)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="footer-logo-height">Height (px)</Label>
                      <Input
                        id="footer-logo-height"
                        type="number"
                        value={logoData.footerLogo.height}
                        onChange={(e) => handleLogoUpdate('footerLogo', 'height', parseInt(e.target.value) || 40)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Favicon Tab */}
        <TabsContent value="favicon" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Favicon Settings</CardTitle>
              <CardDescription>
                Configure the favicon displayed in browser tabs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Favicon Preview */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Favicon Preview</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                    {logoData.favicon.url ? (
                      <div className="flex items-center justify-center">
                        <Image
                          src={logoData.favicon.url}
                          alt={logoData.favicon.alt}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No favicon uploaded</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Favicon Settings */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="favicon-url">Favicon URL</Label>
                    <Input
                      id="favicon-url"
                      value={logoData.favicon.url}
                      onChange={(e) => handleLogoUpdate('favicon', 'url', e.target.value)}
                      placeholder="https://example.com/favicon.ico"
                    />
                  </div>
                  <div>
                    <Label htmlFor="favicon-alt">Alt Text</Label>
                    <Input
                      id="favicon-alt"
                      value={logoData.favicon.alt}
                      onChange={(e) => handleLogoUpdate('favicon', 'alt', e.target.value)}
                      placeholder="Company Favicon"
                    />
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Favicon Requirements</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Recommended size: 32x32 pixels</li>
                      <li>• Supported formats: .ico, .png, .svg</li>
                      <li>• Should be square aspect ratio</li>
                      <li>• Use simple, recognizable design</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Logo Settings
        </Button>
      </div>

      {/* Hidden file input for logo uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}

