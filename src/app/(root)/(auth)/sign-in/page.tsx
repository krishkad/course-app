import { LoginForm } from "@/components/auth/LoginForm";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="bg-secondary flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm bg-white flex-col gap-6 p-6 rounded-xl shadow-2xl">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Learn Pro
        </Link>
        <Suspense fallback={<>Loading...</>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
