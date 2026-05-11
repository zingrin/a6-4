"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldPlus } from "lucide-react";
import { toast } from "sonner";
import { inviteModeratorAction } from "@/actions/admin.action";

export default function InviteModeratorModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Sending invitation...");

    try {
      const res = await inviteModeratorAction(form.email, form.name);

      if (res?.error || !res?.data?.success) {
        const message = res?.error?.message || res?.data?.message || "Failed to send invitation.";
        toast.error(message, { id: toastId });
        return;
      }

      toast.success(`Invitation sent to ${form.email}!`, { id: toastId });
      setForm({ name: "", email: "" });
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <ShieldPlus className="h-4 w-4" />
          Invite Moderator
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite a Moderator</DialogTitle>
          <DialogDescription>
            Send an email invitation to a new platform moderator. They will receive a link to join and set up their account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="moderator-name">Full Name</Label>
            <Input
              id="moderator-name"
              placeholder="e.g. Jane Smith"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="moderator-email">Email Address</Label>
            <Input
              id="moderator-email"
              type="email"
              placeholder="e.g. jane@example.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Invitation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
