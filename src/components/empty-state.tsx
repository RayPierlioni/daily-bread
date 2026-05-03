import { BookOpenCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="flex flex-col items-center justify-center gap-3 p-8 text-center">
      <div className="rounded-full bg-[#dfe9dd] p-3 text-[#345d6f]">
        <BookOpenCheck className="h-6 w-6" aria-hidden="true" />
      </div>
      <div>
        <h3 className="font-semibold text-[#24302f]">{title}</h3>
        <p className="mt-1 max-w-md text-sm leading-6 text-[#68706e]">{description}</p>
      </div>
    </Card>
  );
}
