export const CLINIC_BUSINESS_NAME = 'The Olive Vine Dental Clinic';
export const CLINIC_PHONE_RAW = '2348053351465'; // Raw number for wa.me links
export const CLINIC_PHONE_DISPLAY = '+234 805 335 1465'; // Display formatted number
export const CLINIC_PHONE_TEL = '+2348053351465'; // Telephone protocol link
export const CLINIC_PHONE_BACKUP_DISPLAY = '+234 706 358 7055'; // Backup display number
export const CLINIC_PHONE_BACKUP_TEL = '+2347063587055'; // Backup telephone protocol link
export const CLINIC_WHATSAPP_LINK = `https://wa.me/${CLINIC_PHONE_RAW}`;

export const getDynamicWhatsAppLink = () => {
  const text = `Hello ${CLINIC_BUSINESS_NAME}, I would like to send a booking request or ask a question.`;
  return `https://wa.me/${CLINIC_PHONE_RAW}?text=${encodeURIComponent(text)}`;
};
