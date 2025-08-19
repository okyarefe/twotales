import { Brain } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-gray-200 bg-white">
      <div className="container mx-auto max-w-6xl text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="h-6 w-6 text-purple-600" />
          <span className="text-lg font-semibold text-gray-900">
            TwoTalesAI
          </span>
        </div>
        <p className="text-gray-500 text-sm">
          &copy; 2025 TwoTalesAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
