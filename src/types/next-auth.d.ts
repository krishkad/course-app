// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    userId?: string;
    role: "STUDENT" | "ADMIN";
  }

  interface User {
    id: string;
    email: string;
    role: "STUDENT" | "ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    userId?: string;
    role?: "STUDENT" | "ADMIN";
  }
}
