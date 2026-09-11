"use client";
import Header from "@/components/Header";
import MeetingAction from "@/components/ui/MeetingAction";
import MeetingFeature from "@/components/ui/MeetingFeature";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoading(false);
      const hasShownWelcome = localStorage.getItem("hasShownWelcome");
      if (!hasShownWelcome) {
        toast.success(`Welcome back ${session?.user?.name}!`);
        localStorage.setItem("hasShownWelcome", "true");
      }
    } else if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [status, session]);
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="grow p-8 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-8">
              <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Video calls and meetings for everyone
              </h1>
              <p className="text-3xl text-gray-600 dark:text-gray-300 mb-12">
                Connect, collaborate and celebrate from anywhere with Google
                Meet
              </p>
              <MeetingAction />
            </div>
            <div className="md:w-1/2">
              <MeetingFeature />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
