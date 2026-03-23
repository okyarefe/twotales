import Image from "next/image";

export default function StoryPreview() {
  return (
    <div className="relative w-full max-w-md lg:max-w-lg">
      {/* Glow behind the card */}
      <div className="absolute inset-0 -z-10 translate-y-4 scale-95 rounded-3xl bg-gradient-to-br from-violet-400/20 to-fuchsia-400/20 blur-2xl" />

      {/* Card */}
      <div className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md p-3 shadow-xl shadow-slate-200/50">
        <div className="rounded-xl overflow-hidden">
          <Image
            src="/robotipad.png"
            alt="Bilingual Story Preview"
            width={720}
            height={420}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>

      <p className="text-xs text-slate-400 text-center mt-4 tracking-wide">
        Interactive bilingual stories to accelerate your learning
      </p>
    </div>
  );
}
