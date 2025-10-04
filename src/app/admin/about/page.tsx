"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Edit, Save, Users, Award, Star, Calendar, Heart, Shield, Zap, Leaf, UtensilsCrossed, Gem, Upload, Video, Image as ImageIcon, X } from "lucide-react";
import Link from "next/link";

// Types for About page data
interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  experience: string;
  achievements: string[];
  placeholderId: string;
}

interface Value {
  id: string;
  title: string;
  description: string;
  color: string;
  iconName: string;
}

interface Stat {
  id: string;
  number: string;
  label: string;
  iconName: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

interface AboutPageSettings {
  heroBackground: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroButtonText: string;
  heroButtonLink: string;
}

export default function AboutAdminPage() {
  const [activeTab, setActiveTab] = useState("team");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [values, setValues] = useState<Value[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [aboutSettings, setAboutSettings] = useState<AboutPageSettings>({
    heroBackground: "https://images.unsplash.com/photo-1519167758481-83f142b8fb9c?w=1200&q=80",
    heroTitle: "Crafting Extraordinary",
    heroSubtitle: "Experiences",
    heroDescription: "Where culinary artistry meets unparalleled service. We transform your vision into unforgettable moments that exceed every expectation.",
    heroButtonText: "Start Your Journey",
    heroButtonLink: "/booking"
  });
  
  const [editingTeam, setEditingTeam] = useState<TeamMember | null>(null);
  const [editingValue, setEditingValue] = useState<Value | null>(null);
  const [editingStat, setEditingStat] = useState<Stat | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
  const [isValueDialogOpen, setIsValueDialogOpen] = useState(false);
  const [isStatDialogOpen, setIsStatDialogOpen] = useState(false);
  const [isTestimonialDialogOpen, setIsTestimonialDialogOpen] = useState(false);

  const [newAchievement, setNewAchievement] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Icon options
  const iconOptions = [
    { name: "Heart", icon: Heart },
    { name: "Shield", icon: Shield },
    { name: "Zap", icon: Zap },
    { name: "Leaf", icon: Leaf },
    { name: "UtensilsCrossed", icon: UtensilsCrossed },
    { name: "Gem", icon: Gem },
    { name: "Star", icon: Star },
    { name: "Users", icon: Users },
    { name: "Award", icon: Award },
    { name: "Calendar", icon: Calendar }
  ];

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      const teamData = localStorage.getItem('aboutTeamMembers');
      const valuesData = localStorage.getItem('aboutValues');
      const statsData = localStorage.getItem('aboutStats');
      const testimonialsData = localStorage.getItem('aboutTestimonials');
      const settingsData = localStorage.getItem('aboutSettings');

      if (teamData) {
        setTeamMembers(JSON.parse(teamData));
      } else {
        // Default team members
        setTeamMembers([
          {
            id: "1",
            name: "Chef Rohan Kapoor",
            role: "Executive Chef & Culinary Director",
            bio: "Award-winning chef with 15+ years of experience in fine dining.",
            experience: "15+ Years",
            achievements: ["Michelin Star Experience", "Culinary Awards Winner"],
            placeholderId: "team-chef"
          },
          {
            id: "2",
            name: "Priya Sharma",
            role: "Operations Director & Event Specialist",
            bio: "Master's in Hospitality Management with expertise in luxury event planning.",
            experience: "12+ Years",
            achievements: ["Luxury Events Expert", "Service Excellence Award"],
            placeholderId: "team-manager"
          }
        ]);
      }

      if (valuesData) {
        setValues(JSON.parse(valuesData));
      } else {
        setValues([
          {
            id: "1",
            title: "Premium Quality",
            description: "We source only the finest, freshest ingredients from trusted suppliers.",
            color: "from-emerald-500 to-green-600",
            iconName: "Leaf"
          },
          {
            id: "2",
            title: "Culinary Mastery",
            description: "Our award-winning chefs blend traditional techniques with innovative approaches.",
            color: "from-amber-500 to-orange-600",
            iconName: "UtensilsCrossed"
          }
        ]);
      }

      if (statsData) {
        setStats(JSON.parse(statsData));
      } else {
        setStats([
          { id: "1", number: "500+", label: "Events Hosted", iconName: "Calendar" },
          { id: "2", number: "98%", label: "Client Satisfaction", iconName: "Star" },
          { id: "3", number: "15+", label: "Years Experience", iconName: "Award" },
          { id: "4", number: "50+", label: "Team Members", iconName: "Users" }
        ]);
      }

      if (testimonialsData) {
        setTestimonials(JSON.parse(testimonialsData));
      } else {
        setTestimonials([
          {
            id: "1",
            name: "Sarah Johnson",
            role: "Wedding Client",
            content: "SP Events made our wedding absolutely magical. Every detail was perfect!",
            rating: 5,
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80"
          }
        ]);
      }

      if (settingsData) {
        setAboutSettings(JSON.parse(settingsData));
      }
    };

    loadData();
  }, []);

  // Auto-save about settings
  useEffect(() => {
    if (aboutSettings) {
      localStorage.setItem('aboutSettings', JSON.stringify(aboutSettings));
    }
  }, [aboutSettings]);

  // Save data to localStorage
  const saveData = (type: string, data: any) => {
    localStorage.setItem(type, JSON.stringify(data));
  };

  // Team Members CRUD
  const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const newMember = { ...member, id: Date.now().toString() };
    const updated = [...teamMembers, newMember];
    setTeamMembers(updated);
    saveData('aboutTeamMembers', updated);
  };

  const updateTeamMember = (id: string, updates: Partial<TeamMember>) => {
    const updated = teamMembers.map(member => 
      member.id === id ? { ...member, ...updates } : member
    );
    setTeamMembers(updated);
    saveData('aboutTeamMembers', updated);
  };

  const deleteTeamMember = (id: string) => {
    const updated = teamMembers.filter(member => member.id !== id);
    setTeamMembers(updated);
    saveData('aboutTeamMembers', updated);
  };

  // Values CRUD
  const addValue = (value: Omit<Value, 'id'>) => {
    const newValue = { ...value, id: Date.now().toString() };
    const updated = [...values, newValue];
    setValues(updated);
    saveData('aboutValues', updated);
  };

  const updateValue = (id: string, updates: Partial<Value>) => {
    const updated = values.map(value => 
      value.id === id ? { ...value, ...updates } : value
    );
    setValues(updated);
    saveData('aboutValues', updated);
  };

  const deleteValue = (id: string) => {
    const updated = values.filter(value => value.id !== id);
    setValues(updated);
    saveData('aboutValues', updated);
  };

  // Stats CRUD
  const addStat = (stat: Omit<Stat, 'id'>) => {
    const newStat = { ...stat, id: Date.now().toString() };
    const updated = [...stats, newStat];
    setStats(updated);
    saveData('aboutStats', updated);
  };

  const updateStat = (id: string, updates: Partial<Stat>) => {
    const updated = stats.map(stat => 
      stat.id === id ? { ...stat, ...updates } : stat
    );
    setStats(updated);
    saveData('aboutStats', updated);
  };

  const deleteStat = (id: string) => {
    const updated = stats.filter(stat => stat.id !== id);
    setStats(updated);
    saveData('aboutStats', updated);
  };

  // Testimonials CRUD
  const addTestimonial = (testimonial: Omit<Testimonial, 'id'>) => {
    const newTestimonial = { ...testimonial, id: Date.now().toString() };
    const updated = [...testimonials, newTestimonial];
    setTestimonials(updated);
    saveData('aboutTestimonials', updated);
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    const updated = testimonials.map(testimonial => 
      testimonial.id === id ? { ...testimonial, ...updates } : testimonial
    );
    setTestimonials(updated);
    saveData('aboutTestimonials', updated);
  };

  const deleteTestimonial = (id: string) => {
    const updated = testimonials.filter(testimonial => testimonial.id !== id);
    setTestimonials(updated);
    saveData('aboutTestimonials', updated);
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
            setAboutSettings(prev => ({ ...prev, heroBackground: result }));
            localStorage.setItem('aboutSettings', JSON.stringify({ ...aboutSettings, heroBackground: result }));
          } else {
            // Update the appropriate testimonial image
            const testimonialId = field;
            updateTestimonial(testimonialId, { image: result });
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

  const handleUploadClick = (testimonialId: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('data-field', testimonialId);
      fileInputRef.current.click();
    }
  };

  const clearMedia = (field: string) => {
    if (field === 'heroBackground') {
      setAboutSettings(prev => ({ ...prev, heroBackground: '' }));
      localStorage.setItem('aboutSettings', JSON.stringify({ ...aboutSettings, heroBackground: '' }));
    } else {
      updateTestimonial(field, { image: '' });
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
            <h1 className="text-3xl font-bold text-gray-900">About Page Management</h1>
            <p className="text-gray-600">Manage team members, values, stats, and testimonials</p>
          </div>
          <Link href="/about" target="_blank">
            <Button variant="outline">
              <Users className="w-4 h-4 mr-2" />
              View About Page
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
            <TabsTrigger value="hero">Hero Settings</TabsTrigger>
            <TabsTrigger value="team">Team Members</TabsTrigger>
            <TabsTrigger value="values">Values</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
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
                      value={aboutSettings.heroBackground}
                      onChange={(e) => setAboutSettings(prev => ({ ...prev, heroBackground: e.target.value }))}
                      placeholder="Image URL"
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
                      {aboutSettings.heroBackground && (
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
                  {aboutSettings.heroBackground && (
                    <div className="relative">
                      {aboutSettings.heroBackground.startsWith('data:video/') ? (
                        <video
                          src={aboutSettings.heroBackground}
                          className="w-full h-32 object-cover rounded-lg border"
                          controls={false}
                          muted
                        />
                      ) : (
                        <img
                          src={aboutSettings.heroBackground}
                          alt="Hero background preview"
                          className="w-full h-32 object-cover rounded-lg border"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/400x200?text=Image+Not+Found";
                          }}
                        />
                      )}
                      <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        {aboutSettings.heroBackground.startsWith('data:video/') ? (
                          <Video className="w-3 h-3" />
                        ) : (
                          <ImageIcon className="w-3 h-3" />
                        )}
                        {aboutSettings.heroBackground.startsWith('data:') ? 'Uploaded' : 'URL'}
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
                      value={aboutSettings.heroTitle}
                      onChange={(e) => setAboutSettings(prev => ({ ...prev, heroTitle: e.target.value }))}
                      placeholder="Your Title"
                    />
                  </div>
                  <div>
                    <Label>Subtitle</Label>
                    <Input
                      value={aboutSettings.heroSubtitle}
                      onChange={(e) => setAboutSettings(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                      placeholder="Subtitle"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={aboutSettings.heroDescription}
                      onChange={(e) => setAboutSettings(prev => ({ ...prev, heroDescription: e.target.value }))}
                      rows={3}
                      placeholder="Description..."
                    />
                  </div>
                  <div>
                    <Label>Button Text</Label>
                    <Input
                      value={aboutSettings.heroButtonText}
                      onChange={(e) => setAboutSettings(prev => ({ ...prev, heroButtonText: e.target.value }))}
                      placeholder="Button Text"
                    />
                  </div>
                  <div>
                    <Label>Button Link</Label>
                    <Input
                      value={aboutSettings.heroButtonLink}
                      onChange={(e) => setAboutSettings(prev => ({ ...prev, heroButtonLink: e.target.value }))}
                      placeholder="/link"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Team Members Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Team Members</h2>
              <Dialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingTeam(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Team Member
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingTeam ? "Edit Team Member" : "Add Team Member"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={editingTeam?.name || ""}
                        onChange={(e) => setEditingTeam(prev => ({ ...prev!, name: e.target.value }))}
                        placeholder="Name"
                      />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Input
                        value={editingTeam?.role || ""}
                        onChange={(e) => setEditingTeam(prev => ({ ...prev!, role: e.target.value }))}
                        placeholder="Role"
                      />
                    </div>
                    <div>
                      <Label>Bio</Label>
                      <Textarea
                        value={editingTeam?.bio || ""}
                        onChange={(e) => setEditingTeam(prev => ({ ...prev!, bio: e.target.value }))}
                        rows={3}
                        placeholder="Bio..."
                      />
                    </div>
                    <div>
                      <Label>Experience</Label>
                      <Input
                        value={editingTeam?.experience || ""}
                        onChange={(e) => setEditingTeam(prev => ({ ...prev!, experience: e.target.value }))}
                        placeholder="Experience"
                      />
                    </div>
                    <div>
                      <Label>Achievements</Label>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input
                            value={newAchievement}
                            onChange={(e) => setNewAchievement(e.target.value)}
                            placeholder="Achievement"
                          />
                          <Button
                            size="sm"
                            onClick={() => {
                              if (newAchievement.trim()) {
                                setEditingTeam(prev => ({
                                  ...prev!,
                                  achievements: [...(prev?.achievements || []), newAchievement.trim()]
                                }));
                                setNewAchievement("");
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {editingTeam?.achievements?.map((achievement, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              {achievement}
                              <button
                                onClick={() => {
                                  setEditingTeam(prev => ({
                                    ...prev!,
                                    achievements: prev?.achievements?.filter((_, i) => i !== index) || []
                                  }));
                                }}
                                className="ml-1 hover:text-red-500"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => {
                        if (editingTeam) {
                          if (editingTeam.id) {
                            updateTeamMember(editingTeam.id, editingTeam);
                          } else {
                            addTeamMember(editingTeam);
                          }
                          setIsTeamDialogOpen(false);
                          setEditingTeam(null);
                        }
                      }}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <Card key={member.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingTeam(member);
                            setIsTeamDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Team Member</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {member.name}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteTeamMember(member.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">{member.bio}</p>
                    <div className="space-y-2">
                      <Badge variant="outline">{member.experience}</Badge>
                      <div className="flex flex-wrap gap-1">
                        {member.achievements.map((achievement, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Values Tab */}
          <TabsContent value="values" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Company Values</h2>
              <Dialog open={isValueDialogOpen} onOpenChange={setIsValueDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingValue(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Value
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingValue ? "Edit Value" : "Add Value"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={editingValue?.title || ""}
                        onChange={(e) => setEditingValue(prev => ({ ...prev!, title: e.target.value }))}
                        placeholder="Premium Quality"
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={editingValue?.description || ""}
                        onChange={(e) => setEditingValue(prev => ({ ...prev!, description: e.target.value }))}
                        rows={3}
                        placeholder="We source only the finest, freshest ingredients..."
                      />
                    </div>
                    <div>
                      <Label>Color Gradient</Label>
                      <Input
                        value={editingValue?.color || ""}
                        onChange={(e) => setEditingValue(prev => ({ ...prev!, color: e.target.value }))}
                        placeholder="from-emerald-500 to-green-600"
                      />
                    </div>
                    <div>
                      <Label>Icon</Label>
                      <select
                        value={editingValue?.iconName || ""}
                        onChange={(e) => setEditingValue(prev => ({ ...prev!, iconName: e.target.value }))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Select Icon</option>
                        {iconOptions.map(option => (
                          <option key={option.name} value={option.name}>{option.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => {
                        if (editingValue) {
                          if (editingValue.id) {
                            updateValue(editingValue.id, editingValue);
                          } else {
                            addValue(editingValue);
                          }
                          setIsValueDialogOpen(false);
                          setEditingValue(null);
                        }
                      }}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value) => (
                <Card key={value.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{value.title}</CardTitle>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingValue(value);
                            setIsValueDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Value</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{value.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteValue(value.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{value.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline">{value.iconName}</Badge>
                      <Badge variant="outline">{value.color}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Statistics</h2>
              <Dialog open={isStatDialogOpen} onOpenChange={setIsStatDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingStat(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Statistic
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingStat ? "Edit Statistic" : "Add Statistic"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Number</Label>
                      <Input
                        value={editingStat?.number || ""}
                        onChange={(e) => setEditingStat(prev => ({ ...prev!, number: e.target.value }))}
                        placeholder="500+"
                      />
                    </div>
                    <div>
                      <Label>Label</Label>
                      <Input
                        value={editingStat?.label || ""}
                        onChange={(e) => setEditingStat(prev => ({ ...prev!, label: e.target.value }))}
                        placeholder="Events Hosted"
                      />
                    </div>
                    <div>
                      <Label>Icon</Label>
                      <select
                        value={editingStat?.iconName || ""}
                        onChange={(e) => setEditingStat(prev => ({ ...prev!, iconName: e.target.value }))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Select Icon</option>
                        {iconOptions.map(option => (
                          <option key={option.name} value={option.name}>{option.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => {
                        if (editingStat) {
                          if (editingStat.id) {
                            updateStat(editingStat.id, editingStat);
                          } else {
                            addStat(editingStat);
                          }
                          setIsStatDialogOpen(false);
                          setEditingStat(null);
                        }
                      }}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <Card key={stat.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl font-bold">{stat.number}</CardTitle>
                        <CardDescription>{stat.label}</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingStat(stat);
                            setIsStatDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Statistic</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{stat.label}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteStat(stat.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline">{stat.iconName}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Testimonials</h2>
              <Dialog open={isTestimonialDialogOpen} onOpenChange={setIsTestimonialDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingTestimonial(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Testimonial
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={editingTestimonial?.name || ""}
                        onChange={(e) => setEditingTestimonial(prev => ({ ...prev!, name: e.target.value }))}
                        placeholder="Sarah Johnson"
                      />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Input
                        value={editingTestimonial?.role || ""}
                        onChange={(e) => setEditingTestimonial(prev => ({ ...prev!, role: e.target.value }))}
                        placeholder="Wedding Client"
                      />
                    </div>
                    <div>
                      <Label>Content</Label>
                      <Textarea
                        value={editingTestimonial?.content || ""}
                        onChange={(e) => setEditingTestimonial(prev => ({ ...prev!, content: e.target.value }))}
                        rows={3}
                        placeholder="SP Events made our wedding absolutely magical..."
                      />
                    </div>
                    <div>
                      <Label>Rating</Label>
                      <select
                        value={editingTestimonial?.rating || 5}
                        onChange={(e) => setEditingTestimonial(prev => ({ ...prev!, rating: parseInt(e.target.value) }))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value={1}>1 Star</option>
                        <option value={2}>2 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={5}>5 Stars</option>
                      </select>
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={editingTestimonial?.image || ""}
                        onChange={(e) => setEditingTestimonial(prev => ({ ...prev!, image: e.target.value }))}
                        placeholder="https://images.unsplash.com/photo-..."
                      />
                      <div className="flex gap-2 mt-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => editingTestimonial?.id && handleUploadClick(editingTestimonial.id)}
                          disabled={isUploading || !editingTestimonial?.id}
                          className="flex items-center gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          Upload Media
                        </Button>
                        {editingTestimonial?.image && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => editingTestimonial?.id && clearMedia(editingTestimonial.id)}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                            Clear
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => {
                        if (editingTestimonial) {
                          if (editingTestimonial.id) {
                            updateTestimonial(editingTestimonial.id, editingTestimonial);
                          } else {
                            addTestimonial(editingTestimonial);
                          }
                          setIsTestimonialDialogOpen(false);
                          setEditingTestimonial(null);
                        }
                      }}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingTestimonial(testimonial);
                            setIsTestimonialDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {testimonial.name}'s testimonial? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteTestimonial(testimonial.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">{testimonial.content}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <Badge variant="outline">{testimonial.rating} Stars</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
