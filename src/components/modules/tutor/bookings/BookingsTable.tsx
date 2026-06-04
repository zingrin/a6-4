'use client';

import { useState, forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Eye } from 'lucide-react';
// import { updateBookingStatusAction } from '@/actions/booking.action';
import { Booking, BookingStatus } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';
import { updateBookingStatusAction } from '@/actions/user.action';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  CONFIRMED: 'secondary',
  COMPLETED: 'default',
  CANCELLED: 'destructive',
};


interface BookingsTableProps {
  bookings: Booking[];
}

export function BookingsTable({ bookings }: BookingsTableProps) {

  const handleStatusChange = async (newStatus: BookingStatus, bookingId: string) => {
    const toastId = toast.loading("Marking completed...");

        try {
       
        const res = await updateBookingStatusAction(newStatus, bookingId);

        if (res.error) {
            toast.error(res.error, { id: toastId });
            return;
        }
        toast.success(res.data.message || "Booking status updated", {
            id: toastId,
        });
        } catch (err) {
        console.log(err);
        toast.error("Failed to update booking", { id: toastId });
        }
  }

  const formatAvailabilityTime = (availability: Booking['availability'] | null) => {
    if (!availability) return '—';
    return `${availability.startTime} - ${availability.endTime}`;
  };


  return (
    <div className="border-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Availability Slot</TableHead>
            <TableHead>Booked On</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-20 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking, index) => (
            <TableRow key={booking.id}>
              <TableCell className="text-muted-foreground">{index + 1}</TableCell>

              <TableCell className="font-medium">{booking.student?.name ?? '—'}</TableCell>

              <TableCell className="text-muted-foreground">{booking.student?.phone ?? '—'}</TableCell>

              <TableCell className="text-muted-foreground">
                {formatAvailabilityTime(booking.availability)}
              </TableCell>

              <TableCell className="text-muted-foreground">{formatDate(booking.createdAt)}</TableCell>

              <TableCell className="text-muted-foreground">
                {booking.price === 0 ? 'Free' : `$${booking.price}`}
              </TableCell>

              <TableCell>
                <Badge variant={STATUS_VARIANT[booking.status]}>
                  {booking.status}
                </Badge>  
              </TableCell>

              <TableCell className="text-right flex justify-center items-center gap-2">
{booking.status === BookingStatus.CONFIRMED &&
  <Dialog>
  <DialogTrigger asChild>
    <Button variant="default" className='text-xs px-2 h-7 cursor-pointer'>Mark as Completed</Button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-106.25">
    <DialogHeader>
      <DialogTitle>Confirm Completion</DialogTitle>
      <DialogDescription>
        Please confirm that the session with <b>{booking.student?.name}</b> has been finished.
      </DialogDescription>
    </DialogHeader>

    {/* Booking Summary Section */}
    <div className="grid gap-4 py-4">
      <div className="rounded-lg bg-muted p-4 text-sm space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Student:</span>
          <span className="font-medium">{booking.student?.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Time:</span>
          <span className="font-medium">{formatAvailabilityTime(booking.availability)}</span>
        </div>
        <div className="flex justify-between border-t pt-2">
          <span className="text-muted-foreground">Earnings:</span>
          <span className="font-medium text-green-600">
            {booking.price === 0 ? 'Free' : `$${booking.price}`}
          </span>
        </div>
      </div>
    </div>

    <DialogFooter className="flex gap-2">
      <DialogClose asChild>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </DialogClose>
      <DialogClose asChild>
      <Button 
        type="button" 
        onClick={() => handleStatusChange(BookingStatus.COMPLETED, booking.id)}
      >
        Confirm Completion
      </Button>
      </DialogClose>

    </DialogFooter>
  </DialogContent>
</Dialog>}


                <Link
                className='text-right flex justify-center text-xs items-center gap-1'
                  href={`/tutor/bookings/${booking.id}`}
                >
                  <Eye className="h-4 w-4" /> View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}