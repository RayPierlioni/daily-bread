import { prisma } from "@/lib/prisma";

export type SupportImpactStats = {
  usersStarted: number;
  devotionalCompletions: number;
  prayersCreated: number;
  faithQuestionsAsked: number;
  publicReflections: number;
  sponsors: number;
};

export async function getSupportImpactStats(): Promise<SupportImpactStats | null> {
  try {
    const [usersStarted, devotionalCompletions, prayersCreated, faithQuestionsAsked, communityPosts, publishedBlogs, sponsors] = await Promise.all([
      prisma.user.count(),
      prisma.userDevotional.count({ where: { completed: true } }),
      prisma.prayer.count(),
      prisma.faithQuestion.count(),
      prisma.post.count({ where: { visibility: "PUBLIC" } }),
      prisma.blog.count({ where: { status: "PUBLISHED" } }),
      prisma.user.count({ where: { isSponsor: true } })
    ]);

    return {
      usersStarted,
      devotionalCompletions,
      prayersCreated,
      faithQuestionsAsked,
      publicReflections: communityPosts + publishedBlogs,
      sponsors
    };
  } catch (error) {
    console.error("Unable to load support impact stats", error);
    return null;
  }
}
