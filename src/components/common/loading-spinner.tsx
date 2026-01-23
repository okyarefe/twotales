import React from "react";

interface LoadingSpinnerProps {
  message?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const sizeClasses = {
  xs: {
    spinner: "w-4 h-4",
    margin: "mb-1",
    text: "text-xs",
  },
  sm: {
    spinner: "w-6 h-6",
    margin: "mb-2",
    text: "text-sm",
  },
  md: {
    spinner: "w-16 h-16",
    margin: "mb-6",
    text: "text-base",
  },
  lg: {
    spinner: "w-24 h-24",
    margin: "mb-8",
    text: "text-lg",
  },
};

export default function LoadingSpinner({ message, size = "md" }: LoadingSpinnerProps) {
  const classes = sizeClasses[size];
  
  return (
    <div className="flex flex-col items-center justify-center bg-white animate-fade-in">
      <div className="flex flex-col items-center">
        {/* App Logo or Icon */}
        <svg
          className={`${classes.spinner} ${classes.margin} animate-spin text-purple-500`}
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
        {message && <p className={`${classes.text} text-purple-400`}>{message}</p>}
      </div>
    </div>
  );
}
