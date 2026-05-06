import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { BibleChapterReadAloud } from "@/components/bible-chapter-read-aloud";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Select } from "@/components/ui/form-fields";
import { bibleBooks, bibleInfo, getAdjacentBibleChapter, getBibleChapter, searchBible } from "@/lib/bible";
import { requireUser } from "@/lib/current-user";

export const metadata: Metadata = {
  title: "Bible",
  description: "Read and listen to the World English Bible inside Next Faithful Step.",
  alternates: {
    canonical: "/bible"
  }
};

export default async function BiblePage({
  searchParams
}: {
  searchParams: Promise<{ book?: string; chapter?: string; q?: string }>;
}) {
  await requireUser();
  const params = await searchParams;
  const { book, chapter, verses } = getBibleChapter(params.book, params.chapter);
  const reference = `${book.name} ${chapter}`;
  const previousChapter = getAdjacentBibleChapter(book.code, chapter, -1);
  const nextChapter = getAdjacentBibleChapter(book.code, chapter, 1);
  const query = params.q?.trim() ?? "";
  const results = query ? searchBible(query) : [];

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#e4dccd] bg-white/82 p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-[#345d6f]">Bible Reader</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#24302f]">Read Scripture at your pace.</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#68706e]">
              This reader uses the {bibleInfo.translation} ({bibleInfo.abbreviation}), a public-domain English Bible text. You can browse, search, and listen to chapters inside the app.
            </p>
          </div>
          <Badge className="w-fit">Public domain text</Badge>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,0.75fr)_minmax(19rem,0.25fr)]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#345d6f]" aria-hidden="true" />
              Open a chapter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 md:grid-cols-[minmax(0,1fr)_10rem_auto]" action="/bible">
              <div className="space-y-2">
                <Label htmlFor="book">Book</Label>
                <Select id="book" name="book" defaultValue={book.code}>
                  {bibleBooks.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="chapter">Chapter</Label>
                <Select id="chapter" name="chapter" defaultValue={String(chapter)}>
                  {book.chapters.map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </Select>
              </div>
              <button className="self-end rounded-lg bg-[#345d6f] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#294b5a]" type="submit">
                Open
              </button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-[#345d6f]" aria-hidden="true" />
              Search Bible
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action="/bible" className="space-y-3">
              <Input name="q" defaultValue={query} placeholder="Search mercy, peace, faith..." />
              <button className="w-full rounded-lg border border-[#d9cfbd] bg-white/75 px-4 py-2.5 text-sm font-medium text-[#293634] transition hover:bg-white" type="submit">
                Search
              </button>
            </form>
          </CardContent>
        </Card>
      </section>

      {query ? (
        <Card>
          <CardHeader>
            <CardTitle>Search results for &quot;{query}&quot;</CardTitle>
            <p className="text-sm text-[#68706e]">{results.length ? `Showing up to ${results.length} matching verses.` : "No verses found. Try a shorter word or phrase."}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {results.map((result) => (
              <Link
                key={`${result.bookCode}-${result.chapter}-${result.verse}`}
                href={`/bible?book=${result.bookCode}&chapter=${result.chapter}#v${result.verse}`}
                className="block rounded-lg border border-[#eee5d8] bg-white/72 p-4 transition hover:border-[#cdbf9f] hover:bg-white"
              >
                <p className="font-semibold text-[#24302f]">
                  {result.bookName} {result.chapter}:{result.verse}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#52605d]">{result.text}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader className="border-b border-[#eee5d8] bg-[#fffdf8]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-[#68706e]">{bibleInfo.abbreviation}</p>
              <CardTitle className="mt-1 text-3xl">{reference}</CardTitle>
            </div>
            <div className="flex flex-wrap gap-2">
              {previousChapter ? (
                <LinkButton href={`/bible?book=${previousChapter.bookCode}&chapter=${previousChapter.chapter}`} variant="secondary" size="sm">
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  {previousChapter.label}
                </LinkButton>
              ) : null}
              {nextChapter ? (
                <LinkButton href={`/bible?book=${nextChapter.bookCode}&chapter=${nextChapter.chapter}`} variant="secondary" size="sm">
                  {nextChapter.label}
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </LinkButton>
              ) : null}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 pt-5">
          <BibleChapterReadAloud reference={reference} verses={verses} />
          <div className="space-y-4">
            {verses.map((verse, index) => (
              <p key={`${reference}-${index + 1}`} id={`v${index + 1}`} className="scroll-mt-24 text-lg leading-9 text-[#24302f]">
                <sup className="mr-2 text-xs font-semibold text-[#b38b4d]">{index + 1}</sup>
                {verse}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      <p className="text-xs leading-5 text-[#68706e]">
        Scripture text: {bibleInfo.translation} ({bibleInfo.edition}). {bibleInfo.license}
      </p>
    </div>
  );
}
