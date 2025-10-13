"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { initializeDisplay } from "@/redux/slices/display";
import { RootState } from "@/redux/store";
import { Display } from "@prisma/client";
import {
  CreditCard,
  Globe,
  Mail,
  Palette,
  Plus,
  Save,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

// Mock data
const admins = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Super Admin",
    avatar: "/api/placeholder/32/32",
    lastActive: "2024-03-12",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    avatar: "/api/placeholder/32/32",
    lastActive: "2024-03-11",
    status: "active",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Moderator",
    avatar: "/api/placeholder/32/32",
    lastActive: "2024-03-10",
    status: "inactive",
  },
];

const emailTemplates = [
  {
    name: "Welcome Email",
    description: "Sent when a user registers",
    status: "active",
  },
  {
    name: "Course Enrollment",
    description: "Sent when a user enrolls in a course",
    status: "active",
  },
  {
    name: "Certificate Completion",
    description: "Sent when a user completes a course",
    status: "active",
  },
  {
    name: "Payment Confirmation",
    description: "Sent after successful payment",
    status: "active",
  },
];

export default function SettingsPage() {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const students = useSelector((state: RootState) => state.students.students);
  const display = useSelector(
    (state: RootState) => state.display_state.display
  );
  const [display_show, setDisplay_show] = useState<Display>({} as Display);
  const [isDisplaySaving, setIsDisplaySaving] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (display) {
      setDisplay_show(display);
      console.log({ display });
    }
  }, [display]);

  const handleDisplaySave = async () => {
    try {
      setIsDisplaySaving(true);
      const response = await fetch("/api/display/edit", {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({
          view_courses: display_show.view_courses,
          id: display_show.id,
          view_events: display_show.view_events,
        }),
      });

      const res = await response.json();

      if (!res.success) {
        console.log(res.message);
        return;
      }

      dispatch(initializeDisplay(res.data));
      toast.success("updated successfully");
    } catch (error) {
      console.log("error saving display changes: ", error);
    } finally {
      setIsDisplaySaving(false);
    }
  };
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 space-y-6 pt-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">
              Manage your platform configuration
            </p>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-1">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto">
            <TabsTrigger value="general" className="text-xs sm:text-sm">
              General
            </TabsTrigger>
            <TabsTrigger value="display" className="text-xs sm:text-sm">
              Display
            </TabsTrigger>
            <TabsTrigger value="payments" className="text-xs sm:text-sm">
              Payments
            </TabsTrigger>
            <TabsTrigger value="admins" className="text-xs sm:text-sm">
              Admins
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Platform Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="platform-name">Platform Name</Label>
                    <Input
                      id="platform-name"
                      defaultValue="EduPlatform"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="support-email">Support Email</Label>
                    <Input
                      id="support-email"
                      defaultValue="support@eduplatform.com"
                      className="mt-1"
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Branding Colors</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Input
                          id="primary-color"
                          defaultValue="#3b82f6"
                          className="flex-1"
                        />
                        <div className="w-10 h-10 bg-primary rounded border flex-shrink-0"></div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondary-color">Secondary Color</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Input
                          id="secondary-color"
                          defaultValue="#f1f5f9"
                          className="flex-1"
                        />
                        <div className="w-10 h-10 bg-secondary rounded border flex-shrink-0"></div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="accent-color">Accent Color</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Input
                          id="accent-color"
                          defaultValue="#06a3da"
                          className="flex-1"
                        />
                        <div className="w-10 h-10 bg-accent rounded border flex-shrink-0"></div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="success-color">Success Color</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Input
                          id="success-color"
                          defaultValue="#16a34a"
                          className="flex-1"
                        />
                        <div className="w-10 h-10 bg-success rounded border flex-shrink-0"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button className="w-full sm:w-auto">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Display Controls */}
          <TabsContent value="display" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Page Display Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div>
                      <Label>Show Courses Page</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable/disable the courses page visibility
                      </p>
                    </div>
                    <Switch
                      defaultChecked
                      name="view_courses"
                      checked={display_show?.view_courses}
                      onCheckedChange={(value) =>
                        setDisplay_show({
                          ...display_show,
                          view_courses: value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div>
                      <Label>Show Events Page</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable/disable the events page visibility
                      </p>
                    </div>
                    <Switch
                      defaultChecked
                      name="view_events"
                      checked={display_show?.view_events}
                      onCheckedChange={(value) =>
                        setDisplay_show({ ...display_show, view_events: value })
                      }
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div>
                      <Label>Show Single Event Page</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable/disable the single event page visibility
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    className="w-full sm:w-auto"
                    onClick={handleDisplaySave}
                    disabled={isDisplaySaving}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isDisplaySaving ? "Saving..." : "Save Display Settings"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="stripe-key">Stripe Publishable Key</Label>
                    <Input
                      id="stripe-key"
                      placeholder="pk_test_..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stripe-secret">Stripe Secret Key</Label>
                    <Input
                      id="stripe-secret"
                      type="password"
                      placeholder="sk_test_..."
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="vat-rate">VAT Rate (%)</Label>
                    <Input
                      id="vat-rate"
                      type="number"
                      defaultValue="20"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div>
                      <Label>Enable Subscription Payments</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow recurring course subscriptions
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div>
                      <Label>Enable One-time Payments</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow single course purchases
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div>
                      <Label>Enable Refunds</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow course refunds within 30 days
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button className="w-full sm:w-auto">
                    <Save className="w-4 h-4 mr-2" />
                    Save Payment Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Management */}
          <TabsContent value="admins" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between space-y-4 sm:space-y-0">
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Admin Management
                  </CardTitle>
                  <Button
                    onClick={() => setInviteModalOpen(true)}
                    className="w-full sm:w-auto"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Invite Admin
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[200px]">Admin</TableHead>
                        <TableHead className="min-w-[100px]">Role</TableHead>
                        <TableHead className="min-w-[120px]">
                          Created At
                        </TableHead>
                        {/* <TableHead className="min-w-[80px]">Status</TableHead> */}
                        <TableHead className="w-10"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students
                        .filter((student) => student.role === "ADMIN")
                        .map((admin) => (
                          <TableRow key={admin.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar className="w-8 h-8">
                                 
                                  <AvatarFallback>
                                    {admin.fname.charAt(0).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">
                                    {`${admin.fname} ${admin.lname}`}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {admin.email}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{admin.role}</Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {new Date(admin.createdAt).toLocaleDateString()}
                            </TableCell>
                            {/* <TableCell>
                              <Badge
                                variant={
                                  admin.status === "active"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {admin.status}
                              </Badge>
                            </TableCell> */}
                            <TableCell>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Remove Admin
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to remove{" "}
                                      {admin.lname} as an admin? This action
                                      cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction className="bg-destructive text-destructive-foreground">
                                      Remove
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Invite Admin Modal */}
            <Dialog open={inviteModalOpen} onOpenChange={setInviteModalOpen}>
              <DialogContent className="sm:max-w-[425px] mx-4">
                <DialogHeader>
                  <DialogTitle>Invite New Admin</DialogTitle>
                  <DialogDescription>
                    Send an invitation to a new admin user
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="invite-email">Email Address</Label>
                    <Input
                      id="invite-email"
                      placeholder="admin@example.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="invite-role">Role</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter className="flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setInviteModalOpen(false)}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setInviteModalOpen(false)}
                    className="w-full sm:w-auto"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Invitation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
