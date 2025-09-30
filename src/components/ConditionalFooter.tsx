"use client";

import { usePathname } from 'next/navigation';
import Footer from './Footer';

interface ConditionalFooterProps {
  content: any;
}

export default function ConditionalFooter({ content }: ConditionalFooterProps) {
  const pathname = usePathname();
  
  // Don't show footer on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }
  
  return <Footer content={content} />;
}

