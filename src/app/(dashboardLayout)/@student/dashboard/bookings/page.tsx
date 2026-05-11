import DashPageHeader from "@/components/layout/DashPageHeader";
import { StudentBookingsTable } from "@/components/modules/student/bookings/StudentBookingsTable";
import { bookingService } from "@/services/booking.service";
import { Booking } from "@/types";


export default async function StudentBooking() {

  const { data } = await bookingService.getAllBookings();

  return (
    <div>
       <DashPageHeader title='My Bookings' description='View and manage all your bookings'/>


      {data?.data?.length > 0 ? (
              <StudentBookingsTable bookings={data.data as Booking[]} />
            ) : (
              <div className="flex flex-col items-center justify-center border-2 py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center border-2 bg-muted">
                  <svg
                    className="h-8 w-8 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">No bookings yet</h3>
                <p className="text-muted-foreground mt-1">
                  Your bookings will appear here once you book session
                </p>
              </div>
            )}
    </div>
  )
}
