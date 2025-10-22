"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  add_event,
  remove_events,
  update_event,
} from "@/redux/admin/slice/all-events";
import { IEvent } from "@/redux/slices/events";
import { RootState } from "@/redux/store";
import { EventStatus, EventType } from "@prisma/client";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  Copy,
  Download,
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  TrashIcon,
  UploadCloud,
  Users,
  XIcon,
} from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

const eventTypes = ["webinar", "workshop", "live", "conference", "upcoming"];
const courses = [
  "Business Strategy",
  "Career Development",
  "Digital Marketing",
  "Web Development",
];

const initialEventState: IEvent = {
  id: "",
  slug: "",
  title: "",
  description: "",
  location: "",
  date: new Date(), // You'll convert this to a Date when submitting
  time: "",
  duration: "",
  isPaid: false,
  demoVideoUrl: "",
  price: 0,
  capacity: 0,
  thumbnailUrl: "",
  type: "upcoming", // Should match one of your EventType values
  status: "upcoming", // Default from schema
  createdAt: new Date(), // You may not need this in the form
  updatedAt: new Date(), // Same as above
  organizerId: "",
  keywords: [],
  registered: 0,
  organizer_name: "",
};

interface EventProps {
  title: string;
  type: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  capacity: string;
  demoVideoUrl: string;
  course: string;
  instructor: string;
  image: File | null;
  status: EventStatus;
  location: "online" | string;
  price: string;
  isPaid: boolean;
  keywords: string[];
}

