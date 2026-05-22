'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

type Procedure = {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
};

const PROCEDURES: Procedure[] = [
  {
    id: 'restorative',
    name: 'Restorative Care Consultation',
    duration: '45 mins',
    price: 'Complimentary Initial',
    description: 'Implant, bridge, or crown restoration assessment with high-resolution digital intraoral diagnostics.',
  },
  {
    id: 'cosmetic',
    name: 'Cosmetic Artistry & Whitening',
    duration: '30 mins',
    price: 'Pristine Assessment',
    description: 'Custom porcelain veneers, smile alignment mapping, or premium clinical whitening consultation.',
  },
  {
    id: 'orthodontics',
    name: 'Clear Orthodontic Alignment',
    duration: '30 mins',
    price: 'Digital Setup',
    description: '3D scanning and custom digital tracking for discreet medical-grade invisible aligners.',
  },
  {
    id: 'cleaning',
    name: 'Comfort Cleaning & Wellness',
    duration: '60 mins',
    price: 'Premium Therapy',
    description: 'Rigorous multi-stage prophylaxis, scaling, and complete oral wellness hygiene therapy.',
  },
];

const AVAILABLE_TIMES = [
  { time: '09:00 AM', status: 'available' },
  { time: '10:00 AM', status: 'available' },
  { time: '11:30 AM', status: 'available' },
  { time: '01:00 PM', status: 'available' },
  { time: '02:30 PM', status: 'available' },
  { time: '04:00 PM', status: 'limited' }, // Wednesday cut-off / general end
];

