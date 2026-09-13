"use client";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const VideoMeeting = () => {
  const params = useParams();
  const roomID = String(params.roomId);
  const { data: session, status } = useSession();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [zp, setZp] = useState<{ destroy: () => void } | null>(null);
  const [isInMeeting, setIsInMeeting] = useState(false);
  const joinedRef = useRef(false);
  const sessionRef = useRef(session);
  const endMeetingRef = useRef<() => void>(() => {});

  const endMeeting = useCallback(() => {
    setZp((prev) => {
      prev?.destroy();
      return null;
    });
    setIsInMeeting(false);
    router.push("/");
  }, [router]);

  useEffect(() => {
    sessionRef.current = session;
    endMeetingRef.current = endMeeting;
  });

  const joinMeeting = useCallback(async (element: HTMLDivElement) => {
    const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt");
    const appID = Number(process.env.NEXT_PUBLIC_ZEGOAPP_ID);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;
    if (!appID || !serverSecret) {
      throw new Error("please provide appId and secret key");
    }

    const currentSession = sessionRef.current;
    const userId = currentSession?.user?.id || crypto.randomUUID();
    const userName = currentSession?.user?.name || "Guest";

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userId,
      userName,
    );

    const zegoInstance = ZegoUIKitPrebuilt.create(kitToken);
    setZp(zegoInstance);

    try {
      zegoInstance.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: "join via this link",
            url: `${window.location.origin}/video-meeting/${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        showAudioVideoSettingsButton: true,
        showScreenSharingButton: true,
        showTurnOffRemoteCameraButton: true,
        showTurnOffRemoteMicrophoneButton: true,
        showRemoveUserButton: true,
        onJoinRoom: () => {
          toast.success("Meeting joined");
          setIsInMeeting(true);
        },
        onLeaveRoom: () => {
          endMeetingRef.current();
        },
      });
    } catch (error) {
      console.error("Failed to join room:", error);
      toast.error("Could not join meeting. Please allow camera and microphone permissions and try again.");
      joinedRef.current = false;
    }
  }, [roomID]);

  useEffect(() => {
    if (
      !joinedRef.current &&
      status === "authenticated" &&
      session?.user?.name &&
      containerRef.current
    ) {
      joinedRef.current = true;
      joinMeeting(containerRef.current);
    }
  }, [status, session, joinMeeting]);

  useEffect(() => {
    return () => {
      if (zp) {
        zp.destroy();
      }
    };
  }, [zp]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <div
        ref={containerRef}
        className="flex-1"
        style={{ minHeight: isInMeeting ? "100%" : "calc(100vh - 4rem)" }}
      />

      {!isInMeeting && (
        <div className="border-t border-border bg-background p-4">
          <div className="max-w-xl mx-auto flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Joining as</p>
              <p className="text-sm text-muted-foreground">
                {session?.user?.name || "Guest"}
              </p>
            </div>
            <Button variant="destructive" onClick={endMeeting}>
              Leave meeting
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoMeeting;
