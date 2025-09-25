"use client";

import React from "react";

const YoutubeEmbed = ({ videoId }: { videoId: string }) => {
  return (
    <iframe
      className="w-full aspect-[16/9]"
      src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0&playsinline=1`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
};

export default YoutubeEmbed;
