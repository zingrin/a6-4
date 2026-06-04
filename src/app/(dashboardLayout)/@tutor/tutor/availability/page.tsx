import DashPageHeader from '@/components/layout/DashPageHeader';
import { AvailabilityCard } from '@/components/modules/tutor/availability/AvailabilityCard';
import { CreateAvailabilityDialog } from '@/components/modules/tutor/availability/CreateAvailabilityDialog';
import { availabilityService } from '@/services/availability.service';
import { Availability } from '@/types';

export default async function TutorAvailability() {
  const { data } = await availabilityService.getAvailabilities();

  return (
    <div className="container mx-auto">
      {/* Page header */}
      <div className="mb-8">
              <DashPageHeader title='Tutor Availability' description='Manage your availability schedule' className='mb-0'/>
        <div className='mt-5 md:mt-0 flex justify-end'>
           <CreateAvailabilityDialog />
        </div>
      </div>

      {/* Availability cards grid */}
      {data?.data?.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.data.map((availability : Availability) => (
            <AvailabilityCard
              key={availability.id}
              availability={availability}
            />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-12 text-center">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">No availability set</h3>
          <p className="text-muted-foreground mt-1">
            Create your first availability slot to get started
          </p>
        </div>
      )}
    </div>
  );
}