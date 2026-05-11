"use client"

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AvailabilityStatus, TutorForModal, TutorProfile } from '@/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Star, Clock, BookOpen } from 'lucide-react';
import { formatTime, formatDay, calcDuration, getInitials } from '@/lib/utils';
import { toast } from 'sonner';
import { createBookingAction } from '@/actions/student.action';
import { createBookingPaymentAction } from '@/actions/payment.action';

export default function CreateBookingDialog({ tutor }: { tutor: TutorForModal }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get('book') === 'true';

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [selectedAvailabilityId, setSelectedAvailabilityId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (tutor.subjects.length === 1) {
      setSelectedSubjectId(tutor.subjects[0].subjectId);
    }
  }, [tutor.subjects]);

  const handleClose = () => {
    router.replace(pathname, { scroll: false });
    setSelectedSubjectId(tutor.subjects.length === 1 ? tutor.subjects[0].subjectId : '');
    setSelectedAvailabilityId('');
  };

  const availableSlots = tutor.availability.filter((slot) => slot.status !== AvailabilityStatus.BOOKED);

  const handleSubmit = async () => {
      if (!selectedSubjectId || !selectedAvailabilityId) return;

      const toastId = toast.loading("Booking the session...");
      setIsLoading(true);

    try {
      const bookingData = {
        tutorId: tutor.id,
        availabilityId: selectedAvailabilityId,
        subjectId: selectedSubjectId,
      };

      const res = await createBookingAction(bookingData);

      if (res.error) {
        toast.error(res.error, { id: toastId });
        setIsLoading(false);
        return;
      }

      toast.loading("Redirecting to checkout...", { id: toastId });
      
      const paymentRes = await createBookingPaymentAction(res.data.data.id);
      
      if (paymentRes.error) {
          toast.error(paymentRes.error, { id: toastId });
          setIsLoading(false);
          return;
      }

      if (paymentRes.data?.data?.paymentUrl) {
          // Redirect to Stripe checkout
          window.location.href = paymentRes.data.data.paymentUrl;
      } else {
          toast.error("Failed to generate payment URL", { id: toastId });
          setIsLoading(false);
      }
    } catch (error) {
      toast.error("Failed to book the session", { id: toastId });
      console.error('Booking failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book a Session</DialogTitle>
          <DialogDescription>
            Select a subject and an available time slot to book.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-start gap-3 rounded-lg bg-muted p-3">
          <Avatar className="h-11 w-11">
            <AvatarImage src={tutor.user.image || ""} alt={tutor.user.name} />
            <AvatarFallback>{getInitials(tutor.user.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{tutor.user.name}</p>
            <p className="text-xs text-muted-foreground">{tutor.category?.name ?? "Uncategorized"}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                {tutor.avgRating} ({tutor.totalReviews})
              </span>
              <span className="text-xs text-muted-foreground">
                ${tutor.hourlyRate}/hr
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="subject-select">Subject</Label>
          {tutor.subjects.length === 1 ? (
            <div id="subject-select" className="flex items-center gap-2 rounded-md border px-3 py-2 bg-muted">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{tutor.subjects[0].subject.name}</span>
              <Badge variant="secondary" className="ml-auto text-xs">Only option</Badge>
            </div>
          ) : (
            <Select value={selectedSubjectId} onValueChange={setSelectedSubjectId}>
              <SelectTrigger id="subject-select" className='w-full'>
                <SelectValue placeholder="Choose a subject" />
              </SelectTrigger>
              <SelectContent>
                {tutor.subjects.map((s) => (
                  <SelectItem key={s.subjectId} value={s.subjectId}>
                    {s.subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="space-y-1.5">
          <Label>Available Time Slots</Label>
          {availableSlots.length === 0 ? (
            <p className="text-sm text-muted-foreground rounded-md border border-dashed p-3 text-center">
              No available slots at the moment.
            </p>
          ) : (
            <div className="space-y-2">
              {availableSlots.map((slot) => (
                <label
                  key={slot.id}
                  className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors
                    ${selectedAvailabilityId === slot.id
                      ? 'border-primary bg-primary/5'
                      : 'border-muted hover:bg-muted/50'
                    }`}
                >
                  <input
                    type="radio"
                    name="availability"
                    checked={selectedAvailabilityId === slot.id}
                    onChange={() => setSelectedAvailabilityId(slot.id)}
                    className="sr-only"
                  />
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{formatDay(slot.day)}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatTime(slot.startTime)} – {formatTime(slot.endTime)}
                      <span className="ml-1.5 text-muted-foreground/60">
                        ({calcDuration(slot.startTime, slot.endTime)})
                      </span>
                    </p>
                  </div>
                  {selectedAvailabilityId === slot.id && (
                    <Badge variant="default" className="text-xs">Selected</Badge>
                  )}
                </label>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="pt-2">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              isLoading ||
              !selectedAvailabilityId ||
              (!selectedSubjectId && tutor.subjects.length > 1)
            }
          >
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}