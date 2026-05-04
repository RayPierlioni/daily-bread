const sectionLabels = [
  "Simple answer",
  "Scripture",
  "Theology",
  "Church History",
  "Archaeology",
  "Apologetics",
  "Pastoral Encouragement",
  "Short prayer",
  "Suggested next steps"
] as const;

type CuratedAnswerInput = {
  id: string;
  title: string;
  aliases: string[];
  keywords: string[];
  requiredAny?: string[];
  sources: string[];
  tags: string[];
  sections: Record<(typeof sectionLabels)[number], string>;
};

export type CuratedFaithAnswer = {
  answer: string;
  sources: string[];
  tags: string[];
  matchId: string;
  title: string;
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildAnswer(item: CuratedAnswerInput) {
  const sections = sectionLabels.map((label) => `${label}\n${item.sections[label]}`).join("\n\n");
  return `You are not wrong for asking this.\n\n${sections}`;
}

const curatedAnswers: CuratedAnswerInput[] = [
  {
    id: "purpose",
    title: "Purpose and why we are here",
    aliases: ["why are we here", "what is the meaning of life", "why did god create us", "what is my purpose"],
    keywords: ["purpose", "meaning", "created", "why are we here"],
    requiredAny: ["purpose", "meaning", "created", "here"],
    sources: ["Genesis 1:26-28", "Micah 6:8", "Matthew 22:37-39", "Ephesians 2:10"],
    tags: ["Scripture", "Theology", "Pastoral Encouragement", "Seeking Purpose"],
    sections: {
      "Simple answer":
        "Christians believe we are created by God, loved by God, and invited to know Him, reflect His character, love our neighbors, and join His renewing work in the world.",
      Scripture:
        "Genesis presents human beings as made in the image of God. Jesus summarizes faithful life as loving God with heart, soul, mind, and strength, and loving our neighbor as ourselves.",
      Theology:
        "Christian purpose is not merely achievement. It is communion with God, formation into Christlike love, and faithful stewardship of the life God has given.",
      "Church History":
        "Across Christian history, believers have described the human purpose as glorifying God, enjoying God, and becoming people of holy love.",
      Archaeology:
        "Archaeology can illuminate the ancient world of Genesis and Israel, but the theological claim that human beings bear God's image comes from Scripture's witness.",
      Apologetics:
        "The Christian answer to purpose gives dignity to every person because worth is received from God, not earned by productivity, status, intelligence, or usefulness.",
      "Pastoral Encouragement":
        "If your sense of purpose feels unclear, that does not mean your life is meaningless. Often God reveals purpose through small faithful steps before He reveals a larger map.",
      "Short prayer": "Father, show me how to love You and love my neighbor today. Give me peace in the ordinary steps of faithfulness. Amen.",
      "Suggested next steps": "1. Read Matthew 22:37-39 slowly.\n2. Write one sentence about who God may be asking you to love today.\n3. Choose one small act of faithfulness and do it prayerfully."
    }
  },
  {
    id: "god-exists",
    title: "Whether God exists",
    aliases: ["is there a god", "does god exist", "how do i know god exists", "how can i know god is real"],
    keywords: ["god", "exists", "exist", "real", "know"],
    requiredAny: ["exists", "exist", "real", "know"],
    sources: ["Psalm 19:1", "Romans 1:20", "Acts 17:24-28", "Hebrews 11:6"],
    tags: ["Apologetics", "Theology", "Scripture", "Wrestling with Doubt"],
    sections: {
      "Simple answer":
        "Christians believe there are good reasons to believe in God, including creation, moral reality, consciousness, longing for meaning, religious experience, and the historical claims around Jesus. These are reasons for trust, not mathematical proof.",
      Scripture:
        "Psalm 19 says creation declares God's glory. Acts 17 says God is not far from each of us. Scripture presents knowledge of God as both rational and relational.",
      Theology:
        "Christian faith does not treat God as one object inside the universe. God is understood as the Creator and sustainer of all reality.",
      "Church History":
        "Christian thinkers such as Augustine, Anselm, Aquinas, and many modern apologists have offered different arguments for God's existence. Christians do not all weigh those arguments the same way.",
      Archaeology:
        "Archaeology does not prove God directly. It can support or challenge historical settings related to biblical claims, but God's existence is a broader philosophical and theological question.",
      Apologetics:
        "Common arguments include the beginning of the universe, fine-tuning, moral law, consciousness, beauty, religious experience, and the resurrection claim. Each has strengths and objections, so it is best to consider them together rather than oversell one argument.",
      "Pastoral Encouragement":
        "Wondering whether God is real does not disqualify you from seeking Him. A humble prayer like 'God, if You are there, help me seek truth honestly' can be a faithful beginning.",
      "Short prayer": "God, if You are near, help me seek You with honesty, humility, and courage. Lead me toward truth. Amen.",
      "Suggested next steps": "1. Read Acts 17:24-28.\n2. Write down which question matters most to you: creation, morality, Jesus, suffering, or personal experience.\n3. Explore that one question carefully instead of trying to solve everything at once."
    }
  },
  {
    id: "historical-jesus",
    title: "Historical evidence for Jesus",
    aliases: ["what proof is there that jesus lived", "did jesus exist", "was jesus a real person", "historical evidence for jesus"],
    keywords: ["jesus", "lived", "exist", "historical", "real person", "proof"],
    requiredAny: ["jesus"],
    sources: ["1 Corinthians 15:3-8", "Tacitus, Annals 15.44", "Josephus, Antiquities 18.3", "Pliny the Younger, Letters 10.96"],
    tags: ["Church History", "Apologetics", "Scripture", "History"],
    sections: {
      "Simple answer":
        "Most historians, including many who are not Christians, accept that Jesus of Nazareth was a real first-century Jewish teacher who was crucified under Pontius Pilate. The bigger debates concern His identity, resurrection, and theological meaning.",
      Scripture:
        "The New Testament presents Jesus in the Gospels, Acts, and letters such as 1 Corinthians. First Corinthians 15 preserves an early Christian summary of Jesus' death, burial, resurrection proclamation, and appearances.",
      Theology:
        "Christianity makes more than a historical claim that Jesus existed. It confesses that Jesus is Lord, the Son of God, crucified and risen for the salvation of the world.",
      "Church History":
        "Early Christian communities spread rapidly while proclaiming Jesus' death and resurrection. Non-Christian references from Tacitus, Josephus, and Pliny also show that Jesus and early Christians were known in the ancient world.",
      Archaeology:
        "Archaeology helps confirm the world in which Jesus lived, including places, rulers, crucifixion practices, inscriptions, and first-century Jewish context. It does not by itself prove the resurrection.",
      Apologetics:
        "A careful apologetic argument separates several claims: Jesus existed, He was crucified, His followers believed they saw Him alive, the movement grew, and Christians interpret this as resurrection. Each claim should be handled honestly.",
      "Pastoral Encouragement":
        "It is reasonable to ask what history can and cannot show. Christian faith is not opposed to historical investigation, but it also involves trust in the living Christ.",
      "Short prayer": "Jesus, guide me as I study who You are. Give me honesty, wisdom, and openness to truth. Amen.",
      "Suggested next steps": "1. Read 1 Corinthians 15:3-8.\n2. Read one Gospel slowly, starting with Mark.\n3. Compare what historians generally agree on with what Christians confess by faith."
    }
  },
  {
    id: "suffering",
    title: "Suffering and evil",
    aliases: ["why does suffering exist", "why does god allow suffering", "why do bad things happen", "problem of evil"],
    keywords: ["suffering", "evil", "pain", "bad things", "allow"],
    requiredAny: ["suffering", "evil", "pain", "bad"],
    sources: ["Psalm 13", "Romans 8:18-39", "John 11:35", "Revelation 21:1-5"],
    tags: ["Theology", "Pastoral Encouragement", "Wrestling with Doubt", "Healing and Comfort"],
    sections: {
      "Simple answer":
        "Christianity does not give a shallow answer to suffering. It says suffering is real, evil is not good, God grieves with His people, and in Jesus God enters suffering to redeem what is broken.",
      Scripture:
        "The Bible includes lament, protest, grief, and hope. Jesus weeps at Lazarus's tomb. Romans 8 says creation groans while also pointing toward future restoration.",
      Theology:
        "Christians commonly connect suffering to a fallen world, human freedom, spiritual evil, and the limits of creaturely life. These explanations do not remove the pain or answer every personal why.",
      "Church History":
        "Christians have wrestled with suffering for centuries, especially through persecution, plague, war, grief, and injustice. The cross has remained central because it shows God is not distant from pain.",
      Archaeology:
        "Archaeology can show the harsh realities of ancient life, including disease, violence, exile, and empire. It helps us see that biblical faith was formed in a world acquainted with suffering.",
      Apologetics:
        "The problem of evil is one of the strongest objections to faith. Christian responses should be humble: they can offer reasons for trust without pretending every tragedy is explainable from our viewpoint.",
      "Pastoral Encouragement":
        "If you are suffering, you do not need a neat argument as much as you need God's presence, safe people, and honest prayer. Lament is not lack of faith.",
      "Short prayer": "Lord, meet me in pain with Your mercy. Hold what I cannot understand and lead me toward hope. Amen.",
      "Suggested next steps": "1. Pray Psalm 13 in your own words.\n2. Tell one trusted person what feels heavy.\n3. Do not rush yourself into tidy answers."
    }
  },
  {
    id: "doubt",
    title: "Faith and doubt",
    aliases: ["can i be a christian and still have doubts", "is doubt a sin", "what if i doubt god", "can christians doubt"],
    keywords: ["doubt", "doubts", "unbelief", "questioning"],
    requiredAny: ["doubt", "doubts", "unbelief", "questioning"],
    sources: ["Mark 9:24", "John 20:24-29", "Jude 22", "James 1:5"],
    tags: ["Pastoral Encouragement", "Scripture", "Wrestling with Doubt"],
    sections: {
      "Simple answer":
        "Yes, a Christian can experience doubts. Doubt becomes spiritually dangerous when it is hidden, fed by isolation, or used as a reason to stop seeking. Brought to Jesus, doubt can become part of honest faith.",
      Scripture:
        "Mark 9:24 gives the prayer, 'I believe; help my unbelief.' Thomas struggled to believe the resurrection until he encountered Christ. Jude 22 says to have mercy on those who doubt.",
      Theology:
        "Faith is not pretending to feel certainty at every moment. Faith is trust in God, and trust can coexist with questions, fear, and a need for wisdom.",
      "Church History":
        "Many faithful Christians, including pastors, theologians, missionaries, and ordinary believers, have walked through seasons of doubt. The church has often grown through honest wrestling.",
      Archaeology:
        "Archaeology can help some historical questions, but not every doubt is solved by evidence. Some doubts are intellectual, some emotional, some spiritual, and some relational.",
      Apologetics:
        "A wise approach asks what kind of doubt you are facing. Is it about God's existence, biblical reliability, suffering, church hurt, unanswered prayer, or personal guilt?",
      "Pastoral Encouragement":
        "You are not a second-class believer because you have questions. Bring them into light with Scripture, prayer, and safe community.",
      "Short prayer": "Jesus, receive my faith and help my unbelief. Give me courage to keep seeking You. Amen.",
      "Suggested next steps": "1. Name the specific doubt in one sentence.\n2. Read John 20:24-29.\n3. Ask a trusted believer to walk with you instead of processing alone."
    }
  },
  {
    id: "bible-reliability",
    title: "Historical reliability of the Bible",
    aliases: ["is the bible historically reliable", "can i trust the bible", "is the bible true", "is scripture reliable"],
    keywords: ["bible", "reliable", "trust", "historically", "scripture"],
    requiredAny: ["bible", "scripture"],
    sources: ["Luke 1:1-4", "2 Timothy 3:16-17", "John 20:30-31", "Dead Sea Scrolls"],
    tags: ["Scripture", "Church History", "Archaeology", "Apologetics"],
    sections: {
      "Simple answer":
        "Christians believe Scripture is trustworthy, but different questions need different kinds of answers: textual transmission, historical setting, genre, interpretation, and theological authority should not be blurred together.",
      Scripture:
        "Luke says he investigated carefully and wrote an orderly account. Second Timothy describes Scripture as God-breathed and useful for teaching, correction, and formation.",
      Theology:
        "Christian views of inspiration and authority vary in wording, but orthodox Christianity treats Scripture as uniquely authoritative for faith and life.",
      "Church History":
        "The biblical canon was received and recognized through the life of early Jewish and Christian communities. Manuscript evidence is abundant for the New Testament compared with many ancient works.",
      Archaeology:
        "Finds such as the Dead Sea Scrolls, inscriptions, ancient cities, and cultural artifacts can illuminate biblical context. Archaeology can support many settings, but it does not settle every interpretive or theological question.",
      Apologetics:
        "Responsible apologetics should avoid saying archaeology proves every Bible claim. A better claim is that the Bible is historically rooted and often illuminated by external evidence, while its theological message is received by faith.",
      "Pastoral Encouragement":
        "If the Bible feels difficult, start with Jesus and read patiently. Trust often grows through repeated, careful engagement rather than pressure to master every question quickly.",
      "Short prayer": "Lord, help me read Scripture with humility, wisdom, and love. Let Your Word form me in truth. Amen.",
      "Suggested next steps": "1. Read Luke 1:1-4.\n2. Learn the difference between genre, history, and theology.\n3. Start a list of Bible questions to study one at a time."
    }
  },
  {
    id: "archaeology",
    title: "Archaeological evidence and biblical history",
    aliases: [
      "what archaeological evidence supports biblical history",
      "archaeology and the bible",
      "does archaeology support the bible",
      "biblical archaeology evidence"
    ],
    keywords: ["archaeology", "archaeological", "evidence", "biblical history", "artifacts"],
    requiredAny: ["archaeology", "archaeological", "artifacts"],
    sources: ["Tel Dan inscription", "Pilate stone", "Pool of Bethesda", "Dead Sea Scrolls"],
    tags: ["Archaeology", "Apologetics", "Church History"],
    sections: {
      "Simple answer":
        "Archaeology can support and illuminate many biblical settings, people, places, and customs, but it should be used carefully. It is strong for historical context and limited for proving theological claims.",
      Scripture:
        "The Bible names real places, rulers, peoples, and events. Scripture's theological message is not reduced to archaeology, but historical rootedness matters to biblical faith.",
      Theology:
        "Christians believe God acted in history, especially in Israel's story and in Jesus Christ. Archaeology can help us understand that historical world.",
      "Church History":
        "Modern biblical archaeology has sometimes confirmed known places and corrected assumptions. It has also raised debates, which should be handled honestly rather than fearfully.",
      Archaeology:
        "Common examples include the Dead Sea Scrolls for textual transmission, the Tel Dan inscription referencing the house of David, the Pilate stone naming Pontius Pilate, and discoveries connected to places such as the Pool of Bethesda.",
      Apologetics:
        "The best apologetic use of archaeology is modest: it can show the Bible is rooted in real history and often preserves accurate context, but it cannot prove every miracle or doctrine.",
      "Pastoral Encouragement":
        "You do not need to be afraid of careful historical study. Truth can be investigated with patience and humility.",
      "Short prayer": "God of truth, help me study history honestly and worship You faithfully. Amen.",
      "Suggested next steps": "1. Look up one artifact at a time.\n2. Ask what the evidence does and does not show.\n3. Avoid sources that exaggerate certainty in either direction."
    }
  },
  {
    id: "god-silent",
    title: "When God feels silent",
    aliases: ["why does god feel silent", "why isnt god answering me", "why does god not answer prayer", "god feels far away"],
    keywords: ["silent", "answer", "far away", "distant", "not answering"],
    requiredAny: ["silent", "answer", "distant", "far"],
    sources: ["Psalm 13", "Psalm 42", "Habakkuk 1:2", "Matthew 27:46"],
    tags: ["Pastoral Encouragement", "Scripture", "Healing and Comfort", "Prayer"],
    sections: {
      "Simple answer":
        "God's silence can feel painful, but it does not always mean God is absent, angry, or finished with you. Scripture gives language for seasons where God feels hidden.",
      Scripture:
        "Psalm 13 asks, 'How long, O LORD?' Psalm 42 asks why the soul is cast down. Even Jesus cries out from the cross using the language of Psalm 22.",
      Theology:
        "Christians distinguish God's actual presence from our felt experience of His presence. Feelings matter, but they are not the final measure of whether God is near.",
      "Church History":
        "Many Christian writers have described dry seasons, dark nights, and periods of waiting. These seasons can be painful and spiritually formative, but they should not be romanticized.",
      Archaeology:
        "Archaeology does not answer why God feels silent, but it reminds us that biblical faith was lived by real people in hard places, exile, oppression, grief, and waiting.",
      Apologetics:
        "Unanswered prayer is a serious faith question. A careful answer admits mystery while pointing to God's character revealed in Christ.",
      "Pastoral Encouragement":
        "Keep prayers simple if you feel numb. You can pray, 'Lord, I am here,' and let that be enough for today.",
      "Short prayer": "Lord, I feel the ache of silence. Help me trust Your nearness even when I cannot feel it. Amen.",
      "Suggested next steps": "1. Pray Psalm 13 slowly.\n2. Tell a trusted person you feel spiritually dry.\n3. Keep one small rhythm: Scripture, prayer, or worship, even if it feels quiet."
    }
  },
  {
    id: "how-to-pray",
    title: "Learning how to pray",
    aliases: ["how do i pray when i do not know what to say", "how should i pray", "teach me to pray", "i dont know how to pray"],
    keywords: ["pray", "prayer", "what to say", "teach me"],
    requiredAny: ["pray", "prayer"],
    sources: ["Matthew 6:9-13", "Romans 8:26", "Psalm 23", "Luke 11:1-4"],
    tags: ["Prayer", "Learning to Pray", "Scripture", "Pastoral Encouragement"],
    sections: {
      "Simple answer":
        "Prayer can begin simply. You can speak honestly to God, use Scripture's words, sit quietly before Him, or pray the Lord's Prayer when your own words feel thin.",
      Scripture:
        "Jesus teaches the Lord's Prayer. Romans 8 says the Spirit helps us in weakness when we do not know what to pray.",
      Theology:
        "Prayer is not a performance. It is communion with God: worship, confession, gratitude, request, lament, listening, and surrender.",
      "Church History":
        "Christians have long used simple patterns like the Lord's Prayer, the Psalms, morning and evening prayer, and breath prayers to learn steady communion with God.",
      Archaeology:
        "Archaeology can illuminate ancient worship settings, but the practice of prayer is primarily taught through Scripture and the lived worship of God's people.",
      Apologetics:
        "Some people wonder whether prayer changes anything. Christians believe prayer matters because God invites relationship and acts through both His sovereignty and our dependence.",
      "Pastoral Encouragement":
        "If you do not know what to say, start with one honest sentence. God is not grading your eloquence.",
      "Short prayer": "Father, teach me to pray. Receive my honest words and my silence. Amen.",
      "Suggested next steps": "1. Pray the Lord's Prayer slowly.\n2. Write one sentence beginning with 'God, today I need...'\n3. Save one prayer in your journal."
    }
  },
  {
    id: "anxiety",
    title: "Anxiety and faith",
    aliases: ["how do i overcome anxiety", "what does the bible say about anxiety", "i feel anxious", "does anxiety mean weak faith"],
    keywords: ["anxiety", "anxious", "worry", "fear"],
    requiredAny: ["anxiety", "anxious", "worry", "fear"],
    sources: ["Philippians 4:6-7", "1 Peter 5:7", "Matthew 6:25-34", "Psalm 94:19"],
    tags: ["Overcoming Anxiety", "Pastoral Encouragement", "Scripture"],
    sections: {
      "Simple answer":
        "Anxiety does not mean you are a bad Christian. Scripture invites you to bring worry to God, and wisdom also welcomes support from trusted people, pastors, counselors, and doctors when needed.",
      Scripture:
        "Philippians 4 invites believers to bring requests to God with thanksgiving. First Peter says to cast anxieties on God because He cares for you.",
      Theology:
        "Peace is a gift from God, not proof that you have mastered your emotions. Christians can pursue spiritual care and practical care together.",
      "Church History":
        "Christians have always needed practices of prayer, community, rest, confession, and wise counsel. Emotional struggle is not new to the life of faith.",
      Archaeology:
        "Archaeology does not diagnose anxiety, but it reminds us that biblical people faced real threats, scarcity, empire, illness, and uncertainty.",
      Apologetics:
        "Faith should not be used to shame mental distress. A truthful Christian answer distinguishes spiritual encouragement from medical or professional care.",
      "Pastoral Encouragement":
        "You can bring anxiety to God one breath at a time. If anxiety feels overwhelming or unsafe, please reach out to a trusted person or qualified professional.",
      "Short prayer": "Jesus, hold my anxious heart. Give me peace for this moment and wisdom for the next step. Amen.",
      "Suggested next steps": "1. Pray Philippians 4:6-7 slowly.\n2. Name one worry in writing.\n3. Take one grounded next step: breathe, drink water, contact someone safe, or step outside."
    }
  }
];

function hasPhraseMatch(normalizedQuestion: string, aliases: string[]) {
  return aliases.some((alias) => {
    const normalizedAlias = normalize(alias);
    return normalizedQuestion === normalizedAlias || normalizedQuestion.includes(normalizedAlias);
  });
}

function scoreQuestion(normalizedQuestion: string, item: CuratedAnswerInput) {
  if (item.requiredAny?.length && !item.requiredAny.some((word) => normalizedQuestion.includes(normalize(word)))) {
    return 0;
  }

  return item.keywords.reduce((score, keyword) => {
    const normalizedKeyword = normalize(keyword);
    return normalizedKeyword && normalizedQuestion.includes(normalizedKeyword) ? score + 1 : score;
  }, 0);
}

export function findCuratedFaithAnswer(question: string): CuratedFaithAnswer | null {
  const normalizedQuestion = normalize(question);
  if (!normalizedQuestion) return null;

  const exactMatch = curatedAnswers.find((item) => hasPhraseMatch(normalizedQuestion, item.aliases));
  const match =
    exactMatch ??
    curatedAnswers
      .map((item) => ({ item, score: scoreQuestion(normalizedQuestion, item) }))
      .filter(({ score }) => score >= 2)
      .sort((a, b) => b.score - a.score)[0]?.item;

  if (!match) return null;

  return {
    answer: buildAnswer(match),
    sources: ["Next Faithful Step curated answer", ...match.sources],
    tags: match.tags,
    matchId: match.id,
    title: match.title
  };
}

export function getCuratedQuestionSuggestions() {
  return curatedAnswers.map((item) => item.aliases[0]);
}
