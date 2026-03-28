import Image from "next/image";

export default function StoryPreview() {
  return (
    <div className="relative w-full max-w-md lg:max-w-lg animate-float">
      {/* Glow behind the card */}
      <div className="absolute inset-0 -z-10 translate-y-4 scale-95 rounded-3xl bg-gradient-to-br from-[oklch(0.70_0.15_290)]/20 to-[oklch(0.75_0.12_165)]/20 blur-2xl" />

      {/* Card */}
      <div className="rounded-2xl border border-[oklch(0.92_0.02_85)] bg-white/80 backdrop-blur-md p-3 shadow-xl shadow-[oklch(0.50_0.05_85)]/10">
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

      <p className="text-xs text-muted-foreground text-center mt-4 tracking-wide">
        Interactive bilingual stories to accelerate your learning
      </p>
    </div>
  );
}
