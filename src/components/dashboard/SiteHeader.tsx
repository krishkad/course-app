"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LoaderIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function SiteHeader() {
  const [isLoggingOut, setisLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogOut = async () => {
    setisLoggingOut(true);
    try {
      const response = await fetch("/api/auth/sign-out", {
        method: "GET",
        credentials: "include",
      });

      const res = await response.json();

      if (!res.success) {
        toast.warning(res.message);
        console.log(res.message);
        return;
      }

      toast.success("log out successful");
    } catch (error) {
      console.log("error logging out: ", error);
    } finally {
      setisLoggingOut(false);
      router.refresh();
    }
  };
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />

        <div className="ml-auto ">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex"
            onClick={handleLogOut}
            disabled={isLoggingOut}
          >
            <span className="dark:text-foreground flex items-center gap-2">
              {isLoggingOut ? (
                <LoaderIcon className="w-4 h-4 shrink-0 animate-spin" />
              ) : (
                <>
                  <LogOutIcon className="w-4 h-4 shrink-0" />
                  Log out
                </>
              )}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
