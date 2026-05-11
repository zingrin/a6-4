import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SearchBar } from "./Searchbar";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types";




export async function Hero() {

    const {data : categoryData} = await categoryService.getAllCategories();
    const popularCategories = categoryData?.data?.slice(0,4) ?? [];

  return (
    <div className="relative">
      <section className="relative h-[70vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover flip-video"
          >
            <source src="https://res.cloudinary.com/dw8bzha3e/video/upload/v1770012595/Adobe_Express_-_87592-602317646_small_1_nfdkdy.mp4" type="video/mp4" />
            <div className="w-full h-full bg-linear-to-br from-slate-900 via-primary-900 to-primary-900" />
          </video>
        </div>

        <div className="absolute inset-0 bg-linear-to-r from-0% from-black/80 via-25% via-black/80 to-black/50 z-10" />

        <div className="relative z-20 w-full container mx-auto px-8">
          <div className="max-w-2xl">
            <h1 className="text-white text-5xl lg:text-6xl leading-tight mb-10">
              Connect with Expert
              <br />
               Tutors, Learn Anything
            </h1>
            <div className="mb-6">
              <SearchBar />
            </div>

            <div className="flex flex-wrap gap-3">
              {popularCategories.length > 0 && popularCategories.map((category : Category) => (
                <Link key={category.id} href={`/tutors?categoryId=${category.id}`}>
                  <Button
                    variant="outline"
                    className="bg-transparent border-white/40 text-white/90 hover:bg-white/10 hover:border-white/60 hover:text-white rounded-full px-7 cursor-pointer h-9 text-sm font-medium transition-all"
                  >
                    {category.name}
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}