import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Select, Textarea } from "@/components/ui/form-fields";
import { createCommunityPost } from "@/lib/actions";

export function PostComposer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Share with care</CardTitle>
        <p className="text-sm leading-6 text-[#68706e]">A calmer feed for prayer, testimony, reflection, and thoughtful questions.</p>
      </CardHeader>
      <CardContent>
        <form action={createCommunityPost} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="type">Post type</Label>
              <Select id="type" name="type" defaultValue="PRAYER_REQUEST">
                <option value="PRAYER_REQUEST">Prayer Request</option>
                <option value="PRAISE_REPORT">Praise Report</option>
                <option value="REFLECTION">Reflection</option>
                <option value="QUESTION">Question</option>
                <option value="TESTIMONY">Testimony</option>
                <option value="BLOG">Blog-style Post</option>
                <option value="DEVOTIONAL_DISCUSSION">Devotional Discussion</option>
                <option value="GROUP_ANNOUNCEMENT">Group Announcement</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="visibility">Visibility</Label>
              <Select id="visibility" name="visibility" defaultValue="PUBLIC">
                <option value="PUBLIC">Public community</option>
                <option value="GROUP">Group only</option>
                <option value="PRIVATE">Private draft</option>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="What would you like to share?" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">Body</Label>
            <Textarea id="body" name="body" placeholder="Keep it honest, gentle, and respectful." required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input id="tags" name="tags" placeholder="prayer, anxiety, Scripture" />
          </div>
          <Button type="submit">
            <Send className="h-4 w-4" aria-hidden="true" />
            Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
