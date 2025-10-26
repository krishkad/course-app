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
  const enrolled = searchParams.get("enroll");
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
        if (enrolled) {
          router.push(`${redirectUrl}?enrolled=${enrolled}`);
          return;
        }
        router.push(`${redirectUrl}`);
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
    <form
      className={cn(
        "flex flex-col gap-8 bg-white rounded-xl max-w-md mx-auto",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">Welcome Back</h1>
        <p className="text-gray-500 text-sm">
          Enter your email and password to access your account
        </p>
      </div>

      {/* Input Fields */}
      <div className="grid gap-6">
        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-gray-700 font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            onChange={handleOnChange}
            value={data.email}
            placeholder="you@example.com"
            required
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
          />
        </div>

        {/* Password */}
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </Label>
            <a href="#" className="text-indigo-600 text-sm hover:underline">
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            onChange={handleOnChange}
            value={data.password}
            required
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
          />
          <p className="text-gray-500 text-xs">
            By logging in, you agree to our{" "}
            <Link
              href="/terms-and-conditions"
              className="text-indigo-600 hover:underline font-medium"
            >
              Terms and Conditions
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full py-3  text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
        disabled={isLoading}
        onClick={handleLogIn}
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>

      {/* Sign Up Link */}
      <div className="text-center text-gray-500 text-sm">
        Don’t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-indigo-600 hover:underline font-medium"
        >
          Sign up
        </Link>
      </div>

      {/* Terms & Conditions Snippet */}
      <div className="mt-4 text-xs text-gray-400 text-center">
        Your data is protected according to our{" "}
        <Link
          href="/terms-and-conditions"
          className="hover:underline text-indigo-500 font-medium"
        >
          Terms & Conditions
        </Link>
        .
      </div>
    </form>
  );
}
