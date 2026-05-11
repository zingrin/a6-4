'use client';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';  
import { Eye, CreditCard, Loader2 } from 'lucide-react';
import { createBookingPaymentAction } from '@/actions/payment.action';
import { Booking, BookingStatus } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';
import { updateBookingStatusAction } from '@/actions/user.action';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  PENDING: 'outline',
  CONFIRMED: 'secondary',
  COMPLETED: 'default',
  CANCELLED: 'destructive',
};


interface BookingsTableProps {
  bookings: Booking[];
}

export function StudentBookingsTable({ bookings }: BookingsTableProps) {
  const [loadingPaymentId, setLoadingPaymentId] = useState<string | null>(null);

  const handlePayment = async (bookingId: string) => {
    setLoadingPaymentId(bookingId);
    const toastId = toast.loading("Redirecting to checkout...");
    try {
      const res = await createBookingPaymentAction(bookingId);
      if (res.error) {
        toast.error(res.error, { id: toastId });
        return;
      }
      if (res.data?.data?.paymentUrl) {
        window.location.href = res.data.data.paymentUrl;
      } else {
        toast.error("Failed to generate payment URL", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setLoadingPaymentId(null);
    }
  };

  const handleStatusChange = async (newStatus: BookingStatus, bookingId: string) => {
    const toastId = toast.loading("Cancelling session...");

        try {
       
        const res = await updateBookingStatusAction(newStatus, bookingId);

        if (res.error) {
            toast.error(res.error, { id: toastId });
            return;
        }
        toast.success(res.data.message || "Session cancelled", {
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
            <TableHead>Tutor Name</TableHead>
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

              <TableCell className="font-medium">{booking.tutor?.user?.name ?? '—'}</TableCell>

              <TableCell className="text-muted-foreground">{booking.tutor?.user?.phone ?? '—'}</TableCell>

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

              <TableCell className="text-right flex justify-center gap-2">
                { booking.status === BookingStatus.CONFIRMED && 
                <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary" className='text-xs px-2 h-6 py-0 cursor-pointer text-red-600 hover:bg-red-100'>Cancel Session</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Cancel Booking</DialogTitle>
                    <DialogDescription>
                       Are you sure you want to cancel your session with <b>{booking.tutor?.user?.name}</b>?
                        This action cannot be undone.
                    </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                    <div className="rounded-lg bg-muted p-4 text-sm space-y-2">
                        <div className="flex justify-between">
                        <span className="text-muted-foreground">Tutor:</span>
                        <span className="font-medium">{booking.tutor?.user?.name}</span>
                        </div>
                        <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium">{formatAvailabilityTime(booking.availability)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-medium">
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
                        variant="destructive"
                        onClick={() => handleStatusChange(BookingStatus.CANCELLED, booking.id)}
                    >
                        Confirm Cancellation
                    </Button>
                    </DialogClose>

                    </DialogFooter>
                    </DialogContent>
                </Dialog>
                }

                { booking.status === BookingStatus.PENDING && 
                  <Button 
                    variant="default" 
                    className="text-xs px-2 h-6 py-0 cursor-pointer"
                    onClick={() => handlePayment(booking.id)}
                    disabled={loadingPaymentId === booking.id}
                  >
                    {loadingPaymentId === booking.id ? (
                      <><Loader2 className="h-3 w-3 mr-1 animate-spin" /> Wait</>
                    ) : (
                      <><CreditCard className="h-3 w-3 mr-1" /> Pay Now</>
                    )}
                  </Button>
                }

                <Link
                className='text-right flex justify-center text-xs items-center gap-1'
                  href={`/dashboard/bookings/${booking.id}`}
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