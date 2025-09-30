# 🔄 Simple Editing Workflow

## 📋 Step-by-Step Process

### **1. Make Changes Locally**
```
Your Computer → Edit Files → Test Locally
```

### **2. Deploy Changes**
```
GitHub → Hosting Platform → Live Website
```

---

## 🎯 Quick Reference

### **To Edit Website Content:**
1. **Open**: `src/lib/website-content.ts`
2. **Edit**: Text, titles, descriptions
3. **Test**: `npm run dev`
4. **Deploy**: `git push origin main`

### **To Edit WhatsApp Settings:**
1. **Option 1**: Go to `/admin/whatsapp` (admin panel)
2. **Option 2**: Edit `src/hooks/useWhatsAppSettings.ts`
3. **Test**: `npm run dev`
4. **Deploy**: `git push origin main`

### **To Edit Logo:**
1. **Option 1**: Go to `/admin/logos` (admin panel)
2. **Option 2**: Edit `src/hooks/useLogoData.ts`
3. **Test**: `npm run dev`
4. **Deploy**: `git push origin main`

### **To Edit Gallery Images:**
1. **Open**: `src/lib/media.ts`
2. **Edit**: Image URLs, titles
3. **Test**: `npm run dev`
4. **Deploy**: `git push origin main`

---

## 🚀 Deployment Commands

### **Windows:**
```bash
update.bat dev      # Test locally
update.bat deploy   # Deploy changes
```

### **Mac/Linux:**
```bash
./update.sh dev      # Test locally
./update.sh deploy   # Deploy changes
```

### **Manual:**
```bash
npm run dev          # Test locally
npm run build        # Test build
git add .            # Add changes
git commit -m "Update"  # Commit changes
git push origin main # Deploy
```

---

## 📁 File Locations

```
src/
├── lib/
│   ├── website-content.ts    # Main website content
│   ├── welcome-data.ts       # Welcome page
│   ├── media.ts             # Gallery images
│   └── hero-images.json     # Hero images
├── hooks/
│   ├── useWhatsAppSettings.ts # WhatsApp settings
│   └── useLogoData.ts        # Logo settings
├── components/
│   ├── Hero.tsx             # Hero section
│   ├── Services.tsx         # Services section
│   └── Footer.tsx           # Footer
└── app/
    ├── page.tsx             # Homepage
    ├── about/page.tsx       # About page
    └── contact/page.tsx     # Contact page
```

---

## ⚡ Quick Tips

1. **Always test locally first**: `npm run dev`
2. **Use admin panel** for easy changes
3. **Check build before deploying**: `npm run build`
4. **Wait 2-5 minutes** for deployment
5. **Clear browser cache** if changes don't show

---

## 🆘 Common Issues

### **Changes Not Showing?**
- Clear browser cache (Ctrl+F5)
- Wait for deployment to complete
- Check hosting dashboard

### **Build Errors?**
- Fix errors locally first
- Check file syntax
- Test with `npm run build`

### **Images Not Loading?**
- Check image URLs
- Use HTTPS URLs
- Ensure images are public

---

**Remember: Edit Locally → Test → Deploy → Live Website Updates! 🎉**



