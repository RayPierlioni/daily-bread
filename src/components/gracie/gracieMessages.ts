export type GracieMessageCategory =
  | "general"
  | "dashboard"
  | "devotional"
  | "prayer"
  | "ask"
  | "support"
  | "empty_state"
  | "settings";

export type GracieMessage = {
  id: string;
  category: GracieMessageCategory;
  routes?: string[];
  text: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaType?: string;
};

export const gracieMessages: GracieMessage[] = [
  {
    id: "general-small-step",
    category: "general",
    text: "One small faithful step is enough for today."
  },
  {
    id: "general-not-behind",
    category: "general",
    text: "You are not behind here. Your path waits for you."
  },
  {
    id: "general-thankful",
    category: "general",
    text: "Take ten seconds to name one thing you are thankful for."
  },
  {
    id: "general-honest-prayer",
    category: "general",
    text: "A short honest prayer is still a prayer.",
    ctaLabel: "Write a prayer",
    ctaHref: "/prayers",
    ctaType: "prayer"
  },
  {
    id: "general-begin",
    category: "general",
    text: "You do not have to make this perfect. Just begin."
  },
  {
    id: "general-grace",
    category: "general",
    text: "Before you move on, breathe and remember that grace is not rushed."
  },
  {
    id: "dashboard-ready",
    category: "dashboard",
    routes: ["/dashboard"],
    text: "Your next faithful step is ready.",
    ctaLabel: "Begin today's step",
    ctaHref: "/devotional",
    ctaType: "devotional"
  },
  {
    id: "dashboard-scripture-prayer-question",
    category: "dashboard",
    routes: ["/dashboard"],
    text: "You can begin with Scripture, prayer, or one honest question.",
    ctaLabel: "Begin today's step",
    ctaHref: "/devotional",
    ctaType: "devotional"
  },
  {
    id: "dashboard-no-skip",
    category: "dashboard",
    routes: ["/dashboard"],
    text: "Missing days does not skip your path. You can continue where you left off.",
    ctaLabel: "Open your path",
    ctaHref: "/devotional",
    ctaType: "devotional"
  },
  {
    id: "devotional-read-slowly",
    category: "devotional",
    routes: ["/devotional", "/devotional/archive"],
    text: "Read slowly. One sentence may be enough to carry with you.",
    ctaLabel: "Write a prayer",
    ctaHref: "/prayers",
    ctaType: "prayer"
  },
  {
    id: "devotional-prayer",
    category: "devotional",
    routes: ["/devotional", "/devotional/archive"],
    text: "After today's devotional, try turning one thought into a prayer.",
    ctaLabel: "Write a prayer",
    ctaHref: "/prayers",
    ctaType: "prayer"
  },
  {
    id: "devotional-one-phrase",
    category: "devotional",
    routes: ["/devotional", "/devotional/archive"],
    text: "Look for one word or phrase that stands out, then sit with it for a moment."
  },
  {
    id: "prayer-one-sentence",
    category: "prayer",
    routes: ["/prayers"],
    text: "Start with one honest sentence.",
    ctaLabel: "Open today's devotional",
    ctaHref: "/devotional",
    ctaType: "devotional"
  },
  {
    id: "prayer-today-feel",
    category: "prayer",
    routes: ["/prayers"],
    text: "Try: 'God, today I feel...'"
  },
  {
    id: "prayer-private",
    category: "prayer",
    routes: ["/prayers"],
    text: "Private prayers do not need to sound impressive."
  },
  {
    id: "ask-honest",
    category: "ask",
    routes: ["/ask"],
    text: "Honest questions are welcome here.",
    ctaLabel: "Ask a question",
    ctaHref: "/ask",
    ctaType: "ask"
  },
  {
    id: "ask-clearly",
    category: "ask",
    routes: ["/ask"],
    text: "Ask clearly and simply. You do not have to phrase it perfectly.",
    ctaLabel: "Ask a question",
    ctaHref: "/ask",
    ctaType: "ask"
  },
  {
    id: "ask-support",
    category: "ask",
    routes: ["/ask"],
    text: "For deep personal pain, consider talking with a pastor, counselor, trusted person, or emergency support if you are in danger."
  },
  {
    id: "support-free",
    category: "support",
    routes: ["/support"],
    text: "This app is free because people help keep the path open.",
    ctaLabel: "Learn how support helps",
    ctaHref: "/support",
    ctaType: "support"
  },
  {
    id: "support-small-gift",
    category: "support",
    routes: ["/support"],
    text: "A small gift can help someone else begin again.",
    ctaLabel: "Learn how support helps",
    ctaHref: "/support",
    ctaType: "support"
  },
  {
    id: "settings-quiet",
    category: "settings",
    routes: ["/profile", "/settings", "/community", "/groups", "/blog"],
    text: "Your daily rhythm can stay quiet. The extra spaces are here only when you want them.",
    ctaLabel: "Return to dashboard",
    ctaHref: "/dashboard",
    ctaType: "dashboard"
  },
  {
    id: "empty-first-prayer",
    category: "empty_state",
    text: "Your first prayer can be one sentence.",
    ctaLabel: "Write a prayer",
    ctaHref: "/prayers",
    ctaType: "prayer"
  },
  {
    id: "empty-start-today",
    category: "empty_state",
    text: "Start with today. Your path begins with one step.",
    ctaLabel: "Begin today's step",
    ctaHref: "/devotional",
    ctaType: "devotional"
  },
  {
    id: "empty-ask-simple",
    category: "empty_state",
    text: "You can ask something simple, honest, or difficult.",
    ctaLabel: "Ask a question",
    ctaHref: "/ask",
    ctaType: "ask"
  }
];
