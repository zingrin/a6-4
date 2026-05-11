"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types";
import { Loader2, Search, Star, X } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { Separator } from "@/components/ui/separator";

interface FilterSidebarProps {
  categories: Category[];
}

export default function FilterSidebar({ categories }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [hourlyRate, setHourlyRate] = useState(searchParams.get("hourlyRate") || 0)

  const updateFilters = (updates: Record<string, string | number | boolean | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    params.set("page", "1");

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    startTransition(() => {
        router.push(`?${params.toString()}`);
    })
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== (searchParams.get("search") || "")) {
        updateFilters({ search: searchTerm });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const selectedCategoryId = searchParams.get("categoryId");
  const currentSubjects = categories.find((c) => c.id === selectedCategoryId)?.subjects || [];

  return (
    <div className="w-full lg:w-72 space-y-6 p-5 border rounded-xl bg-card shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg text-primary">Filters</h3>
        <button 
          onClick={() => router.push("?")}
          className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1"
        >
          <X className="h-3 w-3" /> Reset
        </button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="search" className="text-sm font-semibold">Search Tutor</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Name or keyword..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox
          id="isFeatured"
          checked={searchParams.get("isFeatured") === "true"}
          disabled={isPending}
          onCheckedChange={(checked) => updateFilters({ isFeatured: checked ? "true" : null })}
        />
        <Label htmlFor="isFeatured" className="text-sm font-medium cursor-pointer">
          Featured Tutors Only
        </Label>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Category</Label>
          <Select
            value={selectedCategoryId || "all"}
            onValueChange={(value) => updateFilters({ 
              categoryId: value === "all" ? null : value,
              subjectId: null // Clear subject when category changes
            })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {currentSubjects.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Subject</Label>
            <Select
              value={searchParams.get("subjectId") || "all"}
              onValueChange={(value) => updateFilters({ subjectId: value === "all" ? null : value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {currentSubjects.map((sub) => (
                  <SelectItem key={sub.id} value={sub.id}>{sub.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

    <Separator/>

      <div className="space-y-4">
        <div className="flex justify-between">
          <Label className="text-sm font-semibold">Max Hourly Rate</Label>
          <span className="text-sm font-bold text-primary">
            ${hourlyRate}
          </span>
        </div>
        <Slider
          defaultValue={[Number(searchParams.get("hourlyRate")) || 100]}
          max={100}
          min={5}
          step={5}
          onValueChange={(value) => setHourlyRate(value[0])}
          onValueCommit={(val) => updateFilters({ hourlyRate: val[0] })}
        />
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-sm font-semibold">Minimum Rating</Label>
        <div className="space-y-2">
          {[4, 3, 2].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={searchParams.get("avgRating") === String(rating)}
                onCheckedChange={() => updateFilters({ avgRating: rating })}
              />
              <Label 
                htmlFor={`rating-${rating}`} 
                className="text-sm flex items-center gap-1 cursor-pointer"
              >
                {rating}+ Stars <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              </Label>
            </div>
          ))}
        </div>
      </div>

      {isPending && (
        <div className="flex items-center gap-3">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <p className="text-sm">Updating</p>
        </div>
      )}
    </div>
  );
}