"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";
import { Category, Subject, TutorProfileDashboard } from "@/types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { updateTutorProfileAction } from "@/actions/tutor.action";
import { X } from "lucide-react";

const tutorProfileSchema = z.object({
  bio: z.string().min(20, "Bio must be at least 20 characters"),
  hourlyRate: z.number(),
});

export function TutorProfileForm({
  tutor,
  categories,
}: {
  tutor: TutorProfileDashboard;
  categories: Category[];
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    tutor.categoryId || "",
  );
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>(
    tutor.subjects?.map((s) => s.subject) || [],
  );

  const form = useForm({
    defaultValues: {
      bio: tutor.bio ?? "",
      hourlyRate: tutor.hourlyRate ?? 0,
    },
    validators: {
      onSubmit: tutorProfileSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating profile...");

      try {
        let updatedData: Partial<TutorProfileDashboard> = value;

        if (selectedCategoryId) {
          updatedData = { ...value, categoryId: selectedCategoryId };
        }

        const subjectIds = selectedSubjects.map((s) => s.id);

        const res = await updateTutorProfileAction(updatedData, subjectIds);

        if (res.error) {
          toast.error(res.error, { id: toastId });
          return;
        }
        toast.success(res.data.message || "Tutor profile updated", {
          id: toastId,
        });
      } catch (err) {
        console.log(err);
        toast.error("Failed to update profile", { id: toastId });
      }
    },
  });

  const availableSubjects =
    categories
      .find((c) => c.id === selectedCategoryId)
      ?.subjects.filter(
        (subject) => !selectedSubjects.some((s) => s.id === subject.id),
      ) || [];

  const handleCategoryChange = (newCategoryId: string) => {
    setSelectedCategoryId(newCategoryId);
    setSelectedSubjects([]);
  };

  const handleSubjectSelect = (subjectId: string) => {
    const selected = availableSubjects.find((sub) => sub.id === subjectId);
    if (selected) {
      setSelectedSubjects((prev) => [...prev, selected]);
    }
  };

  const handleSubjectRemove = (subjectId: string) => {
    setSelectedSubjects((prev) => prev.filter((s) => s.id !== subjectId));
  };

  return (
    <Card className="w-full border">
      <CardHeader>
        <CardTitle>Tutor Profile</CardTitle>
        <CardDescription>
          Configure how students see your teaching profile
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form
          id="tutor-profile"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="bio"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
                    <Textarea
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Tell students about your experience"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="hourlyRate"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Hourly Rate</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      type="number"
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      placeholder="e.g., $15/hour"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Category</Label>
            <Select
              value={selectedCategoryId || ""}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              className={`text-sm font-semibold ${!selectedCategoryId || availableSubjects.length < 1 ? "text-muted-foreground" : ""}`}
            >
              Subject
            </Label>
            <Select
              disabled={!selectedCategoryId || availableSubjects.length < 1}
              value=""
              onValueChange={handleSubjectSelect}
            >
              <SelectTrigger
                disabled={!selectedCategoryId || availableSubjects.length < 1}
                className="w-full"
              >
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {availableSubjects.map((sub) => (
                  <SelectItem key={sub.id} value={sub.id}>
                    {sub.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedSubjects.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {selectedSubjects.map((subject) => (
              <div
                key={subject.id}
                className="bg-muted rounded-md px-3 py-1.5 flex items-center gap-2 text-sm"
              >
                <span>{subject.name}</span>
                <button
                  type="button"
                  onClick={() => handleSubjectRemove(subject.id)}
                  className="hover:bg-background rounded-sm p-0.5 transition-colors"
                  aria-label={`Remove ${subject.name}`}
                >
                  <X size={13}/>
                </button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          form="tutor-profile"
          type="submit"
          disabled={selectedCategoryId === "" || selectedSubjects.length < 1}
          className="ml-auto cursor-pointer"
        >
          Save Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
