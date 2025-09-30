"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  Users, 
  Search, 
  Filter, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Upload,
  ExternalLink,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  X,
  Image as ImageIcon,
  Shield,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import Link from "next/link";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  avatar?: string;
  bio?: string;
  address?: string;
  hireDate: string;
  status: "active" | "inactive" | "on-leave";
  permissions: string[];
  salary?: string;
  emergencyContact?: string;
  skills: string[];
  notes?: string;
}

const defaultStaff: StaffMember[] = [
  {
    id: "staff-1",
    name: "Sarah Johnson",
    email: "sarah.johnson@eliteevents.com",
    phone: "+1 (555) 123-4567",
    position: "Event Manager",
    department: "Operations",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "Experienced event manager with 5+ years in luxury event planning.",
    address: "123 Main St, New York, NY 10001",
    hireDate: "2023-01-15",
    status: "active",
    permissions: ["events", "clients", "vendors"],
    salary: "$65,000",
    emergencyContact: "John Johnson - +1 (555) 987-6543",
    skills: ["Event Planning", "Client Relations", "Vendor Management"],
    notes: "Excellent communication skills, bilingual (English/Spanish)"
  },
  {
    id: "staff-2",
    name: "Michael Chen",
    email: "michael.chen@eliteevents.com",
    phone: "+1 (555) 234-5678",
    position: "Creative Director",
    department: "Design",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Creative visionary with expertise in luxury event design and branding.",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    hireDate: "2022-08-20",
    status: "active",
    permissions: ["design", "creative", "media"],
    salary: "$75,000",
    emergencyContact: "Lisa Chen - +1 (555) 876-5432",
    skills: ["Graphic Design", "Branding", "Photography", "Video Production"],
    notes: "Award-winning designer, available for weekend events"
  },
  {
    id: "staff-3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@eliteevents.com",
    phone: "+1 (555) 345-6789",
    position: "Client Relations Specialist",
    department: "Sales",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "Dedicated to providing exceptional client experiences and building lasting relationships.",
    address: "789 Pine St, Miami, FL 33101",
    hireDate: "2023-03-10",
    status: "active",
    permissions: ["clients", "sales", "bookings"],
    salary: "$55,000",
    emergencyContact: "Carlos Rodriguez - +1 (555) 765-4321",
    skills: ["Customer Service", "Sales", "Communication", "CRM"],
    notes: "Fluent in Spanish and English, great with VIP clients"
  }
];

const positions = [
  "Event Manager", "Creative Director", "Client Relations Specialist", 
  "Operations Coordinator", "Marketing Manager", "Account Executive",
  "Designer", "Photographer", "Videographer", "Catering Manager",
  "Venue Coordinator", "Administrative Assistant", "Finance Manager"
];

const departments = [
  "Operations", "Design", "Sales", "Marketing", "Finance", 
  "Human Resources", "IT", "Catering", "Photography", "Administration"
];

const permissionOptions = [
  "events", "clients", "vendors", "design", "creative", "media",
  "sales", "bookings", "finance", "admin", "reports", "analytics"
];

