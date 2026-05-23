export const CLINIC_PHONE_RAW = '2348053351465'; // Raw number for wa.me links
export const CLINIC_PHONE_DISPLAY = '+234 805 335 1465'; // Display formatted number
export const CLINIC_PHONE_TEL = '+2348053351465'; // Telephone protocol link
export const CLINIC_WHATSAPP_LINK = `https://wa.me/${CLINIC_PHONE_RAW}`;

export const getDynamicWhatsAppLink = () => {
  if (typeof window === 'undefined') {
    return CLINIC_WHATSAPP_LINK;
  }
  const hour = new Date().getHours();
  let greeting = 'Good morning';
  if (hour >= 12 && hour < 17) {
    greeting = 'Good afternoon';
  } else if (hour >= 17) {
    greeting = 'Good evening';
  }
  const text = `${greeting} Olive Vine Dental Clinic,\n\nPlease, I am visiting the website and would like to ask about...`;
  return `https://wa.me/${CLINIC_PHONE_RAW}?text=${encodeURIComponent(text)}`;
};
