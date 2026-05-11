"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { ImagePlus, X } from "lucide-react";
import { toast } from "sonner";
import { Course, Category, Mentor } from "@/types";
import { updateCourseAction } from "@/actions/course.action";

interface EditCourseModalProps {
  course: Course;
  mentors: Mentor[];
  categories: Category[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const buildFormFromCourse = (course: Course) => ({
  title: course.title,
  description: course.description,
  price: course.price.toString(),
  status: (course.isPublished ? "PUBLISHED" : "DRAFT") as "DRAFT" | "PUBLISHED",
  level: (course.level ?? "BEGINNER") as "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
  duration: course.duration ?? "",
  categoryId: course.categoryId ?? "",
  mentorIds: course.mentors?.map((m) => m.id) ?? [],
});

export default function EditCourseModal({
  course,
  mentors = [],
  categories = [],
  open,
  onOpenChange,
}: EditCourseModalProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(() => buildFormFromCourse(course));
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    course.thumbnailUrl ?? null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Re-sync when the selected course or open state changes
  useEffect(() => {
    if (open && course) {
      setForm(buildFormFromCourse(course));
      setThumbnailFile(null);
      setThumbnailPreview(course.thumbnailUrl ?? null);
    }
  }, [course, open]);

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
    const toastId = toast.loading("Updating course...");

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
      // If the user cleared the thumbnail and there's no new file, we could signal removal.
      // For now we leave thumbnailUrl unchanged on the server if no new file is uploaded.

      const res = await updateCourseAction(course.id, fd);

      if (!res?.data?.success) {
        toast.error(
          res?.data?.message || res?.error?.message || "Failed to update course.",
          { id: toastId }
        );
        return;
      }

      toast.success("Course updated successfully!", { id: toastId });
      onOpenChange(false);
    } catch {
      toast.error("Something went wrong. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>
            Update the details for <strong>{course.title}</strong> below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="edit-title">Course Title *</Label>
            <Input
              id="edit-title"
              placeholder="e.g. Introduction to Web Development"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description *</Label>
            <textarea
              id="edit-description"
              placeholder="Describe what students will learn (min 10 characters)..."
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full min-h-[90px] rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            />
          </div>

          {/* Price + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-price">Price (USD) *</Label>
              <Input
                id="edit-price"
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
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={form.status}
                onValueChange={(val: "DRAFT" | "PUBLISHED") =>
                  setForm((f) => ({ ...f, status: val }))
                }
              >
                <SelectTrigger id="edit-status">
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
              <Label htmlFor="edit-level">Level *</Label>
              <Select
                value={form.level}
                onValueChange={(val: "BEGINNER" | "INTERMEDIATE" | "ADVANCED") =>
                  setForm((f) => ({ ...f, level: val }))
                }
              >
                <SelectTrigger id="edit-level">
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
              <Label htmlFor="edit-category">Category</Label>
              <Select
                value={form.categoryId || "none"}
                onValueChange={(val) =>
                  setForm((f) => ({ ...f, categoryId: val === "none" ? "" : val }))
                }
              >
                <SelectTrigger id="edit-category">
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
            <Label htmlFor="edit-duration">Duration</Label>
            <Input
              id="edit-duration"
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
              id="edit-thumbnail-file"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
              className="hidden"
              onChange={handleFileChange}
            />
            {thumbnailFile && (
              <p className="text-xs text-muted-foreground">
                New file selected: <span className="font-medium">{thumbnailFile.name}</span>
              </p>
            )}
          </div>

          {/* Mentors */}
          {mentors.length > 0 && (
            <div className="space-y-2">
              <Label>Assign Mentors</Label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
                {mentors.map((mentor) => (
                  <div key={mentor.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-mentor-${mentor.id}`}
                      checked={form.mentorIds.includes(mentor.id)}
                      onCheckedChange={() => handleMentorToggle(mentor.id)}
                    />
                    <label
                      htmlFor={`edit-mentor-${mentor.id}`}
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
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
