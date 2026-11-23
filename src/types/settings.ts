// Public store settings (dashboard → Laravel → GET /settings/public).
// Mirrors BACKEND_REQUIREMENTS.md §9. snake_case on purpose.

export type PaymentMethod = "sham_cash" | "cash_on_delivery";
export type FulfillmentMethod = "pickup" | "home_delivery" | "shipping";

export type PublicSettings = {
  /** E.164 without "+", ready for https://wa.me/<number>. */
  whatsapp_number: string;
  social: {
    instagram: string | null;
    facebook: string | null;
    tiktok: string | null;
  };
  /** Only the methods the owner has enabled, in display order. */
  payment_methods: PaymentMethod[];
  fulfillment_methods: FulfillmentMethod[];
  /** Return window after the customer receives the order; null = returns not accepted. */
  returns_window_hours: number | null;
};
