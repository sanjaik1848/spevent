import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sp_events',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Database connection class
class Database {
  private pool: mysql.Pool;

  constructor() {
    this.pool = pool;
  }

  // Generic query method
  async query(sql: string, params?: any[]): Promise<any> {
    try {
      const [rows] = await this.pool.execute(sql, params);
      return rows;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }

  // User authentication methods
  async authenticateUser(email: string, password: string): Promise<any> {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [users] = await this.pool.execute(sql, [email]);
    
    if (Array.isArray(users) && users.length > 0) {
      const user = users[0] as any;
      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (isValidPassword) {
        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    }
    
    return null;
  }

  async createUser(userData: {
    email: string;
    password: string;
    name: string;
    role?: string;
  }): Promise<any> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const sql = 'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)';
    const [result] = await this.pool.execute(sql, [
      userData.email,
      hashedPassword,
      userData.name,
      userData.role || 'admin'
    ]);
    
    return result;
  }

  // Website content methods
  async getWebsiteContent(): Promise<any> {
    const sql = 'SELECT * FROM website_content ORDER BY section, field_name';
    return await this.query(sql);
  }

  async updateWebsiteContent(section: string, fieldName: string, content: string): Promise<any> {
    const sql = 'INSERT INTO website_content (section, field_name, content) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE content = VALUES(content)';
    return await this.query(sql, [section, fieldName, content]);
  }

  // Menu items methods
  async getMenuItems(category?: string): Promise<any> {
    let sql = 'SELECT * FROM menu_items WHERE is_available = TRUE';
    const params: any[] = [];
    
    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }
    
    sql += ' ORDER BY category, name';
    return await this.query(sql, params);
  }

  async createMenuItem(itemData: {
    category: string;
    name: string;
    description?: string;
    image_url?: string;
    image_hint?: string;
    price?: number;
  }): Promise<any> {
    const sql = 'INSERT INTO menu_items (category, name, description, image_url, image_hint, price) VALUES (?, ?, ?, ?, ?, ?)';
    return await this.query(sql, [
      itemData.category,
      itemData.name,
      itemData.description,
      itemData.image_url,
      itemData.image_hint,
      itemData.price
    ]);
  }

  async updateMenuItem(id: number, itemData: any): Promise<any> {
    const fields = Object.keys(itemData).map(key => `${key} = ?`).join(', ');
    const values = Object.values(itemData);
    const sql = `UPDATE menu_items SET ${fields} WHERE id = ?`;
    return await this.query(sql, [...values, id]);
  }

  async deleteMenuItem(id: number): Promise<any> {
    const sql = 'UPDATE menu_items SET is_available = FALSE WHERE id = ?';
    return await this.query(sql, [id]);
  }

  // Gallery methods
  async getGalleryImages(category?: string): Promise<any> {
    let sql = 'SELECT * FROM gallery_images WHERE is_active = TRUE';
    const params: any[] = [];
    
    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }
    
    sql += ' ORDER BY category, sort_order';
    return await this.query(sql, params);
  }

  async createGalleryImage(imageData: {
    category: string;
    title?: string;
    description?: string;
    image_url: string;
    alt_text?: string;
    sort_order?: number;
  }): Promise<any> {
    const sql = 'INSERT INTO gallery_images (category, title, description, image_url, alt_text, sort_order) VALUES (?, ?, ?, ?, ?, ?)';
    return await this.query(sql, [
      imageData.category,
      imageData.title,
      imageData.description,
      imageData.image_url,
      imageData.alt_text,
      imageData.sort_order || 0
    ]);
  }

  // Testimonials methods
  async getTestimonials(featured?: boolean): Promise<any> {
    let sql = 'SELECT * FROM testimonials';
    const params: any[] = [];
    
    if (featured !== undefined) {
      sql += ' WHERE is_featured = ?';
      params.push(featured);
    }
    
    sql += ' ORDER BY created_at DESC';
    return await this.query(sql, params);
  }

  async createTestimonial(testimonialData: {
    client_name: string;
    client_title?: string;
    testimonial: string;
    rating?: number;
    image_url?: string;
    is_featured?: boolean;
  }): Promise<any> {
    const sql = 'INSERT INTO testimonials (client_name, client_title, testimonial, rating, image_url, is_featured) VALUES (?, ?, ?, ?, ?, ?)';
    return await this.query(sql, [
      testimonialData.client_name,
      testimonialData.client_title,
      testimonialData.testimonial,
      testimonialData.rating || 5,
      testimonialData.image_url,
      testimonialData.is_featured || false
    ]);
  }

  // Bookings methods
  async createBooking(bookingData: {
    name: string;
    email: string;
    phone?: string;
    event_type?: string;
    event_date?: string;
    guest_count?: number;
    message?: string;
  }): Promise<any> {
    const sql = 'INSERT INTO bookings (name, email, phone, event_type, event_date, guest_count, message) VALUES (?, ?, ?, ?, ?, ?, ?)';
    return await this.query(sql, [
      bookingData.name,
      bookingData.email,
      bookingData.phone,
      bookingData.event_type,
      bookingData.event_date,
      bookingData.guest_count,
      bookingData.message
    ]);
  }

  async getBookings(): Promise<any> {
    const sql = 'SELECT * FROM bookings ORDER BY created_at DESC';
    return await this.query(sql);
  }

  async updateBookingStatus(id: number, status: string): Promise<any> {
    const sql = 'UPDATE bookings SET status = ? WHERE id = ?';
    return await this.query(sql, [status, id]);
  }

  // Statistics methods
  async getStatistics(): Promise<any> {
    const sql = 'SELECT * FROM statistics WHERE is_active = TRUE ORDER BY stat_name';
    return await this.query(sql);
  }

  async updateStatistic(statName: string, statValue: number): Promise<any> {
    const sql = 'UPDATE statistics SET stat_value = ? WHERE stat_name = ?';
    return await this.query(sql, [statValue, statName]);
  }

  // WhatsApp settings methods
  async getWhatsAppSettings(): Promise<any> {
    const sql = 'SELECT * FROM whatsapp_settings WHERE is_active = TRUE LIMIT 1';
    const result = await this.query(sql);
    return result.length > 0 ? result[0] : null;
  }

  async updateWhatsAppSettings(settings: {
    phone_number: string;
    welcome_message?: string;
    quick_messages?: string;
  }): Promise<any> {
    const sql = 'INSERT INTO whatsapp_settings (phone_number, welcome_message, quick_messages) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE phone_number = VALUES(phone_number), welcome_message = VALUES(welcome_message), quick_messages = VALUES(quick_messages)';
    return await this.query(sql, [
      settings.phone_number,
      settings.welcome_message,
      settings.quick_messages
    ]);
  }

  // Logo settings methods
  async getLogoSettings(): Promise<any> {
    const sql = 'SELECT * FROM logo_settings WHERE is_active = TRUE';
    return await this.query(sql);
  }

  async updateLogoSetting(logoType: string, logoUrl: string, altText?: string): Promise<any> {
    const sql = 'INSERT INTO logo_settings (logo_type, logo_url, alt_text) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE logo_url = VALUES(logo_url), alt_text = VALUES(alt_text)';
    return await this.query(sql, [logoType, logoUrl, altText]);
  }

  // JWT token methods
  generateToken(user: any): string {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (error) {
      return null;
    }
  }

  // Close connection pool
  async close(): Promise<void> {
    await this.pool.end();
  }
}

// Create singleton instance
const db = new Database();

export default db;

