# 🎨 Animation Quick Reference Guide

## Import Animations

```tsx
import { motion } from 'framer-motion';
import { 
  fadeInUp, 
  fadeInDown, 
  fadeInLeft, 
  fadeInRight,
  scaleIn,
  staggerContainer,
  staggerItem 
} from '@/lib/animations';
```

## Common Animation Patterns

### 1. Fade In on Scroll
```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={fadeInUp}
>
  Your content
</motion.div>
```

### 2. Hover Scale Effect
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

### 3. Staggered Children
```tsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {items.map(item => (
    <motion.div key={item.id} variants={staggerItem}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### 4. Icon Rotation on Hover
```tsx
<motion.div
  whileHover={{ scale: 1.2, rotate: 360 }}
  transition={{ duration: 0.5 }}
>
  <Icon />
</motion.div>
```

### 5. Lift Effect on Hover
```tsx
<motion.div
  whileHover={{ y: -10 }}
  transition={{ duration: 0.3 }}
>
  Card content
</motion.div>
```

### 6. Image Zoom on Hover
```tsx
<div className="overflow-hidden">
  <motion.img
    whileHover={{ scale: 1.1 }}
    transition={{ duration: 0.5 }}
    src="image.jpg"
  />
</div>
```

### 7. Slide In from Left/Right
```tsx
// From Left
<motion.div variants={fadeInLeft}>Content</motion.div>

// From Right
<motion.div variants={fadeInRight}>Content</motion.div>
```

### 8. Loading Shimmer
```tsx
import { Shimmer, ShimmerCard } from '@/components/ui/shimmer';

{loading ? (
  <ShimmerCard />
) : (
  <ActualContent />
)}
```

### 9. Form Input Animation
```tsx
<motion.div variants={staggerItem}>
  <Input 
    className="focus:scale-105 transition-all duration-300"
    placeholder="Enter text"
  />
</motion.div>
```

### 10. Button with Glow
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  className="shadow-lg hover:shadow-2xl transition-shadow duration-300"
>
  Click me
</motion.button>
```

## Tailwind Animation Classes

```tsx
// Fade in
<div className="animate-fade-in">Content</div>

// Shimmer effect
<div className="animate-shimmer">Loading...</div>

// Slide in from left
<div className="animate-slide-in-left">Content</div>

// Slide in from right
<div className="animate-slide-in-right">Content</div>

// Scale in
<div className="animate-scale-in">Content</div>

// Float effect
<div className="animate-float">Floating</div>

// Glow effect
<div className="animate-glow">Glowing</div>
```

## Animation Timing

```tsx
// Fast
transition={{ duration: 0.3 }}

// Normal
transition={{ duration: 0.5 }}

// Slow
transition={{ duration: 0.7 }}

// With delay
transition={{ duration: 0.5, delay: 0.2 }}

// Spring animation
transition={{ type: "spring", stiffness: 260, damping: 20 }}
```

## Viewport Options

```tsx
// Trigger once when scrolling into view
viewport={{ once: true, amount: 0.3 }}

// Trigger every time
viewport={{ once: false, amount: 0.3 }}

// Trigger when 50% visible
viewport={{ once: true, amount: 0.5 }}
```

## Common Combinations

### Card with Multiple Effects
```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeInUp}
  whileHover={{ y: -10, scale: 1.02 }}
  className="shadow-lg hover:shadow-2xl transition-shadow duration-300"
>
  Card content
</motion.div>
```

### Button with Full Feedback
```tsx
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  className="btn-primary shadow-lg hover:shadow-2xl transition-all duration-300"
>
  Click me
</motion.button>
```

### Gallery Item
```tsx
<motion.div
  variants={staggerItem}
  whileHover={{ y: -10 }}
>
  <motion.div
    whileHover={{ scale: 1.1, rotate: 2 }}
    transition={{ duration: 0.5 }}
    className="overflow-hidden rounded-lg"
  >
    <Image src="..." />
  </motion.div>
</motion.div>
```

## Tips

1. **Keep it subtle** - Don't overdo animations
2. **Use once: true** - For better performance on scroll
3. **Combine effects** - Scale + shadow for depth
4. **Test on mobile** - Ensure touch interactions work
5. **Use GPU-accelerated properties** - transform, opacity
6. **Avoid animating** - width, height, top, left (use transform instead)

## Performance Best Practices

```tsx
// ✅ Good - Uses transform
<motion.div whileHover={{ scale: 1.1, y: -10 }} />

// ❌ Avoid - Animates layout properties
<motion.div whileHover={{ width: 200, marginTop: -10 }} />

// ✅ Good - Viewport once
viewport={{ once: true }}

// ❌ Avoid - Animates every scroll
viewport={{ once: false }}
```

## Accessibility

```tsx
// Respect user preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

<motion.div
  animate={prefersReducedMotion.matches ? {} : { scale: 1.1 }}
>
  Content
</motion.div>
```

---

**Quick Tip**: Start with simple animations and build up. Test on different devices to ensure smooth performance!
