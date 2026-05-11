"use client";

import { useRef, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ImagePlus, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Category, Mentor } from "@/types";
import { createCourseAction } from "@/actions/course.action";

interface CreateCourseModalProps {
  mentors?: Mentor[];
  categories?: Category[];
}

const EMPTY_FORM = {
  title: "",
  description: "",
  price: "",
  status: "DRAFT" as "DRAFT" | "PUBLISHED",
  level: "BEGINNER" as "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
  duration: "",
  categoryId: "",
  mentorIds: [] as string[],
};

export default function CreateCourseModal({
  mentors = [],
  categories = [],
}: CreateCourseModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMentorToggle = (id: string) => {
    setForm((prev) => ({
      ...prev,
      mentorIds: prev.mentorIds.includes(id)
        ? prev.mentorIds.filter((x) => x !== id)
        : [...prev.mentorIds, id],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const clearThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    clearThumbnail();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.price) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const priceNum = parseFloat(form.price);
    if (isNaN(priceNum) || priceNum < 0) {
      toast.error("Price must be a valid non-negative number.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Creating course...");

    try {
      // Build FormData so the file and fields are sent in one multipart request
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("price", String(priceNum));
      fd.append("level", form.level);
      fd.append("isPublished", String(form.status === "PUBLISHED"));
      if (form.duration.trim()) fd.append("duration", form.duration.trim());
      if (form.categoryId)      fd.append("categoryId", form.categoryId);
      form.mentorIds.forEach((id) => fd.append("mentorIds", id));
      if (thumbnailFile)        fd.append("thumbnail", thumbnailFile);

      const res = await createCourseAction(fd);

      if (!res?.data?.success) {
        toast.error(
          res?.data?.message || res?.error?.message || "Failed to create course.",
          { id: toastId }
        );
        return;
      }

      toast.success("Course created successfully!", { id: toastId });
      resetForm();
      setOpen(false);
    } catch {
      toast.error("Something went wrong. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new course for your institute.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="create-title">Course Title *</Label>
            <Input
              id="create-title"
              placeholder="e.g. Introduction to Web Development"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="create-description">Description *</Label>
            <textarea
              id="create-description"
              placeholder="Describe what students will learn in this course (min 10 characters)..."
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full min-h-[90px] rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            />
          </div>

          {/* Price + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="create-price">Price (USD) *</Label>
              <Input
                id="create-price"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g. 49.99"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-status">Status</Label>
              <Select
                value={form.status}
                onValueChange={(val: "DRAFT" | "PUBLISHED") =>
                  setForm((f) => ({ ...f, status: val }))
                }
              >
                <SelectTrigger id="create-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Level + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="create-level">Level *</Label>
              <Select
                value={form.level}
                onValueChange={(val: "BEGINNER" | "INTERMEDIATE" | "ADVANCED") =>
                  setForm((f) => ({ ...f, level: val }))
                }
              >
                <SelectTrigger id="create-level">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BEGINNER">Beginner</SelectItem>
                  <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                  <SelectItem value="ADVANCED">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-category">Category</Label>
              <Select
                value={form.categoryId || "none"}
                onValueChange={(val) =>
                  setForm((f) => ({ ...f, categoryId: val === "none" ? "" : val }))
                }
              >
                <SelectTrigger id="create-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="create-duration">Duration</Label>
            <Input
              id="create-duration"
              placeholder="e.g. 4 Weeks"
              value={form.duration}
              onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
            />
          </div>

          {/* Thumbnail upload */}
          <div className="space-y-2">
            <Label>Course Thumbnail</Label>
            {thumbnailPreview ? (
              <div className="relative w-full h-36 rounded-md overflow-hidden border">
                {/* plain img — handles both blob: (local preview) and https: (Cloudinary) */}
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={clearThumbnail}
                  className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center w-full h-36 rounded-md border-2 border-dashed border-input hover:border-primary/50 bg-muted/30 hover:bg-muted/50 transition cursor-pointer gap-2"
              >
                <ImagePlus className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Click to upload thumbnail</span>
                <span className="text-xs text-muted-foreground">JPG, PNG, WebP, SVG</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              id="create-thumbnail-file"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Mentors */}
          {mentors.length > 0 && (
            <div className="space-y-2">
              <Label>Assign Mentors</Label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
                {mentors.map((mentor) => (
                  <div key={mentor.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`create-mentor-${mentor.id}`}
                      checked={form.mentorIds.includes(mentor.id)}
                      onCheckedChange={() => handleMentorToggle(mentor.id)}
                    />
                    <label
                      htmlFor={`create-mentor-${mentor.id}`}
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {mentor.user.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => { setOpen(false); resetForm(); }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
