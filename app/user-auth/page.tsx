"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Video } from "lucide-react";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.NEXTAUTH_URL;

  useEffect(() => {
    localStorage.removeItem("hasShownWelcome");
  }, []);

  const handleLogin = async (provider: "google" | "github") => {
    setIsLoading(true);
    try {
      await signIn(provider, { callbackUrl: url });
      toast.info(`Logging in with ${provider}`);
    } catch {
      toast.error(`Failed to login with ${provider}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 lg:block relative">
        <Image
          src="/images/meet_image.jpg"
          width={1080}
          height={1080}
          alt="Login"
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm">
              <Video className="w-5 h-5" />
            </div>
            <span className="text-2xl font-semibold">gmeet</span>
          </div>
          <p className="text-white/80">Video meetings made simple</p>
        </div>
      </div>

      <div className="flex flex-col justify-center w-full p-8 lg:w-1/2">
        <div className="max-w-sm mx-auto w-full space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome to gmeet</h1>
            <p className="text-muted-foreground">
              Join or start meetings with crystal-clear HD video and audio.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full"
              variant="outline"
              size="lg"
              onClick={() => handleLogin("google")}
              disabled={isLoading}
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

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <Button
              className="w-full"
              variant="outline"
              size="lg"
              onClick={() => handleLogin("github")}
              disabled={isLoading}
            >
              <FaGithub className="w-5 h-5 mr-2" />
              Sign in with GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
