type FoundationWeek = {
  theme: string;
  summary: string;
  focus: string;
  scriptureReference: string;
  scriptureText: string;
  tags: string[];
};

const weeklyThemes: FoundationWeek[] = [
  {
    theme: "Receiving Mercy",
    summary: "beginning the journey with grace before effort",
    focus: "Healing and Comfort",
    scriptureReference: "Lamentations 3:22-23",
    scriptureText: "It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.",
    tags: ["mercy", "morning", "grace"]
  },
  {
    theme: "Learning to Be Still",
    summary: "making space to notice God's presence before the day becomes loud",
    focus: "Building Discipline",
    scriptureReference: "Psalm 46:10",
    scriptureText: "Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.",
    tags: ["stillness", "presence", "silence"]
  },
  {
    theme: "Trusting Scripture",
    summary: "letting the Word become light for the next faithful step",
    focus: "Growing in Scripture",
    scriptureReference: "Psalm 119:105",
    scriptureText: "Thy word is a lamp unto my feet, and a light unto my path.",
    tags: ["Scripture", "guidance", "trust"]
  },
  {
    theme: "Prayer Without Performance",
    summary: "learning to pray honestly instead of impressively",
    focus: "Learning to Pray",
    scriptureReference: "Matthew 6:6",
    scriptureText: "But thou, when thou prayest, enter into thy closet, and when thou hast shut thy door, pray to thy Father which is in secret.",
    tags: ["prayer", "honesty", "secret place"]
  },
  {
    theme: "Faith with Questions",
    summary: "bringing doubt to Jesus instead of hiding from Him",
    focus: "Wrestling with Doubt",
    scriptureReference: "Mark 9:24",
    scriptureText: "And straightway the father of the child cried out, and said with tears, Lord, I believe; help thou mine unbelief.",
    tags: ["doubt", "faith", "Jesus"]
  },
  {
    theme: "God as Father",
    summary: "receiving the tenderness and authority of God's fatherly care",
    focus: "Strengthening Faith",
    scriptureReference: "Romans 8:15",
    scriptureText: "For ye have not received the spirit of bondage again to fear; but ye have received the Spirit of adoption, whereby we cry, Abba, Father.",
    tags: ["Father", "adoption", "identity"]
  },
  {
    theme: "Jesus the Good Shepherd",
    summary: "learning to be led, known, and protected by Christ",
    focus: "Healing and Comfort",
    scriptureReference: "John 10:11",
    scriptureText: "I am the good shepherd: the good shepherd giveth his life for the sheep.",
    tags: ["Jesus", "shepherd", "care"]
  },
  {
    theme: "The Cross and Grace",
    summary: "seeing forgiveness as gift rather than achievement",
    focus: "Forgiveness and Restoration",
    scriptureReference: "Ephesians 2:8-9",
    scriptureText: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: not of works, lest any man should boast.",
    tags: ["cross", "grace", "salvation"]
  },
  {
    theme: "The Resurrection Hope",
    summary: "placing Christian hope in the risen Christ",
    focus: "Strengthening Faith",
    scriptureReference: "1 Corinthians 15:20",
    scriptureText: "But now is Christ risen from the dead, and become the firstfruits of them that slept.",
    tags: ["resurrection", "hope", "Christ"]
  },
  {
    theme: "The Holy Spirit's Help",
    summary: "depending on the Spirit for prayer, holiness, and courage",
    focus: "Strengthening Faith",
    scriptureReference: "Romans 8:26",
    scriptureText: "Likewise the Spirit also helpeth our infirmities: for we know not what we should pray for as we ought.",
    tags: ["Holy Spirit", "help", "prayer"]
  },
  {
    theme: "Assurance in Christ",
    summary: "resting in God's keeping love when feelings rise and fall",
    focus: "Overcoming Anxiety",
    scriptureReference: "John 10:28",
    scriptureText: "And I give unto them eternal life; and they shall never perish, neither shall any man pluck them out of my hand.",
    tags: ["assurance", "security", "peace"]
  },
  {
    theme: "Confession and Cleansing",
    summary: "bringing sin into the light without despair",
    focus: "Forgiveness and Restoration",
    scriptureReference: "1 John 1:9",
    scriptureText: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
    tags: ["confession", "forgiveness", "cleansing"]
  },
  {
    theme: "Learning Repentance",
    summary: "turning toward God as a path of life, not shame",
    focus: "Forgiveness and Restoration",
    scriptureReference: "Acts 3:19",
    scriptureText: "Repent ye therefore, and be converted, that your sins may be blotted out.",
    tags: ["repentance", "return", "restoration"]
  },
  {
    theme: "Grace for Anxiety",
    summary: "bringing fear into prayer and receiving guarded peace",
    focus: "Overcoming Anxiety",
    scriptureReference: "Philippians 4:6-7",
    scriptureText: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
    tags: ["anxiety", "peace", "prayer"]
  },
  {
    theme: "The Psalms as Prayer",
    summary: "letting Scripture give language to joy, grief, anger, and trust",
    focus: "Learning to Pray",
    scriptureReference: "Psalm 62:8",
    scriptureText: "Trust in him at all times; ye people, pour out your heart before him: God is a refuge for us.",
    tags: ["Psalms", "prayer", "refuge"]
  },
  {
    theme: "Wisdom for Decisions",
    summary: "asking for wisdom without fear of reproach",
    focus: "Seeking Purpose",
    scriptureReference: "James 1:5",
    scriptureText: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not.",
    tags: ["wisdom", "discernment", "decisions"]
  },
  {
    theme: "Purpose and Calling",
    summary: "receiving daily faithfulness before chasing a grand map",
    focus: "Seeking Purpose",
    scriptureReference: "Micah 6:8",
    scriptureText: "He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?",
    tags: ["purpose", "calling", "faithfulness"]
  },
  {
    theme: "Humility Before God",
    summary: "learning the freedom of not needing to be impressive",
    focus: "Building Discipline",
    scriptureReference: "James 4:10",
    scriptureText: "Humble yourselves in the sight of the Lord, and he shall lift you up.",
    tags: ["humility", "formation", "grace"]
  },
  {
    theme: "Community and Belonging",
    summary: "receiving the church as a family of burden-bearing people",
    focus: "Community and Belonging",
    scriptureReference: "Galatians 6:2",
    scriptureText: "Bear ye one another's burdens, and so fulfil the law of Christ.",
    tags: ["community", "burdens", "church"]
  },
  {
    theme: "Forgiving from the Cross",
    summary: "moving toward forgiveness without pretending wounds did not matter",
    focus: "Forgiveness and Restoration",
    scriptureReference: "Ephesians 4:32",
    scriptureText: "And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ's sake hath forgiven you.",
    tags: ["forgiveness", "relationships", "cross"]
  },
  {
    theme: "The Bible's Big Story",
    summary: "tracing creation, fall, promise, redemption, and renewal",
    focus: "Growing in Scripture",
    scriptureReference: "Luke 24:27",
    scriptureText: "And beginning at Moses and all the prophets, he expounded unto them in all the scriptures the things concerning himself.",
    tags: ["Bible story", "Scripture", "Jesus"]
  },
  {
    theme: "Creation and Worship",
    summary: "seeing the world as gift and responding with praise",
    focus: "Strengthening Faith",
    scriptureReference: "Genesis 1:31",
    scriptureText: "And God saw every thing that he had made, and, behold, it was very good.",
    tags: ["creation", "worship", "gratitude"]
  },
  {
    theme: "Human Dignity",
    summary: "receiving every person as made in the image of God",
    focus: "Community and Belonging",
    scriptureReference: "Genesis 1:27",
    scriptureText: "So God created man in his own image, in the image of God created he him; male and female created he them.",
    tags: ["image of God", "dignity", "neighbor"]
  },
  {
    theme: "Sin and Mercy",
    summary: "telling the truth about brokenness while trusting greater mercy",
    focus: "Forgiveness and Restoration",
    scriptureReference: "Romans 3:23-24",
    scriptureText: "For all have sinned, and come short of the glory of God; being justified freely by his grace through the redemption that is in Christ Jesus.",
    tags: ["sin", "mercy", "redemption"]
  },
  {
    theme: "Covenant Promise",
    summary: "learning that God binds Himself to His people with faithful love",
    focus: "Strengthening Faith",
    scriptureReference: "Genesis 12:2",
    scriptureText: "And I will make of thee a great nation, and I will bless thee, and make thy name great; and thou shalt be a blessing.",
    tags: ["promise", "covenant", "blessing"]
  },
  {
    theme: "Exodus and Deliverance",
    summary: "remembering that God hears oppression and leads people out",
    focus: "Healing and Comfort",
    scriptureReference: "Exodus 14:14",
    scriptureText: "The LORD shall fight for you, and ye shall hold your peace.",
    tags: ["deliverance", "Exodus", "freedom"]
  },
  {
    theme: "Law as Love",
    summary: "seeing God's commands as formation for freedom and neighbor-love",
    focus: "Building Discipline",
    scriptureReference: "Deuteronomy 6:5",
    scriptureText: "And thou shalt love the LORD thy God with all thine heart, and with all thy soul, and with all thy might.",
    tags: ["obedience", "love", "law"]
  },
  {
    theme: "Wilderness Trust",
    summary: "learning dependence when answers come one day at a time",
    focus: "Overcoming Anxiety",
    scriptureReference: "Deuteronomy 8:3",
    scriptureText: "Man doth not live by bread only, but by every word that proceedeth out of the mouth of the LORD doth man live.",
    tags: ["wilderness", "trust", "daily bread"]
  },
  {
    theme: "Courage and Obedience",
    summary: "taking the next faithful step because God is present",
    focus: "Seeking Purpose",
    scriptureReference: "Joshua 1:9",
    scriptureText: "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
    tags: ["courage", "obedience", "presence"]
  },
  {
    theme: "Lament and Hope",
    summary: "praying sorrow honestly while refusing to let despair be final",
    focus: "Healing and Comfort",
    scriptureReference: "Psalm 13:5",
    scriptureText: "But I have trusted in thy mercy; my heart shall rejoice in thy salvation.",
    tags: ["lament", "hope", "mercy"]
  },
  {
    theme: "The Prophets' Call",
    summary: "hearing God's concern for justice, mercy, worship, and repentance",
    focus: "Growing in Scripture",
    scriptureReference: "Isaiah 1:17",
    scriptureText: "Learn to do well; seek judgment, relieve the oppressed, judge the fatherless, plead for the widow.",
    tags: ["prophets", "justice", "mercy"]
  },
  {
    theme: "Waiting for the Messiah",
    summary: "learning patient hope through God's long promises",
    focus: "Strengthening Faith",
    scriptureReference: "Isaiah 9:6",
    scriptureText: "For unto us a child is born, unto us a son is given: and the government shall be upon his shoulder.",
    tags: ["Messiah", "waiting", "promise"]
  },
  {
    theme: "The Incarnation",
    summary: "wondering at the Word made flesh and God's nearness",
    focus: "Strengthening Faith",
    scriptureReference: "John 1:14",
    scriptureText: "And the Word was made flesh, and dwelt among us, and we beheld his glory.",
    tags: ["incarnation", "Jesus", "nearness"]
  },
  {
    theme: "The Kingdom of God",
    summary: "learning Jesus' vision of life under God's reign",
    focus: "Seeking Purpose",
    scriptureReference: "Matthew 6:33",
    scriptureText: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
    tags: ["kingdom", "priority", "discipleship"]
  },
  {
    theme: "The Sermon on the Mount",
    summary: "letting Jesus form the hidden life of the heart",
    focus: "Building Discipline",
    scriptureReference: "Matthew 5:8",
    scriptureText: "Blessed are the pure in heart: for they shall see God.",
    tags: ["Sermon on the Mount", "heart", "formation"]
  },
  {
    theme: "Parables and Attention",
    summary: "slowing down to hear the surprising wisdom of Jesus",
    focus: "Growing in Scripture",
    scriptureReference: "Mark 4:9",
    scriptureText: "And he said unto them, He that hath ears to hear, let him hear.",
    tags: ["parables", "listening", "Jesus"]
  },
  {
    theme: "Miracles and Compassion",
    summary: "seeing power joined to mercy in the ministry of Jesus",
    focus: "Healing and Comfort",
    scriptureReference: "Matthew 14:14",
    scriptureText: "And Jesus went forth, and saw a great multitude, and was moved with compassion toward them, and he healed their sick.",
    tags: ["miracles", "compassion", "healing"]
  },
  {
    theme: "Following Jesus",
    summary: "learning discipleship as daily surrender and joy",
    focus: "Building Discipline",
    scriptureReference: "Luke 9:23",
    scriptureText: "If any man will come after me, let him deny himself, and take up his cross daily, and follow me.",
    tags: ["discipleship", "cross", "following"]
  },
  {
    theme: "The Last Supper",
    summary: "receiving Christ's self-giving love at the table",
    focus: "Community and Belonging",
    scriptureReference: "Luke 22:19",
    scriptureText: "And he took bread, and gave thanks, and brake it, and gave unto them, saying, This is my body which is given for you.",
    tags: ["communion", "table", "sacrifice"]
  },
  {
    theme: "Gethsemane Honesty",
    summary: "learning surrendered prayer in the place of anguish",
    focus: "Learning to Pray",
    scriptureReference: "Matthew 26:39",
    scriptureText: "O my Father, if it be possible, let this cup pass from me: nevertheless not as I will, but as thou wilt.",
    tags: ["Gethsemane", "surrender", "prayer"]
  },
  {
    theme: "The Crucified King",
    summary: "beholding the love and justice of God at the cross",
    focus: "Forgiveness and Restoration",
    scriptureReference: "Luke 23:34",
    scriptureText: "Then said Jesus, Father, forgive them; for they know not what they do.",
    tags: ["cross", "forgiveness", "King"]
  },
  {
    theme: "Resurrection Witness",
    summary: "receiving resurrection hope as embodied good news",
    focus: "Strengthening Faith",
    scriptureReference: "Luke 24:6",
    scriptureText: "He is not here, but is risen: remember how he spake unto you when he was yet in Galilee.",
    tags: ["resurrection", "witness", "hope"]
  },
  {
    theme: "Pentecost and Mission",
    summary: "receiving the Spirit for witness, courage, and unity",
    focus: "Community and Belonging",
    scriptureReference: "Acts 1:8",
    scriptureText: "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me.",
    tags: ["Pentecost", "mission", "Spirit"]
  },
  {
    theme: "Life in the Church",
    summary: "practicing worship, fellowship, prayer, generosity, and teaching",
    focus: "Community and Belonging",
    scriptureReference: "Acts 2:42",
    scriptureText: "And they continued stedfastly in the apostles' doctrine and fellowship, and in breaking of bread, and in prayers.",
    tags: ["church", "fellowship", "practice"]
  },
  {
    theme: "The Fruit of the Spirit",
    summary: "watching God grow character that cannot be forced",
    focus: "Building Discipline",
    scriptureReference: "Galatians 5:22-23",
    scriptureText: "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance.",
    tags: ["fruit", "Spirit", "character"]
  },
  {
    theme: "Spiritual Gifts",
    summary: "receiving gifts as service rather than status",
    focus: "Community and Belonging",
    scriptureReference: "1 Peter 4:10",
    scriptureText: "As every man hath received the gift, even so minister the same one to another, as good stewards of the manifold grace of God.",
    tags: ["gifts", "service", "stewardship"]
  },
  {
    theme: "Work as Worship",
    summary: "offering ordinary labor to God with integrity and love",
    focus: "Seeking Purpose",
    scriptureReference: "Colossians 3:23",
    scriptureText: "And whatsoever ye do, do it heartily, as to the Lord, and not unto men.",
    tags: ["work", "worship", "integrity"]
  },
  {
    theme: "Money and Contentment",
    summary: "learning trust, generosity, and freedom from anxious grasping",
    focus: "Overcoming Anxiety",
    scriptureReference: "1 Timothy 6:6",
    scriptureText: "But godliness with contentment is great gain.",
    tags: ["contentment", "money", "trust"]
  },
  {
    theme: "Suffering and Perseverance",
    summary: "walking with God when endurance is slow and costly",
    focus: "Healing and Comfort",
    scriptureReference: "Romans 5:3-4",
    scriptureText: "Tribulation worketh patience; and patience, experience; and experience, hope.",
    tags: ["suffering", "perseverance", "hope"]
  },
  {
    theme: "Hope of New Creation",
    summary: "looking toward God's renewal of all things",
    focus: "Strengthening Faith",
    scriptureReference: "Revelation 21:5",
    scriptureText: "And he that sat upon the throne said, Behold, I make all things new.",
    tags: ["new creation", "hope", "renewal"]
  },
  {
    theme: "A Life of Worship",
    summary: "offering the whole self to God in ordinary devotion",
    focus: "Building Discipline",
    scriptureReference: "Romans 12:1",
    scriptureText: "Present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service.",
    tags: ["worship", "surrender", "life"]
  },
  {
    theme: "Blessing and Sending",
    summary: "living as a witness of grace for the sake of others",
    focus: "Seeking Purpose",
    scriptureReference: "Matthew 28:19-20",
    scriptureText: "Go ye therefore, and teach all nations... and, lo, I am with you alway, even unto the end of the world.",
    tags: ["mission", "sending", "presence"]
  }
];

