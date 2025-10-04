// Database types for SP Events
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'manager';
  created_at: string;
  updated_at: string;
}

export interface WebsiteContent {
  id: number;
  section: string;
  field_name: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: number;
  category: string;
  name: string;
  description?: string;
  image_url?: string;
  image_hint?: string;
  price?: number;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: number;
  category: string;
  title?: string;
  description?: string;
  image_url: string;
  alt_text?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: number;
  client_name: string;
  client_title?: string;
  testimonial: string;
  rating: number;
  image_url?: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: number;
  name: string;
  email: string;
  phone?: string;
  event_type?: string;
  event_date?: string;
  guest_count?: number;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Statistic {
  id: number;
  stat_name: string;
  stat_value: number;
  stat_label?: string;
  icon?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface WhatsAppSettings {
  id: number;
  phone_number: string;
  welcome_message?: string;
  quick_messages?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LogoSetting {
  id: number;
  logo_type: string;
  logo_url: string;
  alt_text?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

// Request types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateMenuItemRequest {
  category: string;
  name: string;
  description?: string;
  image_url?: string;
  image_hint?: string;
  price?: number;
}

export interface UpdateMenuItemRequest extends Partial<CreateMenuItemRequest> {
  id: number;
}

export interface CreateGalleryImageRequest {
  category: string;
  title?: string;
  description?: string;
  image_url: string;
  alt_text?: string;
  sort_order?: number;
}

export interface CreateTestimonialRequest {
  client_name: string;
  client_title?: string;
  testimonial: string;
  rating?: number;
  image_url?: string;
  is_featured?: boolean;
}

export interface CreateBookingRequest {
  name: string;
  email: string;
  phone?: string;
  event_type?: string;
  event_date?: string;
  guest_count?: number;
  message?: string;
}

export interface UpdateBookingStatusRequest {
  id: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface UpdateWebsiteContentRequest {
  section: string;
  fieldName: string;
  content: string;
}

export interface UpdateWhatsAppSettingsRequest {
  phone_number: string;
  welcome_message?: string;
  quick_messages?: string;
}

export interface UpdateLogoSettingRequest {
  logo_type: string;
  logo_url: string;
  alt_text?: string;
}

