import Image from "next/image";

export default function StoryPreview() {
  return (
    <div className="relative w-full max-w-md md:max-w-lg">
      <div className="p-4 md:p-6">
        <div className="rounded-xl overflow-hidden w-full">
          <Image
            src="/robotipad.png"
            alt="Bilingual Story Preview"
            width={720}
            height={420}
            className="w-full h-auto object-cover rounded-lg"
            priority
          />
        </div>
      </div>

      <p className="text-xs text-slate-400 text-center mt-4">
        Interactive bilingual stories to accelerate your language learning
      </p>
    </div>
  );
}
