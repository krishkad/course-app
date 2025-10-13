"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { initializeUser } from "@/redux/slices/user";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [data, setData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogIn = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (!res.success) {
        console.log(res.message);
        return;
      }
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.refresh();
      }
      console.log({ user: res.data });
      dispatch(initializeUser(res.data));
    } catch (error) {
      console.log("error while logging in: ", error);
      return;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            onChange={handleOnChange}
            value={data.email}
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            onChange={handleOnChange}
            value={data.password}
            type="password"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
          onClick={handleLogIn}
        >
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
