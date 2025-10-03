"use client";

import React, { ReactNode, useEffect, useState } from "react";

const AuthComponent = ({
  signIn,
  signOut,
}: {
  signIn: ReactNode;
  signOut?: ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("course-app-authentication="));
      setIsAuthenticated(!!cookie);
    };

    checkAuth(); // initial check

    const interval = setInterval(checkAuth, 3000); // check every 3 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  if (isAuthenticated === null) return null; // or loading spinner

  return <>{isAuthenticated ? signOut : signIn}</>;
};

export default AuthComponent;
