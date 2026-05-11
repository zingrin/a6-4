export const dynamic = "force-dynamic";

import BookingDetails from "@/components/modules/user/bookings/BookingDetails";
import { bookingService } from "@/services/booking.service";
import { userService } from "@/services/user.service";

export default async function BookingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await bookingService.getBookingById(id);
  const { data: user } = await userService.getSession();

  return (
    <div>
      <BookingDetails booking={data.data} user={user.user} />
    </div>
  );
}
