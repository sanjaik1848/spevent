# 🚀 SP Events - MilesWeb Deployment Package

## 📦 What's Included

### Frontend (Next.js Static Export)
- Complete SP Events website
- Purple theme for main site
- Green organic food page
- Mobile responsive design
- Admin panel interface

### Backend (MySQL Database)
- Complete database schema
- API endpoints for all features
- Admin authentication system
- Content management system

## 🗄️ Database Setup

### 1. Create MySQL Database
```sql
CREATE DATABASE sp_events;
```

### 2. Import Database Schema
```bash
mysql -u username -p sp_events < database/schema.sql
```

### 3. Default Admin Credentials
- **Email**: admin@spevents.com
- **Password**: SP@Events1234

## 🌐 Deployment Steps

### Option 1: Static Website (Recommended for MilesWeb)
1. Build static files: `npm run build`
2. Upload `out/` folder to MilesWeb
3. Set up MySQL database separately
4. Configure environment variables

### Option 2: Node.js Application
1. Upload entire project to MilesWeb
2. Install dependencies: `npm install`
3. Set up MySQL database
4. Configure environment variables
5. Start application: `npm start`

## ⚙️ Environment Variables

Create `.env` file on MilesWeb:
```env
NODE_ENV=production
DB_HOST=localhost
DB_USER=your_milesweb_db_user
DB_PASSWORD=your_milesweb_db_password
DB_NAME=sp_events
DB_PORT=3306
JWT_SECRET=your-super-secret-jwt-key
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## 📁 File Structure
```
sp-events/
├── src/                    # Source code
├── database/               # Database schema
├── out/                    # Static build (if using static export)
├── package.json           # Dependencies
├── next.config.ts         # Next.js config
├── vercel.json           # Deployment config
└── README.md             # Documentation
```

## 🔧 MilesWeb Configuration

### cPanel Settings
- **Document Root**: `/public_html` or `/subdomain`
- **PHP Version**: 8.0+ (if using PHP)
- **Node.js Version**: 18+ (if using Node.js)

### Database Settings
- **Database Name**: sp_events
- **Host**: localhost (usually)
- **Port**: 3306

## 📞 Support

For MilesWeb-specific issues:
- Check MilesWeb documentation
- Contact MilesWeb support
- Verify hosting plan supports your requirements

## 🎯 Features Ready for Production

- ✅ Professional event management website
- ✅ Admin panel for content management
- ✅ MySQL database backend
- ✅ WhatsApp integration
- ✅ Mobile responsive design
- ✅ SEO optimized
- ✅ Fast loading performance

---

**Ready for MilesWeb deployment! 🚀**
