import React from 'react';
import { Monitor, Code, Palette, BookOpen, Music, Camera, Briefcase, Globe } from "lucide-react";
import SectionHeader from "./SectionHeader";

const categories = [
  { name: "Web Development", icon: <Code className="w-8 h-8" />, courses: "120+ Courses" },
  { name: "Design & Arts", icon: <Palette className="w-8 h-8" />, courses: "85+ Courses" },
  { name: "Language Learning", icon: <Globe className="w-8 h-8" />, courses: "60+ Courses" },
  { name: "Business", icon: <Briefcase className="w-8 h-8" />, courses: "95+ Courses" },
  { name: "IT & Software", icon: <Monitor className="w-8 h-8" />, courses: "150+ Courses" },
  { name: "Academics", icon: <BookOpen className="w-8 h-8" />, courses: "200+ Courses" },
  { name: "Photography", icon: <Camera className="w-8 h-8" />, courses: "45+ Courses" },
  { name: "Music", icon: <Music className="w-8 h-8" />, courses: "30+ Courses" }
];

export default function PopularCategories() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 xl:px-32 container mx-auto">
      <SectionHeader 
        title="Popular Categories" 
        description="Explore our wide range of categories and find the perfect skill to master."
        className="text-center"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="group flex flex-col items-center justify-center p-8 bg-card border border-border/50 rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
          >
            <div className="p-4 bg-primary/10 text-primary rounded-full mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              {category.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center group-hover:text-primary transition-colors">{category.name}</h3>
            <p className="text-secondary-foreground text-sm">{category.courses}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
