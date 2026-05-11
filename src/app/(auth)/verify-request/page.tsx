import React from "react";
import Link from "next/link";
import { Mail, ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function VerifyRequestPage({
  searchParams,
}: {
  searchParams: Promise<{email : string}>;
}) {
  // Replace with dynamic logic if needed
  const {email} = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
            <Mail size={32} />
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription className="text-center text-balance">
            We've sent a temporary verification link to <br />
            <span className="font-medium text-slate-900">{email}</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="grid gap-4">
          <Button className="w-full" asChild>
            <a href="https://mail.google.com" target="_blank" rel="noreferrer">
              Open Mail App
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardContent>

        <CardFooter>
          <Button variant="ghost" size="sm" className="w-full" asChild>
            <Link href="/login" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}