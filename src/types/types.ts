import { JwtPayload } from "jsonwebtoken";

export interface CustomJWTPayload extends JwtPayload {
  email: string;
  id: string;
  role: "STUDENT" | "ADMIN";
}
