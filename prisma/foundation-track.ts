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
    tags: ["wilderness", "trust", "daily provision"]
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

const focusPastoralNotes: Record<string, string> = {
  "Strengthening Faith":
    "Faith is strengthened as trust becomes specific. You are not trying to manufacture certainty by force; you are learning to place the weight of your life on the character of God one ordinary decision at a time.",
  "Healing and Comfort":
    "Healing in Scripture is often tender before it is fast. God meets wounded people with presence, truth, correction, and mercy, and He does not despise the slow places where the heart is learning to breathe again.",
  "Overcoming Anxiety":
    "Anxiety often asks you to live several days, months, or outcomes at once. The way of Christ invites you back into today's grace, today's obedience, and today's conversation with the Father who already knows what you need.",
  "Seeking Purpose":
    "Purpose is usually received before it is fully understood. Scripture forms people who can be faithful with the light they have, trusting that God is able to direct the larger story while they take the next honest step.",
  "Learning to Pray":
    "Prayer is not a performance review. It is communion with God. You can come honestly, briefly, silently, tearfully, or with borrowed words from Scripture, because the Father receives His children before they speak well.",
  "Growing in Scripture":
    "The Bible is not merely information to master. It is God's Word forming worship, wisdom, repentance, hope, and endurance in us. Slow attention can do work that hurried reading cannot.",
  "Wrestling with Doubt":
    "Doubt does not have to become distance. Many questions become healthier when they are brought into the presence of Jesus, the witness of Scripture, the wisdom of the church, and patient conversation with trusted believers.",
  "Building Discipline":
    "Discipline is not the opposite of grace. It is one way grace trains our loves. Small repeated practices can become quiet pathways where God reshapes attention, desire, speech, and action.",
  "Forgiveness and Restoration":
    "Restoration begins with truth before God. Scripture never asks you to pretend sin or wounds are small, but it does invite you to trust that mercy, repentance, justice, and healing all belong to God.",
  "Community and Belonging":
    "Christian belonging is more than being around people. It is learning to receive grace through the body of Christ and to become a person who carries others with humility, patience, and love."
};

const storyOpenings = [
  "Imagine someone sitting in a quiet kitchen before the rest of the house wakes up. The coffee is still too hot, the phone is face down, and the day has not yet started making demands. For a few minutes, that person does not need to solve the whole future. They only need to be honest before God about the next breath, the next choice, and the mercy needed for today.",
  "There is a kind of prayer that happens in a parked car after a long day. The engine is off, but the heart is still running. Words do not come out polished. They come out in fragments: Lord, I am tired. Lord, I do not know what to do. Lord, please help me. Scripture has room for prayers like that because God has room for people like that.",
  "Picture someone holding an old letter from a person they love. They do not skim it like a receipt. They slow down because the words carry a voice, a history, and a relationship. The Bible asks for that kind of attention. Not rushed consumption, but receiving words from the God who knows the reader before the reader knows how to answer.",
  "Many people know what it is to smile in public while carrying questions privately. Faith can feel strong on Sunday and fragile by Tuesday afternoon. The kindness of God is that He does not only meet us when we sound certain. He meets trembling trust, half-spoken prayers, and the honest place where belief asks for help.",
  "A small act of faith can look almost invisible. An apology sent before pride can harden. A Bible opened for five quiet minutes. A worry named in prayer instead of rehearsed all morning. These ordinary moments may not feel dramatic, but they are often where the roots of a life with God grow deeper.",
  "At the end of a week, a person can look back and see mostly unfinished tasks. The sink still fills, messages still wait, and the heart still has places that need healing. Yet God often works in ways that are easy to miss while they are happening. Remembering trains the soul to notice mercy that arrived quietly.",
  "Think of a road at dawn, when only the first stretch is visible. The driver cannot see the whole route, but there is enough light for the next turn. Much of discipleship feels like that. God does not always hand us the full map. He gives His Word, His presence, and enough grace for faithful movement.",
  "There are mornings when Scripture feels close, and mornings when it feels like reading through fog. Neither morning surprises God. The invitation is not to pretend every day feels deep. The invitation is to keep bringing the real self to the real God, trusting that faithfulness is formed through returning.",
  "Someone can carry a heavy question for years and still be loved by God. Some questions need study. Some need grief. Some need patient conversation. Some need time. Jesus is not threatened by honest seeking, and Scripture gives us a way to bring the mind and heart into the light together.",
  "A table can become holy ground when a person stops long enough to tell the truth. I am afraid. I am grateful. I need wisdom. I miss who I used to be. I want to begin again. Devotion is not an escape from ordinary life; it is the place where ordinary life is brought before the Lord who redeems it."
];

const focusHeartNotes: Record<string, string> = {
  "Strengthening Faith":
    "If faith feels small, do not despise it. Jesus spoke tenderly about mustard-seed faith because the kingdom of God does not depend on impressive beginnings. Today is an invitation to place one honest ounce of trust on God's character and let Him teach you how to carry more.",
  "Healing and Comfort":
    "If you are coming to this reading weary, let comfort be more than a religious word. In Scripture, comfort is God drawing near with truth strong enough to hold sorrow and mercy gentle enough to touch wounds without crushing them.",
  "Overcoming Anxiety":
    "If anxiety has been loud, the aim is not to shame yourself into calm. Bring the noise into God's presence. Let this passage become a handrail: something steady to hold while your thoughts learn to slow down and return to the Father who sees the whole road.",
  "Seeking Purpose":
    "If purpose feels unclear, begin smaller and holier than a five-year plan. Ask what love requires today, what obedience looks like today, and what good can be done with the light already given. God often reveals calling while we are practicing faithfulness.",
  "Learning to Pray":
    "If prayer feels awkward, you are still welcome. Children learn language by being spoken to and by speaking imperfectly back. Prayer grows the same way: in trust, repetition, silence, Scripture, tears, gratitude, and honest words offered to a Father who is already listening.",
  "Growing in Scripture":
    "If the Bible feels large or unfamiliar, take courage. You do not have to understand everything today. Start by listening for what this passage reveals about God, what it tells the truth about in you, and what it invites you to carry into the next ordinary hour.",
  "Wrestling with Doubt":
    "If doubt is part of your story right now, bring it into the room instead of hiding it in the basement of the soul. Honest questions can become places of deeper faith when they are held with humility, Scripture, prayer, and wise companionship.",
  "Building Discipline":
    "If discipline sounds cold, remember that Christian practice is not a way to earn God's love. It is a way to make room for the love already given. Small habits become trellises where grace can train attention, desire, patience, and courage.",
  "Forgiveness and Restoration":
    "If forgiveness is tender territory, move slowly and truthfully. The gospel never asks you to call evil good or wounds small. It invites you to meet God in the truth, receive mercy, seek wisdom, and take the next faithful step toward restoration where it is possible.",
  "Community and Belonging":
    "If belonging has been painful or complicated, know this: Christian community is not meant to be a stage for pretending. At its best, it is a table where grace teaches people to bear burdens, speak truth gently, repent quickly, and stay near one another in love."
};

