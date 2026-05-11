"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createCoursePaymentAction } from "@/actions/payment.action";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface CourseEnrollButtonProps {
  courseId: string;
}

export default function CourseEnrollButton({ courseId }: CourseEnrollButtonProps) {
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleEnroll = async () => {
    if (!user) {
      toast.error("Please login to enroll in this course.");
      router.push("/login");
      return;
    }

    if ((user as any).role !== "STUDENT") {
      toast.error("Only students can enroll in courses.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Redirecting to checkout...");

    try {
      const res = await createCoursePaymentAction(courseId);

      if (res.error) {
        toast.error(res.error, { id: toastId });
        setLoading(false);
        return;
      }

      if (res.data?.data?.paymentUrl) {
        window.location.href = res.data.data.paymentUrl;
      } else {
        toast.error("Failed to generate payment URL", { id: toastId });
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
      setLoading(false);
    }
  };

  return (
    <Button 
      size="lg" 
      className="px-10 font-semibold" 
      onClick={handleEnroll} 
      disabled={loading}
    >
      {loading ? "Processing..." : "Enroll Now"}
    </Button>
  );
}
