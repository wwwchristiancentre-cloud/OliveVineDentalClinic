'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import Navbar from '@/components/Navbar';
import { CLINIC_PHONE_DISPLAY, CLINIC_PHONE_RAW } from '@/config/constants';

type Procedure = {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
};

type ClockDetails = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

type CalendarDay = {
  day: number;
  isCurrentMonth: boolean;
  isSunday: boolean;
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
  { time: '04:00 PM', status: 'limited' },
];

const BOOKING_MONTH_LAUNCH = new Date(2026, 4, 1);

const parseTimeSlot = (timeStr: string) => {
  const parts = timeStr.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (!parts) return { hours: 0, minutes: 0 };

  let hours = parseInt(parts[1], 10);
  const minutes = parseInt(parts[2], 10);
  const modifier = parts[3].toUpperCase();

  if (modifier === 'PM' && hours < 12) {
    hours += 12;
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }
  return { hours, minutes };
};

const getCurrentClockDetails = (): ClockDetails => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth(),
    day: now.getDate(),
    hour: now.getHours(),
    minute: now.getMinutes(),
  };
};

const getBookingMonthDate = (clock: ClockDetails) => {
  if (clock.year < 2026 || (clock.year === 2026 && clock.month < 4)) {
    return BOOKING_MONTH_LAUNCH;
  }
  return new Date(clock.year, clock.month, 1);
};

const buildCalendarDays = (monthDate: Date): CalendarDay[] => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const previousMonthDays = new Date(year, month, 0).getDate();
  const cells: CalendarDay[] = [];

  for (let offset = startOffset; offset > 0; offset -= 1) {
    const day = previousMonthDays - offset + 1;
    const date = new Date(year, month - 1, day);
    cells.push({ day, isCurrentMonth: false, isSunday: date.getDay() === 0 });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    cells.push({ day, isCurrentMonth: true, isSunday: date.getDay() === 0 });
  }

  const trailingCells = (7 - (cells.length % 7)) % 7;
  for (let day = 1; day <= trailingCells; day += 1) {
    const date = new Date(year, month + 1, day);
    cells.push({ day, isCurrentMonth: false, isSunday: date.getDay() === 0 });
  }

  return cells;
};

const isSameBookingDay = (clock: ClockDetails, monthDate: Date, day: number) =>
  clock.year === monthDate.getFullYear() &&
  clock.month === monthDate.getMonth() &&
  clock.day === day;

const isEarlierMonth = (candidate: Date, reference: Date) =>
  candidate.getFullYear() < reference.getFullYear() ||
  (candidate.getFullYear() === reference.getFullYear() && candidate.getMonth() < reference.getMonth());

const isDayDisabledForMonth = (day: number, isCurrentMonth: boolean, isSunday: boolean, monthDate: Date, clock: ClockDetails) => {
  if (!isCurrentMonth || isSunday) return true;

  const selectedDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
  const today = new Date(clock.year, clock.month, clock.day);

  return selectedDate < today;
};

const isTimeSlotDisabledForMonth = (timeStr: string, day: number, monthDate: Date, clock: ClockDetails) => {
  const slotDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);

  if (slotDate.getDay() === 0) return true;
  if (slotDate.getDay() === 3 && timeStr === '04:00 PM') return true;

  if (isSameBookingDay(clock, monthDate, day)) {
    const slot = parseTimeSlot(timeStr);
    if (clock.hour > slot.hours || (clock.hour === slot.hours && clock.minute >= slot.minutes)) {
      return true;
    }
  }

  return false;
};

const findInitialSelection = (days: CalendarDay[], monthDate: Date, clock: ClockDetails) => {
  for (const item of days) {
    if (isDayDisabledForMonth(item.day, item.isCurrentMonth, item.isSunday, monthDate, clock)) {
      continue;
    }

    const firstAvailableTime = AVAILABLE_TIMES.find((slot) => !isTimeSlotDisabledForMonth(slot.time, item.day, monthDate, clock));
    if (firstAvailableTime) {
      return { date: item.day, time: firstAvailableTime.time };
    }
  }

  const fallbackDay = days.find((item) => item.isCurrentMonth && !item.isSunday);
  return {
    date: fallbackDay?.day ?? 1,
    time: AVAILABLE_TIMES[0].time,
  };
};

