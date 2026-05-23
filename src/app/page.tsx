'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { CLINIC_PHONE_DISPLAY, CLINIC_PHONE_TEL, getDynamicWhatsAppLink } from '@/config/constants';

export default function Home() {
  const [introPlayed, setIntroPlayed] = useState(true);
  const [whatsAppLink, setWhatsAppLink] = useState(getDynamicWhatsAppLink());

  useEffect(() => {
    setWhatsAppLink(getDynamicWhatsAppLink());
  }, []);
  const announcements = [
    "Now Welcoming New Patients in Garki",
    "Pristine IPC Safety Standards",
    "Suite C108, Garki Mall, Abuja",
    `Direct WhatsApp: ${CLINIC_PHONE_DISPLAY}`
  ];
  const [activeAnnouncement, setActiveAnnouncement] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Smooth scroll animations trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <main className="bg-charcoal text-white min-h-screen overflow-x-hidden">
        {/* Sticky Header */}
        <Navbar />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 md:px-8 overflow-hidden bg-gradient-to-b from-charcoal via-olive-dark to-charcoal">
          {/* Custom Breathing Gradient Glow Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-1/4 -right-20 w-[450px] h-[450px] rounded-full bg-olive-light/10 blur-3xl animate-[pulse_8s_infinite]"></div>
            <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl animate-[pulse_12s_infinite_2s]"></div>
            <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-olive-deep/15 blur-3xl animate-pulse"></div>
          </div>

          <div className="max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Content Column */}
            <div className="md:col-span-7 space-y-8 text-left scroll-animate transition-all duration-1000 ease-out transform">

              <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-gold-warm overflow-hidden h-8 max-w-full">
                <span className="w-2 h-2 rounded-full bg-gold animate-ping shrink-0"></span>
                <div className="relative overflow-hidden h-5 w-52 sm:w-64 md:w-72">
                  <div
                    className="flex flex-col transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateY(-${activeAnnouncement * 1.25}rem)` }}
                  >
                    {announcements.map((text, idx) => (
                      <span key={idx} className="h-5 flex items-center shrink-0 truncate text-[10px] sm:text-xs tracking-wider">
                        {text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <h1 className="font-serif text-5xl md:text-7xl leading-tight text-white">
                Clinical Excellence <br />
                <span className="text-gold italic font-normal tracking-wide">With a Soul</span>
              </h1>
              <p className="text-gray-300 text-base md:text-lg max-w-xl leading-relaxed">
                Experience Abuja’s premier dental sanctuary. We combine cutting-edge clinical safety and digital diagnostics with a tranquil, empathetic approach to healing.
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/booking">
                  <button className="w-full sm:w-auto bg-gold hover:bg-gold-warm text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5 active:scale-95 text-sm tracking-wider uppercase cursor-pointer">
                    Book Appointment
                  </button>
                </Link>
                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-white/5 border border-white/15 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition-all text-sm tracking-wider uppercase active:scale-95 cursor-pointer"
                >
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 1.981 14.119.957 11.49.955 6.058.955 1.633 5.328 1.63 10.757c-.001 1.732.463 3.42 1.342 4.927l-.994 3.633 3.73-.974.349.208z" />
                  </svg>
                  WhatsApp Quick Chat
                </a>
              </div>

              {/* Minimal Credentials Row */}
              <div className="pt-8 border-t border-white/10 flex flex-wrap gap-x-8 gap-y-4 text-xs text-gray-400 font-medium">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  <span>MDCN Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  <span>Suite C108 Garki Mall</span>
                </div>
              </div>
            </div>            {/* Right Doctor Portrait Column */}
            <div className="md:col-span-5 flex justify-center relative scroll-animate transition-all duration-1000 ease-out delay-200 transform z-10">
              {/* Container with group */}
              <div className="relative w-80 h-[480px] group flex items-end">

                {/* 1. The Background Arch Frame (The "Portal") - WITH overflow-hidden */}
                {/* We make the bottom border flat and remove the bottom gold line so the suit blends perfectly into the base */}
                <div className="absolute inset-x-0 bottom-0 h-[440px] rounded-t-[160px] rounded-b-none bg-gradient-to-tr from-olive-dark via-olive-deep to-charcoal border-t-2 border-x-2 border-b-0 border-gold/30 shadow-2xl overflow-hidden group-hover:border-gold transition-colors duration-500 z-0">
                  {/* Abstract background grid or patterns inside the arch */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,169,98,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,169,98,0.05)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>

                  {/* Micro Arch Details inside - flat bottom to match the main frame */}
                  <div className="absolute top-2 left-2 right-2 bottom-0 rounded-t-[150px] rounded-b-none border-t border-x border-b-0 border-white/5 pointer-events-none z-20"></div>

                  {/* 1.a. BACK IMAGE LAYER: The Clipped Body (inside the overflow-hidden frame) */}
                  {/* Positioned at bottom-[-55px] to ensure the straight bottom edge of the suit never shows, even on hover */}
                  <img
                    src="/dr-oke.png"
                    alt="Dr. Emmanuel Oke Portrait - Body"
                    className="absolute bottom-[-55px] left-1/2 -translate-x-1/2 h-[560px] w-auto max-w-none object-cover pointer-events-none z-10 transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:-translate-y-3 origin-bottom"
                  />
                </div>

                {/* 2. FRONT IMAGE LAYER: The Pop-Out Head (outside the frame to overlap the top border) */}
                {/* We use clip-path to keep ONLY the head and neck (top 38%), so shoulders do not protrude out of the sides! */}
                {/* Sits at bottom-[-55px] to perfectly align and scale in sync with the back body layer */}
                <img
                  src="/dr-oke.png"
                  alt="Dr. Emmanuel Oke Portrait - Head Pop-out"
                  style={{ clipPath: 'inset(0 0 62% 0)' }}
                  className="absolute bottom-[-55px] left-1/2 -translate-x-1/2 h-[560px] w-auto max-w-none object-cover pointer-events-none z-10 transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:-translate-y-3 origin-bottom filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.7)]"
                />

                {/* 3. The Metadata Card (Placed at the bottom, on top of both layers) */}
                <div className="absolute bottom-4 left-4 right-4 text-center space-y-1 bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl p-4 z-20 shadow-lg group-hover:border-gold/50 transition-colors duration-500">
                  <h3 className="font-serif text-gold text-lg font-semibold tracking-wide">Dr. Emmanuel Oke</h3>
                  <p className="text-gray-300 text-xs font-semibold uppercase tracking-widest">Lead Dental Surgeon</p>
                  <p className="text-gray-400 text-[10px]">Oral Health & Implantology expert</p>
                </div>

                {/* Decorative side accent elements (outside the frame) */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border-r-2 border-b-2 border-gold/20 rounded-br-3xl pointer-events-none z-0"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 border-l-2 border-t-2 border-gold/20 rounded-tl-3xl pointer-events-none z-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Trust / Proof Strip */}
        <section className="bg-gold-warm/15 py-8 border-y border-gold/20">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-1">
                <p className="text-gold font-serif text-3xl font-semibold">Abuja</p>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Suite C108 Garki Mall</p>
              </div>
              <div className="space-y-1 border-l border-white/10">
                <p className="text-gold font-serif text-3xl font-semibold">Pristine</p>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">IPC Safety Standards</p>
              </div>
              <div className="space-y-1 border-l border-white/10">
                <p className="text-gold font-serif text-3xl font-semibold">5-Star</p>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Patient Ratings</p>
              </div>
              <div className="space-y-1 border-l border-white/10">
                <p className="text-gold font-serif text-3xl font-semibold">Direct</p>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">WhatsApp Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Signature Care / Hand-Shield Section */}
        <section id="safety" className="py-24 px-6 md:px-8 bg-olive-dark relative">
          <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 items-center">
            {/* Left Copy Column */}
            <div className="md:col-span-7 space-y-6 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out transform">
              <span className="text-gold text-xs font-bold uppercase tracking-widest">Clinical Fortress</span>
              <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
                Your Safety is Our <br />
                <span className="text-gold italic font-normal">Surgical Reverence</span>
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Our Infection Prevention and Control (IPC) protocols set a new baseline for dental safety in Abuja. We treat every single instrument with rigorous multi-stage sterilisation protocols that meet strict international standards, ensuring a sterile sanctuary for your peace of mind.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <div className="flex items-center space-x-3 bg-white/5 border border-white/10 rounded-2xl p-4 max-w-xs">
                  <div className="p-2 rounded-lg bg-gold/10 text-gold">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Full-Spectrum Autoclave</h4>
                    <p className="text-xs text-gray-400">Biological indicators validated daily</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 border border-white/10 rounded-2xl p-4 max-w-xs">
                  <div className="p-2 rounded-lg bg-gold/10 text-gold">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Prudent HEPA Filtration</h4>
                    <p className="text-xs text-gray-400">Continuous aerosol purification cycles</p>
                  </div>
                </div>
              </div>
            </div>            {/* Right Column: 3D Pop-out Dental Chair Arch Portal */}
            <div className="md:col-span-5 flex justify-center items-center min-h-[480px] relative scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-200 transform z-10">
              <div className="relative w-80 h-[480px] group flex items-end">

                {/* 1. The Background Arch Frame (The "Fortress Portal") */}
                <div className="absolute inset-x-0 bottom-0 h-[420px] rounded-t-[160px] rounded-b-none bg-gradient-to-tr from-charcoal via-olive-dark to-charcoal border-t-2 border-x-2 border-b-0 border-gold/30 shadow-2xl overflow-hidden group-hover:border-gold transition-colors duration-500 z-0">
                  {/* Subtle interior medical tech grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,169,98,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,169,98,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>

                  {/* Inner Accent Gold Ring */}
                  <div className="absolute top-2 left-2 right-2 bottom-0 rounded-t-[150px] rounded-b-none border-t border-x border-b-0 border-gold/10 pointer-events-none z-20"></div>

                  {/* 2. BACK IMAGE LAYER: The Clipped Chair Base */}
                  <img
                    src="/dental-chair.png"
                    alt="Pristine Sanctuary Dental Chair - Base"
                    className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 h-[410px] w-auto max-w-none object-cover pointer-events-none z-10 transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:-translate-y-2 origin-bottom"
                  />
                </div>

                {/* 3. FRONT IMAGE LAYER: The Pop-Out LED Surgical Light / Headrest */}
                <img
                  src="/dental-chair.png"
                  alt="Pristine Sanctuary Dental Chair - Pop-out LED Light"
                  style={{ clipPath: 'inset(0 0 65% 0)' }}
                  className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 h-[410px] w-auto max-w-none object-cover pointer-events-none z-10 transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:-translate-y-2 origin-bottom filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)]"
                />

                {/* 4. Glassmorphic Clinic Assurances Tag */}
                <div className="absolute bottom-6 left-6 right-6 text-center space-y-1 bg-black/75 backdrop-blur-md border border-white/10 rounded-2xl p-4 z-20 shadow-lg group-hover:border-gold/40 transition-colors duration-500">
                  <h3 className="font-serif text-gold text-sm font-semibold tracking-wide">Pristine Treatment Suite</h3>
                  <p className="text-gray-300 text-[10px] font-semibold uppercase tracking-widest">Sterile Sanctuary Lounge</p>
                </div>

                {/* Side Accents */}
                <div className="absolute -bottom-4 -right-4 w-16 h-16 border-r-2 border-b-2 border-gold/15 rounded-br-2xl pointer-events-none z-0"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 border-l-2 border-t-2 border-gold/15 rounded-tl-2xl pointer-events-none z-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Services Preview */}
        <section id="services" className="py-24 px-6 md:px-8 bg-cream text-charcoal relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out transform">
              <span className="text-gold text-xs font-bold uppercase tracking-widest">Our Procedures</span>
              <h2 className="font-serif text-4xl md:text-5xl text-olive-dark">Curated Treatments</h2>
              <p className="text-gray-600 text-sm md:text-base">
                State-of-the-art restorative, cosmetic, and orthodontic therapies, custom-tailored to your unique anatomy.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1: Restorative */}
              <div className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-md hover:bg-olive hover:text-white transition-all duration-500 cursor-pointer scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out transform flex flex-col justify-between">
                <div>
                  {/* Mini 3D Pop-out Portal */}
                  <div className="relative w-full h-44 mb-6 flex items-end justify-center overflow-visible">
                    {/* Background Arch Frame */}
                    <div className="absolute inset-x-0 bottom-0 h-36 rounded-t-[70px] bg-gradient-to-tr from-olive-light/5 via-olive-deep/10 to-charcoal/5 border-t border-x border-b-0 border-olive-dark/10 shadow-sm overflow-hidden group-hover:border-gold/40 group-hover:from-olive-dark/40 group-hover:via-olive-deep/40 group-hover:to-charcoal/30 transition-all duration-500 z-0">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,169,98,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,169,98,0.03)_1px,transparent_1px)] bg-[size:12px_12px]"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 group-hover:from-charcoal/60 transition-all duration-500"></div>

                      {/* Back Body Layer */}
                      <img
                        src="/restorative-care.png"
                        alt="Restorative Care - Base"
                        className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 h-32 w-auto max-w-none object-cover pointer-events-none z-10 transition-all duration-700 ease-out group-hover:scale-[1.08] group-hover:-translate-y-1.5 origin-bottom"
                      />
                    </div>

                    {/* Front Pop-out Layer */}
                    <img
                      src="/restorative-care.png"
                      alt="Restorative Care - Pop-out"
                      style={{ clipPath: 'inset(0 0 50% 0)' }}
                      className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 h-32 w-auto max-w-none object-cover pointer-events-none z-10 transition-all duration-700 ease-out group-hover:scale-[1.08] group-hover:-translate-y-1.5 origin-bottom filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_12px_16px_rgba(0,0,0,0.4)]"
                    />
                  </div>

                  <h3 className="font-serif text-2xl mb-4 text-olive-dark group-hover:text-gold transition-colors duration-300">Restorative Care</h3>
                  <p className="text-gray-500 group-hover:text-gray-300 text-sm leading-relaxed mb-6">
                    Advanced, biocompatible implants, bridges, and crown architectures engineered to return full clinical function and pristine, natural aesthetics.
                  </p>
                </div>
                <Link href="/services" className="inline-flex items-center text-gold text-xs font-bold tracking-widest uppercase hover:underline">
                  Explore Therapy <span className="ml-2">→</span>
                </Link>
              </div>

              {/* Card 2: Cosmetic */}
              <div className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-md hover:bg-olive hover:text-white transition-all duration-500 cursor-pointer scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-150 transform flex flex-col justify-between">
                <div>
                  {/* Mini 3D Pop-out Portal */}
                  <div className="relative w-full h-44 mb-6 flex items-end justify-center overflow-visible">
                    {/* Background Arch Frame */}
                    <div className="absolute inset-x-0 bottom-0 h-36 rounded-t-[70px] bg-gradient-to-tr from-olive-light/5 via-olive-deep/10 to-charcoal/5 border-t border-x border-b-0 border-olive-dark/10 shadow-sm overflow-hidden group-hover:border-gold/40 group-hover:from-olive-dark/40 group-hover:via-olive-deep/40 group-hover:to-charcoal/30 transition-all duration-500 z-0">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,169,98,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,169,98,0.03)_1px,transparent_1px)] bg-[size:12px_12px]"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 group-hover:from-charcoal/60 transition-all duration-500"></div>

                      {/* Back Body Layer */}
                      <img
                        src="/cosmetic-artistry.png"
                        alt="Cosmetic Artistry - Base"
                        className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 h-32 w-auto max-w-none object-cover pointer-events-none z-10 transition-all duration-700 ease-out group-hover:scale-[1.08] group-hover:-translate-y-1.5 origin-bottom"
                      />
                    </div>

                    {/* Front Pop-out Layer */}
                    <img
                      src="/cosmetic-artistry.png"
                      alt="Cosmetic Artistry - Pop-out"
                      style={{ clipPath: 'inset(0 0 50% 0)' }}
                      className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 h-32 w-auto max-w-none object-cover pointer-events-none z-10 transition-all duration-700 ease-out group-hover:scale-[1.08] group-hover:-translate-y-1.5 origin-bottom filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_12px_16px_rgba(0,0,0,0.4)]"
                    />
                  </div>

                  <h3 className="font-serif text-2xl mb-4 text-olive-dark group-hover:text-gold transition-colors duration-300">Cosmetic Artistry</h3>
                  <p className="text-gray-500 group-hover:text-gray-300 text-sm leading-relaxed mb-6">
                    Minimally invasive custom veneers and high-potency professional whitening systems designed to express your natural beauty rather than mask it.
                  </p>
                </div>
                <Link href="/services" className="inline-flex items-center text-gold text-xs font-bold tracking-widest uppercase hover:underline">
                  Explore Artistry <span className="ml-2">→</span>
                </Link>
              </div>

              {/* Card 3: Orthodontics */}
              <div className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-md hover:bg-olive hover:text-white transition-all duration-500 cursor-pointer scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-300 transform flex flex-col justify-between">
                <div>
                  {/* Mini 3D Pop-out Portal */}
                  <div className="relative w-full h-44 mb-6 flex items-end justify-center overflow-visible">
                    {/* Background Arch Frame */}
                    <div className="absolute inset-x-0 bottom-0 h-36 rounded-t-[70px] bg-gradient-to-tr from-olive-light/5 via-olive-deep/10 to-charcoal/5 border-t border-x border-b-0 border-olive-dark/10 shadow-sm overflow-hidden group-hover:border-gold/40 group-hover:from-olive-dark/40 group-hover:via-olive-deep/40 group-hover:to-charcoal/30 transition-all duration-500 z-0">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,169,98,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,169,98,0.03)_1px,transparent_1px)] bg-[size:12px_12px]"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 group-hover:from-charcoal/60 transition-all duration-500"></div>

                      {/* Back Body Layer */}
                      <img
                        src="/clear-orthodontics.png"
                        alt="Clear Orthodontics - Base"
                        className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 h-32 w-auto max-w-none object-cover pointer-events-none z-10 transition-all duration-700 ease-out group-hover:scale-[1.08] group-hover:-translate-y-1.5 origin-bottom"
                      />
                    </div>

                    {/* Front Pop-out Layer */}
                    <img
                      src="/clear-orthodontics.png"
                      alt="Clear Orthodontics - Pop-out"
                      style={{ clipPath: 'inset(0 0 50% 0)' }}
                      className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 h-32 w-auto max-w-none object-cover pointer-events-none z-10 transition-all duration-700 ease-out group-hover:scale-[1.08] group-hover:-translate-y-1.5 origin-bottom filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_12px_16px_rgba(0,0,0,0.4)]"
                    />
                  </div>

                  <h3 className="font-serif text-2xl mb-4 text-olive-dark group-hover:text-gold transition-colors duration-300">Clear Orthodontics</h3>
                  <p className="text-gray-500 group-hover:text-gray-300 text-sm leading-relaxed mb-6">
                    Discreet alignment systems including invisible medical-grade aligners for quiet, comfortable teeth correction that respects your lifestyle.
                  </p>
                </div>
                <Link href="/services" className="inline-flex items-center text-gold text-xs font-bold tracking-widest uppercase hover:underline">
                  Explore Alignment <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Doctor Story / About Section */}
        <section id="story" className="py-24 px-6 md:px-8 bg-cream text-charcoal border-t border-gray-100 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out transform">
            <span className="text-gold text-xs font-bold uppercase tracking-widest block">Our Philosophy</span>
            <h2 className="font-serif text-4xl md:text-5xl text-olive-dark leading-tight">
              Empathy Meets <br />
              <span className="text-gold italic font-normal">Surgical Accuracy</span>
            </h2>

            {/* Elegant Champagne Gold Pull-Quote */}
            <div className="relative py-8 px-6 md:px-12 border-y border-gold/20 my-8">
              <span className="absolute top-2 left-6 text-6xl text-gold/20 font-serif">“</span>
              <p className="font-serif italic text-olive-dark text-xl md:text-2xl leading-relaxed text-center max-w-2xl mx-auto">
                We don't just treat anatomy; we care for the human soul behind the smile.
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-gold mt-4">— Dr. Emmanuel Oke, Founder & Surgeon</p>
              <span className="absolute bottom-[-10px] right-6 text-6xl text-gold/20 font-serif">”</span>
            </div>

            <div className="text-gray-600 space-y-6 leading-relaxed max-w-3xl mx-auto text-sm md:text-base text-center">
              <p>
                At Olive Vine Dental Clinic, we believe that premium healthcare begins with listening. Every patient has a unique story, every smile a specific anatomy.
              </p>
              <p>
                Dr. Oke founded Olive Vine to challenge the sterile, assembly-line model of traditional dental clinics. Combining state-of-the-art imaging and minimally invasive surgical tools with a comforting, pastoral philosophy of holistic care, we have built a sanctuary for healing in Abuja.
              </p>
            </div>

            {/* Core Surgeon Highlights - Center Aligned Grid */}
            <div className="pt-8 grid md:grid-cols-2 gap-8 border-t border-gray-150 max-w-2xl mx-auto">
              <div className="space-y-2 text-center md:text-left md:border-r md:border-gray-150 md:pr-8">
                <h4 className="font-serif text-lg text-olive-dark font-semibold">Credentialed Care</h4>
                <p className="text-xs text-gray-500">Board-certified specialist with extensive postgraduate implant training.</p>
              </div>
              <div className="space-y-2 text-center md:text-left md:pl-4">
                <h4 className="font-serif text-lg text-olive-dark font-semibold">Abuja Connection</h4>
                <p className="text-xs text-gray-500">Proudly serving local families and professionals at Garki Mall.</p>
              </div>
            </div>

            <div className="pt-6">
              <Link href="/booking">
                <button className="bg-olive hover:bg-olive-dark text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-md active:scale-95 text-xs tracking-wider uppercase cursor-pointer">
                  Schedule with Dr. Oke
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 7: Patient Experience / Why Choose Us */}
        <section className="py-24 px-6 md:px-8 bg-charcoal text-white relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out transform">
              <span className="text-gold text-xs font-bold uppercase tracking-widest">The Sanctuary</span>
              <h2 className="font-serif text-4xl md:text-5xl text-white">Why Patients Trust Us</h2>
              <p className="text-gray-300 text-sm">
                We design every detail of your visit to eliminate clinical anxiety and guarantee safety.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Pillar 1: Spiritual Calm */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out transform">
                <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center text-gold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707" /></svg>
                </div>
                <h3 className="font-serif text-xl text-white font-semibold">Sanctuary Atmosphere</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Soft ambient soundscapes, calming warm aromatics, and a gentle environment explicitly styled to soothe nervous systems.
                </p>
              </div>

              {/* Pillar 2: Technical Precision */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-150 transform">
                <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center text-gold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547" /></svg>
                </div>
                <h3 className="font-serif text-xl text-white font-semibold">Digital Precision</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  State-of-the-art intraoral digital cameras and ultra-low dose digital radiographs to verify diagnosis with transparent accuracy.
                </p>
              </div>

              {/* Pillar 3: Empathetic Support */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-300 transform">
                <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center text-gold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <h3 className="font-serif text-xl text-white font-semibold">Constant WhatsApp Access</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Direct pathways to our team. Message us before, during, or after your visit for instant clarity and ongoing safety reassurances.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Testimonials */}
        <section className="py-24 px-6 md:px-8 bg-cream text-charcoal relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out transform">
              <span className="text-gold text-xs font-bold uppercase tracking-widest">Patient Voices</span>
              <h2 className="font-serif text-4xl md:text-5xl text-olive-dark">Abuja Smiling Confidently</h2>
              <p className="text-gray-600 text-sm">
                Stories of painless healing and restored aesthetics from patients who discovered Olive Vine.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md space-y-4 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out transform">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <h4 className="font-serif text-lg text-olive-dark font-semibold">"Absolutely Painless"</h4>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  "I was terrified of having an implant done, but Dr. Oke talked me through every single step. The environment at Garki Mall is incredibly serene, and the procedure was completely painless. Exceptional care."
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-bold text-olive-dark uppercase">Chinedu O.</p>
                  <p className="text-[10px] text-gray-400">Abuja Resident</p>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md space-y-4 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-150 transform">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <h4 className="font-serif text-lg text-olive-dark font-semibold">"A Sanctuary Indeed"</h4>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  "Most dental clinics feel sterile and scary. Olive Vine feels like a luxury spa. Beautiful music, soft aromas, and extremely kind doctors. My teeth cleaning was the most relaxing experience ever."
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-bold text-olive-dark uppercase">Fatima A.</p>
                  <p className="text-[10px] text-gray-400">Garki Abuja</p>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md space-y-4 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-300 transform">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <h4 className="font-serif text-lg text-olive-dark font-semibold">"Ultimate Precision"</h4>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  "I had my clear aligners done here and the digital mapping was incredible. I was able to see the full outcome before we even began. The precision is unmatched in Abuja. Strongly recommend!"
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-bold text-olive-dark uppercase">Dr. Ibrahim Y.</p>
                  <p className="text-[10px] text-gray-400">Clinical Client</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Booking Explainer */}
        <section className="py-24 px-6 md:px-8 bg-olive-dark text-white relative">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out transform">
              <span className="text-gold text-xs font-bold uppercase tracking-widest">Booking Pathway</span>
              <h2 className="font-serif text-4xl md:text-5xl text-white">Three Simple Steps to Safety</h2>
              <p className="text-gray-300 text-sm">
                Our reservation pathway is engineered to be completely transparent and stress-free.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 relative">
              {/* Timeline Connection Line */}
              <div className="hidden md:block absolute top-12 left-24 right-24 h-0.5 bg-gradient-to-r from-gold/30 via-gold/10 to-gold/30 z-0"></div>

              {/* Step 1 */}
              <div className="text-center space-y-4 z-10 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out transform">
                <div className="w-16 h-16 rounded-full bg-charcoal border border-gold/40 flex items-center justify-center font-serif text-xl text-gold mx-auto shadow-xl">
                  01
                </div>
                <h3 className="font-serif text-xl text-white font-semibold">Select Procedure</h3>
                <p className="text-gray-400 text-xs md:text-sm max-w-xs mx-auto">
                  Pick restorative, cosmetic, or basic checkup care pathways from our secure booking dashboard.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center space-y-4 z-10 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-150 transform">
                <div className="w-16 h-16 rounded-full bg-charcoal border border-gold/40 flex items-center justify-center font-serif text-xl text-gold mx-auto shadow-xl">
                  02
                </div>
                <h3 className="font-serif text-xl text-white font-semibold">Choose Your Slot</h3>
                <p className="text-gray-400 text-xs md:text-sm max-w-xs mx-auto">
                  Reserve exact dates and times. Blocked times (Sundays, late Wednesdays) are clearly mapped.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center space-y-4 z-10 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-300 transform">
                <div className="w-16 h-16 rounded-full bg-charcoal border border-gold/40 flex items-center justify-center font-serif text-xl text-gold mx-auto shadow-xl">
                  03
                </div>
                <h3 className="font-serif text-xl text-white font-semibold">Confirm Instantly</h3>
                <p className="text-gray-400 text-xs md:text-sm max-w-xs mx-auto">
                  Receive secure SMS and WhatsApp confirmation alerts with direct clinic maps and details.
                </p>
              </div>
            </div>

            <div className="text-center pt-8 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out transform">
              <Link href="/booking">
                <button className="bg-gold hover:bg-gold-warm text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg active:scale-95 text-sm tracking-wider uppercase cursor-pointer">
                  Open Booking Dashboard
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 10: Location + Contact */}
        <section id="location" className="py-24 px-6 md:px-8 bg-cream text-charcoal border-t border-gray-100 relative">
          <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 items-center">
            {/* Left Column: Contact Cards */}
            <div className="md:col-span-6 space-y-8 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out transform">
              <div className="space-y-2">
                <span className="text-gold text-xs font-bold uppercase tracking-widest">Connect With Us</span>
                <h2 className="font-serif text-4xl md:text-5xl text-olive-dark">Suite C108 Garki Mall</h2>
                <p className="text-gray-600 text-sm">
                  Find us opposite the Garki International Market, Garki Area 11, Abuja.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2 p-6 rounded-2xl bg-white border border-gray-100 shadow-md">
                  <span className="text-xs text-gold uppercase tracking-widest font-bold">Contact</span>
                  <p className="font-serif text-lg text-olive-dark font-semibold">{CLINIC_PHONE_DISPLAY}</p>
                  <p className="text-xs text-gray-400">Call for immediate support</p>
                </div>
                <div className="space-y-2 p-6 rounded-2xl bg-white border border-gray-100 shadow-md">
                  <span className="text-xs text-gold uppercase tracking-widest font-bold">Clinic Hours</span>
                  <p className="font-serif text-lg text-olive-dark font-semibold">Mon - Fri: 9AM - 5PM</p>
                  <p className="text-xs text-gray-400">Saturday: 10AM - 3PM | Sun: Closed</p>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all inline-flex items-center text-xs tracking-wider uppercase active:scale-95 shadow-md"
                >
                  Message WhatsApp
                </a>
                <a
                  href={`tel:${CLINIC_PHONE_TEL}`}
                  className="bg-transparent border border-olive text-olive hover:bg-olive hover:text-white px-6 py-3 rounded-full font-semibold transition-all inline-flex items-center text-xs tracking-wider uppercase active:scale-95"
                >
                  Call Clinic
                </a>
              </div>
            </div>
            {/* Right Column: Embedded Google Map */}
            <div className="md:col-span-6 flex justify-center h-96 relative scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-200 transform">
              <div className="w-full h-full rounded-3xl border border-gray-200 shadow-2xl overflow-hidden relative group bg-charcoal">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.3957245952873!2d7.481512411226066!3d9.027623990998906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0bc41d2f78df%3A0xc3ab0be218c50e2!2sGarki%20Mall!5e0!3m2!1sen!2sng!4v1716393222384!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter invert-[0.9] hue-rotate-[180deg] saturate-[0.5] contrast-[1.2] hover:filter-none transition-all duration-700"
                ></iframe>
                {/* Floating badge inside map */}
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <span className="text-[10px] font-bold tracking-widest text-gold uppercase bg-charcoal/90 border border-gold/20 px-3 py-1.5 rounded-full shadow-lg">Garki Mall Location</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 11: Final CTA */}
        <section className="relative py-24 px-6 md:px-8 bg-gradient-to-b from-charcoal via-olive-deep to-olive-dark text-white text-center overflow-hidden border-t border-gold/15">
          {/* Animated Marquee Accent in Background */}
          <div className="absolute inset-x-0 top-10 pointer-events-none opacity-5 select-none z-0">
            <p className="font-serif text-9xl font-bold tracking-widest text-gold whitespace-nowrap animate-[marquee_20s_linear_infinite]">
              PRECISION • SAFETY • EMPATHY • REVERENCE • CARE • COMFORT • EXCELLENCE
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 relative z-10 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out transform">
            <span className="text-gold text-xs font-bold uppercase tracking-widest">Sanctuary Awaits</span>
            <h2 className="font-serif text-5xl md:text-7xl leading-tight">
              Experience Dentistry <br />
              <span className="text-gold italic font-normal tracking-wide">Elevated</span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Step out of anxiety and into complete safety. Join Dr. Oke at Abuja’s premier dental sanctuary for healing and aesthetics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/booking">
                <button className="w-full sm:w-auto bg-gold hover:bg-gold-warm text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg active:scale-95 text-sm tracking-wider uppercase cursor-pointer">
                  Book Your Sanctuary Visit
                </button>
              </Link>
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 text-white px-10 py-4 rounded-full font-bold transition-all text-sm tracking-wider uppercase active:scale-95 cursor-pointer"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Section 12: Footer */}
        <footer className="bg-charcoal border-t border-white/10 py-16 px-6 md:px-8 text-xs text-gray-500 relative z-10">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <p className="font-serif text-white text-lg font-bold tracking-wider">OLIVE VINE</p>
              <p className="text-gray-400 leading-relaxed">
                Abuja’s premier dental sanctuary combining absolute safety protocols with empathetic, soul-centered healing.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-white font-bold uppercase tracking-wider text-xs">Sanctuary Links</p>
              <div className="flex flex-col space-y-2 font-semibold">
                <Link href="#story" className="hover:text-gold transition-colors">Our Story</Link>
                <Link href="#services" className="hover:text-gold transition-colors">Curated Services</Link>
                <Link href="#location" className="hover:text-gold transition-colors">Abuja Location</Link>
                <Link href="/booking" className="hover:text-gold transition-colors">Contact Pathway</Link>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-white font-bold uppercase tracking-wider text-xs">Abuja Location</p>
              <div className="space-y-1 leading-relaxed text-gray-400">
                <p>Suite C108, Garki Mall</p>
                <p>Opp. Garki International Market</p>
                <p>Garki Area 11, Abuja, Nigeria</p>
                <p className="pt-2">{CLINIC_PHONE_DISPLAY}</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-white font-bold uppercase tracking-wider text-xs">Absolute Safety</p>
              <p className="text-gray-400 leading-relaxed">
                Our Infection Prevention and Control (IPC) protocols exceed international sterilisation standards.
              </p>
              <div className="flex items-center space-x-2 text-gold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <span className="font-bold uppercase tracking-wider text-[10px]">MDCN Certified Protocol</span>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 font-bold uppercase tracking-wider">
            <p>© {new Date().getFullYear()} Olive Vine Dental Clinic. All Rights Reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
              <span className="text-white/10">|</span>
              <span>Garki Mall, Abuja</span>
            </div>
          </div>
        </footer>

        {/* Global Floating WhatsApp Badges */}
        <a
          href={whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:-translate-y-1 active:scale-95 transition-all duration-300 group cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 1.981 14.119.957 11.49.955 6.058.955 1.633 5.328 1.63 10.757c-.001 1.732.463 3.42 1.342 4.927l-.994 3.633 3.73-.974.349.208z" />
          </svg>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-out font-bold text-xs uppercase tracking-wider whitespace-nowrap">
            WhatsApp Help
          </span>
        </a>
      </main>
    </>
  );
}