const rhythmFormationNotes: Record<string, string> = {
  Receive:
    "Receiving comes before striving. Let the passage speak first about who God is and what He gives before you turn it into a list of things you must prove.",
  Listen:
    "Listening is an act of humility. Instead of rushing to the familiar conclusion, slow down enough for one word or phrase to question, comfort, or correct you.",
  Trust:
    "Trust is faith becoming concrete. Bring one real concern into the light of this passage and ask what would change if God's promise were more solid than your fear.",
  Practice:
    "Practice protects devotion from staying abstract. The point is not to do something impressive, but to let truth become visible in one small act of obedience or mercy.",
  Ask:
    "Asking keeps the heart open. You do not need to hide confusion from God; questions can become a doorway into wisdom when they are carried with reverence and patience.",
  Walk:
    "Walking with God means letting Scripture travel with you into conversations, errands, work, family, decisions, and rest. This truth is meant for the whole day.",
  Remember:
    "Remembering gives shape to gratitude and repentance. Look back honestly: where did God sustain you, expose something, comfort you, or invite you to keep growing?"
};

const weeklyProgressionNotes = [
  "Today introduces the week's theme. Do not rush to mastery. Ask God for a teachable beginning.",
  "Today invites deeper attention. Return to the passage as if there is still more mercy and wisdom to receive.",
  "Today brings the theme closer to ordinary pressure. Notice where this truth meets a real fear, habit, or desire.",
  "Today asks for embodied faith. Let the reading become one specific response before the day ends.",
  "Today gives room for honest questions. Let curiosity, resistance, or confusion become prayer instead of avoidance.",
  "Today carries the truth into relationships and choices. Watch how this Scripture wants to shape your presence with others.",
  "Today gathers the week in remembrance. Name what God showed you, and carry one phrase forward."
];

type EditorialDevotional = {
  body: string;
  reflectionQuestion: string;
  prayerPrompt: string;
  actionStep: string;
};

