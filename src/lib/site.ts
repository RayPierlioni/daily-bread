export const siteConfig = {
  name: "Daily Bread Hub",
  url: process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "https://ourdailybreadhub.com",
  description:
    "A free Scripture-centered devotional and prayer app with private journaling, honest faith questions, and gentle Christian community.",
  keywords: [
    "Christian devotional app",
    "daily devotional",
    "prayer journal",
    "Bible devotional",
    "Christian prayer app",
    "faith questions",
    "Christian community",
    "answered prayer tracking"
  ]
};

export const publicMarketingPages = [
  {
    path: "/daily-devotional",
    title: "Personalized Daily Devotionals",
    description: "Daily Scripture-centered devotionals shaped by your spiritual season and paced by your actual reading journey."
  },
  {
    path: "/prayer-journal",
    title: "Private Prayer Journal",
    description: "A private prayer journal for writing prayers, searching past entries, and marking answered prayers."
  },
  {
    path: "/ask-faith-questions",
    title: "Ask Honest Faith Questions",
    description: "A calm place to ask questions about God, Jesus, Scripture, doubt, theology, history, and archaeology."
  },
  {
    path: "/christian-prayer-groups",
    title: "Christian Prayer Groups",
    description: "Prayer-centered groups for encouragement, shared devotionals, testimonies, and community."
  }
];
