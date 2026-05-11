"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { updateMentorProfileAction } from "@/actions/mentor.action";
import { Loader2, Save, User, GraduationCap, Sparkles } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  title: z.string().max(100).optional().nullable(),
  bio: z.string().max(1000).optional().nullable(),
  expertise: z.string().max(100).optional().nullable(),
  avatarUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")).nullable(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface MentorProfileFormProps {
  initialData: any;
}

export default function MentorProfileForm({ initialData }: MentorProfileFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: initialData.user.name || "",
      title: initialData.title || "",
      bio: initialData.bio || "",
      expertise: initialData.expertise || "",
      avatarUrl: initialData.avatarUrl || initialData.user.image || "",
    } as ProfileFormValues,
    validators: {
      onSubmit: profileSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      const toastId = toast.loading("Updating profile...");
      try {
        const { data, error } = await updateMentorProfileAction(value);
        if (error) {
          toast.error(error.message, { id: toastId });
        } else {
          toast.success("Profile updated successfully!", { id: toastId });
          router.refresh();
        }
      } catch (err) {
        toast.error("Something went wrong", { id: toastId });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-8"
    >
      <div className="grid gap-6 md:grid-cols-12">
        {/* Account Profile Section */}
        <Card className="md:col-span-4 border-none shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Account Identity
            </CardTitle>
            <CardDescription>Managed account parameters and presence.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="flex flex-col items-center gap-4 py-4">
                <form.Subscribe
                  selector={(state) => [state.values.avatarUrl, state.values.name]}
                  children={([avatarUrl, name]) => (
                    <Avatar className="h-24 w-24 border-4 border-primary/10">
                      <AvatarImage src={(avatarUrl as string) || undefined} />
                      <AvatarFallback className="text-2xl font-black">
                        {(name as string)?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                />
                <div className="text-center">
                  <p className="text-sm font-bold">{initialData.user.email}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mt-1 flex items-center justify-center gap-1">
                    <Sparkles className="h-3 w-3 text-indigo-500" />
                    Verified Instructor
                  </p>
                </div>
              </div>

              <form.Field
                name="avatarUrl"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !!field.state.meta.errors.length;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Avatar URL</FieldLabel>
                      <Input
                        id={field.name}
                        placeholder="https://..."
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="bg-background/50 border-border/50"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Professional Details Section */}
        <Card className="md:col-span-8 border-none shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-indigo-500" />
              Instructional Profile
            </CardTitle>
            <CardDescription>Describe your pedagogical background and expertise.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <form.Field
                  name="name"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !!field.state.meta.errors.length;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Display Name</FieldLabel>
                        <Input
                          id={field.name}
                          placeholder="John Doe"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="bg-background/50 border-border/50"
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="title"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !!field.state.meta.errors.length;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Professional Title</FieldLabel>
                        <Input
                          id={field.name}
                          placeholder="Senior AI Research Engineer"
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="bg-background/50 border-border/50"
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    );
                  }}
                />
              </div>

              <form.Field
                name="expertise"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !!field.state.meta.errors.length;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Key Expertise</FieldLabel>
                      <Input
                        id={field.name}
                        placeholder="Machine Learning, Python, Neural Networks"
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="bg-background/50 border-border/50"
                      />
                      <FieldDescription className="text-[10px] font-medium italic">
                        Separate multiple skills with commas.
                      </FieldDescription>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="bio"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !!field.state.meta.errors.length;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Instructional Bio</FieldLabel>
                      <div className="relative">
                        <Textarea
                          id={field.name}
                          placeholder="Tell students about your passion for teaching..."
                          className="min-h-[150px] resize-none pb-8 bg-background/50 border-border/50"
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground/50 font-bold">
                          {field.state.value?.length || 0}/1000
                        </div>
                      </div>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="px-8 font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update Profile
                    </>
                  )}
                </Button>
              </div>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
