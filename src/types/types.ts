import { JwtPayload } from "jsonwebtoken";

export interface CustomJWTPayload extends JwtPayload {
  email: string;
  id: string;
  role: "STUDENT" | "ADMIN";
}


export type ActivityItem = {
  id: string;
  type: "enrollment" | "purchase" | "completion";
  user: string;
  course: string;
  time: string;
  avatar: string;
};