export default function StaffManagementPage() {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(defaultStaff);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<StaffMember | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state for new member
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    avatar: "",
    bio: "",
    address: "",
    hireDate: new Date().toISOString().split('T')[0],
    status: "active" as const,
    permissions: [] as string[],
    salary: "",
    emergencyContact: "",
    skills: [] as string[],
    notes: ""
  });

  const filteredMembers = staffMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || member.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (max 2MB for avatars)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }

    setIsUploading(true);

    try {
      // Convert file to base64 for storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setNewMember(prev => ({ ...prev, avatar: result }));
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

  const clearAvatar = () => {
    setNewMember(prev => ({ ...prev, avatar: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddMember = () => {
    const staffMember: StaffMember = {
      id: `staff-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...newMember
    };

    setStaffMembers(prev => [...prev, staffMember]);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      const savedStaff = localStorage.getItem('staffMembers');
      const members = savedStaff ? JSON.parse(savedStaff) : [];
      localStorage.setItem('staffMembers', JSON.stringify([...members, staffMember]));
    }

    // Reset form
    setNewMember({
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      avatar: "",
      bio: "",
      address: "",
      hireDate: new Date().toISOString().split('T')[0],
      status: "active",
      permissions: [],
      salary: "",
      emergencyContact: "",
      skills: [],
      notes: ""
    });
    setIsAddDialogOpen(false);
  };

  const handleEditMember = (member: StaffMember) => {
    setEditingMember(member);
    setIsEditDialogOpen(true);
  };

  const handleUpdateMember = () => {
    if (!editingMember) return;

    setStaffMembers(prev => prev.map(member => 
      member.id === editingMember.id ? editingMember : member
    ));

    // Update localStorage
    if (typeof window !== 'undefined') {
      const savedStaff = localStorage.getItem('staffMembers');
      const members = savedStaff ? JSON.parse(savedStaff) : [];
      const updatedMembers = members.map((member: StaffMember) => 
        member.id === editingMember.id ? editingMember : member
      );
      localStorage.setItem('staffMembers', JSON.stringify(updatedMembers));
    }

    setIsEditDialogOpen(false);
    setEditingMember(null);
  };

  const handleDeleteMember = (memberId: string) => {
    setStaffMembers(prev => prev.filter(member => member.id !== memberId));
    
    // Update localStorage
    if (typeof window !== 'undefined') {
      const savedStaff = localStorage.getItem('staffMembers');
      const members = savedStaff ? JSON.parse(savedStaff) : [];
      const updatedMembers = members.filter((member: StaffMember) => member.id !== memberId);
      localStorage.setItem('staffMembers', JSON.stringify(updatedMembers));
    }
  };

  const togglePermission = (permission: string, member: StaffMember) => {
    const updatedPermissions = member.permissions.includes(permission)
      ? member.permissions.filter(p => p !== permission)
      : [...member.permissions, permission];
    
    const updatedMember = { ...member, permissions: updatedPermissions };
    setStaffMembers(prev => prev.map(m => m.id === member.id ? updatedMember : m));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-red-100 text-red-800";
      case "on-leave": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="w-4 h-4" />;
      case "inactive": return <XCircle className="w-4 h-4" />;
      case "on-leave": return <Clock className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
              <p className="text-gray-600 mt-1">Manage your team members, roles, and permissions.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Staff Member
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Staff Member</DialogTitle>
                    <DialogDescription>
                      Add a new team member to your organization.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Basic Information</h3>
                      
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={newMember.name}
                          onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter full name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newMember.email}
                          onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="staff@eliteevents.com"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={newMember.phone}
                          onChange={(e) => setNewMember(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>

                      <div>
                        <Label htmlFor="position">Position</Label>
                        <Select value={newMember.position} onValueChange={(value) => setNewMember(prev => ({ ...prev, position: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent>
                            {positions.map(position => (
                              <SelectItem key={position} value={position}>{position}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Select value={newMember.department} onValueChange={(value) => setNewMember(prev => ({ ...prev, department: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map(department => (
                              <SelectItem key={department} value={department}>{department}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="hireDate">Hire Date</Label>
                        <Input
                          id="hireDate"
                          type="date"
                          value={newMember.hireDate}
                          onChange={(e) => setNewMember(prev => ({ ...prev, hireDate: e.target.value }))}
                        />
                      </div>

                      <div>
                        <Label htmlFor="salary">Salary (Optional)</Label>
                        <Input
                          id="salary"
                          value={newMember.salary}
                          onChange={(e) => setNewMember(prev => ({ ...prev, salary: e.target.value }))}
                          placeholder="$50,000"
                        />
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Additional Information</h3>

                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={newMember.bio}
                          onChange={(e) => setNewMember(prev => ({ ...prev, bio: e.target.value }))}
                          placeholder="Brief description of the staff member"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          value={newMember.address}
                          onChange={(e) => setNewMember(prev => ({ ...prev, address: e.target.value }))}
                          placeholder="Full address"
                          rows={2}
                        />
                      </div>

                      <div>
                        <Label htmlFor="emergencyContact">Emergency Contact</Label>
                        <Input
                          id="emergencyContact"
                          value={newMember.emergencyContact}
                          onChange={(e) => setNewMember(prev => ({ ...prev, emergencyContact: e.target.value }))}
                          placeholder="Name - Phone Number"
                        />
                      </div>

                      <div>
                        <Label htmlFor="skills">Skills (comma-separated)</Label>
                        <Input
                          id="skills"
                          value={newMember.skills.join(', ')}
                          onChange={(e) => setNewMember(prev => ({ ...prev, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '') }))}
                          placeholder="Event Planning, Client Relations, Design"
                        />
                      </div>

                      <div>
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                          id="notes"
                          value={newMember.notes}
                          onChange={(e) => setNewMember(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Additional notes about the staff member"
                          rows={2}
                        />
                      </div>

                      {/* Avatar Upload */}
                      <div>
                        <Label>Profile Photo</Label>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleUploadClick}
                              disabled={isUploading}
                              className="flex items-center gap-2"
                            >
                              <Upload className="w-4 h-4" />
                              Upload Photo
                            </Button>
                            {newMember.avatar && (
                              <Button
                                type="button"
                                variant="outline"
                                onClick={clearAvatar}
                                className="flex items-center gap-2 text-red-600 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                                Clear
                              </Button>
                            )}
                          </div>
                          {newMember.avatar && (
                            <div className="relative">
                              <img
                                src={newMember.avatar}
                                alt="Profile preview"
                                className="w-24 h-24 object-cover rounded-full border"
                                onError={(e) => {
                                  e.currentTarget.src = "https://via.placeholder.com/96x96?text=Photo";
                                }}
                              />
                              <div className="absolute top-1 right-1 bg-black/50 text-white px-1 py-0.5 rounded text-xs">
                                {newMember.avatar.startsWith('data:') ? 'Uploaded' : 'URL'}
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

                      {/* Permissions */}
                      <div>
                        <Label>Permissions</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {permissionOptions.map(permission => (
                            <label key={permission} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={newMember.permissions.includes(permission)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setNewMember(prev => ({ ...prev, permissions: [...prev.permissions, permission] }));
                                  } else {
                                    setNewMember(prev => ({ ...prev, permissions: prev.permissions.filter(p => p !== permission) }));
                                  }
                                }}
                                className="rounded"
                              />
                              <span className="text-sm capitalize">{permission}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddMember}>
                      Add Staff Member
                    </Button>
                  </DialogFooter>
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
                    placeholder="Search staff members..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Departments</SelectItem>
                    {departments.map(department => (
                      <SelectItem key={department} value={department}>{department}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Staff</p>
                  <p className="text-3xl font-bold">{staffMembers.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Active</p>
                  <p className="text-3xl font-bold">{staffMembers.filter(member => member.status === 'active').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">On Leave</p>
                  <p className="text-3xl font-bold">{staffMembers.filter(member => member.status === 'on-leave').length}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Departments</p>
                  <p className="text-3xl font-bold">{new Set(staffMembers.map(member => member.department)).size}</p>
                </div>
                <Shield className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/64x64?text=Photo";
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {member.name.charAt(0)}
                      </div>
                    )}
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${getStatusColor(member.status)}`}>
                      {getStatusIcon(member.status)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{member.name}</h3>
                    <p className="text-sm text-gray-600 truncate">{member.position}</p>
                    <p className="text-xs text-gray-500 truncate">{member.department}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {member.status}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {member.permissions.length} permissions
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Hired: {new Date(member.hireDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {member.skills.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 mb-1">Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {member.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{member.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2 mt-4">
                  <Button size="sm" variant="ghost" onClick={() => handleEditMember(member)}>
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
                        <AlertDialogTitle>Delete Staff Member</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{member.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDeleteMember(member.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Staff Member</DialogTitle>
            <DialogDescription>
              Update the information for this team member.
            </DialogDescription>
          </DialogHeader>
          {editingMember && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                
                <div>
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={editingMember.name}
                    onChange={(e) => setEditingMember(prev => prev ? { ...prev, name: e.target.value } : null)}
                  />
                </div>

                <div>
                  <Label htmlFor="edit-email">Email Address</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingMember.email}
                    onChange={(e) => setEditingMember(prev => prev ? { ...prev, email: e.target.value } : null)}
                  />
                </div>

                <div>
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input
                    id="edit-phone"
                    value={editingMember.phone}
                    onChange={(e) => setEditingMember(prev => prev ? { ...prev, phone: e.target.value } : null)}
                  />
                </div>

                <div>
                  <Label htmlFor="edit-position">Position</Label>
                  <Select value={editingMember.position} onValueChange={(value) => setEditingMember(prev => prev ? { ...prev, position: value } : null)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map(position => (
                        <SelectItem key={position} value={position}>{position}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="edit-department">Department</Label>
                  <Select value={editingMember.department} onValueChange={(value) => setEditingMember(prev => prev ? { ...prev, department: value } : null)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(department => (
                        <SelectItem key={department} value={department}>{department}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select value={editingMember.status} onValueChange={(value: any) => setEditingMember(prev => prev ? { ...prev, status: value } : null)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="on-leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Information</h3>

                <div>
                  <Label htmlFor="edit-bio">Bio</Label>
                  <Textarea
                    id="edit-bio"
                    value={editingMember.bio || ''}
                    onChange={(e) => setEditingMember(prev => prev ? { ...prev, bio: e.target.value } : null)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="edit-address">Address</Label>
                  <Textarea
                    id="edit-address"
                    value={editingMember.address || ''}
                    onChange={(e) => setEditingMember(prev => prev ? { ...prev, address: e.target.value } : null)}
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="edit-emergencyContact">Emergency Contact</Label>
                  <Input
                    id="edit-emergencyContact"
                    value={editingMember.emergencyContact || ''}
                    onChange={(e) => setEditingMember(prev => prev ? { ...prev, emergencyContact: e.target.value } : null)}
                  />
                </div>

                <div>
                  <Label htmlFor="edit-salary">Salary</Label>
                  <Input
                    id="edit-salary"
                    value={editingMember.salary || ''}
                    onChange={(e) => setEditingMember(prev => prev ? { ...prev, salary: e.target.value } : null)}
                  />
                </div>

                <div>
                  <Label htmlFor="edit-skills">Skills (comma-separated)</Label>
                  <Input
                    id="edit-skills"
                    value={editingMember.skills.join(', ')}
                    onChange={(e) => setEditingMember(prev => prev ? { ...prev, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '') } : null)}
                  />
                </div>

                <div>
                  <Label htmlFor="edit-notes">Notes</Label>
                  <Textarea
                    id="edit-notes"
                    value={editingMember.notes || ''}
                    onChange={(e) => setEditingMember(prev => prev ? { ...prev, notes: e.target.value } : null)}
                    rows={2}
                  />
                </div>

                {/* Permissions */}
                <div>
                  <Label>Permissions</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {permissionOptions.map(permission => (
                      <label key={permission} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={editingMember.permissions.includes(permission)}
                          onChange={(e) => togglePermission(permission, editingMember)}
                          className="rounded"
                        />
                        <span className="text-sm capitalize">{permission}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateMember}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
