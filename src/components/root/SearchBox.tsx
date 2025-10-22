"use client";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input"; // adjust path
import { Button } from "@/components/ui/button"; // adjust path
import { Search } from "lucide-react"; // adjust based on your icon import
import { useRouter } from "next/navigation";

// Example list of professions (you can replace this with an API call)
const professions = [
  "Accountant",
  "Actor",
  "Actuary",
  "Administrator",
  "Advertising Specialist",
  "Agricultural Engineer",
  "Air Traffic Controller",
  "Animator",
  "Architect",
  "Archivist",
  "Art Director",
  "Artist",
  "Astronomer",
  "Athlete",
  "Author",
  "Baker",
  "Banker",
  "Barber",
  "Biochemist",
  "Biologist",
  "Biomedical Engineer",
  "Bricklayer",
  "Business Analyst",
  "Butcher",
  "Carpenter",
  "Cartographer",
  "Chef",
  "Chemical Engineer",
  "Chemist",
  "Civil Engineer",
  "Clergy",
  "Coach",
  "Commercial Pilot",
  "Computer Programmer",
  "Construction Manager",
  "Consultant",
  "Content Writer",
  "Copywriter",
  "Corrections Officer",
  "Counselor",
  "Customer Service Representative",
  "Data Analyst",
  "Data Engineer",
  "Data Scientist",
  "Database Administrator",
  "Dentist",
  "Designer",
  "Dietitian",
  "Doctor",
  "Economist",
  "Editor",
  "Electrician",
  "Elementary School Teacher",
  "Engineer",
  "Environmental Scientist",
  "Event Planner",
  "Farmer",
  "Fashion Designer",
  "Film Director",
  "Financial Advisor",
  "Firefighter",
  "Florist",
  "Food Scientist",
  "Freelancer",
  "Front-End Developer",
  "Game Developer",
  "Geologist",
  "Graphic Designer",
  "Hairdresser",
  "Historian",
  "Hotel Manager",
  "Human Resources Manager",
  "Illustrator",
  "Industrial Designer",
  "Information Security Analyst",
  "Interpreter",
  "IT Support Specialist",
  "Journalist",
  "Judge",
  "Kindergarten Teacher",
  "Lab Technician",
  "Lawyer",
  "Librarian",
  "Logistics Manager",
  "Machine Learning Engineer",
  "Machinist",
  "Makeup Artist",
  "Management Consultant",
  "Marine Biologist",
  "Marketing Manager",
  "Massage Therapist",
  "Mathematician",
  "Mechanical Engineer",
  "Medical Assistant",
  "Meteorologist",
  "Midwife",
  "Military Officer",
  "Model",
  "Musician",
  "Nurse",
  "Nutritionist",
  "Occupational Therapist",
  "Operations Manager",
  "Optometrist",
  "Paramedic",
  "Personal Trainer",
  "Pharmacist",
  "Philosopher",
  "Photographer",
  "Physical Therapist",
  "Physician",
  "Physicist",
  "Pilot",
  "Plumber",
  "Police Officer",
  "Politician",
  "Postman",
  "Professor",
  "Project Manager",
  "Psychiatrist",
  "Psychologist",
  "Public Relations Specialist",
  "Real Estate Agent",
  "Receptionist",
  "Research Scientist",
  "Retail Manager",
  "Sales Manager",
  "Scientist",
  "Security Guard",
  "Social Media Manager",
  "Social Worker",
  "Software Developer",
  "Software Engineer",
  "Statistician",
  "Store Clerk",
  "Surgeon",
  "Surveyor",
  "Systems Analyst",
  "Taxi Driver",
  "Teacher",
  "Technical Writer",
  "Therapist",
  "Tour Guide",
  "Translator",
  "Travel Agent",
  "UI/UX Designer",
  "Veterinarian",
  "Video Editor",
  "Virtual Assistant",
  "Waiter",
  "Web Developer",
  "Welder",
  "Writer",
  "YouTuber",
];

export const ProfessionSearch = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = useMemo(() => {
    if (!query) return [];
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
    if (q) {
      router.push(`courses?q=${q}`);
      return;
    }
    const searchValue = selected || query;
    if (!searchValue) return;

    // Replace with your real search logic
    router.push(`/courses?q=${searchValue}`);
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-16 relative">
      <div className="flex items-center shadow-card rounded-full bg-background overflow-hidden focus-within:ring-1 focus-within:ring-primary transition">
        {/* Search Icon */}
        <div className="pl-4">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>

        {/* Input */}
        <Input
          type="text"
          placeholder="What is your profession? - eg. Lawyer"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className="flex-1 border-none ring-0 focus-visible:ring-0 focus:outline-none focus:border-none bg-transparent px-4 py-3 text-base"
        />

        {/* Button */}
        <Button
          type="button"
          onClick={() => handleSearch(undefined)}
          variant="ghost"
          className="rounded-none rounded-r-full bg-gradient-primary text-white hover:text-white hover:opacity-90 px-6 py-3 h-auto"
        >
          Search
        </Button>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white shadow-lg rounded-lg overflow-hidden border border-muted divide-y divide-muted max-h-60 overflow-y-auto">
          {filteredSuggestions.map((prof, idx) => (
            <li
              key={idx}
              className="px-4 py-2 cursor-pointer hover:bg-accent"
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
