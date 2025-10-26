import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
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
        <h1 className="text-3xl font-extrabold text-gray-900">
          Create Your Account
        </h1>
        <p className="text-gray-500 text-sm">
          Enter your information to get started
        </p>
      </div>

      {/* Input Fields */}
      <div className="grid gap-6">
        {/* Name Fields */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="fname" className="text-gray-700 font-medium">
              First Name*
            </Label>
            <Input
              id="fname"
              type="text"
              placeholder="Rohan"
              required
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lname" className="text-gray-700 font-medium">
              Last Name*
            </Label>
            <Input
              id="lname"
              type="text"
              placeholder="Sharma"
              required
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
            />
          </div>
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-gray-700 font-medium">
            Email*
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
          />
        </div>

        {/* Profession */}
        <div className="grid gap-2">
          <Label htmlFor="profession" className="text-gray-700 font-medium">
            Profession*
          </Label>
          <Input
            id="profession"
            type="text"
            placeholder="Lawyer, Engineer, etc."
            required
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
          />
        </div>

        {/* Phone Number */}
        <div className="grid gap-2">
          <Label htmlFor="phone" className="text-gray-700 font-medium">
            Phone Number*
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 98765 43210"
            required
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
          />
        </div>

        {/* Password */}
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-gray-700 font-medium">
            Password*
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter a secure password"
            required
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full py-3 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
      >
        Create Account
      </Button>

      {/* Sign In Link */}
      <div className="text-center text-gray-500 text-sm">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-indigo-600 hover:underline font-medium"
        >
          Sign in
        </Link>
      </div>

      {/* Terms & Conditions Snippet */}
      <div className="mt-4 text-xs text-gray-400 text-center">
        By signing up, you agree to our{" "}
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
