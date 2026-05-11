import React from "react";
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types";
import Link from "next/link";

export default async function Footer() {
  const { data: categoryData } = await categoryService.getAllCategories();
  const popularCategories = categoryData?.data.slice(0, 4) ?? [];

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Branding */}
          <div className="space-y-6">
            <Logo 
              className="mb-0" 
              imgClassName="brightness-0 invert h-10 w-auto" 
              textClassName="text-white"
            />
            <p className="text-slate-400 text-sm leading-relaxed max-max-w-[280px]">
              SkillBridge is on a mission to democratize expert learning by 
              connecting passionate learners with world-class tutors and institutions.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-primary transition-colors duration-200"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors duration-200"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors duration-200"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors duration-200"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs">Platform</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/tutors" className="hover:text-primary transition-colors duration-200">Find a Tutor</Link></li>
              <li><Link href="/courses" className="hover:text-primary transition-colors duration-200">Explore Courses</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors duration-200">About Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Top Categories */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs">Recommended</h4>
            <ul className="space-y-4 text-sm">
              {popularCategories.map((category: Category) => (
                <li key={category.id}>
                  <Link
                    href={`/tutors?categoryId=${category.id}`}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              {popularCategories.length === 0 && (
                <>
                  <li><Link href="/tutors" className="hover:text-primary transition-colors duration-200">Design & Creative</Link></li>
                  <li><Link href="/tutors" className="hover:text-primary transition-colors duration-200">Development</Link></li>
                  <li><Link href="/tutors" className="hover:text-primary transition-colors duration-200">Business</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Column 4: Contact/Legal */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-1 shrink-0" />
                <span>hello@skillbridge.io</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-1 shrink-0" />
                <span>+1 (555) 000-0000</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
                <span className="leading-relaxed">123 Education St, Innovation City, DX 4040</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-slate-800 w-full mt-16 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500 font-medium tracking-wide">
            &copy; {new Date().getFullYear()} SkillBridge Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-xs font-semibold tracking-wider text-slate-500 uppercase">
            <Link href="/terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