const formatBookingDate = (monthDate: Date, day: number) => {
  const monthName = monthDate.toLocaleString('en-US', { month: 'long' });
  return `${monthName} ${day}, ${monthDate.getFullYear()}`;
};

export default function Booking() {
  const [clock] = useState<ClockDetails>(() => getCurrentClockDetails());
  const initialMonth = useMemo(() => getBookingMonthDate(clock), [clock]);
  const initialSelection = useMemo(
    () => findInitialSelection(buildCalendarDays(initialMonth), initialMonth, clock),
    [clock, initialMonth]
  );

  const [visibleMonth, setVisibleMonth] = useState<Date>(initialMonth);
  const [selectedProcedure, setSelectedProcedure] = useState<string>('restorative');
  const [selectedDate, setSelectedDate] = useState<number>(initialSelection.date);
  const [selectedTime, setSelectedTime] = useState<string>(initialSelection.time);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
  const [hasWhatsAppConsent, setHasWhatsAppConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showStickyCard, setShowStickyCard] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowStickyCard(scrollY > 260);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calendarDays = useMemo(() => buildCalendarDays(visibleMonth), [visibleMonth]);
  const currentMonth = useMemo(
    () => visibleMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' }),
    [visibleMonth]
  );
  const canGoToPreviousMonth = !isEarlierMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1), initialMonth);

  const selectedProcedureDetails = PROCEDURES.find((p) => p.id === selectedProcedure);
  const isDayDisabled = (day: number, isCurrentMonth: boolean, isSunday: boolean) =>
    isDayDisabledForMonth(day, isCurrentMonth, isSunday, visibleMonth, clock);
  const isTimeSlotDisabled = (timeStr: string, day: number) =>
    isTimeSlotDisabledForMonth(timeStr, day, visibleMonth, clock);

  const isFormInvalid =
    !patientName.trim() ||
    !patientPhone.trim() ||
    !selectedProcedure ||
    !selectedDate ||
    !selectedTime ||
    !hasWhatsAppConsent ||
    isTimeSlotDisabled(selectedTime, selectedDate);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormInvalid) {
      return;
    }

    // Dispatch custom event to trigger the premium global WhatsApp call prompt!
    const triggerEvent = new CustomEvent('triggerWhatsAppPrompt', {
      detail: { url: getWhatsAppLink() }
    });
    window.dispatchEvent(triggerEvent);

    // Transition the active site page state into the Sanctuary Pass voucher success view
    setIsSubmitted(true);
  };

  const getWhatsAppLink = () => {
    const trimmedEmail = patientEmail.trim();
    const trimmedNotes = patientNotes.trim();
    const text = `Hello Olive Vine Dental Clinic,\n\nI would like to send a booking request for a clinical visit:\n\n` +
      `- Selected Therapy: ${selectedProcedureDetails?.name}\n` +
      `- Requested Date: ${formatBookingDate(visibleMonth, selectedDate)}\n` +
      `- Selected Time: ${selectedTime}\n` +
      `- Patient Name: ${patientName || '(Pending)'}\n` +
      `- Contact Number: ${patientPhone || '(Pending)'}\n` +
      (trimmedEmail ? `- Email Address: ${trimmedEmail}\n` : '') +
      (trimmedNotes ? `- Booking Notes (non-sensitive): ${trimmedNotes}\n` : '') +
      `\nPlease let me know if this slot is available at Suite C108, Garki Mall, Abuja (opposite Garki International Market). Thank you!`;
    return `https://wa.me/${CLINIC_PHONE_RAW}?text=${encodeURIComponent(text)}`;
  };

  const handleDateSelect = (day: number) => {
    setSelectedDate(day);

    if (isTimeSlotDisabled(selectedTime, day)) {
      const firstAvailableTime = AVAILABLE_TIMES.find((slot) => !isTimeSlotDisabled(slot.time, day));
      if (firstAvailableTime) {
        setSelectedTime(firstAvailableTime.time);
      }
    }
  };

  const applyMonthChange = (nextMonth: Date) => {
    const nextCalendarDays = buildCalendarDays(nextMonth);
    const selectedDayIsValid = nextCalendarDays.some(
      (item) =>
        item.isCurrentMonth &&
        item.day === selectedDate &&
        !isDayDisabledForMonth(item.day, item.isCurrentMonth, item.isSunday, nextMonth, clock)
    );

    const selectedTimeIsValid =
      selectedDayIsValid && !isTimeSlotDisabledForMonth(selectedTime, selectedDate, nextMonth, clock);

    setVisibleMonth(nextMonth);

    if (!selectedDayIsValid || !selectedTimeIsValid) {
      const fallbackSelection = findInitialSelection(nextCalendarDays, nextMonth, clock);
      setSelectedDate(fallbackSelection.date);
      setSelectedTime(fallbackSelection.time);
    }
  };

  const goToPreviousMonth = () => {
    if (!canGoToPreviousMonth) return;
    applyMonthChange(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    applyMonthChange(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1));
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
          {!isSubmitted && (
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
          )}

          {!isSubmitted ? (
            <div className="grid md:grid-cols-12 gap-8">

              {/* Left Column: Flow Steps Form */}
              <form onSubmit={handleBookingSubmit} className="md:col-span-8 space-y-8 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xl">

                {/* Step 1: Care Pathway */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-olive text-white flex items-center justify-center text-xs font-serif">1</span>
                    <h2 className="font-serif text-lg md:text-xl text-olive-dark font-semibold">Select Curated Procedure</h2>
                  </div>

                  <fieldset className="grid sm:grid-cols-2 gap-4">
                    <legend className="sr-only">Select a procedure</legend>
                    {PROCEDURES.map((proc) => {
                      const procedureId = `procedure-${proc.id}`;

                      return (
                        <label
                          key={proc.id}
                          htmlFor={procedureId}
                          className={`block p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative overflow-hidden group select-none ${selectedProcedure === proc.id
                            ? 'border-gold bg-olive/5 shadow-md shadow-gold/5'
                            : 'border-gray-100 bg-white hover:border-olive/30'
                            }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className={`font-serif text-sm font-bold transition-colors ${selectedProcedure === proc.id ? 'text-olive' : 'text-gray-800'}`}>
                              {proc.name}
                            </h3>
                            <input
                              id={procedureId}
                              type="radio"
                              name="procedure"
                              value={proc.id}
                              checked={selectedProcedure === proc.id}
                              onChange={() => setSelectedProcedure(proc.id)}
                              className="text-gold focus:ring-gold border-gray-300 h-4 w-4"
                            />
                          </div>
                          <p className="text-gray-500 text-xs leading-relaxed mb-4">{proc.description}</p>
                          <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider text-gray-400">
                            <span>{proc.duration}</span>
                            <span className="text-gold">{proc.price}</span>
                          </div>
                        </label>
                      );
                    })}
                  </fieldset>
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
                          <button
                            type="button"
                            onClick={goToPreviousMonth}
                            disabled={!canGoToPreviousMonth}
                            className={`p-1 rounded bg-white border border-gray-200 text-xs transition-colors ${canGoToPreviousMonth ? 'text-gray-400 hover:text-olive' : 'text-gray-200 cursor-not-allowed opacity-50'}`}
                            aria-label="View previous month"
                          >
                            ←
                          </button>
                          <button
                            type="button"
                            onClick={goToNextMonth}
                            className="p-1 rounded bg-white border border-gray-200 text-xs text-gray-400 hover:text-olive transition-colors"
                            aria-label="View next month"
                          >
                            →
                          </button>
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
                          const isDisabled = isDayDisabled(item.day, item.isCurrentMonth, item.isSunday);

                          return (
                            <button
                              key={idx}
                              type="button"
                              disabled={isDisabled}
                              onClick={() => handleDateSelect(item.day)}
                              className={`h-9 w-full rounded-xl text-xs font-bold transition-all relative flex items-center justify-center ${isSelected
                                ? 'bg-gold text-white shadow-md shadow-gold/25'
                                : isDisabled
                                  ? 'text-gray-300/60 line-through bg-gray-100/30 cursor-not-allowed opacity-50'
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
                            const isSlotDisabled = isTimeSlotDisabled(slot.time, selectedDate);
                            const isTimeSelected = selectedTime === slot.time;

                            return (
                              <button
                                key={slot.time}
                                type="button"
                                disabled={isSlotDisabled}
                                onClick={() => setSelectedTime(slot.time)}
                                className={`py-3.5 px-2 text-xs font-bold rounded-xl border text-center transition-all ${isSlotDisabled
                                  ? 'bg-gray-150 border-gray-200 text-gray-300 cursor-not-allowed line-through opacity-50'
                                  : isTimeSelected
                                    ? 'border-gold bg-olive text-white shadow-md'
                                    : 'border-gray-100 bg-white text-gray-700 hover:border-olive hover:text-olive'
                                  }`}
                              >
                                {slot.time}
                                {isSlotDisabled && (
                                  <span className="block text-[8px] tracking-wide text-red-400 font-bold uppercase">
                                    {new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), selectedDate).getDay() === 3 && slot.time === '04:00 PM' ? 'Wed Cut-off' : 'Passed'}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-500 leading-relaxed">
                        <p className="font-bold text-olive mb-1">📅 Booking Details:</p>
                        Selected {formatBookingDate(visibleMonth, selectedDate)} at {selectedTime} for {selectedProcedureDetails?.name}.
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
                        placeholder={`e.g. ${CLINIC_PHONE_DISPLAY}`}
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400" htmlFor="email">Email Address (Optional — included in WhatsApp request)</label>
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
                      <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400" htmlFor="notes">Comfort or Scheduling Notes (Optional — non-sensitive only)</label>
                      <textarea
                        id="notes"
                        rows={3}
                        placeholder="Share timing, accessibility, or comfort preferences only. Please do not include symptoms, diagnoses, or other sensitive medical details."
                        value={patientNotes}
                        onChange={(e) => setPatientNotes(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Submissions buttons */}
                <div className="flex flex-col gap-4 pt-6 border-t border-gray-100">
                  <div className="rounded-2xl border border-gold/20 bg-gold/5 p-4 text-xs text-gray-600 space-y-3">
                    <p className="font-bold uppercase tracking-wider text-olive-dark">WhatsApp booking notice</p>
                    <p className="leading-relaxed">
                      Submitting this request opens WhatsApp, a third-party messaging service. Only non-sensitive booking details from this form will be included in your message. For full guidance, review our{' '}
                      <Link href="/privacy" className="font-semibold text-olive underline underline-offset-2 hover:text-gold">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                    <label className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white/80 p-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasWhatsAppConsent}
                        onChange={(e) => setHasWhatsAppConsent(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-gold focus:ring-gold"
                      />
                      <span className="leading-relaxed text-gray-600">
                        I understand this booking request will be sent through WhatsApp and I will only share non-sensitive information.
                      </span>
                    </label>
                  </div>
                  {isFormInvalid && (
                    <div className="p-3.5 bg-red-50/70 border border-red-100 rounded-xl flex items-center space-x-2 text-xs text-red-600 animate-[fadeIn_0.3s_ease-out]">
                      <svg className="w-4 h-4 text-red-500 shrink-0 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <span className="font-bold">Booking Locked:</span> Please provide your{' '}
                        {(!patientName.trim() || !patientPhone.trim()) ? (
                          <span className="underline font-semibold text-red-700">Name & WhatsApp number</span>
                        ) : !hasWhatsAppConsent ? (
                          <span className="underline font-semibold text-red-700">WhatsApp consent acknowledgement</span>
                        ) : (
                          <span className="underline font-semibold text-red-700">a valid future Date & Time slot</span>
                        )}{' '}
                        to unlock.
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={isFormInvalid}
                      className={`w-full sm:w-auto px-10 py-4 rounded-full font-bold transition-all shadow-md text-xs tracking-wider uppercase flex items-center justify-center ${
                        isFormInvalid
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                          : 'bg-green-500 hover:bg-green-600 text-white active:scale-95 cursor-pointer shadow-lg shadow-green-500/10'
                      }`}
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 1.981 14.119.957 11.49.955 6.058.955 1.633 5.328 1.63 10.757c-.001 1.732.463 3.42 1.342 4.927l-.994 3.633 3.73-.974.349.208z" />
                      </svg>
                      Send Booking Request via WhatsApp
                    </button>
                  </div>
                </div>

              </form>

              {/* Right Column Container */}
              <div className="md:col-span-4 animate-[fadeIn_0.5s_ease-out]">
                {/* Sticky Wrapper inside column */}
                <div className="md:sticky md:top-28 space-y-6 transition-all duration-500">

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
                          <Image
                            src="/dr-oke.png"
                            alt="Dr. Oke Portrait"
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <p className="text-gray-300 text-xs leading-relaxed italic">
                        Healing is an act of trust. We strive to support your safety and keep the experience comfortable and refined.
                      </p>

                      <div className="flex items-center space-x-3 pt-2">
                        <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center">
                          <span className="font-serif text-gold text-[9px] tracking-wider font-bold">OV</span>
                        </div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          MDCN-Guided Practice
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
                    </div>
                  </div>

                  {/* 🌟 Dynamic Interactive Sanctuary Selection Summary Card */}
                  <div className={`bg-white transition-all duration-750 ease-out transform origin-bottom ${showStickyCard
                    ? 'max-h-[500px] opacity-100 translate-y-0 scale-100 p-6 border border-gray-150 shadow-xl mt-6'
                    : 'max-h-0 opacity-0 translate-y-4 scale-95 p-0 border-0 shadow-none mt-0 overflow-hidden pointer-events-none'
                    }`}>
                    {/* Card Header */}
                    <div className="flex justify-between items-center pb-3 border-b border-gray-150 mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse"></span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-olive">Booking Request</span>
                      </div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Summary</span>
                    </div>

                    <div className="space-y-3">
                      {/* 1. Selected Procedure Summary Block */}
                      <div className="p-4 rounded-2xl bg-olive/5 border border-olive/10 shadow-sm relative overflow-hidden transition-all duration-300">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[8px] uppercase tracking-wider font-bold text-gold">Procedure Request</span>
                          <span className="inline-flex items-center bg-gold text-white text-[7px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider shadow-sm">
                            ✓ Procedure Chosen
                          </span>
                        </div>
                        <p className="font-serif text-olive-dark text-xs font-semibold pr-16 leading-snug">{selectedProcedureDetails?.name}</p>
                        <div className="flex justify-between items-center text-[9px] pt-1.5 font-bold uppercase tracking-wider text-olive">
                          <span className="text-gray-500">{selectedProcedureDetails?.duration}</span>
                          <span className="text-gold font-bold">{selectedProcedureDetails?.price}</span>
                        </div>
                      </div>

                      {/* 2. Selected Date & Time Summary Block */}
                      <div className="p-4 rounded-2xl bg-olive/5 border border-olive/10 shadow-sm relative overflow-hidden transition-all duration-300">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[8px] uppercase tracking-wider font-bold text-gold">Requested Time</span>
                          <span className="inline-flex items-center bg-gold text-white text-[7px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider shadow-sm">
                            ✓ Time Selected
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-olive-dark">
                          <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs font-bold text-olive-dark">
                            {formatBookingDate(visibleMonth, selectedDate)} at {selectedTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Subtle Action Prompt */}
                    <div className="text-center pt-2 text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                      {isFormInvalid ? (
                        <span className="text-red-400 font-bold animate-pulse">
                          {!patientName.trim() || !patientPhone.trim()
                            ? 'Enter name & WhatsApp above'
                            : !hasWhatsAppConsent
                              ? 'Review WhatsApp notice above'
                              : 'Select a valid future slot above'}
                        </span>
                      ) : (
                        <span className="text-green-500 font-bold animate-pulse">
                          Ready! Send request below
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          ) : (
            /* Success State */
            <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-2xl text-center max-w-2xl mx-auto space-y-8 animate-[fadeIn_0.5s_ease-out]">
              
              {/* Dynamic Pulsing Gold Checkmark */}
              <div className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto border border-gold/30 relative">
                <div className="absolute inset-0 rounded-full border border-gold/20 animate-ping opacity-75"></div>
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="space-y-2">
                <span className="text-gold text-xs font-bold uppercase tracking-widest block">Booking Request Ready</span>
                <h2 className="font-serif text-3xl md:text-4xl text-olive-dark">Your WhatsApp Request Is Prepared</h2>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
                Thank you, <span className="font-bold text-olive-dark">{patientName}</span>. We&apos;ve prepared a WhatsApp request for <span className="font-bold text-olive-dark">{formatBookingDate(visibleMonth, selectedDate)} at {selectedTime}</span> so our team can review availability and reply.
              </p>

              {/* Gold-Bordered Medical Sanctuary Pass (Voucher Style) */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-olive/5 via-cream/30 to-white border border-gold/20 text-xs text-left max-w-md mx-auto space-y-4 relative overflow-hidden shadow-md">
                {/* Decorative vintage ticket cutouts on left/right edges */}
                <div className="absolute top-1/2 -left-2.5 w-5 h-5 rounded-full bg-cream border-r border-gold/20 -translate-y-1/2 z-10"></div>
                <div className="absolute top-1/2 -right-2.5 w-5 h-5 rounded-full bg-cream border-l border-gold/20 -translate-y-1/2 z-10"></div>
                
                <div className="border-b border-dashed border-gold/20 pb-3 flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-olive font-serif">Request Pass</span>
                  <span className="text-[8px] uppercase font-bold tracking-wider text-gold bg-white/60 px-2.5 py-0.5 rounded-full border border-gold/15">Abuja Branch</span>
                </div>
                
                <div className="space-y-3 text-gray-600 relative z-20">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400">📍 Clinic Location</span>
                    <span className="font-bold text-olive-dark text-right max-w-[200px]">Suite C108, Garki Mall, Area 11, Abuja</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">👨‍⚕️ Clinical Lead</span>
                    <span className="font-bold text-olive-dark">Dr. Emmanuel Oke</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">📞 Patient Contact</span>
                    <span className="font-bold text-olive-dark">{patientPhone}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400">⚜️ Requested Therapy</span>
                    <span className="font-bold text-gold text-right max-w-[180px]">{selectedProcedureDetails?.name}</span>
                  </div>
                </div>
                
                <div className="pt-3.5 border-t border-dashed border-gold/20 text-[10px] text-center text-red-500 font-bold uppercase tracking-widest animate-pulse">
                  ⚠️ This remains a request until the clinic replies
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-full font-bold transition-all text-xs tracking-wider uppercase active:scale-95 shadow-lg shadow-green-500/20 inline-flex items-center justify-center hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 1.981 14.119.957 11.49.955 6.058.955 1.633 5.328 1.63 10.757c-.001 1.732.463 3.42 1.342 4.927l-.994 3.633 3.73-.974.349.208z" />
                  </svg>
                  Send Request via WhatsApp
                </a>
                <Link href="/" className="w-full sm:w-auto bg-transparent border border-olive text-olive hover:bg-olive hover:text-white px-10 py-4 rounded-full font-bold transition-all text-xs tracking-wider uppercase active:scale-95 inline-flex items-center justify-center hover:-translate-y-0.5">
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
