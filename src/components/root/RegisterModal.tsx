// components/RegisterModal.tsx

"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import EventRazorpayButton from "./EventRazorpayButton";

export default function RegisterModal({
  eventId,
  registerModalOpen,
  setRegisterModalOpen,
  price,
}: {
  eventId: string;
  registerModalOpen: boolean;
  setRegisterModalOpen: (value: boolean) => void;
  price: number;
}) {
  const user = useSelector((state: RootState) => state.user.user);
  const events = useSelector((state: RootState) => state.events.events);
  const [formData, setFormData] = React.useState({
    userId: "",
    fname: "",
    lname: "",
    email: "",
    profession: "",
    eventId: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/event/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const res = await response.json();

      if (!res.success) {
        console.log(res.message);
        toast.warning(res.message);
        return;
      }

      toast.success("registration successful");
    } catch (error) {
      console.log("error registering event: ", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user || eventId) {
      console.log({ eventId });
      console.log({eventPrice: events.filter((event) => event.id === eventId)[0].price});
      setFormData({
        lname: user.lname ?? "",
        fname: user.fname ?? "",
        profession: user.profession ?? "",
        email: user.email ?? "",
        userId: user?.id ?? "",
        eventId: eventId,
      });
    }
  }, [user, eventId]);

  return (
    <Dialog open={registerModalOpen} onOpenChange={setRegisterModalOpen}>
      <DialogContent className="sm:max-w-lg rounded-xl shadow-xl">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-2xl font-semibold flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Event Registration
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Join us by filling out the form below. We’ll send you event details
            via email.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fname">First Name</Label>
              <Input
                id="fname"
                name="fname"
                placeholder="John"
                value={formData.fname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lname">Last Name</Label>
              <Input
                id="lname"
                name="lname"
                placeholder="Doe"
                value={formData.lname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profession">Profession</Label>
            <Input
              id="profession"
              name="profession"
              placeholder="Software Engineer"
              value={formData.profession}
              onChange={handleChange}
              required
            />
          </div>

          <DialogFooter className="pt-4" onClick={() => setRegisterModalOpen(false)}>
            <EventRazorpayButton
              eventId={eventId}
              price={price}
              userId={user.id!}
              key={user.id}
            />
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
