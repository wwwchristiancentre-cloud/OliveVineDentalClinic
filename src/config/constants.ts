export const CLINIC_PHONE_RAW = '2348053351465'; // Raw number for wa.me links
export const CLINIC_PHONE_DISPLAY = '+234 805 335 1465'; // Display formatted number
export const CLINIC_PHONE_TEL = '+2348053351465'; // Telephone protocol link
export const CLINIC_WHATSAPP_LINK = `https://wa.me/${CLINIC_PHONE_RAW}`;

export const getDynamicWhatsAppLink = () => {
  const text = 'Hello Olive Vine Dental Clinic, I would like to send a booking request or ask a question.';
  return `https://wa.me/${CLINIC_PHONE_RAW}?text=${encodeURIComponent(text)}`;
};