export default function Booking() {
  const [selectedProcedure, setSelectedProcedure] = useState<string>('restorative');
  const [selectedDate, setSelectedDate] = useState<number>(25); // Default to a valid day in May 2026
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentMonth, setCurrentMonth] = useState('May 2026');

  const selectedProcedureDetails = PROCEDURES.find((p) => p.id === selectedProcedure);

  // Generate calendar days for May 2026
  // May 1st 2026 is a Friday. Total days: 31
  const calendarDays = [
    { day: 27, isCurrentMonth: false, isSunday: false },
    { day: 28, isCurrentMonth: false, isSunday: false },
    { day: 29, isCurrentMonth: false, isSunday: false },
    { day: 30, isCurrentMonth: false, isSunday: false },
    { day: 1, isCurrentMonth: true, isSunday: false },
    { day: 2, isCurrentMonth: true, isSunday: false },
    { day: 3, isCurrentMonth: true, isSunday: true }, // Sunday
    { day: 4, isCurrentMonth: true, isSunday: false },
    { day: 5, isCurrentMonth: true, isSunday: false },
    { day: 6, isCurrentMonth: true, isSunday: false },
    { day: 7, isCurrentMonth: true, isSunday: false },
    { day: 8, isCurrentMonth: true, isSunday: false },
    { day: 9, isCurrentMonth: true, isSunday: false },
    { day: 10, isCurrentMonth: true, isSunday: true }, // Sunday
    { day: 11, isCurrentMonth: true, isSunday: false },
    { day: 12, isCurrentMonth: true, isSunday: false },
    { day: 13, isCurrentMonth: true, isSunday: false },
    { day: 14, isCurrentMonth: true, isSunday: false },
    { day: 15, isCurrentMonth: true, isSunday: false },
    { day: 16, isCurrentMonth: true, isSunday: false },
    { day: 17, isCurrentMonth: true, isSunday: true }, // Sunday
    { day: 18, isCurrentMonth: true, isSunday: false },
    { day: 19, isCurrentMonth: true, isSunday: false },
    { day: 20, isCurrentMonth: true, isSunday: false },
    { day: 21, isCurrentMonth: true, isSunday: false },
    { day: 22, isCurrentMonth: true, isSunday: false },
    { day: 23, isCurrentMonth: true, isSunday: false },
    { day: 24, isCurrentMonth: true, isSunday: true }, // Sunday
    { day: 25, isCurrentMonth: true, isSunday: false },
    { day: 26, isCurrentMonth: true, isSunday: false },
    { day: 27, isCurrentMonth: true, isSunday: false },
    { day: 28, isCurrentMonth: true, isSunday: false },
    { day: 29, isCurrentMonth: true, isSunday: false },
    { day: 30, isCurrentMonth: true, isSunday: false },
    { day: 31, isCurrentMonth: true, isSunday: true }, // Sunday
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) {
      alert('Please provide your name and contact number.');
      return;
    }
    setIsSubmitted(true);
  };

  const getWhatsAppLink = () => {
    const text = `Hello Olive Vine Dental Clinic, I would like to book a sanctuary visit for:\n\n` +
      `• Procedure: ${selectedProcedureDetails?.name}\n` +
      `• Date: May ${selectedDate}, 2026\n` +
      `• Time: ${selectedTime}\n` +
      `• Patient Name: ${patientName || '(Pending)'}\n` +
      `• Contact: ${patientPhone || '(Pending)'}\n\n` +
      `Please confirm my reserved slot opposite Garki International Market.`;
    return `https://wa.me/2347032299287?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      <main className="bg-cream text-charcoal min-h-screen pt-28 pb-20 px-4 md:px-8 relative overflow-x-hidden selection:bg-gold/25">
        {/* Sticky floating Navbar */}
        <Navbar />

        {/* Dynamic Breathing Gradient Accent in background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-olive/5 blur-3xl pointer-events-none z-0"></div>
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] rounded-full bg-gold/5 blur-3xl pointer-events-none z-0"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Back button and page title */}
          <div className="space-y-4 mb-10">
            <Link href="/" className="inline-flex items-center text-xs font-bold tracking-widest text-olive hover:text-gold uppercase transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-gold text-xs font-bold uppercase tracking-widest block">Pathway to Comfort</span>
                <h1 className="font-serif text-4xl md:text-5xl text-olive-dark">Schedule Your Sanctuary Visit</h1>
              </div>
              <p className="text-gray-500 text-sm max-w-sm">
                Reserve your tailored dental therapy with Dr. Oke inside our state-of-the-art sterile clinic at Garki Mall, Abuja.
              </p>
            </div>
          </div>

          {!isSubmitted ? (
            <div className="grid md:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Flow Steps Form */}
              <form onSubmit={handleBookingSubmit} className="md:col-span-8 space-y-8 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xl">
                
                {/* Step 1: Care Pathway */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-olive text-white flex items-center justify-center text-xs font-serif">1</span>
                    <h2 className="font-serif text-lg md:text-xl text-olive-dark font-semibold">Select Curated Procedure</h2>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {PROCEDURES.map((proc) => (
                      <label
                        key={proc.id}
                        onClick={() => setSelectedProcedure(proc.id)}
                        className={`block p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative overflow-hidden group select-none ${
                          selectedProcedure === proc.id
                            ? 'border-gold bg-olive/5 shadow-md shadow-gold/5'
                            : 'border-gray-100 bg-white hover:border-olive/30'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={`font-serif text-sm font-bold transition-colors ${selectedProcedure === proc.id ? 'text-olive' : 'text-gray-800'}`}>
                            {proc.name}
                          </h3>
                          <input
                            type="radio"
                            name="procedure"
                            value={proc.id}
                            checked={selectedProcedure === proc.id}
                            onChange={() => {}}
                            className="text-gold focus:ring-gold border-gray-300 h-4 w-4"
                          />
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed mb-4">{proc.description}</p>
                        <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider text-gray-400">
                          <span>{proc.duration}</span>
                          <span className="text-gold">{proc.price}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Step 2: Date & Time Picker */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-olive text-white flex items-center justify-center text-xs font-serif">2</span>
                    <h2 className="font-serif text-lg md:text-xl text-olive-dark font-semibold">Reserve Your Slot</h2>
                  </div>

                  <div className="grid sm:grid-cols-12 gap-6">
                    {/* Calendar visualizer */}
                    <div className="sm:col-span-7 bg-gray-50/50 border border-gray-100 rounded-2xl p-5">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-olive-dark">{currentMonth}</h3>
                        <div className="flex space-x-1">
                          <button type="button" className="p-1 rounded bg-white border border-gray-200 text-xs text-gray-400 hover:text-olive">←</button>
                          <button type="button" className="p-1 rounded bg-white border border-gray-200 text-xs text-gray-400 hover:text-olive">→</button>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span className="text-red-400/80">Sun</span>
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((item, idx) => {
                          const isSelected = selectedDate === item.day && item.isCurrentMonth;
                          const isDisabled = !item.isCurrentMonth || item.isSunday;

                          return (
                            <button
                              key={idx}
                              type="button"
                              disabled={isDisabled}
                              onClick={() => setSelectedDate(item.day)}
                              className={`h-9 w-full rounded-xl text-xs font-bold transition-all relative flex items-center justify-center ${
                                isSelected
                                  ? 'bg-gold text-white shadow-md shadow-gold/25'
                                  : isDisabled
                                  ? 'text-gray-300 bg-transparent cursor-not-allowed'
                                  : 'bg-white border border-gray-100 text-gray-700 hover:border-olive hover:text-olive'
                              }`}
                            >
                              {item.day}
                              {item.isSunday && (
                                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-red-400"></span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between text-[10px] text-gray-400 font-medium">
                        <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-gold mr-1.5"></span> Selected Slot</span>
                        <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-400 mr-1.5"></span> Closed (Sundays)</span>
                        <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-gray-200 mr-1.5"></span> Unavailable</span>
                      </div>
                    </div>

                    {/* Time slots */}
                    <div className="sm:col-span-5 flex flex-col justify-between">
                      <div className="space-y-4">
                        <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-olive-dark">Available Times</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {AVAILABLE_TIMES.map((slot) => {
                            // Wed cut-off is 4 PM. If selected day is a Wednesday (e.g. May 6, 13, 20, 27) and slot is 4:00 PM, let's show limited
                            const isWednesday = [6, 13, 20, 27].includes(selectedDate);
                            const isWedDisabled = isWednesday && slot.time === '04:00 PM';
                            const isTimeSelected = selectedTime === slot.time;

                            return (
                              <button
                                key={slot.time}
                                type="button"
                                disabled={isWedDisabled}
                                onClick={() => setSelectedTime(slot.time)}
                                className={`py-3.5 px-2 text-xs font-bold rounded-xl border text-center transition-all ${
                                  isWedDisabled
                                    ? 'bg-gray-100 border-gray-100 text-gray-300 cursor-not-allowed line-through'
                                    : isTimeSelected
                                    ? 'border-gold bg-olive text-white shadow-md'
                                    : 'border-gray-100 bg-white text-gray-700 hover:border-olive hover:text-olive'
                                }`}
                              >
                                {slot.time}
                                {isWedDisabled && <span className="block text-[8px] tracking-wide text-red-400">Wed Cut-off</span>}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-500 leading-relaxed">
                        <p className="font-bold text-olive mb-1">📅 Booking Details:</p>
                        Selected May {selectedDate}, 2026 at {selectedTime} for {selectedProcedureDetails?.name}.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Patient Information */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-olive text-white flex items-center justify-center text-xs font-serif">3</span>
                    <h2 className="font-serif text-lg md:text-xl text-olive-dark font-semibold">Patient Information</h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400" htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="Enter your name"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400" htmlFor="phone">Phone / WhatsApp Number</label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        placeholder="e.g. +234 703 229 9287"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400" htmlFor="email">Email Address (Optional)</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400" htmlFor="notes">Symptoms or Special Requests</label>
                      <textarea
                        id="notes"
                        rows={3}
                        placeholder="Please share any clinical details, dental anxieties, or comfort requirements you have..."
                        value={patientNotes}
                        onChange={(e) => setPatientNotes(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Submissions buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-olive hover:bg-olive-dark text-white px-8 py-4 rounded-full font-bold transition-all shadow-md active:scale-95 text-xs tracking-wider uppercase cursor-pointer"
                  >
                    Request Appointment
                  </button>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold transition-all text-xs tracking-wider uppercase active:scale-95 shadow-md"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 1.981 14.119.957 11.49.955 6.058.955 1.633 5.328 1.63 10.757c-.001 1.732.463 3.42 1.342 4.927l-.994 3.633 3.73-.974.349.208z" />
                    </svg>
                    Book Instantly via WhatsApp
                  </a>
                </div>

              </form>

              {/* Right Column: Doctor info & Clinical assurances */}
              <div className="md:col-span-4 space-y-6">
                
                {/* Doctor Editorial Card */}
                <div className="bg-olive text-white rounded-3xl p-6 shadow-xl relative overflow-hidden border border-olive-light/10">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 blur-2xl pointer-events-none"></div>
                  
                  <div className="space-y-4 relative z-10">
                    <div className="inline-block text-[9px] uppercase font-bold tracking-widest text-gold bg-white/10 px-3 py-1 rounded-full">
                      Lead Surgeon
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-2xl text-white">Dr. Emmanuel Oke</h3>
                      <p className="text-xs text-gold font-semibold uppercase tracking-wider">Founder & Surgeon</p>
                    </div>

                    {/* Doctor portrait */}
                    <div className="py-4 border-y border-white/10 flex justify-center">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gold/40 shadow-inner bg-olive-deep">
                        <img
                          src="/dr-oke.png"
                          alt="Dr. Oke Portrait"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <p className="text-gray-300 text-xs leading-relaxed italic">
                      "Healing is an act of trust. We commit to validating your safety and ensuring a pristine, completely comfortable sanctuary for your care."
                    </p>

                    <div className="flex items-center space-x-3 pt-2">
                      <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center">
                        <span className="font-serif text-gold text-[9px] tracking-wider font-bold">OV</span>
                      </div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        MDCN Certified Practice
                      </div>
                    </div>
                  </div>
                </div>

                {/* Practical info card */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-md space-y-6">
                  <h4 className="font-serif text-sm font-bold text-olive-dark uppercase tracking-wider">Sanctuary Details</h4>
                  
                  <div className="space-y-4 text-xs">
                    <div className="flex items-start space-x-3">
                      <div className="p-1.5 rounded-lg bg-olive/5 text-olive">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-gray-800">Suite C108, Garki Mall</p>
                        <p className="text-gray-500">Opposite Garki International Market, Garki Area 11, Abuja, Nigeria.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-1.5 rounded-lg bg-olive/5 text-olive">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-gray-800">Operational Hours</p>
                        <p className="text-gray-500">Mon - Fri: 9:00 AM – 5:00 PM</p>
                        <p className="text-gray-500">Wednesdays: 9:00 AM – 4:00 PM</p>
                        <p className="text-gray-500">Saturday: 10:00 AM – 3:00 PM</p>
                        <p className="text-gray-500">Sunday: Closed (Sterilization & Rest)</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-1.5 rounded-lg bg-olive/5 text-olive">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-gray-800">Sterility Assured</p>
                        <p className="text-gray-500">Rigorous clinical autoclave biological indicators are validated daily.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            /* Success State */
            <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-2xl text-center max-w-2xl mx-auto space-y-6 animate-[fadeIn_0.5s_ease-out]">
              <div className="w-16 h-16 bg-olive/10 text-gold rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/30">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="space-y-2">
                <span className="text-gold text-xs font-bold uppercase tracking-widest">Reservation Requested</span>
                <h2 className="font-serif text-3xl text-olive-dark">Your Comfort is Scheduled</h2>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
                Thank you, <span className="font-semibold text-olive-dark">{patientName}</span>. We have provisionally reserved <span className="font-semibold text-olive-dark">May {selectedDate}, 2026 at {selectedTime}</span> for your <span className="font-semibold text-olive">{selectedProcedureDetails?.name}</span>.
              </p>

              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 text-xs text-left max-w-sm mx-auto space-y-2 text-gray-500">
                <p><strong>📍 Location:</strong> Suite C108, Garki Mall, Area 11, Abuja</p>
                <p><strong>👨‍⚕️ Surgeon:</strong> Dr. Oke</p>
                <p><strong>📞 Contact:</strong> {patientPhone}</p>
                <p className="text-red-400 pt-1 font-semibold">⚠️ Our clinical team will reach out via WhatsApp/SMS shortly to finalize your slot details.</p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-8 py-3.5 rounded-full font-bold transition-all text-xs tracking-wider uppercase active:scale-95 shadow-md inline-flex items-center justify-center"
                >
                  Confirm Fast via WhatsApp
                </a>
                <Link href="/" className="w-full sm:w-auto bg-transparent border border-olive text-olive hover:bg-olive hover:text-white px-8 py-3.5 rounded-full font-bold transition-all text-xs tracking-wider uppercase active:scale-95 inline-flex items-center justify-center">
                  Return to Sanctuary
                </Link>
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
