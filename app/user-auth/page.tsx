"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";

const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const url = process.env.NEXTAUTH_URL;

  useEffect(() => {
    localStorage.removeItem("hasShownWelcome");
  });

  const handleLogin = async (provider) => {
    setIsLoading(true);
    try {
      await signIn(provider, { callbackUrl: url });
      toast.info(`Logging with ${provider}`);
    } catch (error) {
      toast.error(`Failed to login ${provider}, please try again later`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen bg-linear-to-r from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Loader className="w-8 h-8 animate-spin text-white" />
        </div>
      )}
      <div className="hidden w-1/2 bg-gray-100 lg:block">
        <Image
          src="/images/meet_image.jpg"
          width={1080}
          height={1080}
          alt="login_image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-center w-full p-8 lg:w-1/2">
        <div className="max-w-md mx-auto">
          <h1 className="mb-4 text-4xl font-bold">Welcome to GMeet</h1>
          <p className="mb-8 text-gray-600 dark:text-gray-100">
            Connect with your team anytime, anywhere. Join or start meetings
            with crystal-clear HD video and audio
          </p>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => handleLogin("google")}
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </Button>
          <div className="relative flex items-center my-6">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-3 text-sm text-gray-500 dark:text-gray-400">
              Or
            </span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => handleLogin("github")}
          >
            <FaGithub className="w-5 h-5 mr-2" />
            Sign in with GitHub
          </Button>
          <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="#"
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              Create now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
