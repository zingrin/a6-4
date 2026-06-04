import DashPageHeader from "@/components/layout/DashPageHeader";
import FeaturedTutorsTable from "@/components/modules/admin/FeaturedTutorsTable";
import { tutorService } from "@/services/tutor.service";


export default async function FeaturedTutors() {


  const { data } = await tutorService.getAllTutors({sortBy : "isFeatured"});


  return (
    <div>
      <DashPageHeader title="Featured Tutors Management" description="Manage all featured tutors" />
      <FeaturedTutorsTable tutors={data.data} />
    </div>
  );
}
