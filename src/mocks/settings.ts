import type { PublicSettings } from "@/types/settings";

/** Store's public contact details as provided by the owner (2026-11-23). */
export const mockPublicSettings: PublicSettings = {
  whatsapp_number: "963981021497",
  social: {
    instagram: "https://www.instagram.com/veerlastore",
    facebook: "https://www.facebook.com/share/1CJWbmjX9m/",
    tiktok: null,
  },
  payment_methods: ["sham_cash", "cash_on_delivery"],
  fulfillment_methods: ["pickup", "home_delivery", "shipping"],
  returns_window_hours: 48,
};
