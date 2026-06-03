import BookingDetails from "@/components/modules/user/bookings/BookingDetails";
import { bookingService } from "@/services/booking.service";

export default async function BookingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await bookingService.getBookingById(id);

  return (
    <div>
      <BookingDetails booking={data.data} />
    </div>
  );
}
