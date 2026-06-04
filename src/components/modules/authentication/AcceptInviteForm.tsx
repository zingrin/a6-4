"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  password: z.string().min(8, "Minimum length is 8"),
});

export function AcceptInviteForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const token = searchParams.get("token") || "";
  const initialEmail = searchParams.get("email") || "";
  const initialName = searchParams.get("name") || "";
  const role = searchParams.get("role") || "";

  const [loading, setLoading] = useState(false);

  // We enforce that token and role are present
  useEffect(() => {
    if (!token || !role) {
      toast.error("Invalid invitation link.");
    }
  }, [token, role]);

  const form = useForm({
    defaultValues: {
      name: initialName,
      email: initialEmail,
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!token) {
        toast.error("Missing invitation token.");
        return;
      }

      setLoading(true);
      const toastId = toast.loading("Setting up account...");
      
      try {
        const { data, error } = await authClient.signUp.email({
          email: value.email,
          password: value.password,
          name: value.name,
          role: role,
        } as any, {
          headers: {
            "x-invite-token": token
          }
        });

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        if (data?.user) {
          toast.success("Account created successfully!", { id: toastId });
          router.push(`/login`);
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.", { id: toastId });
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  if (!token || !role) {
    return (
      <div className="text-center p-6 border rounded-lg bg-destructive/10 text-destructive">
        <h2 className="text-lg font-semibold">Invalid Invitation</h2>
        <p className="text-sm mt-2">This invitation link appears to be invalid or broken. Please request a new invite.</p>
      </div>
    );
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center mb-4">
          <h1 className="text-2xl font-bold">Accept Invitation</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Complete your profile to join as a <span className="font-semibold capitalize">{role.toLowerCase()}</span>
          </p>
        </div>

        <form.Field
          name="name"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter your name"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Field
          name="email"
          children={(field) => {
            // Usually we disable email editing to prevent mismatch, 
            // but the invite acts on the email used in parameter. Let's make it read-only.
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  type="email"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  disabled
                  className="bg-muted"
                />
              </Field>
            );
          }}
        />

        <form.Field
          name="password"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  type="password"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Create a strong password"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Completing setup..." : "Accept & Join"}
      </Button>
    </form>
  );
}
