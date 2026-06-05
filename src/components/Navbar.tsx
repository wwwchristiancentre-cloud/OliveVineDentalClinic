'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getDynamicWhatsAppLink } from '@/config/constants';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const whatsAppLink = getDynamicWhatsAppLink();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomepage
          ? 'py-4 bg-charcoal/85 backdrop-blur-md border-b border-white/10 shadow-lg'
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="font-serif text-xl md:text-2xl font-bold tracking-wider text-white hover:text-gold transition-colors">
          THE OLIVE VINE DENTAL CLINIC
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-xs font-semibold tracking-widest uppercase">
          <Link href="/#story" className="text-gray-300 hover:text-gold transition-colors">
            Our Story
          </Link>
          <Link href="/#services" className="text-gray-300 hover:text-gold transition-colors">
            Services
          </Link>
          <Link href="/#location" className="text-gray-300 hover:text-gold transition-colors">
            Location
          </Link>
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-green-400 hover:text-green-300 transition-colors"
          >
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse mr-2"></span>
            WhatsApp
          </a>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            href="/booking"
            className="relative inline-flex overflow-hidden bg-white text-olive px-6 py-2.5 rounded-full font-bold hover:bg-gold hover:text-white transition-all text-xs tracking-wider uppercase shadow-md active:scale-95 duration-150 cursor-pointer"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-charcoal/95 border-b border-white/10 px-6 py-6 space-y-6 absolute top-full left-0 right-0 shadow-xl transition-all duration-300">
          <div className="flex flex-col space-y-4 text-sm font-semibold tracking-widest uppercase">
            <Link
              href="/#story"
              className="text-gray-300 hover:text-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Story
            </Link>
            <Link
              href="/#services"
              className="text-gray-300 hover:text-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/#location"
              className="text-gray-300 hover:text-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Location
            </Link>
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-green-400 hover:text-green-300 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse mr-2"></span>
              WhatsApp Help
            </a>
          </div>
          <Link
            href="/booking"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full bg-gold text-white py-3 rounded-full font-bold hover:bg-gold-warm transition-all text-sm tracking-widest uppercase shadow-lg cursor-pointer text-center"
          >
            Book Appointment
          </Link>
        </div>
      )}
    </nav>
  );
}
