"use client";

import Footer from "@/components/root/Footer";
import Navigation from "@/components/root/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRating } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { ArrowRight, Clock, Search, Star, Users } from "lucide-react";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AllCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [query, setQuery] = useState<string>("");

  const courses = useSelector((state: RootState) => state.courses.courses);

  useEffect(() => {
    const fullUrl = window.location.href;

    const q = fullUrl.split("q=")[1];
    if (q) {
      const base64Decode = decodeURI(q);
      setSearchTerm(base64Decode);
    }
    console.log({ q });
  }, []);

  

  function advancedStemming(word: string) {
    if (!word || word.length < 3) return word;

    const lowerWord = word.toLowerCase();

    // Multiple stemming patterns for common suffixes
    const stemmingPatterns = [
      // Profession suffixes
      /(er|or|ist|ian|ant|ent|eer|ier|yer|man|woman|person)$/,
      // Plural and verb forms
      /(s|es|ies|ed|ied|ing|ying|ness|ment|ship|hood|dom|ism|ist|ity|ty|ic|al|ial|ful|ive|ative|able|ible|ish|ory|ous|eous|ious|ent|ant|ance|ence|ary|ery|ory|ize|ise|ify|fy|ate|en)$/,
      // Comparative and superlative
      /(er|est)$/,
    ];

    let stemmed = lowerWord;

    // Apply stemming patterns
    for (const pattern of stemmingPatterns) {
      if (pattern.test(stemmed)) {
        stemmed = stemmed.replace(pattern, "");
        break; // Stop after first successful stem
      }
    }

    return stemmed.length > 2 ? stemmed : lowerWord;
  }

  function findSimilarWords(searchTerm: string, text: string) {
    const searchLower = searchTerm.toLowerCase();
    const textLower = text.toLowerCase();

    // Exact match
    if (textLower.includes(searchLower)) {
      return true;
    }

    // Split into words and clean them
    const cleanWords = (str: string) =>
      str
        .split(/\s+/)
        .map((word: string) => word.replace(/[^a-z0-9]/g, ""))
        .filter((word: string) => word.length > 2);

    const searchWords = cleanWords(searchLower);
    const textWords = cleanWords(textLower);

    // Check each search word against each text word
    for (const searchWord of searchWords) {
      const searchStem = advancedStemming(searchWord);

      for (const textWord of textWords) {
        const textStem = advancedStemming(textWord);

        // Multiple matching strategies
        if (
          // Stem exact match
          textStem === searchStem ||
          // Stem contains match
          textStem.includes(searchStem) ||
          searchStem.includes(textStem) ||
          // Original word contains match (for cases like "design" in "designer")
          textWord.includes(searchStem) ||
          searchWord.includes(textStem) ||
          // Shared substring of significant length
          (searchStem.length > 3 &&
            textStem.length > 3 &&
            (textStem.includes(
              searchStem.substring(0, Math.floor(searchStem.length * 0.7))
            ) ||
              searchStem.includes(
                textStem.substring(0, Math.floor(textStem.length * 0.7))
              )))
        ) {
          return true;
        }
      }
    }

    return false;
  }

  const filteredCourses = courses.filter((course) => {
    const searchText = (
      course.title +
      " " +
      course.description +
      " " +
      course.keywords.toString() + course.profession + course.profession.includes("All")
    ).toLowerCase();

    return findSimilarWords(searchTerm, searchText);
  });
  return (
    <Suspense fallback={<>Loading...</>}>
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="">
          {/* Hero Section */}
          <section className="pt-24 pb-16 px-4">
            <div className="container mx-auto text-center">
              <div className="animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
                  All Courses
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Discover our complete collection of professional development
                  courses
                </p>
              </div>
            </div>
          </section>

          {/* Filters Section */}
          <section className="px-4 pb-12">
            <div className="container mx-auto">
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 shadow-elegant border border-border/50">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search profession, skill, hobbies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Cost" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="upcoming">Free</SelectItem>
                        <SelectItem value="completed">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Courses Grid */}
          <section className="pb-24">
            <div className="container mx-auto px-4">
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing {courses.length} of {courses.length} courses
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredCourses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.slug}`}
                    className="group block"
                  >
                    <div className="bg-card h-full rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 hover:scale-[1.02] overflow-hidden border border-border/50 hover:border-primary/20">
                      {/* Course Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={course.thumbnailUrl}
                          alt={course.title}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <Badge variant={"default"} className="shadow-sm">
                            {/* {course.badge} */}
                            Best Seller
                          </Badge>
                        </div>
                        {course.Rating && course.Rating.length > 0 && (
                          <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium text-gray-800">
                              {getRating(course.Rating)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Course Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {course.title}
                        </h3>

                        <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                          {course.description}
                        </p>

                        <p className="text-sm font-medium text-primary mb-4">
                          by {course.instructor}
                        </p>

                        {/* Course Stats */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-6 bg-muted/30 rounded-lg p-3">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{course.students}</span>
                          </div>
                        </div>

                        {/* Course Footer */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold !text-primary">
                              {course.price}
                            </span>
                          </div>
                          <Button className="bg-gradient-primary hover:opacity-90 shadow-glow group">
                            View Course
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </Suspense>
  );
};

export default AllCourses;
