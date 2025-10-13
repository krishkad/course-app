"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Props = {
  signIn: ReactNode;
  signOut?: ReactNode;
};

const AuthComponent = ({ signIn, signOut }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const pathname = usePathname(); // detects route change to re-check cookie

  useEffect(() => {
    const checkAuth = () => {
      const cookieExists = document.cookie
        .split("; ")
        .some((row) => row.startsWith("course-app-authentication="));
      setIsAuthenticated(cookieExists);
    };

    checkAuth(); // initial check

    // Optional: Re-check on route change
    // For example, after logging in and redirecting
    // This ensures auth state is updated on page nav
    checkAuth();

    // Optional: polling fallback if cookie may update silently
    const interval = setInterval(checkAuth, 3000);

    return () => clearInterval(interval);
  }, [pathname]); // re-check when route changes

  if (isAuthenticated === null) return null; // or a loading spinner

  return <>{isAuthenticated ? signOut : signIn}</>;
};

export default AuthComponent;
