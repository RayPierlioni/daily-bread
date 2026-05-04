import { focusCategories, type onboardingSchema } from "@/lib/validations";
import type { z } from "zod";

export type AssessmentAnswers = z.infer<typeof onboardingSchema>;

const fallbackFocus = "Strengthening Faith";

const struggleToFocus: Record<string, (typeof focusCategories)[number]> = {
  anxiety: "Overcoming Anxiety",
  loneliness: "Community and Belonging",
  discipline: "Building Discipline",
  forgiveness: "Forgiveness and Restoration",
  grief: "Healing and Comfort",
  doubt: "Wrestling with Doubt"
};

const seasonToFocus: Record<string, (typeof focusCategories)[number]> = {
  "weary and needing comfort": "Healing and Comfort",
  "curious and exploring": "Growing in Scripture",
  "wrestling with doubt": "Wrestling with Doubt",
  "rebuilding habits": "Building Discipline"
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function determineStartingLevel(answers: AssessmentAnswers) {
  if (answers.biblicalKnowledge === "ready for deeper theology and context" || answers.faithStage === "steady and wanting depth") {
    return "DEEPENING";
  }

  if (answers.biblicalKnowledge === "comfortable reading Scripture" || answers.bibleReading === "daily or near daily") {
    return "GROWING";
  }

  return "FOUNDATIONS";
}

export function determineAssessmentOutcome(answers: AssessmentAnswers) {
  const selectedFocus = answers.growthAreas.find((area): area is (typeof focusCategories)[number] =>
    focusCategories.includes(area as (typeof focusCategories)[number])
  );
  const struggleFocus = answers.struggles.map((struggle) => struggleToFocus[struggle]).find(Boolean);
  const doubtFocus = answers.doubts?.trim() ? "Wrestling with Doubt" : undefined;
  const prayerFocus = answers.prayerLife === "new and uncertain" || answers.prayerLife === "dry or difficult lately" ? "Learning to Pray" : undefined;
  const scriptureFocus =
    answers.biblicalKnowledge === "new to the Bible" || answers.bibleReading === "starting fresh" ? "Growing in Scripture" : undefined;
  const seasonFocus = seasonToFocus[answers.season];
  const generatedProfile = selectedFocus ?? seasonFocus ?? struggleFocus ?? doubtFocus ?? prayerFocus ?? scriptureFocus ?? fallbackFocus;
  const startingLevel = determineStartingLevel(answers);
  const recommendedTopics = [...new Set([generatedProfile, startingLevel, ...answers.growthAreas, ...answers.struggles])].filter(Boolean);

  return {
    generatedProfile,
    preferredTrackSlug: slugify(generatedProfile),
    startingLevel,
    recommendedTopics
  };
}
