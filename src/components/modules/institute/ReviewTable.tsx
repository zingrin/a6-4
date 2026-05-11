"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface ReviewTableProps {
  reviews: any[];
}

export default function ReviewTable({ reviews }: ReviewTableProps) {
  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Student</TableHead>
            <TableHead className="w-[200px]">Mentor</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="max-w-[300px]">Review</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No reviews found for your mentors.
              </TableCell>
            </TableRow>
          ) : (
            reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={review.student.image || undefined} />
                    <AvatarFallback>{review.student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{review.student.name}</span>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={review.tutor.user.image || undefined} />
                            <AvatarFallback>{review.tutor.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{review.tutor.user.name}</span>
                    </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-bold">{Number(review.rating).toFixed(1)}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-[300px] truncate" title={review.review}>
                  {review.review}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
