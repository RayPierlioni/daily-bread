import type { Devotional } from "@prisma/client";
import { jsonArray } from "@/lib/devotionals";

type DevotionalMedia = {
  src: string;
  alt: string;
};

const defaultImage: DevotionalMedia = {
  src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=82",
  alt: "A quiet road stretching through warm morning light"
};

const focusImages: Record<string, DevotionalMedia> = {
  "Strengthening Faith": {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=82",
    alt: "A wide mountain landscape under clear light"
  },
  "Healing and Comfort": {
    src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1400&q=82",
    alt: "Sunrise light breaking softly over the horizon"
  },
  "Overcoming Anxiety": {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=82",
    alt: "A calm forest path with gentle green light"
  },
  "Seeking Purpose": {
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=82",
    alt: "A winding path through a quiet landscape"
  },
  "Learning to Pray": {
    src: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1400&q=82",
    alt: "An open Bible held in a quiet moment"
  },
  "Growing in Scripture": {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=82",
    alt: "A night sky filled with stars above a still landscape"
  },
  "Wrestling with Doubt": {
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=82",
    alt: "A misty forest inviting a slower walk forward"
  },
  "Building Discipline": {
    src: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1400&q=82",
    alt: "Morning light over a still landscape"
  },
  "Forgiveness and Restoration": {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=82",
    alt: "Soft waves reaching a peaceful shoreline"
  },
  "Community and Belonging": {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=82",
    alt: "People gathered together in warm light"
  }
};

export function getDevotionalImage(devotional?: Pick<Devotional, "spiritualFocusCategories" | "tags"> | null) {
  if (!devotional) return defaultImage;

  const categories = jsonArray(devotional.spiritualFocusCategories);
  const tags = jsonArray(devotional.tags);
  const match = [...categories, ...tags].map((item) => focusImages[item]).find(Boolean);

  return match ?? defaultImage;
}
