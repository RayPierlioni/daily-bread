import {
  BlogStatus,
  DevotionalStatus,
  GroupPrivacy,
  GroupRole,
  PostType,
  PrayerStatus,
  PrismaClient,
  PrivacyLevel,
  Role,
  SourceCategory,
  Visibility
} from "@prisma/client";
import { buildFoundationDevotionals } from "./foundation-track";

const prisma = new PrismaClient();

const focusCategories = [
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
];

const devotionals = [
  {
    title: "Mercies Before the Noise",
    scriptureReference: "Lamentations 3:22-23",
    scriptureText: "The steadfast love of the LORD never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness.",
    body: "Before the day gathers speed, God meets you with mercy that has not gone stale. The first word over your life is not hurry, guilt, or performance, but steadfast love.",
    reflectionQuestion: "Where do you need to receive mercy before you try to solve anything today?",
    prayerPrompt: "Lord, let Your new mercy become the first reality I trust today.",
    actionStep: "Pause for two quiet minutes and name one mercy you have already received.",
    tags: ["morning", "mercy", "faithfulness"],
    categories: ["Healing and Comfort", "Building Discipline"]
  },
  {
    title: "A Lamp for the Next Step",
    scriptureReference: "Psalm 119:105",
    scriptureText: "Your word is a lamp to my feet and a light to my path.",
    body: "God often gives enough light for obedience before He gives the whole map. Scripture keeps your feet from wandering alone in the dark.",
    reflectionQuestion: "What is one clear next step God may be inviting you to take?",
    prayerPrompt: "Father, make Your Word near, clear, and beloved to me today.",
    actionStep: "Read one short Psalm slowly and write down one phrase to carry with you.",
    tags: ["Scripture", "guidance", "discernment"],
    categories: ["Growing in Scripture", "Seeking Purpose"]
  },
  {
    title: "When God Feels Quiet",
    scriptureReference: "Psalm 13:1-2",
    scriptureText: "How long, O LORD? Will you forget me forever? How long will you hide your face from me?",
    body: "The Bible gives holy language for seasons when God feels distant. Honest lament can be an act of faith because it brings pain toward God instead of away from Him.",
    reflectionQuestion: "What question have you been afraid to pray honestly?",
    prayerPrompt: "God, meet me with patience as I bring You the truth about where I am.",
    actionStep: "Write a prayer that begins with, 'Lord, I do not understand...'",
    tags: ["lament", "doubt", "honesty"],
    categories: ["Wrestling with Doubt", "Healing and Comfort"]
  },
  {
    title: "Peace That Guards",
    scriptureReference: "Philippians 4:6-7",
    scriptureText: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.",
    body: "Prayer is not denial of anxiety; it is anxiety brought into the presence of the One who can hold it. God's peace is described as a guard over a learning heart.",
    reflectionQuestion: "What worry needs to be named before God instead of carried alone?",
    prayerPrompt: "Jesus, guard my heart and mind with Your peace today.",
    actionStep: "Turn one anxious sentence into a prayer of request and trust.",
    tags: ["anxiety", "peace", "prayer"],
    categories: ["Overcoming Anxiety", "Learning to Pray"]
  },
  {
    title: "Ask for Wisdom",
    scriptureReference: "James 1:5",
    scriptureText: "If any of you lacks wisdom, let him ask God, who gives generously to all without reproach, and it will be given him.",
    body: "God is not irritated by your need for wisdom. James says He gives without reproach, which means you can ask without bracing for shame.",
    reflectionQuestion: "Where do you need wisdom more than a quick answer?",
    prayerPrompt: "Generous God, give me wisdom without fear and without pride.",
    actionStep: "Before making a decision today, pray one sentence asking for wisdom.",
    tags: ["wisdom", "discernment", "questions"],
    categories: ["Seeking Purpose", "Wrestling with Doubt"]
  },
  {
    title: "Known and Still Loved",
    scriptureReference: "Psalm 139:1-3",
    scriptureText: "O LORD, you have searched me and known me! You know when I sit down and when I rise up; you discern my thoughts from afar.",
    body: "Being fully known can feel frightening until we remember the character of the One who knows us. God's knowledge is covenant love, not cold surveillance.",
    reflectionQuestion: "What part of your life do you find hard to bring into God's loving presence?",
    prayerPrompt: "Search me, Lord, and let Your love be stronger than my fear.",
    actionStep: "Tell God one thing you usually hide, then sit quietly under His mercy.",
    tags: ["identity", "grace", "honesty"],
    categories: ["Healing and Comfort", "Forgiveness and Restoration"]
  },
  {
    title: "The Burden Shared",
    scriptureReference: "Galatians 6:2",
    scriptureText: "Bear one another's burdens, and so fulfill the law of Christ.",
    body: "Christian community is not meant to be a stage for polished lives. It is a place where burdens can be carried with tenderness and wisdom.",
    reflectionQuestion: "What burden might become lighter if you let a trusted believer pray with you?",
    prayerPrompt: "Lord, teach me to receive help and to carry others gently.",
    actionStep: "Send one honest prayer request to someone trustworthy.",
    tags: ["community", "prayer", "care"],
    categories: ["Community and Belonging", "Learning to Pray"]
  },
  {
    title: "Forgiven People Forgive",
    scriptureReference: "Ephesians 4:32",
    scriptureText: "Be kind to one another, tenderhearted, forgiving one another, as God in Christ forgave you.",
    body: "Forgiveness is not pretending harm did not matter. It is entrusting justice and healing to God while refusing to let bitterness become your home.",
    reflectionQuestion: "Where do you need God's help to move toward tenderness without denying truth?",
    prayerPrompt: "Christ, form Your forgiving heart in me with wisdom and courage.",
    actionStep: "Pray blessing over someone you find difficult, without minimizing what happened.",
    tags: ["forgiveness", "restoration", "relationships"],
    categories: ["Forgiveness and Restoration", "Healing and Comfort"]
  },
  {
    title: "Faith with Questions",
    scriptureReference: "Mark 9:24",
    scriptureText: "Immediately the father of the child cried out and said, 'I believe; help my unbelief!'",
    body: "This father's mixed prayer was received by Jesus. Faith is not always the absence of struggle; sometimes it is the decision to bring struggle to Christ.",
    reflectionQuestion: "What would it sound like to bring both faith and uncertainty to Jesus today?",
    prayerPrompt: "Jesus, receive my faith and help my unbelief.",
    actionStep: "Write one question you want to explore with Scripture, history, and wise counsel.",
    tags: ["doubt", "faith", "Jesus"],
    categories: ["Wrestling with Doubt", "Strengthening Faith"]
  },
  {
    title: "Abide Before You Act",
    scriptureReference: "John 15:5",
    scriptureText: "I am the vine; you are the branches. Whoever abides in me and I in him, he it is that bears much fruit.",
    body: "Jesus does not invite you to manufacture fruit by strain. He invites you to abide. A fruitful life begins with ordinary dependence.",
    reflectionQuestion: "What would change if you saw abiding as productive, not passive?",
    prayerPrompt: "Jesus, keep me close to You before I try to be useful.",
    actionStep: "Choose one ordinary task today and do it as a prayer of abiding.",
    tags: ["abiding", "discipleship", "formation"],
    categories: ["Building Discipline", "Strengthening Faith"]
  },
  {
    title: "Courage for Today's Calling",
    scriptureReference: "Joshua 1:9",
    scriptureText: "Be strong and courageous. Do not be frightened, and do not be dismayed, for the LORD your God is with you wherever you go.",
    body: "Biblical courage is rooted in God's presence. The command to be strong rests on the promise that you are not alone.",
    reflectionQuestion: "Where do you need courage that depends on God's presence rather than your control?",
    prayerPrompt: "Lord, make Your nearness stronger than my fear.",
    actionStep: "Take one small faithful step you have been postponing.",
    tags: ["courage", "calling", "presence"],
    categories: ["Seeking Purpose", "Strengthening Faith"]
  },
  {
    title: "Come and Rest",
    scriptureReference: "Matthew 11:28",
    scriptureText: "Come to me, all who labor and are heavy laden, and I will give you rest.",
    body: "Jesus does not shame the weary for being weary. He invites them. Rest in Christ restores the soul under a gentle Lord.",
    reflectionQuestion: "What heaviness have you been carrying as if Jesus did not invite you to bring it?",
    prayerPrompt: "Gentle Savior, teach my soul to come to You.",
    actionStep: "Put one burden into words and pray it slowly.",
    tags: ["rest", "weariness", "comfort"],
    categories: ["Healing and Comfort", "Overcoming Anxiety"]
  },
  {
    title: "Hidden Faithfulness",
    scriptureReference: "Colossians 3:23",
    scriptureText: "Whatever you do, work heartily, as for the Lord and not for men.",
    body: "God sees hidden obedience. The ordinary work of love, integrity, patience, and service matters because it is done before Him.",
    reflectionQuestion: "What hidden act of faithfulness can become worship today?",
    prayerPrompt: "Lord, receive the ordinary parts of my day as worship.",
    actionStep: "Do one overlooked task with prayerful attention.",
    tags: ["discipline", "work", "worship"],
    categories: ["Building Discipline", "Seeking Purpose"]
  },
  {
    title: "Hope That Learns to Wait",
    scriptureReference: "Romans 15:13",
    scriptureText: "May the God of hope fill you with all joy and peace in believing, so that by the power of the Holy Spirit you may abound in hope.",
    body: "Christian hope is not optimism by force. It is a Spirit-given confidence that God is still present and still redeeming, even when the story is unfinished.",
    reflectionQuestion: "Where do you need hope that is honest enough to wait?",
    prayerPrompt: "God of hope, fill me with joy and peace in believing.",
    actionStep: "Write one sentence of hope that does not deny the hard thing.",
    tags: ["hope", "waiting", "Spirit"],
    categories: ["Strengthening Faith", "Healing and Comfort"]
  }
];

