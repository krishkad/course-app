import { SectionCards } from "@/components/dashboard/SectionCard";
import { UserTable } from "@/components/dashboard/UserTable";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DashboardPage = () => {
  return (
    <div className="w-full">
      <main className="max-w-7xl mx-auto px-4">
        <div className="flex max-sm:flex-col max-sm:items-start max-sm:gap-3 justify-between items-center pt-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here&apos;s what&apos;s happening today.
            </p>
          </div>
          <Select defaultValue="today">
            <SelectTrigger className="w-full sm:w-40 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4 py-4 md:gap-6">
          <SectionCards />
          <UserTable />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
