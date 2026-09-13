"use client";
import Header from "@/components/Header";
import MeetingAction from "@/components/ui/MeetingAction";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  useEffect(() => {
    if (status === "authenticated") {
      const hasShownWelcome = localStorage.getItem("hasShownWelcome");
      if (!hasShownWelcome) {
        toast.success(`Welcome back ${session?.user?.name}!`);
        localStorage.setItem("hasShownWelcome", "true");
      }
    }
  }, [status, session]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-10">
          <div className="text-center space-y-3">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              Video calls and
              <br />
              meetings for everyone
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Connect, collaborate, and celebrate from anywhere with gmeet.
            </p>
          </div>
          <MeetingAction />
        </div>
      </main>
    </div>
  );
};

export default Page;
