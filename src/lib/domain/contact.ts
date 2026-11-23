/** Click-to-chat link for a WhatsApp number in E.164 without "+". */
export function whatsappUrl(number: string): string {
  return `https://wa.me/${number}`;
}

/** Syrian numbers: "963981021497" → "+963 981 021 497" (display only). */
export function formatPhone(number: string): string {
  const country = number.slice(0, 3);
  const rest = number.slice(3).match(/.{1,3}/g) ?? [];
  return `+${[country, ...rest].join(" ")}`;
}
