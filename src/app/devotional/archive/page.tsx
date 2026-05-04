import { DevotionalStatus } from "@prisma/client";
import { BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchInput } from "@/components/search-input";
import { TagFilter } from "@/components/tag-filter";
import { requireUser } from "@/lib/current-user";
import { getDevotionalImage } from "@/lib/devotional-media";
import { jsonArray } from "@/lib/devotionals";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { focusCategories } from "@/lib/validations";

export default async function DevotionalArchivePage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; topic?: string; date?: string }>;
}) {
  await requireUser();
  const params = await searchParams;
  const q = params.q?.trim();
  const topic = params.topic;
  const date = params.date;

  const devotionals = await prisma.devotional.findMany({
    where: {
      status: DevotionalStatus.PUBLISHED,
      date: date ? new Date(`${date}T00:00:00`) : undefined,
      OR: q
        ? [
            { title: { contains: q } },
            { scriptureReference: { contains: q } },
            { scriptureText: { contains: q } },
            { body: { contains: q } }
          ]
        : undefined
    },
    orderBy: { date: "desc" }
  });

  const filtered = topic ? devotionals.filter((item) => jsonArray(item.spiritualFocusCategories).includes(topic) || jsonArray(item.tags).includes(topic)) : devotionals;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-[#345d6f]">Devotional Archive</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#24302f]">Return to readings for Scripture, prayer, and reflection.</h1>
      </div>
      <Card className="p-4">
        <form className="grid gap-3 md:grid-cols-[1fr_12rem]">
          <SearchInput placeholder="Search topic, Scripture, or phrase" />
          <input name="date" type="date" className="h-11 rounded-lg border border-[#d9cfbd] bg-white/85 px-3 text-sm" />
        </form>
        <div className="mt-4">
          <TagFilter tags={[...focusCategories]} active={topic} basePath="/devotional/archive" />
        </div>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => {
          const image = getDevotionalImage(item);
          return (
            <Card key={item.id} className="overflow-hidden">
              <div
                className="min-h-36 bg-[#d8c08e]"
                role="img"
                aria-label={image.alt}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(36,48,47,0.05), rgba(36,48,47,0.22)), url('${image.src}')`,
                  backgroundPosition: "center",
                  backgroundSize: "cover"
                }}
              />
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-[#68706e]">
                  <BookOpen className="h-4 w-4 text-[#345d6f]" aria-hidden="true" />
                  {formatDate(item.date)}
                </div>
                <h2 className="mt-3 text-lg font-semibold text-[#24302f]">{item.title}</h2>
                <p className="mt-1 text-sm font-medium text-[#345d6f]">{item.scriptureReference}</p>
                <p className="mt-3 line-clamp-4 text-sm leading-6 text-[#52605d]">{item.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[...jsonArray(item.tags), ...jsonArray(item.spiritualFocusCategories)].slice(0, 4).map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