const editorialDevotionals: Record<number, EditorialDevotional> = {
  1: {
    body: [
      "There is a particular kind of mercy that shows up before the house is awake. The room is still dim. The phone is close enough to reach, but for once it stays quiet. Yesterday may still be sitting on the edge of the bed: the unfinished conversation, the thing you regret saying, the worry you carried into sleep. Nothing has been fixed yet, but morning has arrived anyway.",
      "Lamentations 3 was not written from a life that had gone smoothly. It rises out of grief, ruin, and honest sorrow. That matters. When Jeremiah says God's mercies are new every morning, he is not giving a pretty sentence for people whose lives are already easy. He is testifying that mercy can meet a person in the rubble and still be real.",
      "This is where Faithful Foundations begins: not with your effort, your consistency, your Bible knowledge, or your ability to feel spiritual on command. It begins with mercy. You are not invited to prove you deserve another morning with God. You are invited to receive the morning as a gift from the God whose compassion has not run out.",
      "Some days, faith starts small. It may look like sitting still for thirty seconds and saying, Lord, I am here. It may look like opening Scripture even though your attention feels scattered. It may look like admitting that you need mercy before you need a plan. That is not failure. That is a true beginning.",
      "Let this first step be gentle and honest. You are not behind. You are not disqualified by the days you missed before this one. The path begins where mercy meets you today, and mercy is already here."
    ].join("\n\n"),
    reflectionQuestion: "Where do you most need to receive God's mercy before trying to improve, explain, or fix yourself?",
    prayerPrompt:
      "Father, thank You that Your mercies are new this morning. Meet me honestly where I am, not where I pretend to be. Teach me to begin with grace before effort, and let one small faithful step be enough for today.",
    actionStep: "Before checking messages or moving to tasks, pause for ten seconds and say aloud: God's mercy is new for me today."
  },
  2: {
    body: [
      "A person can read the same verse for years and suddenly hear it differently on an ordinary morning. Maybe it is because life has made the words heavier. Maybe it is because weariness has made the heart quieter. Maybe it is simply because the Spirit is kind, and He knows when a familiar truth needs to become personal.",
      "The mercies of the Lord are not only large rescue moments. They are also small provisions: breath in your lungs, enough light for the next decision, a softened answer where anger could have risen, a memory of Scripture arriving before panic takes over. Mercy often comes quietly enough that a hurried soul can miss it.",
      "Today is about listening. Not listening for a dramatic sign, and not forcing yourself to feel something impressive. Listen to the verse as if it is being spoken into the exact life you have today. His compassions fail not. They are new every morning. Great is thy faithfulness.",
      "If your mind starts making a list of reasons you should have done better by now, let the verse interrupt the list. God's faithfulness is not fragile. His compassion does not depend on your emotional weather. The invitation is not to perform for mercy, but to notice it and receive it.",
      "Carry one phrase with you today. Let it sit beside you while you work, drive, clean, text, wait, or rest. You may find that one phrase from God can become a quiet companion in places where your thoughts usually run alone."
    ].join("\n\n"),
    reflectionQuestion: "Which phrase from Lamentations 3:22-23 feels most needed in your life today, and why?",
    prayerPrompt:
      "Lord, slow me down enough to hear Your mercy. Let Your Word travel with me into the ordinary parts of this day. Help me notice compassion I would normally rush past.",
    actionStep: "Write one phrase from the verse somewhere visible and return to it at least twice today."
  },
  3: {
    body: [
      "There are mornings when mercy sounds true for other people but difficult to trust for yourself. You can believe God is kind in general while still wondering if He is patient with the particular messiness of your own heart. Many people live there more often than they admit.",
      "Lamentations gives us mercy in the language of survival: we are not consumed because His compassions fail not. That means God's compassion is not thin decoration over life. It is the reason despair does not get the final word. It is the reason judgment is not the only sentence. It is the reason a person can begin again without pretending yesterday was harmless.",
      "Trust does not always feel like confidence. Sometimes trust sounds like, Lord, I want this to be true for me. Sometimes it looks like bringing one shame-filled memory into the light and refusing to let it name you more loudly than God does. Sometimes it is simply choosing to stay near the verse instead of running from it.",
      "Mercy is not permission to stay numb, careless, or unchanged. Mercy is the safest place to tell the truth. Because God is faithful, you can face what needs healing. Because His compassion has not failed, you can confess what needs forgiveness. Because His morning is new, you can take the next step without being owned by the last one.",
      "Today, let mercy become concrete. Name one place where you are tempted to believe you are beyond help, and place that place under the faithfulness of God."
    ].join("\n\n"),
    reflectionQuestion: "Where is God inviting you to trust His mercy instead of rehearsing shame, fear, or regret?",
    prayerPrompt:
      "Merciful God, help me trust that Your compassion is stronger than my fear. Bring truth where I am hiding and hope where I have grown tired. Teach me to stand under Your faithfulness today.",
    actionStep: "Name one regret or fear in prayer, then answer it with this phrase: His compassions fail not."
  },
  4: {
    body: [
      "Mercy becomes more than an idea when it changes how we move through the day. A father lowers his voice instead of snapping. A woman answers a difficult message with honesty but not cruelty. A tired person chooses not to numb out, but to pray one sentence before reaching for distraction. These moments may never be noticed by a crowd, but they matter.",
      "The mercy of God is not meant to stay in the morning reading. It is meant to become patience in the kitchen, courage in the meeting, tenderness in the apology, endurance in the waiting room, and humility in the conversation you would rather avoid.",
      "Lamentations says God's mercies are new every morning. If mercy is new for you, it can also become new through you. You do not have to manufacture a heroic act. The practice of faith often begins with one small response that matches the truth you have received.",
      "Ask yourself: if I really believed mercy had met me this morning, what would be different before the day ends? Would I speak differently? Rest differently? Confess faster? Thank God for something small? Offer someone else the gentleness I am asking God to give me?",
      "Do not make the practice too large. Grace grows well in ordinary soil. Choose one faithful action, and let it be your way of saying yes to the mercy of God today."
    ].join("\n\n"),
    reflectionQuestion: "What is one concrete act of patience, gratitude, honesty, or mercy that would fit today's Scripture?",
    prayerPrompt:
      "Lord, let the mercy I receive become mercy I practice. Shape one ordinary moment today so that Your compassion is visible in my words, choices, or pace.",
    actionStep: "Choose one small act of mercy to practice today: a gentle reply, an apology, a thank-you, or a quiet prayer before reacting."
  },
  5: {
    body: [
      "Questions often arrive after the devotional book is closed. If God's mercies are new every morning, why do I still feel tired? If His compassion does not fail, why did that wound happen? If God is faithful, why do I still struggle to trust Him?",
      "Faith does not become stronger by pretending those questions are not there. Lamentations itself is full of grief. The Bible does not rush sorrow out of the room so faith can sound more polished. It gives sorrow language, then teaches sorrow where to look.",
      "Today's step is to ask honestly without letting the question become a locked door. A faithful question is not an accusation dressed up in religious words. It is a real ache brought into the presence of God. Lord, help me understand. Lord, help me wait. Lord, keep me from becoming hard while I do not yet see clearly.",
      "Some answers come through study. Some come through wise counsel. Some come slowly as the heart heals enough to receive them. Some remain mysterious, but even then, God does not abandon the person who asks from a humble and wounded place.",
      "Bring one question into prayer today. Do not tidy it up first. Let mercy meet you in the asking."
    ].join("\n\n"),
    reflectionQuestion: "What honest question rises when you hear that God's mercies are new every morning?",
    prayerPrompt:
      "God of mercy, I bring You my questions without pretending they are easy. Keep my heart open to Scripture, wisdom, and Your patient care. Help me ask without running away from You.",
    actionStep: "Write one question you have about mercy, suffering, trust, or beginning again. Turn it into a one-sentence prayer."
  },
  6: {
    body: [
      "Mercy is tested in traffic, in family tension, in the quiet irritation that comes when plans change, and in the private thoughts no one else hears. It is one thing to receive mercy in the morning. It is another to walk in it when the day starts pressing on the tender places.",
      "The faithfulness of God is not only comfort for private reflection. It is strength for public and ordinary obedience. Because His compassion has not failed, you do not have to spend the day protecting yourself with harshness. Because His mercy is new, you can risk a softer answer, a truthful confession, a slower judgment, a more patient presence.",
      "Walking with God today does not mean you will feel peaceful every minute. It means returning to mercy when you notice yourself drifting. It means letting the verse interrupt the spiral. It means asking, What would it look like to carry God's compassion into this next interaction?",
      "You may only remember once. That is still a gift. One remembered moment can become a doorway. One pause before speaking can change the temperature of a room. One quiet prayer can keep resentment from becoming the script of the day.",
      "Let mercy travel with you. Not as a slogan, but as a way of being present with God and with people."
    ].join("\n\n"),
    reflectionQuestion: "How would your next conversation or decision change if you carried God's fresh mercy into it?",
    prayerPrompt:
      "Lord, let Your mercy travel with me today. When I become hurried, defensive, or discouraged, bring me back to Your compassion and teach me to walk gently.",
    actionStep: "Before one conversation today, pause and pray: Lord, let mercy shape what I say next."
  },
  7: {
    body: [
      "At the end of a week, people often remember what went wrong more easily than what held them up. The sharp word. The missed prayer. The distracted reading. The thing still unresolved. The mind can become very skilled at collecting evidence against hope.",
      "But Lamentations invites another kind of remembering. Not denial. Not pretending the week was easier than it was. Remembering mercy means looking back truthfully and asking, Where was I not consumed? Where did compassion meet me quietly? Where did God give enough strength for one more step?",
      "Maybe mercy looked like endurance. Maybe it looked like conviction. Maybe it looked like sleep after a hard day, a text from a friend, a verse that stayed with you, or the simple fact that you are still here and still turning toward God.",
      "Great is thy faithfulness is not a slogan for perfect weeks. It is a confession for real ones. The faithfulness of God is seen not only in what felt victorious, but also in the grace that kept you when you were weak.",
      "Before you move to the next theme, gather the week with honesty. Name one mercy. Name one place you still need help. Then let both become prayer."
    ].join("\n\n"),
    reflectionQuestion: "Looking back over this week, where can you recognize mercy that you might have missed at first?",
    prayerPrompt:
      "Faithful God, thank You for carrying me through this week. Help me remember mercy truthfully, receive correction humbly, and continue the path without shame.",
    actionStep: "Write two sentences: one naming a mercy from this week, and one naming where you still need God's help."
  },
  8: {
    body: [
      "Stillness can feel almost suspicious in a world that rewards noise. The day starts, and immediately there are messages, headlines, errands, responsibilities, and the inner pressure to prove you are keeping up. Even silence can feel like wasted time when the soul has been trained to hurry.",
      "Psalm 46 speaks into a world that is not calm. Mountains move. Waters roar. Nations rage. The command to be still is not given because life is simple. It is given because God is God in the middle of what feels unstable.",
      "Be still, and know that I am God is not a demand to empty your mind or pretend nothing is wrong. It is an invitation to stop clutching the controls long enough to remember who holds the world. Stillness is not passivity. It is trust making room to breathe.",
      "Today begins a week of learning to be still. You may only manage a minute. That is fine. A minute honestly offered is better than a long performance full of resentment. Bring your noisy self to God. Sit before Him without trying to become impressive.",
      "The path does not skip ahead when you are slow. Stillness itself may be today's faithful step."
    ].join("\n\n"),
    reflectionQuestion: "What makes stillness difficult for you right now: fear, hurry, distraction, responsibility, or something else?",
    prayerPrompt:
      "Lord, teach me to be still without pretending life is easy. Help me remember that You are God, and I am safe to pause in Your presence.",
    actionStep: "Set a timer for one quiet minute. Sit before God, breathe slowly, and repeat: You are God, and I am here."
  },
  9: {
    body: [
      "Sometimes a room becomes quiet before the heart does. You can turn off the television, silence the phone, and close the door, but still hear the arguments, worries, plans, and unfinished lists moving around inside you.",
      "Psalm 46 does not shame that inner noise. It simply gives the soul a stronger center: know that I am God. Stillness grows as attention returns again and again to the Lord. Not once perfectly, but many times gently.",
      "Listening in stillness is different from waiting for a dramatic feeling. It is more like sitting with someone trustworthy long enough to stop performing. You may notice a phrase from Scripture. You may notice a fear you have been avoiding. You may notice how tired you are. All of that can become prayer.",
      "The point is not to master silence. The point is to make room for the truth of God to become louder than the pressure of everything else. Be still does not mean you have nothing to do. It means you are not alone in what must be done.",
      "Today, listen for one word or phrase in the verse. Let it become a quiet anchor."
    ].join("\n\n"),
    reflectionQuestion: "Which word or phrase from Psalm 46:10 do you most need to sit with today?",
    prayerPrompt:
      "God, quiet me enough to listen. When my thoughts scatter, gently bring me back to who You are. Let one phrase from Your Word steady me today.",
    actionStep: "Choose one word from the verse and write it down. Return to it whenever you feel hurried."
  },
  10: {
    body: [
      "Control often disguises itself as responsibility. We tell ourselves we are only being careful, only thinking ahead, only making sure nothing falls apart. Sometimes that is true. But sometimes beneath the planning is fear: if I do not hold everything tightly, everything will collapse.",
      "Be still, and know that I am God gently exposes the limits of control. It does not invite carelessness. It invites trust. You can do the next right thing without pretending to be sovereign over every outcome.",
      "There is relief in admitting you are not God. You do not have to know every answer by noon. You do not have to fix every person. You do not have to carry every possible future in your body today. The Lord is not asking you to be absent from your life. He is asking you to live it as a creature held by the Creator.",
      "Trust may look like releasing one outcome in prayer. It may look like doing one task faithfully and refusing to mentally live in ten more. It may look like saying, Lord, this matters to me, but it belongs to You before it belongs to me.",
      "Stillness is where clenched hands begin to open."
    ].join("\n\n"),
    reflectionQuestion: "What outcome, person, problem, or future are you trying to hold more tightly than God is asking you to hold it?",
    prayerPrompt:
      "Lord, I confess that control often feels safer than trust. Help me do what love requires today and release what belongs to You.",
    actionStep: "Name one concern in prayer, open your hands physically, and say: This matters, Lord, and I entrust it to You."
  },
  11: {
    body: [
      "Stillness becomes real when it interrupts a habit. The hand reaches for the phone, and instead there is a pause. The sharp reply forms, and instead there is a breath. The anxious thought begins its familiar loop, and instead the heart turns toward God.",
      "Psalm 46:10 is not only a verse for quiet mornings. It is a practice for tense afternoons. Be still can become a small act of resistance against the belief that hurry, fear, or reaction must be in charge.",
      "You may not be able to change the whole pace of your life today. But you can create one small sanctuary inside it. A minute before lunch. A breath before responding. A walk without headphones. A prayer before opening the next app.",
      "The purpose is not to become impressive at spiritual discipline. The purpose is to remember God in the body you have, the schedule you have, and the day you are actually living. Stillness practiced in ordinary places becomes a quiet declaration: God is God here too.",
      "Choose one small pause today and guard it gently."
    ].join("\n\n"),
    reflectionQuestion: "Where could one small pause change the way you respond today?",
    prayerPrompt:
      "Lord, teach me to practice stillness in real life. Help me pause before I react, breathe before I rush, and remember You in ordinary moments.",
    actionStep: "Choose one daily habit, such as unlocking your phone or entering your car, and attach a ten-second prayer to it today."
  },
  12: {
    body: [
      "Stillness often raises questions. What if I slow down and fall behind? What if I stop distracting myself and feel things I have been avoiding? What if silence shows me how tired I really am?",
      "Those questions are not enemies. They may be invitations. Sometimes hurry protects us from grief. Sometimes noise protects us from conviction. Sometimes busyness protects us from the ache of wanting God but not knowing how to draw near.",
      "Psalm 46 gives a safe place for these questions because the center is not your ability to manage silence. The center is God Himself. Be still, and know that I am God. The Lord can meet what rises when you stop running.",
      "If discomfort appears in stillness, do not panic. Bring it with you. Lord, I feel restless. Lord, I am afraid of being quiet. Lord, I do not know what to do with this sadness. Honest prayer is one way stillness becomes communion instead of mere quiet.",
      "Ask one honest question today, then stay with God long enough to let the question be held."
    ].join("\n\n"),
    reflectionQuestion: "What question or discomfort comes up when you consider being still with God?",
    prayerPrompt:
      "God, meet me in the questions that surface when I slow down. Help me bring restlessness, fear, grief, or distraction into Your patient presence.",
    actionStep: "Write one honest question about stillness, hurry, or trust. Offer it to God without trying to solve it immediately."
  },
  13: {
    body: [
      "A still person can change the atmosphere of a room. Not because they are passive or detached, but because they are less ruled by panic. Their words come slower. Their listening becomes deeper. Their presence makes space for others to breathe.",
      "Psalm 46:10 is personal, but it is not private in the sense of being disconnected from others. When you remember that God is God, you do not need to make yourself the savior of every moment. You can enter conversations with more humility, patience, and courage.",
      "Stillness may help you listen before correcting. It may help you ask a better question. It may help you notice someone else's burden instead of only your own urgency. It may help you refuse the pressure to win an argument and instead seek peace with truth.",
      "This does not mean avoiding hard conversations. Sometimes stillness gives the courage to have them without cruelty. Sometimes knowing God is God frees you to tell the truth without trying to control how every person responds.",
      "Let stillness become love today. Carry it into one interaction."
    ].join("\n\n"),
    reflectionQuestion: "How could remembering that God is God change the way you enter one relationship or conversation today?",
    prayerPrompt:
      "Lord, let stillness become love in me. Slow my defensiveness, deepen my listening, and help me speak with truth and gentleness.",
    actionStep: "In one conversation today, listen fully before answering. Let your pause become prayer."
  },
  14: {
    body: [
      "A week of stillness may not make life suddenly quiet. The same responsibilities may remain. The same unanswered questions may still be waiting. But something can begin to shift beneath the surface: a little more space between pressure and reaction, a little more honesty in prayer, a little more remembrance that you are not carrying the world alone.",
      "Psalm 46 does not end with human calm as the greatest reality. It points to God exalted among the nations and in the earth. Stillness is not only about personal peace. It is about worship. It is the soul yielding to the truth that the Lord is greater than the noise.",
      "Look back gently. Where did you notice hurry? Where did you pause? Where did stillness feel difficult? Where did God meet you anyway? Do not grade yourself harshly. This path is not built on spiritual performance. It is built on returning.",
      "Maybe the only victory this week was noticing how restless you are. That is not small. Awareness can become an altar when it leads you back to God. Maybe you practiced one quiet minute. Maybe you prayed one honest sentence. Maybe you are still learning to want stillness. Grace can work with all of that.",
      "Carry this forward: you are allowed to slow down in the presence of God. Your path waits. Your Father is not rushed."
    ].join("\n\n"),
    reflectionQuestion: "What did this week teach you about stillness, hurry, trust, or God's presence?",
    prayerPrompt:
      "Lord, thank You for meeting me in both quiet and noise. Help me remember that You are God, that I am held, and that I can keep returning without shame.",
    actionStep: "Write two sentences: one thing you noticed about your hurry, and one way you want to practice stillness next week."
  },
  15: {
    body: [
      "There is a small lamp in many homes that does not light the whole room. It only lights the chair beside it, the page beneath it, the next few steps across the floor. No one complains that it fails to illuminate the entire neighborhood. Its gift is smaller and kinder than that: it gives enough light for where a person actually is.",
      "Psalm 119:105 says God's Word is a lamp unto our feet and a light unto our path. Notice the tenderness of that image. Scripture is not described as a floodlight that removes every mystery at once. It is a lamp close enough for walking. It gives enough light for obedience, enough truth for trust, enough direction for the next faithful step.",
      "Many people feel intimidated by the Bible because they think they must understand everything before they can begin. But a lamp does not ask you to understand the whole road. It asks you to take the step made visible. Today's beginning is not mastery. It is receiving Scripture as a gift from the God who knows how much light you need today.",
      "If the Bible has ever felt confusing, distant, or heavy with pressure, start again gently. Ask one simple question: What does this passage show me about God? Then ask another: What is one step this light makes possible?",
      "You are not behind because you do not know everything. You are invited because God still speaks, still guides, and still gives light for the path beneath your feet."
    ].join("\n\n"),
    reflectionQuestion: "Where do you need Scripture to give you enough light for the next step, not the whole road?",
    prayerPrompt:
      "Lord, thank You for giving Your Word as light. Help me receive Scripture without fear or performance. Show me enough truth for today's next faithful step.",
    actionStep: "Read Psalm 119:105 slowly three times. After the third time, write one sentence that begins: Today, God's Word gives light for..."
  },
  16: {
    body: [
      "A child learning to walk does not need a lecture on every road they will ever travel. They need a hand nearby, a voice of encouragement, and enough space to take the next step. They wobble. They stop. They try again. Progress happens through trust before it happens through skill.",
      "Learning Scripture can feel like that. You may open the Bible and feel unsure where to begin. You may wonder whether you are reading it correctly or whether everyone else understands more than you do. Psalm 119:105 gives a quieter picture: God's Word is a lamp. Lamps are meant to be used slowly, close to the ground, step by step.",
      "Today is about listening. Let one phrase become a companion. Do not rush to application before you have listened for God's character. The verse says Your word. Scripture is not merely inspirational material. It belongs to the Lord. It carries His voice, His wisdom, His authority, and His invitation.",
      "If one word stands out, stay there. Light. Lamp. Feet. Path. Each word has room. Maybe you need light because life feels unclear. Maybe you need feet because obedience has to become practical. Maybe you need path because you are tired of wandering without direction.",
      "The goal is not to sound spiritual. The goal is to listen long enough for the Word to become near."
    ].join("\n\n"),
    reflectionQuestion: "Which word or phrase from Psalm 119:105 feels most important for your actual life today?",
    prayerPrompt:
      "God, teach me to listen to Your Word with humility. Let one phrase stay with me today and guide the way I think, speak, choose, and pray.",
    actionStep: "Choose one word from the verse and carry it with you today. Put it on a note, lock screen, or journal page."
  },
  17: {
    body: [
      "There are moments when a person wants God to hand them the whole map. The job decision. The relationship question. The family concern. The future that feels uncertain. We ask for a map because maps make us feel safer. But Scripture often gives something more relational than a map: God gives light and asks us to walk with Him.",
      "A lamp does not remove the need for trust. It creates a place where trust can move. Psalm 119:105 does not promise that every turn will be visible from the beginning. It promises that God's Word is sufficient for the step in front of you.",
      "This can be frustrating when you want certainty. But it can also be freeing. You do not have to solve your entire life today. You do not have to predict every consequence. You can ask what Scripture makes clear right now: tell the truth, seek wisdom, forgive as you have been forgiven, pray instead of spiraling, love your neighbor, refuse bitterness, take courage.",
      "Trusting Scripture means letting God's revealed wisdom outrank the loudest voice in the room, even when that voice is fear, pride, or hurry inside your own mind. It means asking not only, What do I want? but, What has God already made light enough for obedience?",
      "Take one concern and bring it under the lamp. Let Scripture show you one faithful step."
    ].join("\n\n"),
    reflectionQuestion: "What situation are you asking God to fully map out when He may be giving enough light for one step?",
    prayerPrompt:
      "Lord, I want the whole map, but I trust You with the path. Let Your Word show me one faithful step, and give me courage to take it.",
    actionStep: "Name one decision or concern. Write one biblical truth that can guide your next step in it."
  },
  18: {
    body: [
      "A lamp left on the shelf does not help anyone cross a dark room. It may be beautiful. It may be expensive. It may have a story behind it. But light is meant to be brought near to the place where walking happens.",
      "The Bible can become something we respect from a distance without letting it guide us up close. We may agree that Scripture is true while still making decisions mostly from fear, habit, impulse, or the expectations of others. Psalm 119:105 invites a closer kind of trust: Your word is a lamp unto my feet.",
      "Feet are practical. They go places. They stand in kitchens, offices, school hallways, hospital rooms, churches, grocery lines, and quiet bedrooms. If Scripture is a lamp to our feet, then God's Word is meant to meet real movement, not only private thought.",
      "Today is a practice day. Choose one ordinary moment where Scripture can become visible. Let patience become a slower answer. Let honesty become a truthful sentence. Let mercy become a text you send. Let trust become a decision not to rehearse the same fear all afternoon.",
      "The step may be small, but small obedience under God's light is never wasted."
    ].join("\n\n"),
    reflectionQuestion: "What is one practical place where Scripture needs to move from agreement into action today?",
    prayerPrompt:
      "Lord, let Your Word become light for my actual feet. Teach me to practice one truth in one ordinary place today.",
    actionStep: "Choose one concrete action that matches Scripture: tell the truth, pause before reacting, apologize, pray, or encourage someone."
  },
  19: {
    body: [
      "Some questions come from rebellion, but many come from hunger. A person reads Scripture and wonders, Why does this matter? How do I understand this? What if I have misunderstood God? What if I cannot live up to what I read? Those questions can become barriers, or they can become doorways.",
      "Psalm 119:105 welcomes questions by giving us an image we can return to. If God's Word is a lamp, then confusion is not the end of the story. A lamp can be picked up. A path can be walked slowly. Understanding can grow over time.",
      "Faithful Bible reading does not mean every passage is instantly clear. It means we keep bringing our minds and hearts to the God who speaks. We ask for wisdom. We read in context. We listen with the church. We remain humble about difficult passages. We obey what is clear while continuing to learn what is not.",
      "If a question rises today, do not hide it. Write it down. Ask it reverently. Bring it to prayer or Ask in Faith or a trusted believer. The goal is not to win an argument with the Bible. The goal is to be formed by the God who gave it.",
      "A sincere question, held under the light, can become part of the path."
    ].join("\n\n"),
    reflectionQuestion: "What honest question do you have about Scripture, guidance, obedience, or trusting God's Word?",
    prayerPrompt:
      "God, meet me in my questions about Your Word. Keep me humble, patient, and open to wisdom. Help me seek truth without fear.",
    actionStep: "Write one question about Scripture and bring it to prayer. If it still feels heavy, ask it in Ask in Faith later."
  },
  20: {
    body: [
      "A person walking with a lamp has to keep carrying it. Light for one step does not mean the whole journey is finished. The lamp is lifted again, and again, and again. This repeated receiving is not failure. It is how walking works.",
      "Scripture is meant to travel with us. The verse you read in the morning may become necessary at noon. The truth you underlined may return when your patience thins, when fear starts talking, or when a choice asks for wisdom.",
      "Walking with God's Word means letting Scripture interrupt the automatic path. Maybe your automatic path is worry. Maybe it is anger. Maybe it is avoidance, people-pleasing, self-protection, or despair. The lamp does not shame you for needing light. It simply gives light where the path has grown dark.",
      "Today, imagine carrying Psalm 119:105 into one interaction. What would change if God's Word, not your first impulse, lit the next step? Would you listen better? Speak less sharply? Ask for help? Refuse a hidden compromise? Rest instead of proving yourself?",
      "Let the Word walk with you. Not as a rulebook held at arm's length, but as light near your feet."
    ].join("\n\n"),
    reflectionQuestion: "How could Scripture interrupt one automatic habit or reaction in your life today?",
    prayerPrompt:
      "Lord, let Your Word travel with me. When I drift into old reactions, bring Your light near and help me walk differently.",
    actionStep: "Before one interaction or task today, pause and ask: What would Scripture make light here?"
  },
  21: {
    body: [
      "Looking back over a week with Scripture can reveal more than we noticed while the days were happening. One verse may have been easy to forget, but not useless. One small act of obedience may have seemed unimpressive, but not meaningless. One honest question may still be unanswered, but it may have moved into the light.",
      "Psalm 119:105 gives a picture of steady guidance, not spiritual fireworks. A lamp does not usually surprise us. It simply keeps making the next step visible. Many people miss God's faithfulness because they only look for dramatic rescue and overlook quiet guidance.",
      "This week, maybe Scripture gave you comfort. Maybe it corrected you. Maybe it exposed your desire for control. Maybe it helped you pray. Maybe it showed you how much you still need to learn. All of that belongs in the life of faith.",
      "Do not measure this week by how perfectly you remembered the verse. Measure it by whether you returned. The path is formed by returning to the light. If you missed a day, the path did not leave you. If you forgot a practice, grace still invites you back.",
      "Remember one way God's Word gave light, and carry that gratitude into the next step."
    ].join("\n\n"),
    reflectionQuestion: "Where did Scripture give even a small amount of light, correction, comfort, or direction this week?",
    prayerPrompt:
      "Lord, thank You for the light of Your Word. Help me remember where You guided me this week, and keep teaching me to return without shame.",
    actionStep: "Write two sentences: one way Scripture helped you this week, and one place you still need light."
  },
  22: {
    body: [
      "Some people stop praying because they think they are bad at it. Their words feel clumsy. Their attention wanders. They imagine other people praying with beautiful sentences and steady emotions, while their own prayer sounds like a grocery list, a sigh, or a whispered help.",
      "Jesus gives a different picture. In Matthew 6:6, He points away from performance and toward the Father who sees in secret. Prayer is not a stage. It is not a speech contest. It is not a way to sound impressive to God or to yourself. It is communion with the Father who already knows you.",
      "This is deeply freeing. You do not have to polish your prayer before God will receive it. You do not have to make it long enough to count. You do not have to feel holy enough to begin. The secret place is not a hiding place from God; it is a place where pretense can fall away.",
      "Today begins a week of prayer without performance. Start small. Start honest. Start in the language you actually have. God is not waiting for a better version of you to show up. He is inviting you to come as a child.",
      "A short honest prayer is still a prayer."
    ].join("\n\n"),
    reflectionQuestion: "What pressure or expectation makes prayer feel harder than it needs to be?",
    prayerPrompt:
      "Father, teach me to pray without performing. Help me come to You honestly, briefly, and trustingly, knowing You see me in secret and receive me with love.",
    actionStep: "Pray one honest sentence today. Let it be simple enough that you can actually mean it."
  },
  23: {
    body: [
      "There is a difference between being quiet and being honest. A person can sit in silence while still hiding. They can say the right religious words while keeping the real ache locked away. Jesus does not invite us into secrecy so we can pretend better. He invites us into secrecy so we can stop pretending.",
      "When Jesus says to enter your room and shut the door, He is not creating a rule about architecture. He is describing prayer freed from the need to be watched. No audience. No spiritual image to manage. No need to prove that you know the right phrases.",
      "Listening in prayer may begin with noticing what you are actually carrying. Anxiety. Gratitude. Anger. Shame. Confusion. Hope. Desire. Exhaustion. Instead of editing those things out, bring them before the Father. He already sees in secret. Prayer becomes honest when we stop acting as though He does not.",
      "If you do not know what to say, begin there. Father, I do not know what to say. If you are distracted, say that. If you are grateful, say that. If you are afraid, say that. Honest words can become the doorway to deeper prayer.",
      "Today, listen for what is real inside you, then speak to God from that place."
    ].join("\n\n"),
    reflectionQuestion: "What is one honest thing you have been carrying that you can bring into prayer today?",
    prayerPrompt:
      "Father, You see what is hidden and still invite me near. Help me pray from the truth, not from the image I try to manage.",
    actionStep: "Begin prayer with this sentence: Father, what is true in me right now is..."
  },
  24: {
    body: [
      "Many of us treat prayer like a test we have already failed. We wonder if we prayed enough, felt enough, believed enough, or said the right thing. Before long, prayer becomes another place where the soul keeps score.",
      "Jesus moves prayer away from scorekeeping. The Father who sees in secret is not confused by simple words. He is not impressed by religious theater. He is not reluctant to hear the person who comes quietly, awkwardly, or with a distracted mind that keeps returning.",
      "Trusting God in prayer means believing that the Father receives you before your words are impressive. This does not make prayer careless. It makes prayer safe. You can confess sin, ask for help, give thanks, lament honestly, and sit silently because prayer is grounded in relationship, not performance.",
      "Today, trust may look like praying even though you do not feel spiritual. It may look like returning after distraction. It may look like believing that God heard the first honest sentence, not only the polished one you wish you had said.",
      "The Father is not grading your prayer. He is inviting your presence."
    ].join("\n\n"),
    reflectionQuestion: "Where do you need to trust that God receives your prayer even when it feels small, distracted, or imperfect?",
    prayerPrompt:
      "Father, help me trust Your welcome more than my performance. Teach me to pray because I am loved, not because I am trying to earn Your attention.",
    actionStep: "Pray for two minutes without correcting yourself. If you get distracted, gently return with: Father, I am here."
  },
  25: {
    body: [
      "Practice can sound cold until we remember that practice is how love learns a language. A musician practices so the song can move through them more freely. A child practices writing letters until words become possible. Prayer practice is not about earning love. It is about making room to respond to love.",
      "Jesus' words in Matthew 6:6 give us a practice: go in, shut the door, pray to your Father. The instruction is simple enough to be lived. Find a hidden place, even if it is only a quiet corner of the heart. Turn from the audience. Speak to the Father.",
      "You may not have a literal private room. You may have a parked car, a shower, a short walk, a moment before sleep, or a chair before anyone else wakes up. The physical place matters less than the movement away from performance and toward God.",
      "Today, practice prayer like a small appointment with love. Not long. Not dramatic. Just real. Let the hiddenness become a gift. You are not trying to be seen praying. You are meeting the One who already sees.",
      "One faithful minute can begin to reshape the way a person comes to God."
    ].join("\n\n"),
    reflectionQuestion: "What small hidden place or moment could become a regular place of prayer for you?",
    prayerPrompt:
      "Father, help me build a simple rhythm of prayer. Meet me in hidden places and teach me to come without needing to impress anyone.",
    actionStep: "Choose one specific time and place for a one-minute prayer today. Keep it simple and repeatable."
  },
  26: {
    body: [
      "It is possible to ask God questions while trying to sound more settled than we are. We dress up confusion in careful language. We soften anger until it sounds acceptable. We avoid the questions that might make us feel exposed.",
      "But the Father who sees in secret already knows the question beneath the sentence. Prayer without performance gives us permission to ask plainly. Lord, why am I so afraid? Why do I avoid You when I need You most? Why does prayer feel difficult? What am I protecting by staying busy?",
      "Questions in prayer are not automatically unbelief. They can become a form of turning toward God. The danger is not having a question. The danger is carrying the question everywhere except into God's presence.",
      "Today, let one question become prayer. Do not demand an instant answer. Do not pretend the question is smaller than it is. Hold it before the Father who sees, knows, and loves with more patience than you can measure.",
      "The secret place is safe enough for honest questions."
    ].join("\n\n"),
    reflectionQuestion: "What question about prayer, God, yourself, or trust do you need to bring honestly before the Father?",
    prayerPrompt:
      "Father, I bring You the question I have been carrying. Keep me near while I wait for wisdom, and help me trust Your love in the asking.",
    actionStep: "Write one honest question as a prayer. Begin with: Father, I do not understand..."
  },
  27: {
    body: [
      "Prayer does not end when the quiet moment ends. A person can leave the room and carry the secret place into the day. Not by staying withdrawn, but by remembering that the Father who heard in private is still present in public.",
      "Matthew 6:6 frees us from living for the eyes of others. If the Father sees, then we do not need every act of faithfulness to be noticed. We can serve quietly. We can apologize without announcing our growth. We can resist temptation when no one applauds. We can choose mercy without turning it into a performance.",
      "Walking in prayer means letting communion with God shape ordinary behavior. The hidden conversation becomes visible in patience, humility, courage, honesty, and love. The point is not to display spirituality. The point is to become more whole before God and therefore more present with people.",
      "Today, carry one private prayer into one public action. If you prayed for patience, practice it in a real conversation. If you prayed for courage, tell the truth gently. If you prayed for gratitude, express thanks to someone.",
      "The Father who sees in secret also forms us for visible love."
    ].join("\n\n"),
    reflectionQuestion: "How could one private prayer become visible through one loving action today?",
    prayerPrompt:
      "Father, let my hidden prayer become patient love, honest speech, and quiet faithfulness in the people and places I meet today.",
    actionStep: "Connect one prayer to one action: pray for patience, then practice patience; pray for courage, then take one truthful step."
  },
  28: {
    body: [
      "A week of prayer without performance may not make prayer feel easy yet. You may still get distracted. You may still feel awkward. You may still wonder if you are doing it right. But perhaps something important has begun: prayer is becoming less like a stage and more like a room where you can be honest with God.",
      "Jesus' invitation in Matthew 6:6 is tender because it brings prayer back to the Father. Not the crowd. Not the image. Not the pressure to sound mature. The Father. The One who sees in secret and rewards in ways deeper than applause.",
      "Look back gently. Did you pray one honest sentence? Did you notice what you were carrying? Did you return after distraction? Did you ask a real question? Did one private prayer become one public act of love? These are not small things. They are roots.",
      "Do not despise a beginning because it is quiet. Many lasting things in the kingdom begin hidden: seeds in soil, yeast in dough, prayers behind closed doors, grace working beneath what anyone else can measure.",
      "Carry this forward: you can pray as you are, and the Father sees you with love."
    ].join("\n\n"),
    reflectionQuestion: "What changed, even slightly, in how you think about prayer this week?",
    prayerPrompt:
      "Father, thank You for seeing me in secret. Keep teaching me to pray honestly, return gently, and trust that hidden communion with You matters.",
    actionStep: "Write two sentences: one honest prayer from this week, and one simple prayer rhythm you want to continue."
  }
};

