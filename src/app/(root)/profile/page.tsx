"use client";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, User, BookOpen, DollarSign, MapPin, Phone, Edit2, Calendar } from 'lucide-react';

// Mock data types
interface Course {
  id: string;
  title: string;
  progress: number;
  lastAccessed: string;
  price: number;
  purchaseDate: string;
}

interface User {
  name: string;
  email: string;
  avatarUrl?: string;
  joinDate: string;
  bio?: string;
  location?: string;
  phone?: string;
  courses: Course[];
}

// Mock user data
const initialUserData: User = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatarUrl: "/avatar.jpg",
  joinDate: "January 15, 2023",
  bio: "Passionate learner and software developer with a focus on web technologies.",
  location: "San Francisco, CA",
  phone: "+1 (555) 123-4567",
  courses: [
    { id: "1", title: "React Mastery", progress: 75, lastAccessed: "2025-09-20", price: 199.99, purchaseDate: "2023-02-10" },
    { id: "2", title: "TypeScript Fundamentals", progress: 40, lastAccessed: "2025-09-18", price: 149.99, purchaseDate: "2023-03-05" },
    { id: "3", title: "Next.js Advanced", progress: 90, lastAccessed: "2025-09-25", price: 249.99, purchaseDate: "2023-04-20" },
  ],
};

export default function Profile() {
  const [user, setUser] = useState<User>(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto max-w-5xl bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <Card className="shadow-xl rounded-2xl border-none bg-white/90 backdrop-blur-sm">
        <CardHeader className="flex flex-col items-center sm:flex-row sm:justify-between gap-4 sm:gap-6 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4 sm:gap-6">
            <Avatar className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 ring-4 ring-blue-100 transition-transform hover:scale-105">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="bg-blue-500 text-white text-lg sm:text-xl md:text-2xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left space-y-2">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">{user.name}</CardTitle>
              <CardDescription className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                {user.email}
              </CardDescription>
              <CardDescription className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                {user.phone || 'Not provided'}
              </CardDescription>
              <CardDescription className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                {user.location || 'Not provided'}
              </CardDescription>
              <CardDescription className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                Joined: {user.joinDate}
              </CardDescription>
              <CardDescription className="mt-2 text-gray-700 text-sm sm:text-base max-w-md">
                {user.bio || 'No bio provided.'}
              </CardDescription>
            </div>
          </div>
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 text-sm sm:text-base">
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90vw] max-w-[425px] p-4 sm:p-6">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl">Edit Profile</DialogTitle>
                <DialogDescription className="text-sm sm:text-base">
                  Update your personal information below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-3 sm:gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-sm sm:text-base">Name</Label>
                  <Input id="name" name="name" value={editedUser.name} onChange={handleEditChange} className="text-sm sm:text-base" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
                  <Input id="email" name="email" type="email" value={editedUser.email} onChange={handleEditChange} className="text-sm sm:text-base" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-sm sm:text-base">Phone</Label>
                  <Input id="phone" name="phone" value={editedUser.phone} onChange={handleEditChange} className="text-sm sm:text-base" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location" className="text-sm sm:text-base">Location</Label>
                  <Input id="location" name="location" value={editedUser.location} onChange={handleEditChange} className="text-sm sm:text-base" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio" className="text-sm sm:text-base">Bio</Label>
                  <Textarea id="bio" name="bio" value={editedUser.bio} onChange={handleEditChange} className="text-sm sm:text-base" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSave} className="text-sm sm:text-base">Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <Separator className="my-4 sm:my-6 bg-gray-200" />

        <CardContent className="p-4 sm:p-6 md:p-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl p-1 gap-1 sm:gap-2">
              <TabsTrigger
                value="overview"
                className="rounded-lg py-2 sm:py-3 text-xs sm:text-sm font-semibold data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="courses"
                className="rounded-lg py-2 sm:py-3 text-xs sm:text-sm font-semibold data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all"
              >
                Course Progress
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="rounded-lg py-2 sm:py-3 text-xs sm:text-sm font-semibold data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all"
              >
                Purchase History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 sm:mt-6">
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-gray-900">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                  Learning Summary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  <Card className="border-none bg-gradient-to-br from-blue-50 to-white shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Total Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl sm:text-3xl font-bold text-blue-600">{user.courses.length}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-none bg-gradient-to-br from-blue-50 to-white shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Courses Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                        {user.courses.filter((course) => course.progress === 100).length}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-none bg-gradient-to-br from-blue-50 to-white shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Total Spent</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                        ${user.courses.reduce((sum, course) => sum + course.price, 0).toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="mt-4 sm:mt-6">
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Enrolled Courses</h3>
                {user.courses.map((course) => (
                  <Card
                    key={course.id}
                    className="p-4 sm:p-6 border-none bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-xl"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-base sm:text-lg text-gray-900">{course.title}</h4>
                        <p className="text-xs sm:text-sm flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          Purchased: {new Date(course.purchaseDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                        </p>
                        <p className="text-xs sm:text-sm flex items-center gap-2 text-gray-600">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          Price: ${course.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="w-full sm:w-1/3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Progress
                            value={course.progress}
                            className="w-full h-2 bg-gray-200"
                            // indicatorClassName="bg-blue-500"
                          />
                          <span className="text-xs sm:text-sm font-medium text-gray-700">{course.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-4 sm:mt-6">
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Purchase History</h3>
                <div className="grid gap-4">
                  {user.courses
                    .slice()
                    .sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime())
                    .map((course) => (
                      <Card
                        key={course.id}
                        className="p-4 sm:p-6 border-none bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-xl"
                      >
                        <div className="space-y-2">
                          <h4 className="font-semibold text-base sm:text-lg text-gray-900">{course.title}</h4>
                          <p className="text-xs sm:text-sm flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            Purchase Date: {new Date(course.purchaseDate).toLocaleDateString()}
                          </p>
                          <p className="text-xs sm:text-sm flex items-center gap-2 text-gray-600">
                            <DollarSign className="h-4 w-4 text-green-500" />
                            Price: ${course.price.toFixed(2)}
                          </p>
                          <p className="text-xs sm:text-sm flex items-center gap-2 text-gray-600">
                            <BookOpen className="h-4 w-4 text-purple-500" />
                            Progress: {course.progress}%
                          </p>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}