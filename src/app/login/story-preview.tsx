import Image from "next/image";

export default function StoryPreview() {
  return (
    <div className="relative bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
      <div className="flex items-center justify-center min-h-[300px] md:min-h-[400px]">
        <Image
          src="/robotipad.png"
          alt="Bilingual Story Preview"
          width={672}
          height={672}
          className="w-full h-auto max-w-md md:max-w-lg object-contain rounded-lg"
        />
      </div>
      <p className="text-xs text-gray-500 text-center mt-4">
        Interactive bilingual stories to accelerate your language learning
      </p>
    </div>
  );
}
