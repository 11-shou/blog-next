'use client';

import Footer from './Footer';
import Navbar from './Navbar';
import { ColorModeProvider } from '@/contexts/ColorModeContext';

export default function Layout({ children }) {
  return (
    <ColorModeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </div>
    </ColorModeProvider>
  );
} 