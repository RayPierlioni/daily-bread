import { z } from "zod";

export const focusCategories = [
  "Strengthening Faith",
  "Healing and Comfort",
  "Overcoming Anxiety",
  "Seeking Purpose",
  "Learning to Pray",
  "Growing in Scripture",
  "Wrestling with Doubt",
  "Building Discipline",
  "Forgiveness and Restoration",
  "Community and Belonging"
] as const;

export const onboardingSchema = z.object({
  faithStage: z.string().min(2),
  biblicalKnowledge: z.string().min(2),
  season: z.string().min(2),
  prayerLife: z.string().min(2),
  bibleReading: z.string().min(2),
  struggles: z.array(z.string()).default([]),
  doubts: z.string().optional(),
  emotionalState: z.string().min(2),
  growthAreas: z.array(z.string()).default([]),
  wantsPersonalization: z.boolean().default(true),
  wantsCommunity: z.boolean().default(true)
});

export const prayerSchema = z.object({
  title: z.string().min(2, "Please add a short title.").max(120),
  text: z.string().min(2, "Write the prayer or a short note."),
  transcript: z.string().optional(),
  audioUrl: z.string().optional(),
  tags: z.array(z.string()).default([]),
  mood: z.string().optional(),
  relatedVerse: z.string().optional(),
  status: z.enum(["ONGOING", "ANSWERED", "WAITING", "PRAISE_REPORT"]).default("ONGOING"),
  privacyLevel: z.enum(["PRIVATE", "GROUP", "ANONYMOUS"]).default("PRIVATE"),
  followUpNotes: z.string().optional()
});

export const faithQuestionSchema = z.object({
  question: z.string().min(4, "Ask a little more so the answer can be useful.").max(1200)
});

export const postSchema = z.object({
  type: z.enum(["PRAYER_REQUEST", "PRAISE_REPORT", "REFLECTION", "QUESTION", "TESTIMONY", "BLOG", "DEVOTIONAL_DISCUSSION", "GROUP_ANNOUNCEMENT"]),
  title: z.string().min(3).max(140),
  body: z.string().min(3).max(5000),
  tags: z.array(z.string()).default([]),
  visibility: z.enum(["PUBLIC", "GROUP", "PRIVATE"]).default("PUBLIC"),
  groupId: z.string().optional()
});

export const groupSchema = z.object({
  name: z.string().min(3).max(120),
  description: z.string().min(8).max(1000),
  privacy: z.enum(["PUBLIC", "PRIVATE", "INVITE_ONLY"]).default("PUBLIC")
});

export const blogSchema = z.object({
  title: z.string().min(3).max(160),
  body: z.string().min(20),
  tags: z.array(z.string()).default([]),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT")
});

export const devotionalSchema = z.object({
  title: z.string().min(3),
  date: z.string().min(8),
  scriptureReference: z.string().min(2),
  scriptureText: z.string().min(5),
  body: z.string().min(20),
  reflectionQuestion: z.string().min(5),
  prayerPrompt: z.string().min(5),
  actionStep: z.string().min(5),
  tags: z.array(z.string()).default([]),
  spiritualFocusCategories: z.array(z.string()).default([]),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT")
});