const dayRhythms = [
  {
    name: "Receive",
    verb: "receive",
    lens: "Notice what this passage says about God's character before you make it about your performance.",
    question: "What part of God's character do you most need to receive today?",
    action: "Begin the day with one sentence of gratitude before moving to tasks."
  },
  {
    name: "Listen",
    verb: "listen",
    lens: "Read slowly and let one phrase become a companion for the day.",
    question: "Which word or phrase feels worth carrying with you?",
    action: "Write one phrase from the passage and place it somewhere visible."
  },
  {
    name: "Trust",
    verb: "trust",
    lens: "Bring a real pressure point under the promise or invitation in the text.",
    question: "Where is God inviting trust instead of control?",
    action: "Name one concern in prayer, then release one small piece of control."
  },
  {
    name: "Practice",
    verb: "practice",
    lens: "Let belief become one concrete act of obedience, mercy, or patience.",
    question: "What is one faithful action that matches this truth?",
    action: "Choose one small practice you can complete before the day ends."
  },
  {
    name: "Ask",
    verb: "ask",
    lens: "Bring your questions honestly, without pretending everything is already settled.",
    question: "What honest question does this passage raise for you?",
    action: "Write the question down and ask God for wisdom without shame."
  },
  {
    name: "Walk",
    verb: "walk",
    lens: "Imagine this truth shaping your conversations, choices, and pace.",
    question: "How would your next interaction change if this were deeply true?",
    action: "Practice this truth in one conversation or decision today."
  },
  {
    name: "Remember",
    verb: "remember",
    lens: "Look back over the week and notice where God was patient, present, or corrective.",
    question: "What should you remember from this week before you move on?",
    action: "Write a two-sentence prayer of remembrance and hope."
  }
];

