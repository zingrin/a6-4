import { AdminBooking } from '@/types'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate, formatTime } from '@/lib/utils'
import Link from 'next/link'
import { Eye } from 'lucide-react'

export default function AllBookingsTable({bookings} : {bookings : AdminBooking[]}) {
  return (
    <div className="border-2">
      <Table>
      <TableHeader>
        <TableRow className='bg-secondary'>
          <TableHead className='w-12'>Booking ID</TableHead>
          <TableHead>Student</TableHead>
          <TableHead>Tutor</TableHead>
          <TableHead>Day</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>{booking.id.slice(0, 10) + "..."}</TableCell>
            <TableCell>{booking.student.name}</TableCell>
            <TableCell>{booking.tutor?.user.name}</TableCell>
            <TableCell>{booking.availability ? booking.availability.day : "-"}</TableCell>
            <TableCell>${booking.price}</TableCell>
            <TableCell>{booking.status}</TableCell>
            <TableCell>{formatDate(booking.createdAt)}</TableCell>
            <TableCell>
                <Link
                className='text-right flex justify-center text-xs items-center gap-1'
                  href={`/admin/bookings/${booking.id}`}
                >
                  <Eye className="h-4 w-4" /> View
                </Link>
            </TableCell>
            {/* <TableCell>{invoice.paymentMethod}</TableCell> */}
            {/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}
