"use client";

import { add_lessonProgress } from "@/redux/slices/lessons-progress";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

interface YoutubeEmbedProps {
  videoId: string;
  lessonId: string;
  courseId: string;
  userId: string;
}

declare global {
  interface Window {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const YoutubeEmbed = ({
  videoId,
  userId,
  courseId,
  lessonId,
}: YoutubeEmbedProps) => {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const [hasClicked, setHasClicked] = useState(false);
  const dispatch = useDispatch();

  // Initialize the player only once
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    function initPlayer() {
      if (!playerRef.current) {
        playerRef.current = new window.YT.Player("yt-player", {
          videoId,
          playerVars: {
            rel: 0,
            modestbranding: 1,
            autoplay: 0,
            playsinline: 1,
          },
          events: {
            onReady: () => {
              // Player ready
            },
          },
        });
      }
    }
  }, []); // Run only once on mount

  // Update video when videoId changes
  useEffect(() => {
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.cueVideoById(videoId);

      setHasClicked(false); // Reset click state for new video
    }
  }, [videoId]);

  const handleFirstClick = async () => {
    if (hasClicked) return;

    console.log({ userId, courseId, lessonId, videoId });
    const response = await fetch(
      `/api/lesson-progress/create-progress?userId=${userId}&courseId=${courseId}&lessonId=${lessonId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const res = await response.json();

    if (!res.success) {
      console.log(res.message);
      return;
    }

    console.log({ lessonProgress: res.data });
    dispatch(add_lessonProgress(res.data));
    setHasClicked(true);
    if (playerRef.current) {
      playerRef.current.playVideo();
    }
  };

  return (
    <div className="relative w-full aspect-[16/9]">
      <div id="yt-player" className="absolute top-0 left-0 w-full h-full" />

      {!hasClicked && (
        <div
          className="absolute top-0 left-0 w-full h-full z-20 cursor-pointer"
          style={{ background: "transparent" }}
          onClick={handleFirstClick}
        />
      )}
    </div>
  );
};

export default YoutubeEmbed;