export function buildFoundationDevotionals() {
  const generated = [];
  const startDate = new Date("2031-01-01T00:00:00");

  for (let day = 1; day <= 365; day += 1) {
    const week = weeklyThemes[Math.min(Math.floor((day - 1) / 7), weeklyThemes.length - 1)];
    const rhythm = day === 365 ? dayRhythms[6] : dayRhythms[(day - 1) % 7];
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + day - 1);

    generated.push({
      date,
      title: `Day ${String(day).padStart(3, "0")}: ${rhythm.name} - ${week.theme}`,
      scriptureReference: week.scriptureReference,
      scriptureText: week.scriptureText,
      body: `This step in Daily Bread Foundations focuses on ${week.summary}. The goal is not to rush through information, but to let the truth form a steady bridge between what you know and how you live.\n\nToday, ${rhythm.verb} this passage with patience. ${rhythm.lens} If this feels simple, stay with it anyway; deep discipleship is often built through repeated, faithful attention to the basics.`,
      reflectionQuestion: rhythm.question,
      prayerPrompt: `Lord, teach me to ${rhythm.verb} Your truth in the area of ${week.theme.toLowerCase()}. Form what is missing, heal what is weary, and lead me one faithful step at a time.`,
      actionStep: rhythm.action,
      tags: ["daily-bread-foundations", `day-${String(day).padStart(3, "0")}`, ...week.tags],
      categories: [week.focus, "Growing in Scripture", "Building Discipline"]
    });
  }

  return generated;
}
