'use client';

import { useState, useEffect } from 'react';

export default function WhatsAppPrompt() {
  const [targetUrl, setTargetUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7); // 7-second countdown

  const redirectToWhatsApp = (url: string) => {
    window.location.assign(url);
  };

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Find closest anchor tag clicked
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      // Intercept any click pointing to wa.me WhatsApp redirection links
      if (href && href.startsWith('https://wa.me')) {
        e.preventDefault();
        setTargetUrl(href);
        setTimeLeft(7);
        setIsOpen(true);
      }
    };

    const handleCustomTrigger = (e: Event) => {
      const customEvent = e as CustomEvent;
      const url = customEvent.detail?.url;
      if (url) {
        setTargetUrl(url);
        setTimeLeft(7);
        setIsOpen(true);
      }
    };

    window.addEventListener('click', handleGlobalClick);
    window.addEventListener('triggerWhatsAppPrompt', handleCustomTrigger);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('triggerWhatsAppPrompt', handleCustomTrigger);
    };
  }, []);

  useEffect(() => {
    if (!isOpen || !targetUrl) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (targetUrl) {
            setIsOpen(false);
            setTargetUrl(null);
            redirectToWhatsApp(targetUrl);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, targetUrl]);

  const handleContinue = () => {
    if (targetUrl) {
      setIsOpen(false);
      setTargetUrl(null);
      redirectToWhatsApp(targetUrl);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTargetUrl(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-sm transition-all duration-300 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white border border-gold/20 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative overflow-hidden text-center space-y-6 transform scale-100 transition-all">
        
        {/* Soft gold telephone icon */}
        <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto border border-gold/30 relative">
          <div className="absolute inset-0 rounded-full border border-gold/20 animate-ping opacity-60"></div>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>

        <div className="space-y-2">
          <span className="text-gold text-[10px] uppercase font-bold tracking-widest block">Direct Support Prompt</span>
          <h3 className="font-serif text-xl text-olive-dark font-semibold">Sanctuary Support Gateway</h3>
        </div>

        <div className="p-4 bg-cream/40 border border-olive/5 rounded-2xl">
          <p className="text-olive-dark text-sm leading-relaxed font-serif italic">
            We&apos;ll open WhatsApp shortly. If the message doesn&apos;t go through, feel free to call the clinic.
          </p>
        </div>

        {/* Dynamic Countdown Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-gray-150 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-gold h-full transition-all duration-1000 ease-linear"
              style={{ width: `${(timeLeft / 7) * 100}%` }}
            />
          </div>
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block animate-pulse">
            Continuing to WhatsApp in {timeLeft}s
          </span>
        </div>

        {/* Action CTAs */}
        <div className="space-y-2 pt-2">
          <button 
            onClick={handleContinue}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-full font-bold transition-all text-xs tracking-wider uppercase active:scale-95 shadow-md shadow-green-500/20 cursor-pointer"
          >
            Continue
          </button>
          <button 
            onClick={handleClose}
            className="w-full bg-transparent hover:bg-gray-50 border border-gray-250 text-gray-400 hover:text-gray-600 py-3 rounded-full font-bold transition-all text-xs tracking-wider uppercase active:scale-95 cursor-pointer"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
