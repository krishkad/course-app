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
        <div className="flex flex-col gap-4 pb-4 md:gap-6">
          <SectionCards />
          <UserTable />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
