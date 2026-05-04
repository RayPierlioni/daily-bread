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
  },
  {
    path: "/support",
    title: "Support Daily Bread Hub",
    description: "Help keep Daily Bread Hub free for people who need Scripture, prayer, honest faith questions, and a private devotional path."
  }
];

export const publicResourcePages = [
  {
    path: "/learn",
    title: "Christian Devotional and Prayer Resources",
    description: "Helpful Christian resources for prayer, daily devotionals, faith questions, doubt, anxiety, Scripture, and spiritual growth."
  },
  {
    path: "/learn/how-to-pray-when-god-feels-silent",
    title: "How to Pray When God Feels Silent",
    description: "A gentle Christian guide for praying when God feels distant, including Scripture, honest encouragement, and simple next steps."
  },
  {
    path: "/learn/free-christian-prayer-journal",
    title: "Free Christian Prayer Journal",
    description: "How a private Christian prayer journal can help you write prayers, remember God's faithfulness, and track answered prayers."
  },
  {
    path: "/learn/daily-devotional-for-anxiety",
    title: "Daily Devotional for Anxiety",
    description: "A Scripture-centered devotional guide for anxiety, fear, and overwhelm with gentle prayer prompts and biblical encouragement."
  },
  {
    path: "/learn/christian-app-for-faith-questions",
    title: "Christian App for Faith Questions",
    description: "A safe Christian space to ask honest questions about God, Jesus, the Bible, doubt, theology, history, and archaeology."
  }
];

export const publicPages = [...publicMarketingPages, ...publicResourcePages];
