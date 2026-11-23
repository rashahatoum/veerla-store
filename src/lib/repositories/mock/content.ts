import { mockHomeContent } from "@/mocks/home-content";
import type { ContentSource } from "../types";

export const mockContentSource: ContentSource = {
  async getHomeContent() {
    return mockHomeContent;
  },
};