function buildBody(day: number, week: FoundationWeek, rhythm: (typeof dayRhythms)[number]) {
  const editorial = editorialDevotionals[day];
  if (editorial) return editorial.body;

  const dayInWeek = ((day - 1) % 7) + 1;
  const pastoralNote = focusPastoralNotes[week.focus] ?? focusPastoralNotes["Strengthening Faith"];
  const heartNote = focusHeartNotes[week.focus] ?? focusHeartNotes["Strengthening Faith"];
  const rhythmNote = rhythmFormationNotes[rhythm.name] ?? rhythm.lens;
  const progressionNote = weeklyProgressionNotes[dayInWeek - 1] ?? weeklyProgressionNotes[0];
  const storyOpening = storyOpenings[(day - 1) % storyOpenings.length];

  return [
    `${storyOpening} This is the kind of place where ${week.theme.toLowerCase()} begins: not as a slogan, but as a real meeting between the Word of God and the life you actually woke up inside today.`,
    `This step in Faithful Foundations focuses on ${week.summary}. The aim is not to collect religious facts quickly or rush ahead just to stay on schedule. The aim is to let Scripture build a bridge between what you know, what you trust, and how you live before God in the ordinary details of this day.`,
    `The passage for today, ${week.scriptureReference}, gives you a doorway into ${week.theme.toLowerCase()}. Read it slowly enough to notice the movement of the verse: what God reveals, what He invites, what He promises, and what He gently corrects. Let one phrase linger. Sometimes one phrase, carried honestly, can do more in the heart than a whole chapter read in a hurry.`,
    heartNote,
    pastoralNote,
    `${rhythmNote} ${rhythm.lens} If the instruction feels simple, stay with it anyway. A life with God is often formed through ordinary repetition: returning, listening, praying, obeying, remembering, and beginning again with grace when yesterday did not go the way you hoped.`,
    `${progressionNote} Before you move on, name one place where this reading touches your actual life: a relationship, a fear, a hope, a habit, a decision, or a wound. Let that place become holy ground where God's Word meets today's next faithful step.`
  ].join("\n\n");
}

