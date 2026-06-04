import DashPageHeader from "@/components/layout/DashPageHeader";
import { reviewService } from "@/services/review.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FullReview } from "@/types";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function Reviews() {
  const { data } = await reviewService.getAllReviews();

  return (
    <div>
      <DashPageHeader
        title="My Reviews"
        description="See what your students are saying about you"
      />

      <div className="mt-6 rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Student</TableHead>
              <TableHead className="w-[120px]">Rating</TableHead>
              <TableHead>Review</TableHead>
              <TableHead className="w-[140px] text-right">Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-12 text-center text-gray-400">
                  No reviews yet. Your first review will appear here.
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((review : FullReview) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                        {review.student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {review.student.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {review.student.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <p className="text-sm text-gray-600">{review.rating}/5</p>
                  </TableCell>

                  <TableCell>
                    <p className="text-sm text-gray-600">{review.review}</p>
                  </TableCell>

                  <TableCell className="text-right">
                    <p className="text-sm text-gray-400">
                      {formatDate(review.createdAt)}
                    </p>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}