"use client";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const VideoMeeting = () => {
  const params = useParams();
  const roomID = params.roomId;
  const { data: session, status } = useSession();
  const router = useRouter();
  const containerRef = useRef(null); // ref for video container element
  const [zp, setZp] = useState(null);
  const [isInMeeting, setIsInMeeting] = useState(false);

  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.user?.name &&
      containerRef.current
    ) {
      joinMeeting(containerRef.current);
    } else {
      console.log("session is not authenticate .please login before use");
      toast.error("Session not authenticated. Please login before use");
    }
  }, [session, status]);

  useEffect(() => {
    return () => {
      if (zp) {
        zp.destroy();
      }
    };
  }, [zp]);

  const joinMeeting = async (element) => {
    // generate Kit Token
    const appID = Number(process.env.NEXT_PUBLIC_ZEGOAPP_ID);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;
    if (!appID && !serverSecret) {
      throw new Error("please provide appId and secret key");
    }

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      session?.user?.id || Date.now().toString(),
      session?.user?.name || "Guest",
    );

    // Create instance object from Kit Token.
    const zegoInstance = ZegoUIKitPrebuilt.create(kitToken);
    setZp(zegoInstance);
    // start the call
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
        toast.success("Meeting joined succesfully");
        setIsInMeeting(true);
      },
      onLeaveRoom: () => {
        endMeeting();
      },
    });
  };

  const endMeeting = () => {
    if (zp) {
      zp.destroy();
    }
    toast.success("Meeting end succesfully");
    setZp(null);
    setIsInMeeting(false);
    router.push("/");
  };

  return (
    <div>
      
    </div>
  );
};

export default VideoMeeting;
