"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useWebsiteContent, useReviews, useBookings, useStarClients, useStats } from "@/hooks/useWebsiteContent";
import { Eye, Save, RotateCcw, Plus, Trash2, Edit, Star, Calendar, Users, DollarSign, TrendingUp, Upload, Image as ImageIcon, X } from "lucide-react";
import Link from "next/link";

const iconOptions = [
  "Heart", "Users", "Star", "Calendar", "ChefHat", "Camera", "Utensils", "MapPin", "Phone", "Mail"
];

const statusOptions = [
  { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  { value: "confirmed", label: "Confirmed", color: "bg-blue-100 text-blue-800" },
  { value: "completed", label: "Completed", color: "bg-green-100 text-green-800" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" }
];

export default function WebsiteContentAdminPage() {
  const { content, isLoading: contentLoading, updateContent, resetContent } = useWebsiteContent();
  const { reviews, isLoading: reviewsLoading, addReview, updateReview, deleteReview, toggleFeatured } = useReviews();
  const { bookings, isLoading: bookingsLoading, addBooking, updateBooking, deleteBooking, updateBookingStatus } = useBookings();
  const { starClients, isLoading: clientsLoading, addStarClient, updateStarClient, deleteStarClient, toggleFeatured: toggleClientFeatured } = useStarClients();
  const { stats, isLoading: statsLoading, updateStats, resetStats } = useStats();

  const [activeTab, setActiveTab] = useState("content");
  const [editingReview, setEditingReview] = useState<any>(null);
  const [editingBooking, setEditingBooking] = useState<any>(null);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const field = event.target.getAttribute('data-field');
    if (!file || !field) return;

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
          const [section, fieldName] = field.split('.');
          updateContent(section as keyof typeof content, { [fieldName]: result });
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

  const handleUploadClick = (field: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('data-field', field);
      fileInputRef.current.click();
    }
  };

  const clearImage = (field: string) => {
    const [section, fieldName] = field.split('.');
    updateContent(section as keyof typeof content, { [fieldName]: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (contentLoading || reviewsLoading || bookingsLoading || clientsLoading || statsLoading) {
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Website Content Manager</h1>
          <p className="text-gray-600 mt-2">Manage all website content, reviews, bookings, and statistics</p>
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
                <AlertDialogTitle>Reset All Content</AlertDialogTitle>
                <AlertDialogDescription>
                  This will reset all website content to default values. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                  resetContent();
                  resetStats();
                }}>
                  Reset All Content
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.averageRating}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Star Clients</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.starClients}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          <TabsTrigger value="content" className="text-xs sm:text-sm">Content</TabsTrigger>
          <TabsTrigger value="reviews" className="text-xs sm:text-sm">Reviews</TabsTrigger>
          <TabsTrigger value="bookings" className="text-xs sm:text-sm">Bookings</TabsTrigger>
          <TabsTrigger value="clients" className="text-xs sm:text-sm">Star Clients</TabsTrigger>
          <TabsTrigger value="stats" className="text-xs sm:text-sm">Statistics</TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hero Section */}
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Main landing page content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="heroTitle">Title</Label>
                  <Input
                    id="heroTitle"
                    value={content.hero.title}
                    onChange={(e) => updateContent('hero', { title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="heroSubtitle">Subtitle</Label>
                  <Input
                    id="heroSubtitle"
                    value={content.hero.subtitle}
                    onChange={(e) => updateContent('hero', { subtitle: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="heroDescription">Description</Label>
                  <Textarea
                    id="heroDescription"
                    value={content.hero.description}
                    onChange={(e) => updateContent('hero', { description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="heroImage">Background Image URL</Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        id="heroImage"
                        value={content.hero.backgroundImage}
                        onChange={(e) => updateContent('hero', { backgroundImage: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleUploadClick('hero.backgroundImage')}
                        disabled={isUploading}
                        className="flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Upload
                      </Button>
                      {content.hero.backgroundImage && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => clearImage('hero.backgroundImage')}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                          Clear
                        </Button>
                      )}
                    </div>
                    {content.hero.backgroundImage && (
                      <div className="relative">
                        <img
                          src={content.hero.backgroundImage}
                          alt="Hero preview"
                          className="w-full h-32 object-cover rounded-lg border"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/400x200?text=Image+Not+Found";
                          }}
                        />
                        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                          {content.hero.backgroundImage.startsWith('data:') ? 'Uploaded' : 'URL'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle>About Section</CardTitle>
                <CardDescription>About us content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="aboutTitle">Title</Label>
                  <Input
                    id="aboutTitle"
                    value={content.about.title}
                    onChange={(e) => updateContent('about', { title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="aboutDescription">Description</Label>
                  <Textarea
                    id="aboutDescription"
                    value={content.about.description}
                    onChange={(e) => updateContent('about', { description: e.target.value })}
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="aboutImage">Image URL</Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        id="aboutImage"
                        value={content.about.imageUrl}
                        onChange={(e) => updateContent('about', { imageUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleUploadClick('about.imageUrl')}
                        disabled={isUploading}
                        className="flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Upload
                      </Button>
                      {content.about.imageUrl && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => clearImage('about.imageUrl')}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                          Clear
                        </Button>
                      )}
                    </div>
                    {content.about.imageUrl && (
                      <div className="relative">
                        <img
                          src={content.about.imageUrl}
                          alt="About preview"
                          className="w-full h-32 object-cover rounded-lg border"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/400x200?text=Image+Not+Found";
                          }}
                        />
                        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                          {content.about.imageUrl.startsWith('data:') ? 'Uploaded' : 'URL'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services Section */}
            <Card>
              <CardHeader>
                <CardTitle>Services Section</CardTitle>
                <CardDescription>Services offered</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="servicesTitle">Title</Label>
                  <Input
                    id="servicesTitle"
                    value={content.services.title}
                    onChange={(e) => updateContent('services', { title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="servicesDescription">Description</Label>
                  <Textarea
                    id="servicesDescription"
                    value={content.services.description}
                    onChange={(e) => updateContent('services', { description: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Section</CardTitle>
                <CardDescription>Contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contactTitle">Title</Label>
                  <Input
                    id="contactTitle"
                    value={content.contact.title}
                    onChange={(e) => updateContent('contact', { title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Phone</Label>
                  <Input
                    id="contactPhone"
                    value={content.contact.phone}
                    onChange={(e) => updateContent('contact', { phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    value={content.contact.email}
                    onChange={(e) => updateContent('contact', { email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contactAddress">Address</Label>
                  <Textarea
                    id="contactAddress"
                    value={content.contact.address}
                    onChange={(e) => updateContent('contact', { address: e.target.value })}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Customer Reviews</h3>
            <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingReview(null)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Review
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingReview ? 'Edit Review' : 'Add New Review'}</DialogTitle>
                  <DialogDescription>
                    {editingReview ? 'Update the review details' : 'Add a new customer review'}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reviewName">Customer Name</Label>
                    <Input
                      id="reviewName"
                      value={editingReview?.name || ''}
                      onChange={(e) => setEditingReview({...editingReview, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="reviewRating">Rating</Label>
                    <Select value={editingReview?.rating?.toString() || '5'} onValueChange={(value) => setEditingReview({...editingReview, rating: parseInt(value)})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Star</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="reviewComment">Comment</Label>
                    <Textarea
                      id="reviewComment"
                      value={editingReview?.comment || ''}
                      onChange={(e) => setEditingReview({...editingReview, comment: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="reviewEvent">Event Type</Label>
                    <Input
                      id="reviewEvent"
                      value={editingReview?.event || ''}
                      onChange={(e) => setEditingReview({...editingReview, event: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="reviewDate">Date</Label>
                    <Input
                      id="reviewDate"
                      type="date"
                      value={editingReview?.date || ''}
                      onChange={(e) => setEditingReview({...editingReview, date: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    if (editingReview) {
                      if (editingReview.id) {
                        updateReview(editingReview.id, editingReview);
                      } else {
                        addReview(editingReview);
                      }
                    }
                    setIsReviewDialogOpen(false);
                    setEditingReview(null);
                  }}>
                    {editingReview?.id ? 'Update' : 'Add'} Review
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <Badge variant="secondary">{review.event}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFeatured(review.id)}
                      >
                        <Star className={`w-4 h-4 ${review.featured ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingReview(review);
                          setIsReviewDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Review</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this review? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteReview(review.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                  <p className="text-xs text-gray-500 mt-2">{review.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Event Bookings</h3>
            <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingBooking(null)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Booking
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingBooking ? 'Edit Booking' : 'Add New Booking'}</DialogTitle>
                  <DialogDescription>
                    {editingBooking ? 'Update the booking details' : 'Add a new event booking'}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bookingClientName">Client Name</Label>
                    <Input
                      id="bookingClientName"
                      value={editingBooking?.clientName || ''}
                      onChange={(e) => setEditingBooking({...editingBooking, clientName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bookingEmail">Email</Label>
                    <Input
                      id="bookingEmail"
                      type="email"
                      value={editingBooking?.email || ''}
                      onChange={(e) => setEditingBooking({...editingBooking, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bookingPhone">Phone</Label>
                    <Input
                      id="bookingPhone"
                      value={editingBooking?.phone || ''}
                      onChange={(e) => setEditingBooking({...editingBooking, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bookingEventType">Event Type</Label>
                    <Input
                      id="bookingEventType"
                      value={editingBooking?.eventType || ''}
                      onChange={(e) => setEditingBooking({...editingBooking, eventType: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bookingEventDate">Event Date</Label>
                    <Input
                      id="bookingEventDate"
                      type="date"
                      value={editingBooking?.eventDate || ''}
                      onChange={(e) => setEditingBooking({...editingBooking, eventDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bookingGuestCount">Guest Count</Label>
                    <Input
                      id="bookingGuestCount"
                      type="number"
                      value={editingBooking?.guestCount || ''}
                      onChange={(e) => setEditingBooking({...editingBooking, guestCount: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bookingLocation">Location</Label>
                    <Input
                      id="bookingLocation"
                      value={editingBooking?.location || ''}
                      onChange={(e) => setEditingBooking({...editingBooking, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bookingStatus">Status</Label>
                    <Select value={editingBooking?.status || 'pending'} onValueChange={(value: any) => setEditingBooking({...editingBooking, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bookingAmount">Total Amount</Label>
                    <Input
                      id="bookingAmount"
                      type="number"
                      value={editingBooking?.totalAmount || ''}
                      onChange={(e) => setEditingBooking({...editingBooking, totalAmount: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="bookingRequests">Special Requests</Label>
                    <Textarea
                      id="bookingRequests"
                      value={editingBooking?.specialRequests || ''}
                      onChange={(e) => setEditingBooking({...editingBooking, specialRequests: e.target.value})}
                      rows={2}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    if (editingBooking) {
                      if (editingBooking.id) {
                        updateBooking(editingBooking.id, editingBooking);
                      } else {
                        addBooking(editingBooking);
                      }
                    }
                    setIsBookingDialogOpen(false);
                    setEditingBooking(null);
                  }}>
                    {editingBooking?.id ? 'Update' : 'Add'} Booking
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-lg">{booking.clientName}</h4>
                        <Badge className={statusOptions.find(s => s.value === booking.status)?.color}>
                          {statusOptions.find(s => s.value === booking.status)?.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{booking.eventType} • {booking.eventDate}</p>
                      <p className="text-sm text-gray-600">{booking.guestCount} guests • {booking.location}</p>
                      <p className="text-sm text-gray-600">${booking.totalAmount} • {booking.email}</p>
                      {booking.specialRequests && (
                        <p className="text-sm text-gray-500 italic">"{booking.specialRequests}"</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingBooking(booking);
                          setIsBookingDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Booking</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this booking? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteBooking(booking.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Star Clients Tab */}
        <TabsContent value="clients" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Star Clients</h3>
            <Dialog open={isClientDialogOpen} onOpenChange={setIsClientDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingClient(null)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Star Client
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingClient ? 'Edit Star Client' : 'Add New Star Client'}</DialogTitle>
                  <DialogDescription>
                    {editingClient ? 'Update the star client details' : 'Add a new star client'}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input
                      id="clientName"
                      value={editingClient?.name || ''}
                      onChange={(e) => setEditingClient({...editingClient, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientCompany">Company</Label>
                    <Input
                      id="clientCompany"
                      value={editingClient?.company || ''}
                      onChange={(e) => setEditingClient({...editingClient, company: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientImage">Image URL</Label>
                    <Input
                      id="clientImage"
                      value={editingClient?.imageUrl || ''}
                      onChange={(e) => setEditingClient({...editingClient, imageUrl: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientEventType">Event Type</Label>
                    <Input
                      id="clientEventType"
                      value={editingClient?.eventType || ''}
                      onChange={(e) => setEditingClient({...editingClient, eventType: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientRating">Rating</Label>
                    <Select value={editingClient?.rating?.toString() || '5'} onValueChange={(value) => setEditingClient({...editingClient, rating: parseInt(value)})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Star</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="clientTestimonial">Testimonial</Label>
                    <Textarea
                      id="clientTestimonial"
                      value={editingClient?.testimonial || ''}
                      onChange={(e) => setEditingClient({...editingClient, testimonial: e.target.value})}
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsClientDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    if (editingClient) {
                      if (editingClient.id) {
                        updateStarClient(editingClient.id, editingClient);
                      } else {
                        addStarClient(editingClient);
                      }
                    }
                    setIsClientDialogOpen(false);
                    setEditingClient(null);
                  }}>
                    {editingClient?.id ? 'Update' : 'Add'} Client
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {starClients.map((client) => (
              <Card key={client.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <img
                        src={client.imageUrl}
                        alt={client.name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/48x48?text=Client";
                        }}
                      />
                      <div>
                        <CardTitle className="text-lg">{client.name}</CardTitle>
                        <p className="text-sm text-gray-600">{client.company}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleClientFeatured(client.id)}
                      >
                        <Star className={`w-4 h-4 ${client.featured ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingClient(client);
                          setIsClientDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Star Client</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this star client? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteStarClient(client.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < client.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <Badge variant="secondary">{client.eventType}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 italic">"{client.testimonial}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="stats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Website Statistics</CardTitle>
              <CardDescription>Update key statistics displayed on the website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="totalBookings">Total Bookings</Label>
                  <Input
                    id="totalBookings"
                    type="number"
                    value={stats.totalBookings}
                    onChange={(e) => updateStats({ totalBookings: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="completedBookings">Completed Bookings</Label>
                  <Input
                    id="completedBookings"
                    type="number"
                    value={stats.completedBookings}
                    onChange={(e) => updateStats({ completedBookings: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="pendingBookings">Pending Bookings</Label>
                  <Input
                    id="pendingBookings"
                    type="number"
                    value={stats.pendingBookings}
                    onChange={(e) => updateStats({ pendingBookings: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="totalRevenue">Total Revenue</Label>
                  <Input
                    id="totalRevenue"
                    type="number"
                    value={stats.totalRevenue}
                    onChange={(e) => updateStats({ totalRevenue: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="averageRating">Average Rating</Label>
                  <Input
                    id="averageRating"
                    type="number"
                    step="0.1"
                    value={stats.averageRating}
                    onChange={(e) => updateStats({ averageRating: parseFloat(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="totalReviews">Total Reviews</Label>
                  <Input
                    id="totalReviews"
                    type="number"
                    value={stats.totalReviews}
                    onChange={(e) => updateStats({ totalReviews: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="starClients">Star Clients</Label>
                  <Input
                    id="starClients"
                    type="number"
                    value={stats.starClients}
                    onChange={(e) => updateStats({ starClients: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="yearsExperience">Years Experience</Label>
                  <Input
                    id="yearsExperience"
                    type="number"
                    value={stats.yearsExperience}
                    onChange={(e) => updateStats({ yearsExperience: parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Status */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 text-sm text-green-600">
          <Save className="w-4 h-4" />
          All changes are saved automatically
        </div>
      </div>

      {/* Hidden file input for image uploads */}
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
