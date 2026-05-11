
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  Star,
  User as UserIcon,
  BookOpen,
  DollarSign,
  CheckCircle,
  Timer,
  PencilLine,
} from 'lucide-react';
import { BookingDetail, BookingStatus, User, UserRoles } from '@/types';
import { calcDuration, formatDateTime } from '@/lib/utils';
import { StarRating } from '@/components/ui/start-rating';
import { DetailRow } from './DetailRow';
import { Button } from '@/components/ui/button';
import LeaveReviewDialog from '../../student/review/LeaveReviewDialog';

const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  CONFIRMED: 'secondary',
  COMPLETED: 'default',
  CANCELLED: 'destructive',
};

interface BookingDetailsPageProps {
  booking: BookingDetail;
  user ?: User;
}

export default function BookingDetailsPage({ booking, user }: BookingDetailsPageProps) {

  return (
    <div className="container mx-auto">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Booking Details</h1>
          <p className="mt-1 font-mono text-sm text-muted-foreground">{booking.id}</p>
        </div>
        <Badge variant={STATUS_VARIANT[booking.status] ?? 'outline'} className="text-sm">
          {booking.status}
        </Badge>
      </div>

      <Card className="border-2 mb-8">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">Price</span>
              <span className="text-xl font-bold">${booking.price}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">Hourly Rate</span>
              <span className="text-xl font-bold">${booking.tutor?.hourlyRate ?? '—'}/hr</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">Subject</span>
              <span className="text-xl font-bold">{booking.subject?.name ?? '—'}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">Booked On</span>
              <span className="text-sm font-medium">{formatDateTime(booking.createdAt)}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">Completed At</span>
              <span className="text-sm font-medium">{formatDateTime(booking.completedAt)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Student card */}
          <Card className="border-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                Student
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <DetailRow icon={UserIcon} label="Name" value={booking.student?.name ?? '—'} />
              <DetailRow icon={Mail} label="Email" value={booking.student?.email ?? '—'} />
              <DetailRow icon={Phone} label="Phone" value={booking.student?.phone ?? '—'} />
              <DetailRow
                icon={CheckCircle}
                label="Account Status"
                value={
                  <Badge variant="secondary" className="w-fit">
                    {booking.student?.status ?? '—'}
                  </Badge>
                }
              />
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <DetailRow icon={Calendar} label="Day" value={booking.availability?.day ?? '—'} />
              <DetailRow
                icon={Clock}
                label="Time Slot"
                value={
                  booking.availability
                    ? `${booking.availability.startTime} – ${booking.availability.endTime}`
                    : '—'
                }
              />
              <DetailRow
                icon={Timer}
                label="Duration"
                value={calcDuration(booking.availability?.startTime, booking.availability?.endTime)}
              />
              <DetailRow
                icon={CheckCircle}
                label="Slot Status"
                value={
                  <Badge variant="secondary" className="w-fit">
                    {booking.availability?.status ?? '—'}
                  </Badge>
                }
              />
            </CardContent>
          </Card>
          {booking.status === BookingStatus.COMPLETED && 
          <Card className="border-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <Star className="h-4 w-4 text-muted-foreground" />
                Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              {booking.review ? (
                <div className="space-y-4">
                  <StarRating rating={parseFloat(booking.review.rating)} />
                  <Separator />
                  <p className="text-sm leading-relaxed">{booking.review.review}</p>
                  <Separator />
                  <span className="text-xs text-muted-foreground">
                    Reviewed on {formatDateTime(booking.review.createdAt)}
                  </span>
                </div>
              ) : (

                user?.role === UserRoles.STUDENT ? (
                  // <Button> <PencilLine/> Leave a review</Button>
                  <LeaveReviewDialog bookingId={booking.id}/>
                ) : (

                  <p className="text-sm text-muted-foreground">No review has been submitted yet.</p>
                )
              )}
            </CardContent>
          </Card>}
        </div>

        <div className="space-y-6">
          <Card className="border-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                Tutor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{booking.tutor?.user?.name ?? '—'}</p>
                  <p className="text-xs text-muted-foreground">{booking.tutor?.user?.email ?? '—'}</p>
                </div>
                <Badge variant="secondary" className="w-fit">
                  {booking.tutor?.user?.status ?? '—'}
                </Badge>
              </div>

              <Separator />

              {/* User contact fields */}
              <DetailRow icon={Mail} label="Email" value={booking.tutor?.user?.email ?? '—'} />
              <DetailRow icon={Phone} label="Phone" value={booking.tutor?.user?.phone ?? '—'} />

              <Separator />

              <DetailRow
                icon={Star}
                label="Average Rating"
                value={<StarRating rating={parseFloat(booking.tutor?.avgRating ?? '0')} />}
              />
              <DetailRow
                icon={BookOpen}
                label="Total Reviews"
                value={booking.tutor?.totalReviews ?? '—'}
              />
              <DetailRow
                icon={DollarSign}
                label="Hourly Rate"
                value={`$${booking.tutor?.hourlyRate ?? '—'}/hr`}
              />
              {booking.tutor?.isFeatured && <DetailRow
                icon={CheckCircle}
                label="Featured"
                value={
                  <Badge variant={booking.tutor?.isFeatured ? 'default' : 'outline'} className="w-fit">
                    Yes
                  </Badge>
                }
              />}

              <Separator />

              <div>
                <span className="text-xs text-muted-foreground">Bio</span>
                <p className="mt-1 text-sm leading-relaxed">{booking.tutor?.bio ?? '—'}</p>
              </div>
            </CardContent>
          </Card>

          {/* IDs reference card */}
          <Card className="border-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                References
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">Booking ID</span>
                <span className="font-mono text-xs break-all">{booking.id}</span>
              </div>
              <Separator />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">Availability ID</span>
                <span className="font-mono text-xs break-all">{booking.availabilityId ?? '—'}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}