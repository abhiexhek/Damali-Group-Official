/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeProvider } from './providers/ThemeProvider';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Brands } from './components/sections/Brands';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';

function MainLayout() {
  return (
    <div className="min-h-screen transition-colors duration-500">
      {/* Sticky navigation and theme picker */}
      <Navbar />
      
      {/* Visual content sections */}
      <main>
        <Hero />
        <About />
        <Brands />
        <WhyChooseUs />
        <Contact />
      </main>

      {/* Corporate footer maps links */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}
