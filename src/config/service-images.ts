import type { ServiceSlug } from "@/src/domain/site";

/** Shared artwork for every service discovery surface. */
export const serviceImages = {
  "move-in-cleaning": "/services/quick-menu-v4/move-in-completion-cleaning.jpg",
  "residential-cleaning": "/services/quick-menu-v4/residential-cleaning.jpg",
  "commercial-cleaning": "/services/quick-menu-v4/commercial-cleaning.jpg",
  "floor-care": "/services/quick-menu-v4/floor-care.jpg",
  "waste-disposal": "/services/quick-menu-v4/waste-disposal.jpg",
  "hoarding-cleanup": "/services/quick-menu-v4/hoarding-cleanup.jpg",
  "deep-cleaning": "/services/quick-menu-v4/deep-cleaning.jpg",
  "estate-clearing": "/services/quick-menu-v4/estate-clearing.jpg",
  "home-organizing": "/services/quick-menu-v4/home-organizing.jpg",
} as const satisfies Record<ServiceSlug, string>;
