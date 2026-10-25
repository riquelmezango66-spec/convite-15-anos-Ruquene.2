export interface RsvpData {
  id: string;
  fullName: string;
  phone: string;
  attending: "yes" | "no";
  message: string;
  timestamp: string;
}

const STORAGE_KEY_PHONE = "ruquene_host_whatsapp_number";
const STORAGE_KEY_RSVPS = "ruquene_confirmed_rsvps";

export const DEFAULT_HOST_PHONE = "244955654264";

export function getHostWhatsAppNumber(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PHONE);
    if (saved && saved.trim()) return saved.trim();
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_HOST_PHONE;
}

export function setHostWhatsAppNumber(phone: string): void {
  try {
    const cleanPhone = phone.replace(/\D/g, "");
    localStorage.setItem(STORAGE_KEY_PHONE, cleanPhone);
  } catch (e) {
    console.error(e);
  }
}

export function formatWhatsAppMessage(data: RsvpData): string {
  const isAttending = data.attending === "yes";
  const statusEmoji = isAttending ? "✅" : "🕊️";
  const statusText = isAttending
    ? "CONFIRMADA COM ALEGRIA!"
    : "Não poderei comparecer, mas desejo muitas felicidades!";

  let message = `✨ *CONFIRMAÇÃO DE PRESENÇA • 15 ANOS* ✨\n`;
  message += `🌸 *Ruquene Zango*\n\n`;
  message += `👤 *Convidado:* ${data.fullName.trim()}\n`;
  if (data.phone) {
    message += `📱 *Telefone:* ${data.phone.trim()}\n`;
  }
  message += `📋 *Presença:* ${statusEmoji} ${statusText}\n`;

  if (data.message && data.message.trim()) {
    message += `\n💬 *Mensagem para a Ruquene:*\n"${data.message.trim()}"\n`;
  }

  message += `\n───────────────\n`;
  message += `📅 *14 de Novembro* • 🕒 *15 horas*\n`;
  message += `📍 *Restinga • Restaurante do Hotel Plazza*`;

  return message;
}

export function createWhatsAppUrl(data: RsvpData, customHostPhone?: string): string {
  const hostPhone = customHostPhone || getHostWhatsAppNumber();
  const cleanPhone = hostPhone.replace(/\D/g, "");
  const text = formatWhatsAppMessage(data);
  const encodedText = encodeURIComponent(text);

  if (cleanPhone) {
    return `https://wa.me/${cleanPhone}?text=${encodedText}`;
  }
  return `https://api.whatsapp.com/send?text=${encodedText}`;
}

export function saveRsvpLocal(data: RsvpData): void {
  try {
    const list = getSavedRsvps();
    list.unshift(data);
    localStorage.setItem(STORAGE_KEY_RSVPS, JSON.stringify(list));
  } catch (e) {
    console.error(e);
  }
}

export function getSavedRsvps(): RsvpData[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_RSVPS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error(e);
  }
  return [];
      }
