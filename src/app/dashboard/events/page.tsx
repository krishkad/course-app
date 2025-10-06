"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  Calendar,
  Clock,
  Users,
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  Video,
  MapPin,
  Download,
  UploadCloud,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Mock data
// const events = [
//   {
//     id: 1,
//     title: "AI in Business: Future Trends",
//     description: "Explore how AI is transforming business operations",
//     date: "2024-04-15",
//     time: "14:00",
//     duration: "2 hours",
//     type: "webinar",
//     status: "upcoming",
//     registered: 156,
//     maxCapacity: 200,
//     associatedCourse: "Business Strategy",
//     instructor: "Dr. Sarah Wilson",
//   },
//   {
//     id: 2,
//     title: "Career Transition Workshop",
//     description: "Strategies for successful career transitions",
//     date: "2024-04-18",
//     time: "10:00",
//     duration: "3 hours",
//     type: "workshop",
//     status: "upcoming",
//     registered: 89,
//     maxCapacity: 100,
//     associatedCourse: "Career Development",
//     instructor: "Mike Johnson",
//   },
//   {
//     id: 3,
//     title: "Digital Marketing Masterclass",
//     description: "Advanced digital marketing strategies and tactics",
//     date: "2024-03-28",
//     time: "16:00",
//     duration: "1.5 hours",
//     type: "live",
//     status: "completed",
//     registered: 234,
//     maxCapacity: 250,
//     associatedCourse: "Digital Marketing",
//     instructor: "Emma Davis",
//   },
//   {
//     id: 4,
//     title: "Web Development Q&A Session",
//     description: "Interactive Q&A with senior developers",
//     date: "2024-04-22",
//     time: "15:00",
//     duration: "1 hour",
//     type: "live",
//     status: "upcoming",
//     registered: 67,
//     maxCapacity: 150,
//     associatedCourse: "Web Development",
//     instructor: "John Doe",
//   },
// ];

const eventTypes = ["webinar", "workshop", "live", "conference"];
const courses = [
  "Business Strategy",
  "Career Development",
  "Digital Marketing",
  "Web Development",
];

