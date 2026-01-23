"use client";

import { motion } from "framer-motion";
import { BookPlus, SearchX } from "lucide-react";
import TopicCreateForm from "./story-create-form";

interface EmptyStoriesStateProps {
  isSearch?: boolean;
}

export default function StoryEmpty({ isSearch = false }: EmptyStoriesStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center space-y-6 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-slate-200"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-purple-100 rounded-full scale-150 blur-xl opacity-50 animate-pulse" />
        {isSearch ? (
          <SearchX className="w-16 h-16 text-slate-400 relative z-10" />
        ) : (
          <BookPlus className="w-16 h-16 text-purple-400 relative z-10" />
        )}
      </div>

      <div className="max-w-md space-y-2">
        <h3 className="text-xl font-bold text-slate-900">
          {isSearch ? "No stories found" : "Your story library is empty"}
        </h3>
        <p className="text-slate-500">
          {isSearch
            ? "We couldn't find any stories matching your search. Try a different term or clear the search."
            : "Transform your ideas into amazing stories. Start your journey by creating your first story today."}
        </p>
      </div>

      {!isSearch && (
        <div className="pt-2">
          <TopicCreateForm />
        </div>
      )}
    </motion.div>
  );
}
