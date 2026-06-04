export const dynamic = "force-dynamic";

import FilterSidebar from "@/components/modules/tutor/tutorPage/FilterSidebar";
import TutorCard from "@/components/modules/tutor/tutorPage/TutorCard";
import PaginationControls from "@/components/ui/pagination-controls";
import { categoryService } from "@/services/category.service";
import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";
import { TutorFilterParams, TutorProfile } from "@/types";

export default async function TutorsPage({
  searchParams,
}: {
  searchParams: Promise<TutorFilterParams>;
}) {
  const filters = await searchParams;

  const [tutorsRes, categoriesRes, userRes] = await Promise.all([
    tutorService.getAllTutors({ ...filters }, {cache : "no-store"}),
    categoryService.getAllCategories(),
    userService.getSession(),
  ]);

  const pagination = tutorsRes?.data?.pagination || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };

  return (
    <div className="mx-auto py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar */}
        <div className="flex-shrink-0">
          <FilterSidebar categories={categoriesRes.data.data} />
        </div>

        {/* Right Content */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">
              Available Tutors
            </h1>
            <p className="text-muted-foreground text-sm">
              Found {tutorsRes?.data?.data?.length || 0} tutors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutorsRes?.data?.data?.map((tutor: TutorProfile) => (
              <TutorCard key={tutor.id} tutor={tutor} user={userRes.data?.user}/>
            ))}

            {tutorsRes?.data?.data?.length === 0 && (
              <div className="col-span-full text-center py-20 border-2 border-dashed">
                <p className="text-muted-foreground">
                  No tutors match your current filters.
                </p>
              </div>
            )}
          </div>

          <PaginationControls meta={pagination} />
        </div>
      </div>
    </div>
  );
}
