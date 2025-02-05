"use client";

import { LoginForm } from "@/components/auth/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <Image
              src="/spendlog.svg"
              width={100}
              height={100}
              priority
              alt="Image"
            />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/spendlog.svg"
          width={100}
          height={100}
          priority
          alt="Image"
          className="absolute object-center inset-0 h-full w-full dark:brightness-[0.2] dark:grayscale p-4"
        />
      </div>
    </div>
  );
}
