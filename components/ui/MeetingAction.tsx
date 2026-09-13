"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Copy, Link2, Plus, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

function getBaseUrl() {
  if (typeof window === "undefined") return "";
  return window.location.origin;
}

const MeetingAction = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const [generatedMeetingUrl, setGeneratedMeetingUrl] = useState("");
  const [meetingLink, setMeetingLink] = useState("");

  const handleCreateMeetingForLater = () => {
    const actualBase = getBaseUrl();
    const roomId = uuidv4();
    const url = `${actualBase}/video-meeting/${roomId}`;
    setGeneratedMeetingUrl(url);
    setIsDialogOpen(true);
    toast.success("Meeting link created");
  };

  const handleJoinMeeting = () => {
    if (meetingLink) {
      const actualBase = getBaseUrl();
      const formattedLink = meetingLink.includes("http")
        ? meetingLink
        : `${actualBase}/video-meeting/${meetingLink}`;
      router.push(formattedLink);
    } else {
      toast.error("Please enter a valid link or code");
    }
  };

  const handleStartMeeting = () => {
    const actualBase = getBaseUrl();
    const roomId = uuidv4();
    const meetingUrl = `${actualBase}/video-meeting/${roomId}`;
    router.push(meetingUrl);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMeetingUrl);
    toast.info("Link copied to clipboard");
  };

  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button size="lg" className="px-6">
                  <Video className="w-4 h-4 mr-2" />
                  New meeting
                </Button>
              }
            />
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleCreateMeetingForLater}>
                <Link2 className="w-4 h-4 mr-2" />
                Create for later
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleStartMeeting}>
                <Plus className="w-4 h-4 mr-2" />
                Start instant meeting
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center">
            <Input
              placeholder="Enter a code or link"
              className="w-64 sm:w-72 h-9 rounded-r-none border-r-0"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJoinMeeting()}
            />
            <Button
              variant="secondary"
              className="h-9 rounded-l-none border border-l-0 border-input"
              onClick={handleJoinMeeting}
            >
              Join
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Meeting created</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Share this link with people you want to meet with.
            </p>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
              <code className="flex-1 text-sm break-all">{generatedMeetingUrl}</code>
              <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MeetingAction;
