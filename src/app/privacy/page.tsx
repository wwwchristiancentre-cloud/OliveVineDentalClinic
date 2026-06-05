import Link from 'next/link';

import Navbar from '@/components/Navbar';
import { CLINIC_PHONE_DISPLAY, getDynamicWhatsAppLink } from '@/config/constants';

export default function PrivacyPolicy() {
  const whatsAppLink = getDynamicWhatsAppLink();

  return (
    <>
      <main className="bg-cream text-charcoal min-h-screen pt-28 pb-20 px-4 md:px-8 relative overflow-x-hidden selection:bg-gold/25">
        {/* Sticky floating Navbar */}
        <Navbar />

        {/* Dynamic Breathing Gradient Accent in background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-olive/5 blur-3xl pointer-events-none z-0"></div>
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] rounded-full bg-gold/5 blur-3xl pointer-events-none z-0"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back button and page title */}
          <div className="space-y-4 mb-12">
            <Link href="/" className="inline-flex items-center text-xs font-bold tracking-widest text-olive hover:text-gold uppercase transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <div className="space-y-2">
              <span className="text-gold text-xs font-bold uppercase tracking-widest block">Ethical Standards</span>
              <h1 className="font-serif text-4xl md:text-5xl text-olive-dark">Patient Privacy & Confidentiality</h1>
              <p className="text-gray-500 text-sm">
                Last Updated: May 22, 2026
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Left Column: Legal Content */}
            <div className="md:col-span-8 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xl space-y-8 text-sm leading-relaxed text-gray-600">

              <div className="space-y-3">
                <h2 className="font-serif text-xl text-olive-dark font-semibold">1. Our Commitment to Your Sanctuary</h2>
                <p>
                  At Olive Vine Dental Clinic, patient confidentiality is treated as a core responsibility. Our practice is guided by Medical and Dental Council of Nigeria (MDCN) expectations and recognized healthcare privacy practices as we protect your clinical records, dental histories, and personal data.
                </p>
                <p>
                  We recognize that seeking medical care requires a high degree of trust. Your data is handled with care and is only accessible by authorized clinical practitioners directly responsible for your diagnosis and follow-up support.
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="font-serif text-xl text-olive-dark font-semibold">2. Information We Collect</h2>
                <p>
                  To provide restorative and cosmetic care, we may collect and process the following categories of information:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Personal Details:</strong> Name, age, phone/WhatsApp contact information, and email address.</li>
                  <li><strong>Clinical Records:</strong> Oral health history, pre-existing systemic conditions, medications, treatment plans, 3D intraoral scans, and digital radiographs.</li>
                  <li><strong>Booking Specifications:</strong> Date, time, requested procedures, email contact you choose to share, and non-sensitive comfort or scheduling preferences.</li>
                </ul>
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="font-serif text-xl text-olive-dark font-semibold">3. How We Use and Protect Your Data</h2>
                <p>
                  Your information is used for clinical diagnosis, booking coordination, and follow-up care.
                </p>
                <p>
                  Our security measures may include:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Access Controls:</strong> Digital records are stored with access restrictions and encryption where appropriate.</li>
                  <li><strong>No Third-Party Sales:</strong> We do not use your contact information or medical background for third-party marketing.</li>
                  <li><strong>Authorized Consent:</strong> We do not share your records with relatives or third parties without your consent or a lawful clinical basis.</li>
                </ul>
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="font-serif text-xl text-olive-dark font-semibold">4. WhatsApp Communication</h2>
                <p>
                  Our clinic supports a WhatsApp direct line ({CLINIC_PHONE_DISPLAY}) to help you send booking requests and receive support.
                </p>
                <p>
                  While convenient, WhatsApp is a third-party messaging platform. Please avoid sharing highly sensitive medical histories, diagnostic records, payment information, or emergency concerns over open chat channels. Our clinical team will coordinate secure in-person evaluations at Suite C108 Garki Mall for medical assessments.
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="font-serif text-xl text-olive-dark font-semibold">5. Patient Rights</h2>
                <p>
                  Under MDCN ethical codes, you maintain full right to access your physical and digital medical files, obtain copy duplicates of your digital radiographs, and request immediate rectification of incorrect personal information.
                </p>
                <p>
                  For any inquiries regarding your privacy rights, please connect directly with our patient care team at Garki Mall, Area 11, Abuja, or call us at <strong>{CLINIC_PHONE_DISPLAY}</strong>.
                </p>
              </div>

            </div>

            {/* Right Column: Assurances & Quick Booking */}
            <div className="md:col-span-4 space-y-6">

              {/* Clinical Promise Card */}
              <div className="bg-olive text-white rounded-3xl p-6 shadow-xl relative overflow-hidden border border-olive-light/10">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 blur-2xl pointer-events-none"></div>

                <div className="space-y-4 relative z-10">
                  <div className="inline-block text-[9px] uppercase font-bold tracking-widest text-gold bg-white/10 px-3 py-1 rounded-full">
                    Ethical Promise
                  </div>
                  <h3 className="font-serif text-xl text-white">Hippocratic Privacy</h3>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Our data handling practices are designed to align with applicable healthcare confidentiality expectations, including MDCN guidance where relevant.
                  </p>

                  <div className="flex items-center space-x-2 pt-2 text-gold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    <span className="font-bold uppercase tracking-wider text-[9px]">Confidentiality-Focused Care</span>
                  </div>
                </div>
              </div>

              {/* Quick CTA to book */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-md text-center space-y-4">
                <h4 className="font-serif text-sm font-bold text-olive-dark uppercase tracking-wider">Ready to Book?</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Experience a secure, pristine sanctuary. Reserve your slot with Dr. Oke in Area 11, Abuja.
                </p>
                <div className="space-y-2">
                  <Link href="/booking" className="block w-full bg-gold hover:bg-gold-warm text-white py-3 rounded-full font-bold transition-all text-xs tracking-wider uppercase shadow-md active:scale-95">
                    Book Appointment
                  </Link>
                  <a
                    href={whatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-transparent border border-olive text-olive hover:bg-olive hover:text-white py-3 rounded-full font-bold transition-all text-xs tracking-wider uppercase active:scale-95"
                  >
                    WhatsApp Chat
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </>
  );
}
