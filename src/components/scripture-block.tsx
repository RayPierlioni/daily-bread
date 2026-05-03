import { BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ScriptureBlock({ reference, text }: { reference: string; text: string }) {
  return (
    <Card className="bg-[#f7fbf8] p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#345d6f]">
        <BookOpen className="h-4 w-4" aria-hidden="true" />
        {reference}
      </div>
      <blockquote className="text-lg leading-8 text-[#24302f]">&quot;{text}&quot;</blockquote>
    </Card>
  );
}
