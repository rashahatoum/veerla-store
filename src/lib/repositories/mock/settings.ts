import { mockPublicSettings } from "@/mocks/settings";
import type { SettingsSource } from "../types";

export const mockSettingsSource: SettingsSource = {
  async getPublicSettings() {
    return mockPublicSettings;
  },
};
