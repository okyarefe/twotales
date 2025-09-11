import React from "react";

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-white animate-fade-in">
      <div className="flex flex-col items-center">
        {/* App Logo or Icon */}
        <svg
          className="w-16 h-16 mb-6 animate-spin text-purple-500"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="currentColor"
            strokeWidth="5"
            opacity="0.15"
          />
          <path
            d="M45 25a20 20 0 0 1-20 20"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
        {/* App Name or Message */}
        <h2 className="text-2xl font-bold text-purple-700 mb-2">TwoTales</h2>
        {message && <p className="text-base text-purple-400">{message}</p>}
      </div>
    </div>
  );
}
