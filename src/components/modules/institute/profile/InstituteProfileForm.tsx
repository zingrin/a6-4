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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";
import { updateInstituteProfileAction } from "@/actions/institute.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const instituteProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string(),
  contactEmail: z.string().email().or(z.literal("")),
  website: z.string().url().or(z.literal("")),
  establishedYear: z.number().or(z.literal(0)),
  logoUrl: z.any(),
});

export function InstituteProfileForm({ institute }: { institute: any }) {
  const form = useForm({
    defaultValues: {
      name: institute?.name || "",
      description: institute?.description || "",
      contactEmail: institute?.contactEmail || "",
      website: institute?.website || "",
      establishedYear: institute?.establishedYear || 0,
      logoUrl: undefined as any,
    },
    validators: {
      onSubmit: instituteProfileSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating institute profile...");

      try {
        const formData = new FormData();
        formData.append("name", value.name);
        if (value.description) formData.append("description", value.description);
        if (value.contactEmail) formData.append("contactEmail", value.contactEmail);
        if (value.website) formData.append("website", value.website);
        if (value.establishedYear) formData.append("establishedYear", value.establishedYear.toString());
        
        if (value.logoUrl && value.logoUrl instanceof File) {
          formData.append("image", value.logoUrl); // Note: backend uses uploadProfilePhoto which expects "image" field
        }

        const res = await updateInstituteProfileAction(formData);

        if (res?.error) {
          toast.error(res.error.message || "Failed to update profile", { id: toastId });
          return;
        }

        toast.success(res.data.message || "Institute profile updated successfully", { id: toastId });
      } catch (err) {
        console.log(err);
        toast.error("Failed to update profile", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full border">
      <CardHeader>
        <CardTitle>Institute Information</CardTitle>
        <CardDescription>Update your institute public profile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b">
          <Avatar className="h-24 w-24 rounded-lg">
            <AvatarImage src={institute?.logoUrl || ""} />
            <AvatarFallback className="text-xl rounded-lg">
              {institute?.name?.[0]}
            </AvatarFallback>
          </Avatar>
        </div>

        <form
          id="institute-profile-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Institute Name</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Your Institute Name"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="description"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Textarea
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="About your institute"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field
                name="contactEmail"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Contact Email</FieldLabel>
                      <Input
                        id={field.name}
                        value={field.state.value}
                        type="email"
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="contact@institute.com"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="establishedYear"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Established Year</FieldLabel>
                      <Input
                        id={field.name}
                        value={field.state.value || ""}
                        type="number"
                        onChange={(e) => field.handleChange(Number(e.target.value))}
                        placeholder="e.g. 1990"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </div>

            <form.Field
              name="website"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Website URL</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="https://example.com"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="logoUrl"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Institute Logo</FieldLabel>
                    <Input
                      id={field.name}
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.handleChange(e.target.files?.[0] || undefined)}
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
      </CardContent>
      <CardFooter>
        <Button form="institute-profile-form" type="submit" className="ml-auto cursor-pointer">
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
}
