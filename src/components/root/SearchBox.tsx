"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input"; // adjust path
import { Button } from "@/components/ui/button"; // adjust path
import { Search } from "lucide-react"; // adjust based on your icon import
import { useRouter } from "next/navigation";

export const professions = [
  "For Everyone",
  "Software Engineer / Developer",
  "Marketing Specialist / Digital Marketer",
  "Data Analyst / Business Analyst",
  "Financial Analyst / Investment Professional",
  "Legal Professional (Lawyer / Paralegal)",
  "Content Creator / Graphic Designer",
  "Educator / Learning Designer",
  "UX/UI Designer",
  "Journalist / Research Writer",
  "Entrepreneur / Business Owner",
];

export const ProfessionSearch = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = useMemo(() => {
    if (!query) return professions;
    return professions.filter((prof) =>
      prof.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const handleSelect = (profession: string) => {
    setQuery(profession);
    setSelected(profession);
    setShowSuggestions(false);
    handleSearch(profession);
  };

  const handleSearch = (q?: string) => {
    const searchValue = q || selected || query;
    if (!searchValue) return;
    router.push(`/courses?q=${encodeURIComponent(searchValue)}`);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-xl mx-auto relative mb-16">
      <div className="flex items-center shadow-card rounded-full bg-background overflow-hidden focus-within:ring-1 focus-within:ring-primary transition">
        {/* Search Icon */}
        <div className="pl-4">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>

        {/* Input */}
        <Input
          type="text"
          placeholder="What is your profession? e.g., Lawyer"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className="flex-1 border-none ring-0 focus-visible:ring-0 focus:outline-none focus:border-none bg-transparent px-4 py-3 text-base"
        />

        {/* Search Button */}
        <Button
          type="button"
          onClick={() => handleSearch(undefined)}
          variant="ghost"
          className="rounded-none rounded-r-full bg-gradient-primary text-white hover:text-white hover:opacity-90 px-6 py-3 h-auto"
        >
          Search
        </Button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white shadow-lg rounded-lg overflow-hidden border border-muted divide-y divide-muted max-h-60 overflow-y-auto">
          {filteredSuggestions.map((prof, idx) => (
            <li
              key={idx}
              className="px-4 py-2 cursor-pointer hover:bg-accent transition"
              onClick={() => handleSelect(prof)}
            >
              {prof}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
