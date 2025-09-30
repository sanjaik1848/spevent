# 📄 How to Change Page Settings & Add New Pages

## 🎯 Quick Answer: Edit Page Files & Add New Routes

**To change existing pages**: Edit the page files in `src/app/`
**To add new pages**: Create new folders and `page.tsx` files

---

## 📁 Current Page Structure

```
src/app/
├── page.tsx              # Homepage (/)
├── about/page.tsx        # About page (/about)
├── services/page.tsx    # Services page (/services)
├── contact/page.tsx      # Contact page (/contact)
├── gallery/page.tsx      # Gallery page (/gallery)
├── booking/page.tsx      # Booking page (/booking)
├── welcome/page.tsx      # Welcome page (/welcome)
├── website/page.tsx     # Website page (/website)
├── food/page.tsx        # Food page (/food)
└── admin/               # Admin pages (/admin/*)
    ├── page.tsx
    ├── content/page.tsx
    ├── whatsapp/page.tsx
    └── ...
```

---

## 🔧 How to Change Existing Pages

### **1. Change Homepage**
```bash
# File: src/app/page.tsx
# This is your main homepage
```

**Example - Change Homepage Content:**
```typescript
// src/app/page.tsx
export default function Home() {
  return (
    <div>
      <h1>Your New Homepage Title</h1>
      <p>Your new homepage content</p>
      {/* Add your components here */}
    </div>
  );
}
```

### **2. Change About Page**
```bash
# File: src/app/about/page.tsx
```

**Example - Update About Page:**
```typescript
// src/app/about/page.tsx
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Your new about content</p>
      {/* Your about page content */}
    </div>
  );
}
```

### **3. Change Services Page**
```bash
# File: src/app/services/page.tsx
```

### **4. Change Contact Page**
```bash
# File: src/app/contact/page.tsx
```

---

## ➕ How to Add New Pages

### **Method 1: Create New Page Folder**

#### **Example: Add a "Portfolio" Page**

1. **Create folder structure:**
```bash
src/app/portfolio/page.tsx
```

2. **Create the page file:**
```typescript
// src/app/portfolio/page.tsx
export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Our Portfolio</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add your portfolio items here */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Project 1</h3>
            <p className="text-gray-600">Description of project 1</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Project 2</h3>
            <p className="text-gray-600">Description of project 2</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

3. **Add navigation link:**
```typescript
// src/components/TopNavbar.tsx
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" }, // Add this line
  { name: "Contact", href: "/contact" },
];
```

### **Method 2: Add Sub-pages**

#### **Example: Add "Team" Page Under About**

1. **Create folder:**
```bash
src/app/about/team/page.tsx
```

2. **Create page:**
```typescript
// src/app/about/team/page.tsx
export default function Team() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Our Team</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-gray-600">Event Manager</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold">Jane Smith</h3>
            <p className="text-gray-600">Creative Director</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 🎨 Page Templates

### **Template 1: Simple Page**
```typescript
export default function NewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Page Title</h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700">Your page content here</p>
        </div>
      </div>
    </div>
  );
}
```

### **Template 2: Page with Sections**
```typescript
export default function NewPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Page Title</h1>
          <p className="text-xl">Page subtitle</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Section Title</h2>
            <p className="text-lg text-gray-700">Your content here</p>
          </div>
        </div>
      </section>
    </div>
  );
}
```

### **Template 3: Page with Cards**
```typescript
export default function NewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Page Title</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Card Title</h3>
            <p className="text-gray-600">Card content</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Card Title</h3>
            <p className="text-gray-600">Card content</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 🔗 Adding Navigation Links

### **Update Top Navigation**
```typescript
// src/components/TopNavbar.tsx
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" }, // New page
  { name: "Team", href: "/about/team" },     // New sub-page
  { name: "Contact", href: "/contact" },
];
```

### **Update Footer Links**
```typescript
// src/components/Footer.tsx
const footerLinks = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" }, // New page
  { name: "Contact", href: "/contact" },
];
```

---

## 📱 Page Settings & Metadata

### **Add Page Metadata**
```typescript
// src/app/portfolio/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio - SP Events',
  description: 'View our amazing event portfolio and past projects',
};

export default function Portfolio() {
  // Your page content
}
```

### **Add Page-specific Styling**
```typescript
// src/app/portfolio/page.tsx
export default function Portfolio() {
  return (
    <div className="portfolio-page">
      {/* Your content */}
    </div>
  );
}
```

---

## 🛠️ Common Page Modifications

### **1. Change Page Layout**
```typescript
// Add custom layout
export default function NewPage() {
  return (
    <div className="custom-layout">
      {/* Your content */}
    </div>
  );
}
```

### **2. Add Page-specific Components**
```typescript
// Import and use components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NewPage() {
  return (
    <div>
      <Card>
        <h1>Page Title</h1>
        <Button>Action Button</Button>
      </Card>
    </div>
  );
}
```

### **3. Add Page-specific Data**
```typescript
// Create data file
// src/lib/portfolio-data.ts
export const portfolioData = [
  {
    id: 1,
    title: "Wedding Event",
    description: "Beautiful wedding celebration",
    image: "https://example.com/image.jpg"
  }
];

// Use in page
import { portfolioData } from "@/lib/portfolio-data";

export default function Portfolio() {
  return (
    <div>
      {portfolioData.map(item => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 🚀 Deployment After Adding Pages

### **1. Test Locally**
```bash
npm run dev
# Visit: http://localhost:9002/your-new-page
```

### **2. Deploy Changes**
```bash
git add .
git commit -m "Add new portfolio page"
git push origin main
```

### **3. Check Live Site**
- Wait 2-5 minutes
- Visit your live website
- Check new page works

---

## 📋 Quick Checklist

### **When Adding New Pages:**
- [ ] Create folder structure: `src/app/page-name/page.tsx`
- [ ] Add page content
- [ ] Add navigation links
- [ ] Test locally: `npm run dev`
- [ ] Deploy: `git push origin main`
- [ ] Check live site

### **When Modifying Existing Pages:**
- [ ] Edit page file: `src/app/page-name/page.tsx`
- [ ] Test locally: `npm run dev`
- [ ] Deploy: `git push origin main`
- [ ] Check live site

---

## 🎯 Examples

### **Add a "Testimonials" Page:**
```bash
# Create: src/app/testimonials/page.tsx
```

### **Add a "Pricing" Page:**
```bash
# Create: src/app/pricing/page.tsx
```

### **Add a "Blog" Page:**
```bash
# Create: src/app/blog/page.tsx
```

---

**🎉 Now you can easily add new pages and modify existing ones!**

The key is: **Create folder → Add page.tsx → Update navigation → Deploy!**
