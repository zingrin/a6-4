import { Star, MapPin, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { tutorService } from "@/services/tutor.service";
import { getInitials } from "@/lib/utils";
import SectionHeader from "./SectionHeader";
import { Category, User } from "@/types";


interface Tutor {
  id: string;
  userId: string;
  categoryId: string;
  bio: string;
  hourlyRate: number;
  isFeatured: boolean;
  avgRating: string;
  totalReviews: number;
  createdAt: string;
  user: User;
  category: Category;
  availability: Array<any>;
  _count: {
    reviews: number;
  };
}


export default async function FeaturedTutors() {

  const {data} = await tutorService.getAllTutors({isFeatured : true, limit : "3"});
  const tutors : Tutor[] = data?.data ?? [];


  return (
    <section className="container mx-auto px-8 py-16">
      <SectionHeader title="Meet Our Top Tutors" description="Learn from the best educators in their fields"/>
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tutors.length > 0 && tutors.map((tutor) => {
          return (
            <Card
              key={tutor.id}
              className="border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
            >
              <CardContent className="p-0">
                <div className="relative h-48 flex items-center justify-center">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage src={tutor.user.image || undefined} alt={tutor.user.name} />
                    <AvatarFallback className="bg-primary text-white text-3xl font-semibold">
                      {getInitials(tutor.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  {tutor.isFeatured && (
                    <Badge className="absolute top-4 right-4 bg-yellow-50 text-yellow-700 ">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      Featured
                    </Badge>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {tutor.user.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Badge variant="outline" className="font-medium">
                        {tutor.category?.name ?? "Uncategorized"}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {tutor.bio}
                  </p>

                  <div className="flex items-center justify-between mb-4 pb-4 border-b">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">
                        {tutor.avgRating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({tutor.totalReviews})
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-primary font-bold">
                      <DollarSign className="w-4 h-4" />
                      <span>{tutor.hourlyRate}/hr</span>
                    </div>
                  </div>
    
                  <Link href={`/tutors/${tutor.id}`}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-12">
        <Link href="/tutors">
          <Button
            variant="outline"
            size="lg"
            className="px-8 border-gray-300 hover:bg-gray-50"
          >
            Browse All Tutors
          </Button>
        </Link>
      </div>
    </section>
  );
}