import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter, Playfair_Display } from 'next/font/google';
import { cn } from '@/lib/utils';
import CustomCursor from '@/components/CustomCursor';
import { defaultContent } from '@/lib/page-content';
import Footer from '@/components/Footer';
import WhatsAppProvider from '@/components/WhatsAppProvider';
import { AuthProvider } from '@/hooks/useAuth';
import ConditionalFooter from '@/components/ConditionalFooter';

export const metadata: Metadata = {
  title: 'SP Events',
  description: 'We Create Unforgettable Moments',
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = defaultContent;
  return (
    <html lang="en">
      <body className={cn(
          "font-body antialiased",
          inter.variable,
          playfairDisplay.variable
        )}>
          <AuthProvider>
            <WhatsAppProvider>
              <CustomCursor />
              <main>{children}</main>
              <ConditionalFooter content={content.footer}/>
              <Toaster />
            </WhatsAppProvider>
          </AuthProvider>
      </body>
    </html>
  );
}