export default function AdminEvents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const all_events = useSelector(
    (state: RootState) => state.all_events.all_events
  );
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    type: string;
    description: string;
    date: string;
    time: string;
    duration: string;
    capacity: string;
    course: string;
    instructor: string;
    image: File | null;
    status: "draft" | "published";
  }>({
    title: "",
    type: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    capacity: "",
    course: "",
    instructor: "",
    image: null,
    status: "draft",
  });

  const filteredEvents = all_events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || event.status === selectedStatus;
    const matchesType = selectedType === "all" || event.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const upcomingEvents = filteredEvents.filter(
    (event) => event.status === "upcomming"
  );
  const pastEvents = filteredEvents.filter(
    (event) => event.status === "completed"
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="default">Upcoming</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const variants: Record<string, any> = {
      webinar: "default",
      workshop: "secondary",
      live: "outline",
      conference: "destructive",
    };
    return <Badge variant={variants[type] || "outline"}>{type}</Badge>;
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (all_events) {
      console.log({ all_events });
    }
  }, [all_events]);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex max-sm:flex-col max-sm:items-start justify-between items-center pt-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Events</h1>
            <p className="text-muted-foreground">
              Manage live events and webinars
            </p>
          </div>
          <Button
            onClick={() => setCreateModalOpen(true)}
            className="max-sm:w-full max-sm:h-10 mt-3"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6">
          <Card className="gap-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground ">
                Total Events
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="text-2xl font-bold text-foreground">
                {all_events.length}
              </div>
            </CardContent>
          </Card>
          <Card className="gap-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {upcomingEvents.length}
              </div>
            </CardContent>
          </Card>
          <Card className="gap-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Registrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {all_events.reduce((sum, event) => sum + event.registered!, 0)}
              </div>
            </CardContent>
          </Card>
          <Card className="gap-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {
                  all_events.filter((e) =>
                    e.date.toString().startsWith("2024-04")
                  ).length
                }
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>All Events</CardTitle>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Registrations</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {all_events.map((event) => (
                    <TableRow key={event.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">
                            {event.title}
                          </div>
                          <div className="text-sm text-muted-foreground line-clamp-1 truncate">
                            {event.description}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {event.organizer_name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(event.type)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>
                            {/* {new Date(event.date).toLocaleDateString()} */}
                            {format(new Date(event.date), "MMM dd yyyy")}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{format(event.date, "h:mm a")}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">
                            {event.registered}/{event.capacity}
                          </span>
                        </div>
                        <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden mt-1">
                          <div
                            className="h-full bg-primary"
                            style={{
                              width: `${
                                (event.registered! / event.capacity!) * 100
                              }%`,
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(event.status)}</TableCell>

                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Event
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Export Attendees
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Cancel Event
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <CreateEventModal
          createModalOpen={createModalOpen}
          setCreateModalOpen={setCreateModalOpen}
          handleOnChange={handleOnChange}
          formData={formData}
          setFormData={setFormData}
          file={file}
          setFile={setFile}
        />
      </div>
    </div>
  );
}

const CreateEventModal = ({
  createModalOpen,
  setCreateModalOpen,
  handleOnChange,
  formData,
  setFormData,
  file,
  setFile,
}: {
  createModalOpen: boolean;
  setCreateModalOpen: (value: boolean) => void;
  handleOnChange: (
    value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formData: {
    title: string;
    type: string;
    description: string;
    date: string;
    time: string;
    duration: string;
    capacity: string;
    course: string;
    instructor: string;
    image: File | null;
    status: "draft" | "published";
  };
  setFormData: (value: {
    title: string;
    type: string;
    description: string;
    date: string;
    time: string;
    duration: string;
    capacity: string;
    course: string;
    instructor: string;
    image: File | null;
    status: "draft" | "published";
  }) => void;
  file: File | null;
  setFile: (value: File) => void;
}) => {
  return (
    <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
      <DialogContent className="w-[90%] max-w-2xl h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Add a new event to your calendar
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleOnChange}
                placeholder="Enter event title"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="type">Event Type</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
                value={formData.type}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleOnChange}
              placeholder="Enter event description"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                value={formData.date}
                onChange={handleOnChange}
                type="date"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                value={formData.time}
                onChange={handleOnChange}
                type="time"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleOnChange}
                placeholder="2 hours"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="capacity">Max Capacity</Label>
              <Input
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleOnChange}
                type="number"
                placeholder="100"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="course">
                Associated Course{" "}
                <span className="max-sm:hidden">(Optional)</span>
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, course: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* <div className="space-y-1">
          <Label htmlFor="instructor">Instructor</Label>
          <Input id="instructor" placeholder="Enter instructor name" />
        </div> */}
        </div>
        {/* Upload Section */}
        <div className="space-y-2 border border-dashed border-gray-300 p-4 rounded-md text-center">
          <Label
            htmlFor="file-upload"
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <UploadCloud className="w-8 h-8 text-gray-500" />
            <span className="text-sm text-gray-600">
              Click to upload event image
            </span>
            <span className="text-xs text-muted-foreground">
              PNG, JPG or GIF up to 10MB
            </span>
            <Input
              id="file-upload"
              type="file"
              name="file"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                if (!selectedFile) return;
                setFile(selectedFile);
                console.log("Selected file:", selectedFile.name);
                // Optional: Add validation or other logic
                if (selectedFile && !selectedFile.type.startsWith("image/")) {
                  alert("Please select an image file.");
                }
              }}
              className="hidden"
              accept="image/*"
            />
          </Label>
        </div>

        {/* Status Radio Group */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Event Status</Label>
          <RadioGroup
            defaultValue="draft"
            className="flex gap-4"
            onValueChange={(value) =>
              setFormData({
                ...formData,
                status: value as "draft" | "published",
              })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="draft" id="draft" />
              <Label htmlFor="draft">Draft</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="published" id="published" />
              <Label htmlFor="published">Publish</Label>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setCreateModalOpen(false);
              console.log({ formData });
            }}
          >
            Create Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
