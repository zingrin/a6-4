import DashPageHeader from '@/components/layout/DashPageHeader';
import AllBookingsTable from '@/components/modules/admin/AllBookingsTable';
import { bookingService } from '@/services/booking.service'
import React from 'react'

export default async function AdminBookings() {

  const {data} = await bookingService.getAllBookings();

  console.log(data)

  return (
    <div>
      <DashPageHeader title='All Bookings' description='Overview of all bookings and their current status.'/>
      <AllBookingsTable bookings={data.data}/>
    </div>
  )
}
