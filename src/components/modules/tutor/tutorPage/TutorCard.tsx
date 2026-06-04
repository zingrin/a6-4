
import { Star, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TutorProfile, User } from "@/types";
import Link from "next/link";


interface TutorCardProps {
  tutor: TutorProfile;
  user ?: User
}

export default function TutorCard({ tutor, user }: TutorCardProps) {

  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <div className="relative">
          <Avatar className="h-16 w-16 border-2 border-primary/10">
            <AvatarImage src={tutor.user.image || ""} alt={tutor.user.name} />
            <AvatarFallback className="text-lg bg-primary/5">
              {tutor.user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {tutor.isFeatured && (
            <Badge className="absolute -bottom-2 -right-2 px-1 py-0 text-[10px] bg-yellow-500 hover:bg-yellow-600">
              Featured
            </Badge>
          )}
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-xl leading-none">{tutor.user.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Expert in {tutor?.category?.name}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Rating and Reviews */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md text-yellow-700 font-medium">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            {tutor.avgRating}
          </div>
          <span className="text-muted-foreground">
            ({tutor._count.reviews} Reviews)
          </span>
          <span className="font-semibold ml-auto text-lg">
            ${tutor.hourlyRate}<span className="text-xs font-normal text-muted-foreground">/hr</span>
          </span>
        </div>

        <p className="text-sm line-clamp-2 text-gray-600 italic">
          "{tutor.bio}"
        </p>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase text-gray-400">Availability</p>
          <div className="flex flex-wrap gap-2">
            {tutor.availability.slice(0, 3).map((slot) => (
              <Badge key={slot.id} variant="secondary" className="font-normal text-[11px]">
                <Clock className="mr-1 h-3 w-3" />
                {slot.day}: {slot.startTime}
              </Badge>
            ))}
            {tutor.availability.length > 3 && (
              <span className="text-xs text-muted-foreground">+{tutor.availability.length - 3} more</span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-background border-t p-4 flex items-center gap-[5%]">
        <Button asChild className="font-semibold w-[47.5%]" variant="outline">
          <Link href={`/tutors/${tutor.id}`}>
            View Profile
          </Link>
        </Button>
        
        <Button className="font-semibold w-[47.5%]" variant="default" asChild>
          <Link href={user ? `/tutors/${tutor.id}?book=true` : "/login"}>
            Book a Session
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}