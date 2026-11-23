import { cacheLife, cacheTag } from "next/cache";
import type { HomeContent } from "@/types/content";
import { mockContentSource } from "./mock/content";
import type { ContentSource } from "./types";

// Swapped for the Laravel HTTP source once the API exists.
const source: ContentSource = mockContentSource;

/**
 * Owner-managed home content. Cached; a dashboard save in Laravel should
 * revalidate the `home-content` tag (BACKEND_REQUIREMENTS.md §8).
 */
export async function getHomeContent(): Promise<HomeContent> {
  "use cache";
  cacheLife("hours");
  cacheTag("home-content", "products");
  return source.getHomeContent();
}
