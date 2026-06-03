export const dynamic = "force-dynamic";

import DashPageHeader from "@/components/layout/DashPageHeader";
import { instituteService } from "@/services/institute.service";
import ReviewTable from "@/components/modules/institute/ReviewTable";

export default async function InstituteReviewsPage() {
  const { data } = await instituteService.listReviews({});

  // Response shape: { success, data: { data: Review[], pagination: {...} } }
  const reviews = Array.isArray(data?.data?.data) ? data.data.data : [];

  return (
    <div className="space-y-6">
      <DashPageHeader
        title="Quality & Feedback"
        description="Review student feedback and mentor ratings to maintain educational standards."
      />

      <ReviewTable reviews={reviews} />
    </div>
  );
}
