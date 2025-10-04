-- SP Events Database Schema
-- MySQL Database Setup

-- Create database
CREATE DATABASE IF NOT EXISTS sp_events;
USE sp_events;

-- Users table for admin authentication
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Website content table
CREATE TABLE website_content (
    id INT PRIMARY KEY AUTO_INCREMENT,
    section VARCHAR(100) NOT NULL,
    field_name VARCHAR(100) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_section_field (section, field_name)
);

-- Menu items table
CREATE TABLE menu_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    image_hint VARCHAR(255),
    price DECIMAL(10,2),
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Gallery images table
CREATE TABLE gallery_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(50) NOT NULL,
    title VARCHAR(255),
    description TEXT,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Testimonials table
CREATE TABLE testimonials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_name VARCHAR(255) NOT NULL,
    client_title VARCHAR(255),
    testimonial TEXT NOT NULL,
    rating INT DEFAULT 5,
    image_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bookings/Inquiries table
CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    event_type VARCHAR(100),
    event_date DATE,
    guest_count INT,
    message TEXT,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- WhatsApp settings table
CREATE TABLE whatsapp_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    phone_number VARCHAR(20) NOT NULL,
    welcome_message TEXT,
    quick_messages JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Logo settings table
CREATE TABLE logo_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    logo_type VARCHAR(50) NOT NULL,
    logo_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Statistics table
CREATE TABLE statistics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    stat_name VARCHAR(100) NOT NULL,
    stat_value INT NOT NULL,
    stat_label VARCHAR(255),
    icon VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user (password: SP@Events1234)
INSERT INTO users (email, password, name, role) VALUES 
('admin@spevents.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'SP Events Admin', 'admin');

-- Insert default website content
INSERT INTO website_content (section, field_name, content) VALUES
('hero', 'title', 'SP Events'),
('hero', 'subtitle', 'From elegant weddings to professional corporate gatherings, we bring your vision to life with precision and style. Experience the magic of perfectly orchestrated events that leave lasting impressions.'),
('about', 'title', 'About SP Events'),
('about', 'paragraph', 'At SP Events, we don\'t just plan events; we craft experiences that tell your story. With over 8 years of expertise in event management, our dedicated team brings creativity, precision, and a touch of magic to every celebration.'),
('about', 'quote', 'Turning your dreams into unforgettable memories, one event at a time.'),
('services', 'title', 'Our Premium Services'),
('services', 'paragraph', 'We offer a comprehensive range of event planning services, each tailored to deliver an exceptional experience. From concept to execution, our team ensures every detail is perfect.'),
('contact', 'email', 'info@spevents.com'),
('contact', 'phone', '+1-234-567-8900'),
('contact', 'address', 'SP Events Center, Downtown District, City 12345');

-- Insert default menu items
INSERT INTO menu_items (category, name, description, image_url, image_hint, price) VALUES
('appetizers', 'Vegetable Spring Rolls', 'Fresh vegetables wrapped in crispy spring roll pastry', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80', 'vegetable spring rolls', 8.99),
('appetizers', 'Chicken Satay', 'Grilled chicken skewers with peanut sauce', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=80', 'chicken satay skewers', 12.99),
('main', 'Beef Curry', 'Tender beef in rich coconut curry sauce', 'https://images.unsplash.com/photo-1563379091339-03246963d4d0?w=800&q=80', 'beef curry dish', 18.99),
('main', 'Vegetable Biryani', 'Fragrant basmati rice with mixed vegetables', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80', 'vegetable biryani rice', 16.99),
('desserts', 'Mango Lassi', 'Refreshing yogurt drink with fresh mango', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80', 'mango lassi drink', 4.99),
('desserts', 'Gulab Jamun', 'Sweet milk dumplings in rose syrup', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80', 'gulab jamun dessert', 6.99);

-- Insert default gallery images
INSERT INTO gallery_images (category, title, description, image_url, alt_text, sort_order) VALUES
('weddings', 'Elegant Wedding Setup', 'Beautiful wedding ceremony setup with flowers', 'https://images.unsplash.com/photo-1519167758481-83f142b8fb9c?w=800&q=80', 'wedding ceremony setup', 1),
('corporate', 'Corporate Event', 'Professional corporate event setup', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', 'corporate event setup', 1),
('parties', 'Birthday Party', 'Colorful birthday party decoration', 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80', 'birthday party setup', 1),
('concerts', 'Concert Stage', 'Professional concert stage setup', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80', 'concert stage setup', 1);

-- Insert default testimonials
INSERT INTO testimonials (client_name, client_title, testimonial, rating, image_url, is_featured) VALUES
('Sarah Johnson', 'Bride', 'SP Events made our wedding absolutely perfect! Every detail was handled with care and professionalism.', 5, 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&q=80', TRUE),
('Michael Chen', 'CEO', 'Outstanding corporate event management. Our team was impressed with the seamless execution.', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', TRUE),
('Emily Rodriguez', 'Event Coordinator', 'Professional, creative, and reliable. SP Events exceeded our expectations.', 5, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80', TRUE);

-- Insert default statistics
INSERT INTO statistics (stat_name, stat_value, stat_label, icon) VALUES
('events_planned', 500, 'Events Planned', 'Calendar'),
('client_satisfaction', 99, 'Client Satisfaction', 'Star'),
('happy_clients', 250, 'Happy Clients', 'Users'),
('average_rating', 5, 'Average Rating', 'Star');

-- Insert default WhatsApp settings
INSERT INTO whatsapp_settings (phone_number, welcome_message, quick_messages) VALUES
('+1234567890', 'Hello! How can we help you with your event planning?', '["I want to book an event", "Tell me about your services", "What are your prices?", "I need a quote"]');

-- Insert default logo settings
INSERT INTO logo_settings (logo_type, logo_url, alt_text) VALUES
('main', 'https://images.unsplash.com/photo-1519167758481-83f142b8fb9c?w=800&q=80', 'SP Events Logo');
