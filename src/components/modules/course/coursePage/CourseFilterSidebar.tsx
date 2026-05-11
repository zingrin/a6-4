"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Category } from "@/types";
import { Loader2, Search, X } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { Separator } from "@/components/ui/separator";

interface CourseFilterSidebarProps {
  categories: Category[];
}

const LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;

export default function CourseFilterSidebar({ categories }: CourseFilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get("maxPrice")) || 500);

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
    });
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTerm !== (searchParams.get("search") || "")) {
        updateFilters({ search: searchTerm });
      }
    }, 500);
    return () => clearTimeout(delay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const selectedCategoryId = searchParams.get("categoryId");
  const selectedLevel = searchParams.get("level");

  return (
    <div className="w-full lg:w-72 space-y-6 p-5 border rounded-xl bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg text-primary">Filters</h3>
        <button
          onClick={() => router.push("?")}
          className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1"
        >
          <X className="h-3 w-3" /> Reset
        </button>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="course-search" className="text-sm font-semibold">
          Search Course
        </Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="course-search"
            placeholder="Course title or keyword..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Separator />

      {/* Category */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">Category</Label>
        <Select
          value={selectedCategoryId || "all"}
          onValueChange={(value) =>
            updateFilters({ categoryId: value === "all" ? null : value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Level */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">Level</Label>
        <Select
          value={selectedLevel || "all"}
          onValueChange={(value) =>
            updateFilters({ level: value === "all" ? null : value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            {LEVELS.map((lvl) => (
              <SelectItem key={lvl} value={lvl}>
                {lvl.charAt(0) + lvl.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Max Price */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <Label className="text-sm font-semibold">Max Price</Label>
          <span className="text-sm font-bold text-primary">${maxPrice}</span>
        </div>
        <Slider
          defaultValue={[Number(searchParams.get("maxPrice")) || 500]}
          max={1000}
          min={0}
          step={10}
          onValueChange={(value) => setMaxPrice(value[0])}
          onValueCommit={(val) => updateFilters({ maxPrice: val[0] })}
        />
      </div>

      <Separator />

      {/* Sort */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">Sort By</Label>
        <Select
          value={searchParams.get("sortBy") || "createdAt"}
          onValueChange={(value) => updateFilters({ sortBy: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Newest First</SelectItem>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="title">Title (A-Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isPending && (
        <div className="flex items-center gap-3">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <p className="text-sm">Updating...</p>
        </div>
      )}
    </div>
  );
}
