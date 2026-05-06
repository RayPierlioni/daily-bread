import bibleData from "@/data/web-bible.json";

export type BibleVerse = {
  bookCode: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
};

export type BibleBook = {
  code: string;
  name: string;
  testament: string;
  chapters: string[][];
};

type BibleData = {
  translation: string;
  abbreviation: string;
  edition: string;
  sourceUrl: string;
  license: string;
  books: BibleBook[];
};

const data = bibleData as BibleData;

export const bibleInfo = {
  translation: data.translation,
  abbreviation: data.abbreviation,
  edition: data.edition,
  sourceUrl: data.sourceUrl,
  license: data.license
};

export const bibleBooks = data.books;

export function getBibleBook(code?: string | null) {
  return bibleBooks.find((book) => book.code === code) ?? bibleBooks[0];
}

export function getBibleChapter(bookCode?: string | null, chapterValue?: string | number | null) {
  const book = getBibleBook(bookCode);
  const requestedChapter = Number(chapterValue);
  const chapter = Number.isFinite(requestedChapter) ? Math.min(Math.max(1, requestedChapter), book.chapters.length) : 1;
  const verses = book.chapters[chapter - 1] ?? [];

  return { book, chapter, verses };
}

export function getAdjacentBibleChapter(bookCode: string, chapter: number, direction: -1 | 1) {
  const bookIndex = bibleBooks.findIndex((book) => book.code === bookCode);
  if (bookIndex < 0) return null;

  const book = bibleBooks[bookIndex];
  const nextChapter = chapter + direction;
  if (nextChapter >= 1 && nextChapter <= book.chapters.length) {
    return { bookCode: book.code, chapter: nextChapter, label: `${book.name} ${nextChapter}` };
  }

  const adjacentBook = bibleBooks[bookIndex + direction];
  if (!adjacentBook) return null;

  const adjacentChapter = direction === 1 ? 1 : adjacentBook.chapters.length;
  return {
    bookCode: adjacentBook.code,
    chapter: adjacentChapter,
    label: `${adjacentBook.name} ${adjacentChapter}`
  };
}

export function searchBible(query: string, limit = 60): BibleVerse[] {
  const normalized = query.trim().toLowerCase();
  if (normalized.length < 2) return [];

  const results: BibleVerse[] = [];
  for (const book of bibleBooks) {
    for (let chapterIndex = 0; chapterIndex < book.chapters.length; chapterIndex += 1) {
      const chapter = book.chapters[chapterIndex];
      for (let verseIndex = 0; verseIndex < chapter.length; verseIndex += 1) {
        const text = chapter[verseIndex];
        if (text.toLowerCase().includes(normalized)) {
          results.push({
            bookCode: book.code,
            bookName: book.name,
            chapter: chapterIndex + 1,
            verse: verseIndex + 1,
            text
          });
          if (results.length >= limit) return results;
        }
      }
    }
  }

  return results;
}

const referenceAliases: Record<string, string> = {
  genesis: "GEN",
  exodus: "EXO",
  leviticus: "LEV",
  numbers: "NUM",
  deuteronomy: "DEU",
  joshua: "JOS",
  judges: "JDG",
  ruth: "RUT",
  "1 samuel": "1SA",
  "2 samuel": "2SA",
  "1 kings": "1KI",
  "2 kings": "2KI",
  "1 chronicles": "1CH",
  "2 chronicles": "2CH",
  ezra: "EZR",
  nehemiah: "NEH",
  esther: "EST",
  job: "JOB",
  psalm: "PSA",
  psalms: "PSA",
  proverbs: "PRO",
  ecclesiastes: "ECC",
  "song of solomon": "SNG",
  isaiah: "ISA",
  jeremiah: "JER",
  lamentations: "LAM",
  ezekiel: "EZK",
  daniel: "DAN",
  hosea: "HOS",
  joel: "JOL",
  amos: "AMO",
  obadiah: "OBA",
  jonah: "JON",
  micah: "MIC",
  nahum: "NAM",
  habakkuk: "HAB",
  zephaniah: "ZEP",
  haggai: "HAG",
  zechariah: "ZEC",
  malachi: "MAL",
  matthew: "MAT",
  mark: "MRK",
  luke: "LUK",
  john: "JHN",
  acts: "ACT",
  romans: "ROM",
  "1 corinthians": "1CO",
  "2 corinthians": "2CO",
  galatians: "GAL",
  ephesians: "EPH",
  philippians: "PHP",
  colossians: "COL",
  "1 thessalonians": "1TH",
  "2 thessalonians": "2TH",
  "1 timothy": "1TI",
  "2 timothy": "2TI",
  titus: "TIT",
  philemon: "PHM",
  hebrews: "HEB",
  james: "JAS",
  "1 peter": "1PE",
  "2 peter": "2PE",
  "1 john": "1JN",
  "2 john": "2JN",
  "3 john": "3JN",
  jude: "JUD",
  revelation: "REV"
};

export function getBibleHrefForReference(reference: string) {
  const match = reference.trim().match(/^([1-3]?\s?[A-Za-z ]+?)\s+(\d+)/);
  if (!match) return "/bible";

  const bookName = match[1].toLowerCase().replace(/\s+/g, " ").trim();
  const chapter = Number(match[2]);
  const bookCode = referenceAliases[bookName];

  if (!bookCode || !Number.isFinite(chapter)) return "/bible";
  return `/bible?book=${bookCode}&chapter=${chapter}`;
}