export default function AdminEvents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteEventOpen, setDeleteEventOpen] = useState(false);
  const [deleteEvent, setdeleteEvent] = useState<IEvent>({} as IEvent);
  const [updateEvent, setUpdateEvent] = useState<IEvent>({} as IEvent);
  const [updateEventOpen, setUpdateEventOpen] = useState<boolean>(false);
  const [updateEventFile, setUpdateEventFile] = useState<File | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const all_events = useSelector(
    (state: RootState) => state.all_events.all_events
  );
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<EventProps>({
    title: "",
    type: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    capacity: "",
    course: "",
    demoVideoUrl: "",
    instructor: "",
    image: null,
    status: "draft",
    location: "online",
    price: "",
    isPaid: true,
    keywords: [],
  });

  const dispatch = useDispatch();

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
    (event) => event.type === "upcoming" || event.status === "upcoming"
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

  const handleOnEventChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdateEvent({ ...updateEvent, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (all_events) {
      console.log({ all_events });
    }
  }, [all_events]);

  const handle_create_event = async () => {
    try {
      if (!file) return;
      const create_event_formData = new FormData();
      create_event_formData.append("file", file);
      create_event_formData.append("eventData", JSON.stringify(formData));
      const response = await fetch("/api/event/create-event", {
        method: "POST",
        body: create_event_formData,
        credentials: "include",
      });

      const res = await response.json();

      if (!res.success) {
        console.log(res.message);
        return;
      }

      console.log({ create_event: res.data });
      dispatch(add_event(res.data));
    } catch (error) {
      console.log("error creating event: ", error);
    }
  };

  const handle_delete_event = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(
        `/api/event/delete?eventId=${deleteEvent.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const res = await response.json();

      if (!res.success) {
        console.log(res.message);
        return;
      }

      console.log({ response: res.data });
      dispatch(remove_events(deleteEvent.id));
    } catch (error) {
      console.log("error deleting event: ", error);
    } finally {
      setDeleteEventOpen(false);
      setdeleteEvent({} as IEvent);
      setIsDeleting(false);
    }
  };

  const handle_update_event = async () => {
    try {
      const formData = new FormData();
      formData.append("updateEventDetail", JSON.stringify(updateEvent));
      if (file) {
        formData.append("file", file);
      }
      const response = await fetch("/api/event/edit", {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      const res = await response.json();

      if (!res.success) {
        console.log(res.message);
        return;
      }

      console.log({ updated_event: res.data });
      dispatch(update_event(res.data));
    } catch (error) {
      console.log("error updating event: ", error);
    }
  };

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
                  all_events.filter(
                    (e) =>
                      format(e.date, "MMM yyyy") ===
                      format(new Date(), "MMM yyyy")
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
              {all_events.length > 0 ? (
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
                    {all_events
                      .slice()
                      .reverse()
                      .map((event) => (
                        <TableRow key={event.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div>
                              <div className="font-medium text-foreground">
                                {event.title}
                              </div>
                              <div className="max-w-sm">
                                <p className="text-xs text-muted-foreground truncate">
                                  {event.description}
                                </p>
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
                              <span>{event.time}</span>
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
                                <DropdownMenuItem
                                  onClick={() => {
                                    setUpdateEventOpen(true);
                                    setUpdateEvent(event);
                                  }}
                                >
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Event
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setdeleteEvent(event);
                                    setDeleteEventOpen(true);
                                  }}
                                  className="text-destructive hover:!bg-destructive/10 hover:!text-destructive"
                                >
                                  <TrashIcon className="w-4 h-4 mr-2" />
                                  Delete Event
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="w-full min-h-[200px] flex flex-col items-center justify-center bg-gray-100 rounded-md p-6">
                  <p className="text-gray-700 text-lg mb-4">
                    No events created yet
                  </p>
                  <Button
                    onClick={() => setCreateModalOpen(true)}
                    className="max-sm:w-full max-sm:h-10 mt-3"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </div>
              )}
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
          onCreate={handle_create_event}
        />

        <DeleteEventDialog
          deleteEventOpen={deleteEventOpen}
          setDeleteEventOpen={setDeleteEventOpen}
          onDelete={handle_delete_event}
          isDeleting={isDeleting}
        />

        <UpdateEventModal
          updateEventModalOpen={updateEventOpen}
          setUpdateEventModalOpen={setUpdateEventOpen}
          updateEvent={updateEvent}
          setUpdateEvent={setUpdateEvent}
          onUpdate={handle_update_event}
          file={updateEventFile}
          setFile={setUpdateEventFile}
          handleOnChange={handleOnEventChange}
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
  onCreate,
}: {
  createModalOpen: boolean;
  setCreateModalOpen: (value: boolean) => void;
  handleOnChange: (
    value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formData: EventProps;
  setFormData: (value: EventProps) => void;
  file: File | null;
  setFile: (value: File | null) => void;
  onCreate: () => void;
}) => {
  return (
    <Dialog
      open={createModalOpen}
      onOpenChange={(value) => {
        setFormData({
          title: "",
          type: "",
          description: "",
          date: "",
          time: "",
          duration: "",
          capacity: "",
          demoVideoUrl: "",
          course: "",
          instructor: "",
          image: null as File | null,
          status: "draft" as EventStatus,
          location: "online",
          isPaid: true,
          price: "",
          keywords: [],
        });
        setFile(null);
        setCreateModalOpen(value);
      }}
    >
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
                placeholder="10: 30 AM"
                type="text"
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label htmlFor="date">Location</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, location: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {["online", "offline"].map((loca) => (
                    <SelectItem key={loca} value={loca}>
                      {loca}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="time">Price</Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleOnChange}
                type="number"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="duration">Paid?</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    isPaid: value === "paid" ? true : false,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {["paid", "free"].map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <div className="space-y-1">
              <Label htmlFor="capacity">Keywords</Label>
              <Input
                id="keywords"
                name="keywords"
                value={formData.keywords?.join(", ") ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    keywords: e.target.value.split(",").map((k) => k.trim()),
                  })
                }
                placeholder="react, nextjs, frontend"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="capacity">Demo Video</Label>
              <Input
                id="demoVideoUrl"
                name="demoVideoUrl"
                value={formData.demoVideoUrl ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    demoVideoUrl: e.target.value,
                  })
                }
                placeholder="Demo Youtube Url"
              />
            </div>
          </div>
        </div>
        {!file?.name ? (
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const selectedFile = e.target.files?.[0];
                  if (!selectedFile) return;

                  if (!selectedFile.type.startsWith("image/")) {
                    alert("Please select an image file.");
                    return;
                  }

                  setFile(selectedFile);
                  console.log("Selected file:", selectedFile.name);
                }}
                className="hidden"
                accept="image/*"
              />
            </Label>
          </div>
        ) : (
          <div className="relative space-y-2 border border-dashed border-gray-300 p-4 rounded-md text-center">
            {file.name && (
              <>
                <img
                  src={URL.createObjectURL(file)}
                  className="w-full aspect-video object-cover"
                  alt={file.name}
                />
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className="absolute top-2 right-2 rounded-full border-0 p-1"
                  onClick={() => setFile(null)}
                >
                  <XIcon className="w-3 h-3 shrink-0" />
                </Button>
              </>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-sm font-medium">Event Status</Label>
          <RadioGroup
            value={formData.status}
            className="flex flex-wrap gap-4"
            onValueChange={(value) =>
              setFormData({
                ...formData,
                status: value as EventStatus,
              })
            }
          >
            {["upcoming", "today", "draft", "completed", "published"].map(
              (status) => (
                <div key={status} className="flex items-center space-x-2">
                  <RadioGroupItem value={status} id={status} />
                  <Label htmlFor={status} className="capitalize">
                    {status}
                  </Label>
                </div>
              )
            )}
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log({ formData });
              setCreateModalOpen(false);
              onCreate();
              setFormData({
                title: "",
                type: "",
                description: "",
                date: "",
                time: "",
                duration: "",
                capacity: "",
                course: "",
                demoVideoUrl: "",
                instructor: "",
                image: null as File | null,
                status: "draft" as "draft" | "published",
                location: "online",
                isPaid: true,
                price: "",
                keywords: [],
              });
            }}
          >
            Create Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

function DeleteEventDialog({
  deleteEventOpen,
  setDeleteEventOpen,
  onDelete,
  isDeleting,
}: {
  onDelete: () => void;
  deleteEventOpen: boolean;
  setDeleteEventOpen: (value: boolean) => void;
  isDeleting: boolean;
}) {
  return (
    <Dialog open={deleteEventOpen} onOpenChange={setDeleteEventOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Event</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this event? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="destructive"
            disabled={isDeleting}
            onClick={() => onDelete()}
          >
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const UpdateEventModal = ({
  updateEventModalOpen,
  setUpdateEventModalOpen,
  handleOnChange,
  updateEvent,
  setUpdateEvent,
  file,
  setFile,
  onUpdate,
}: {
  updateEventModalOpen: boolean;
  setUpdateEventModalOpen: (value: boolean) => void;
  handleOnChange: (
    value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  updateEvent: IEvent;
  setUpdateEvent: (value: IEvent) => void;
  file: File | null;
  setFile: (value: File | null) => void;
  onUpdate: () => void;
}) => {
  return (
    <Dialog
      open={updateEventModalOpen}
      onOpenChange={(value) => {
        setUpdateEvent(initialEventState);
        setFile(null);
        setUpdateEventModalOpen(value);
      }}
    >
      <DialogContent className="w-[90%] max-w-2xl h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Update Event</DialogTitle>
          <DialogDescription>
            Add a new event to your calendar
          </DialogDescription>
        </DialogHeader>
        <div className="relative space-y-2 border border-dashed border-gray-300 p-4 rounded-md text-center">
          {updateEvent.thumbnailUrl && (
            <>
              <img
                src={updateEvent.thumbnailUrl}
                className="w-full aspect-video object-cover"
                alt={updateEvent.title}
              />
            </>
          )}
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                name="title"
                value={updateEvent.title}
                onChange={handleOnChange}
                placeholder="Enter event title"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="type">Event Type</Label>
              <Select
                onValueChange={(value) =>
                  setUpdateEvent({ ...updateEvent, type: value as EventType })
                }
                value={updateEvent.type}
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
              value={updateEvent.description}
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
                value={new Date(updateEvent.date).toLocaleString()}
                onChange={handleOnChange}
                type="date"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                value={updateEvent.time}
                onChange={handleOnChange}
                placeholder="10: 30 AM"
                type="text"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                value={updateEvent.duration}
                onChange={handleOnChange}
                placeholder="2 hours"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label htmlFor="date">Location</Label>
              <Select
                onValueChange={(value) =>
                  setUpdateEvent({ ...updateEvent, location: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {["online", "offline"].map((loca) => (
                    <SelectItem key={loca} value={loca}>
                      {loca}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="time">Price</Label>
              <Input
                id="price"
                name="price"
                value={updateEvent.price as number}
                onChange={handleOnChange}
                type="number"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="duration">Paid?</Label>
              <Select
                onValueChange={(value) =>
                  setUpdateEvent({
                    ...updateEvent,
                    isPaid: value === "paid" ? true : false,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {["paid", "free"].map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="capacity">Max Capacity</Label>
              <Input
                id="capacity"
                name="capacity"
                value={updateEvent.capacity as number}
                onChange={handleOnChange}
                type="number"
                placeholder="100"
              />
            </div>
            {/* <div className="space-y-1">
              <Label htmlFor="course">
                Associated Course{" "}
                <span className="max-sm:hidden">(Optional)</span>
              </Label>
              <Select
                onValueChange={(value) =>
                  setUpdateEvent({ ...updateEvent, course: value as  })
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
            </div> */}
            <div className="space-y-1">
              <Label htmlFor="capacity">Keywords</Label>
              <Input
                id="keywords"
                name="keywords"
                value={updateEvent.keywords?.join(", ") ?? ""}
                onChange={(e) =>
                  setUpdateEvent({
                    ...updateEvent,
                    keywords: e.target.value.split(",").map((k) => k.trim()),
                  })
                }
                placeholder="react, nextjs, frontend"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="demoVideoUrl">Demo Video</Label>
              <Input
                id="demoVideoUrl"
                name="demoVideoUrl"
                value={updateEvent.demoVideoUrl ?? ""}
                onChange={(e) =>
                  setUpdateEvent({
                    ...updateEvent,
                    demoVideoUrl: e.target.value,
                  })
                }
                placeholder="Demo Youtube Url"
              />
            </div>
          </div>
        </div>
        {!file?.name ? (
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const selectedFile = e.target.files?.[0];
                  if (!selectedFile) return;

                  if (!selectedFile.type.startsWith("image/")) {
                    alert("Please select an image file.");
                    return;
                  }

                  setFile(selectedFile);
                  console.log("Selected file:", selectedFile.name);
                }}
                className="hidden"
                accept="image/*"
              />
            </Label>
          </div>
        ) : (
          <div className="relative space-y-2 border border-dashed border-gray-300 p-4 rounded-md text-center">
            {file?.name && (
              <>
                <img
                  src={URL.createObjectURL(file)}
                  className="w-full aspect-video object-cover"
                  alt={updateEvent.title}
                />
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className="absolute top-2 right-2 rounded-full border-0 p-1"
                  onClick={() => setFile(null)}
                >
                  <XIcon className="w-3 h-3 shrink-0" />
                </Button>
              </>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-sm font-medium">Event Status</Label>
          <RadioGroup
            value={updateEvent.status}
            className="flex flex-wrap gap-4"
            onValueChange={(value) =>
              setUpdateEvent({
                ...updateEvent,
                status: value as EventStatus,
              })
            }
          >
            {["upcoming", "today", "draft", "completed", "published"].map(
              (status) => (
                <div key={status} className="flex items-center space-x-2">
                  <RadioGroupItem value={status} id={status} />
                  <Label htmlFor={status} className="capitalize">
                    {status}
                  </Label>
                </div>
              )
            )}
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setUpdateEventModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log({ updateEvent });
              setUpdateEventModalOpen(false);
              onUpdate();
              setUpdateEvent(initialEventState);
            }}
          >
            Update Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
