"use client";

import { useState } from "react";
import Image from "next/image";

export default function VideoFacade() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  if (isPlaying) {
    return (
      <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden">
        <iframe
          src="https://www.loom.com/embed/520d5e6029ee4283beaf99f9915aa2e8?autoplay=1"
          frameBorder="0"
          allowFullScreen
          allow="autoplay"
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <button
      onClick={handlePlay}
      className="aspect-video w-full max-w-4xl mx-auto rounded-lg shadow-lg flex items-center justify-center border-2 border-purple-200 hover:border-purple-400 transition-all cursor-pointer group relative overflow-hidden"
      aria-label="Play video tutorial"
    >
      {/* Background thumbnail */}
      <Image
        src="/videoplayerimage.png"
        alt="TwoTales AI story generator interface showing personalized language learning stories with interactive quizzes and grammar practice"
        fill
        className="object-cover transform scale-95 origin-center group-hover:scale-100 transition-transform duration-300"
        priority
      />

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all" />

      {/* Play button and text */}
      <div className="relative text-center p-8 z-10 bg-black/50 rounded-lg">
        <div className="w-20 h-20 mx-auto mb-4 bg-purple-500 rounded-full flex items-center justify-center group-hover:bg-purple-600 group-hover:scale-110 transition-all">
          <svg
            className="w-10 h-10 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <p className="text-white font-semibold text-lg mb-2 drop-shadow-lg">
          Watch How It Works
        </p>
        <p className="text-sm text-white drop-shadow-lg">
          See TwoTales AI in action (2 min)
        </p>
      </div>
    </button>
  );
}