function atLocalMidnight(date: Date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function addDays(date: Date, days: number) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return atLocalMidnight(copy);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@nextfaithfulstep.local" },
    update: { role: Role.ADMIN },
    create: {
      name: "Next Faithful Step Admin",
      email: "admin@nextfaithfulstep.local",
      role: Role.ADMIN,
      onboardingCompleted: true,
      spiritualFocusProfile: "Growing in Scripture"
    }
  });

  const demo = await prisma.user.upsert({
    where: { email: "demo@nextfaithfulstep.local" },
    update: {},
    create: {
      name: "Demo Believer",
      email: "demo@nextfaithfulstep.local",
      bio: "Learning to start the morning with Scripture and honest prayer.",
      church: "Local Church",
      denomination: "Non-denominational",
      onboardingCompleted: true,
      spiritualFocusProfile: "Healing and Comfort"
    }
  });

  const today = atLocalMidnight(new Date());
  const starterDevotionals = [];
  for (const [index, devotional] of devotionals.entries()) {
    const { categories, ...data } = devotional;
    const saved = await prisma.devotional.upsert({
      where: { date: addDays(today, index - 3) },
      update: {
        ...data,
        spiritualFocusCategories: categories,
        status: DevotionalStatus.PUBLISHED,
        createdBy: admin.id
      },
      create: {
        ...data,
        date: addDays(today, index - 3),
        spiritualFocusCategories: categories,
        status: DevotionalStatus.PUBLISHED,
        createdBy: admin.id
      }
    });
    starterDevotionals.push(saved);
  }

  const foundationTrack = await prisma.devotionalTrack.upsert({
    where: { slug: "daily-bread-foundations" },
    update: {
      title: "Faithful Foundations",
      description: "A 365-day ordered discipleship path that starts with grace, Scripture, prayer, core doctrine, spiritual formation, and everyday faithfulness.",
      focusCategory: "Core Foundations",
      startingLevel: "FOUNDATIONS"
    },
    create: {
      title: "Faithful Foundations",
      slug: "daily-bread-foundations",
      description: "A 365-day ordered discipleship path that starts with grace, Scripture, prayer, core doctrine, spiritual formation, and everyday faithfulness.",
      focusCategory: "Core Foundations",
      startingLevel: "FOUNDATIONS"
    }
  });

  await prisma.devotionalTrackItem.deleteMany({ where: { trackId: foundationTrack.id } });

  const foundationDevotionals = [];
  for (const devotional of buildFoundationDevotionals()) {
    const { categories, ...data } = devotional;
    const saved = await prisma.devotional.upsert({
      where: { date: data.date },
      update: {
        ...data,
        spiritualFocusCategories: categories,
        status: DevotionalStatus.PUBLISHED,
        createdBy: admin.id
      },
      create: {
        ...data,
        spiritualFocusCategories: categories,
        status: DevotionalStatus.PUBLISHED,
        createdBy: admin.id
      }
    });
    foundationDevotionals.push(saved);
  }

  await prisma.devotionalTrackItem.createMany({
    data: foundationDevotionals.map((devotional, index) => ({
      trackId: foundationTrack.id,
      devotionalId: devotional.id,
      sequence: index + 1
    }))
  });

  const publishedDevotionals = foundationDevotionals;

  for (const focus of focusCategories) {
    const slug = slugify(focus);
    const track = await prisma.devotionalTrack.upsert({
      where: { slug },
      update: {
        title: `${focus} Path`,
        description: `A sequential devotional pathway for ${focus.toLowerCase()}, beginning with foundations and moving one step at a time.`,
        focusCategory: focus,
        startingLevel: "FOUNDATIONS"
      },
      create: {
        title: `${focus} Path`,
        slug,
        description: `A sequential devotional pathway for ${focus.toLowerCase()}, beginning with foundations and moving one step at a time.`,
        focusCategory: focus,
        startingLevel: "FOUNDATIONS"
      }
    });

    await prisma.devotionalTrackItem.deleteMany({ where: { trackId: track.id } });

    const ordered = [...publishedDevotionals].sort((a, b) => {
      const aMatch = Array.isArray(a.spiritualFocusCategories) && a.spiritualFocusCategories.includes(focus) ? 0 : 1;
      const bMatch = Array.isArray(b.spiritualFocusCategories) && b.spiritualFocusCategories.includes(focus) ? 0 : 1;
      return aMatch - bMatch || a.date.getTime() - b.date.getTime();
    });

    await prisma.devotionalTrackItem.createMany({
      data: ordered.map((devotional, index) => ({
        trackId: track.id,
        devotionalId: devotional.id,
        sequence: index + 1
      }))
    });
  }

  await prisma.userDevotionalProgress.upsert({
    where: { userId: demo.id },
    update: { trackId: foundationTrack.id, currentSequence: 1, completedTrackAt: null },
    create: { userId: demo.id, trackId: foundationTrack.id, currentSequence: 1 }
  });

  await prisma.prayer.deleteMany({ where: { userId: demo.id } });
  await prisma.post.deleteMany({ where: { title: { in: ["Prayer for a Difficult Week", "A Small Praise from This Morning", "How do you stay consistent in Scripture?"] } } });
  await prisma.blog.deleteMany({ where: { title: { in: ["Practicing Gentle Morning Prayer", "Faith That Welcomes Honest Questions"] } } });
  await prisma.sourceLibraryItem.deleteMany();

  const group = await prisma.prayerGroup.upsert({
    where: { id: "seed-morning-prayer" },
    update: {},
    create: {
      id: "seed-morning-prayer",
      name: "Morning Prayer Circle",
      description: "A gentle group for daily prayer requests, short devotionals, and encouragement before the day begins.",
      creatorId: demo.id,
      privacy: GroupPrivacy.PUBLIC
    }
  });

  await prisma.groupMember.upsert({
    where: { groupId_userId: { groupId: group.id, userId: demo.id } },
    update: { role: GroupRole.LEADER },
    create: { groupId: group.id, userId: demo.id, role: GroupRole.LEADER }
  });

  await prisma.prayer.createMany({
    data: [
      {
        userId: demo.id,
        title: "Patience for Today",
        text: "Lord, help me slow down enough to love people well today.",
        tags: ["patience", "family"],
        mood: "tired but hopeful",
        relatedVerse: "James 1:5",
        status: PrayerStatus.ONGOING,
        privacyLevel: PrivacyLevel.PRIVATE
      },
      {
        userId: demo.id,
        title: "Answered: Job Interview",
        text: "Thank You for opening the door and giving peace in the interview.",
        tags: ["work", "gratitude"],
        status: PrayerStatus.ANSWERED,
        privacyLevel: PrivacyLevel.PRIVATE,
        answeredAt: new Date()
      }
    ]
  });

  await prisma.post.createMany({
    data: [
      {
        userId: demo.id,
        type: PostType.PRAYER_REQUEST,
        title: "Prayer for a Difficult Week",
        body: "I would appreciate prayer for patience, clarity, and a calm heart at work this week.",
        tags: ["work", "peace"],
        visibility: Visibility.PUBLIC
      },
      {
        userId: demo.id,
        type: PostType.PRAISE_REPORT,
        title: "A Small Praise from This Morning",
        body: "I woke up anxious but felt steadied while praying through Philippians 4.",
        tags: ["praise", "anxiety"],
        visibility: Visibility.PUBLIC
      },
      {
        userId: demo.id,
        type: PostType.QUESTION,
        title: "How do you stay consistent in Scripture?",
        body: "I would love gentle, practical ideas that do not become legalistic.",
        tags: ["Scripture", "discipline"],
        visibility: Visibility.PUBLIC
      }
    ]
  });

  await prisma.blog.createMany({
    data: [
      {
        authorId: demo.id,
        title: "Practicing Gentle Morning Prayer",
        body: "A simple rhythm: receive mercy, read slowly, name what is true, and ask for grace for one next step.",
        tags: ["prayer", "morning"],
        status: BlogStatus.PUBLISHED
      },
      {
        authorId: admin.id,
        title: "Faith That Welcomes Honest Questions",
        body: "Christian faith has room for careful questions, historical study, theological humility, and pastoral tenderness.",
        tags: ["apologetics", "doubt"],
        status: BlogStatus.PUBLISHED
      }
    ]
  });

  await prisma.sourceLibraryItem.createMany({
    data: [
      {
        title: "The Resurrection in Early Christian Witness",
        category: SourceCategory.APOLOGETICS,
        summary: "A starter note on early Christian claims and historically careful resurrection discussion.",
        content: "Use Scripture, early creedal material, and historical method carefully without overstating certainty.",
        scriptureReferences: ["1 Corinthians 15:3-8", "Luke 24"],
        externalReference: "N.T. Wright, The Resurrection of the Son of God",
        tags: ["resurrection", "history"]
      },
      {
        title: "Lament as Faithful Prayer",
        category: SourceCategory.PASTORAL,
        summary: "Biblical lament gives believers language for grief, doubt, and waiting.",
        content: "The Psalms model honest prayer that moves toward trust without rushing pain.",
        scriptureReferences: ["Psalm 13", "Psalm 42"],
        tags: ["lament", "prayer"]
      },
      {
        title: "Archaeology and Biblical Context",
        category: SourceCategory.ARCHAEOLOGY,
        summary: "Archaeology can illuminate biblical settings while remaining limited in what it can prove.",
        content: "Responsible apologetics distinguishes material evidence, interpretation, and theological claims.",
        scriptureReferences: ["Luke 2:1-2", "John 5:2"],
        tags: ["archaeology", "context"]
      }
    ]
  });

  console.log("Seed complete");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
