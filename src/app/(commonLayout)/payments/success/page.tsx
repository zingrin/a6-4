import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { paymentService } from "@/services/payment.service";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const session_id = params.session_id;

  if (session_id) {
    // Verify and fulfill the session synchronously if the webhook hasn't yet
    await paymentService.verifyPaymentSession(session_id);
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="flex flex-col items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-500" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-green-700 dark:text-green-500">Payment Successful!</CardTitle>
            <CardDescription className="text-base font-medium">
              Thank you for your purchase. Your payment has been processed successfully.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground pb-8">
          <p>
            You will receive a confirmation email shortly with your receipt and further instructions. 
            You can now access your course or view your upcoming session.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="w-full" variant="default">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild className="w-full" variant="outline">
            <Link href="/dashboard/payments">View Payment History</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
