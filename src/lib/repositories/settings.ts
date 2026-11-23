import { cacheLife, cacheTag } from "next/cache";
import type { PublicSettings } from "@/types/settings";
import { mockSettingsSource } from "./mock/settings";
import type { SettingsSource } from "./types";

// Swapped for the Laravel HTTP source once the API exists.
const source: SettingsSource = mockSettingsSource;

/** Public store settings; a settings save in Laravel revalidates the `settings` tag. */
export async function getPublicSettings(): Promise<PublicSettings> {
  "use cache";
  cacheLife("hours");
  cacheTag("settings");
  return source.getPublicSettings();
}
