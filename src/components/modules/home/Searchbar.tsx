// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export function SearchBar() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const router = useRouter();

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/tutors?search=${encodeURIComponent(searchQuery.trim())}`);
//     } else {
//       router.push("/tutors");
//     }
//   };

//   return (
//     <form onSubmit={handleSearch} className="w-full max-w-3xl">
//       <div className="relative">
//         <Input
//           type="text"
//           placeholder="Search for any subject, tutor, or skill..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full h-14 pl-6 pr-14 text-base bg-white/95 backdrop-blur-sm border-none rounded-full shadow-2xl focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-0"
//         />
//         <Button
//           type="submit"
//           size="icon"
//           className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
//         >
//           <Search className="h-5 w-5" />
//         </Button>
//       </div>
//     </form>
//   );
// }




"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tutors?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/tutors");
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative flex items-center bg-white rounded-lg shadow-xl overflow-hidden">
        <Input
          type="text"
          placeholder="Search for any subject..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 h-12 px-6 text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
        />
        
        <Button
          type="submit"
          className="h-12 px-8 bg-primary rounded-none w-12"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}