function buildReflectionQuestion(week: FoundationWeek, rhythm: (typeof dayRhythms)[number]) {
  return `${rhythm.question} As you answer, where does ${week.theme.toLowerCase()} feel most connected to your real life right now?`;
}

function buildPrayerPrompt(week: FoundationWeek, rhythm: (typeof dayRhythms)[number]) {
  return `Lord, teach me to ${rhythm.verb} Your truth in the area of ${week.theme.toLowerCase()}. Let this Scripture move from words on a page into trust, repentance, comfort, wisdom, and love. Form what is missing, heal what is weary, and lead me one faithful step at a time.`;
}

function buildActionStep(rhythm: (typeof dayRhythms)[number]) {
  return `${rhythm.action} Then write one sentence about what you noticed, even if it feels small.`;
}

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
      body: buildBody(day, week, rhythm),
      reflectionQuestion: editorialDevotionals[day]?.reflectionQuestion ?? buildReflectionQuestion(week, rhythm),
      prayerPrompt: editorialDevotionals[day]?.prayerPrompt ?? buildPrayerPrompt(week, rhythm),
      actionStep: editorialDevotionals[day]?.actionStep ?? buildActionStep(rhythm),
      tags: ["daily-bread-foundations", `day-${String(day).padStart(3, "0")}`, ...week.tags],
      categories: [week.focus, "Growing in Scripture", "Building Discipline"]
    });
  }

  return generated;
}
