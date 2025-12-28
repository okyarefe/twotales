import { Metadata } from "next";
import { Mail } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact Us | TwoTales AI",
  description: "Get in touch with the TwoTales AI team",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">Contact Us</h1>
        <p className="text-lg text-slate-600">
          Have questions, feedback, or just want to say hello? We&apos;d love to
          hear from you!
        </p>
      </div>

      <div className="space-y-6 max-w-xl mx-auto">
        <div className="bg-white dark:bg-card rounded-lg shadow-md p-8 border border-border text-center relative overflow-hidden">
          {/* Mascot Image - positioned at top right inside */}
          <div className="absolute top-2 right-2 md:top-4 md:right-4 w-20 h-20 md:w-32 md:h-32 z-10 opacity-30">
            <Image
              src="/mascot.png"
              alt="TwoTales Mascot"
              width={128}
              height={128}
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          <div className="flex justify-center mb-4 relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-4 relative z-10">
            Email Us
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4 relative z-10">
            Reach out to us directly at:
          </p>
          <a
            href="mailto:feokyar@gmail.com"
            className="text-purple-600 hover:text-purple-700 font-medium text-xl inline-block mb-2 break-all relative z-10"
          >
            coming soon
          </a>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200">
          <h3 className="text-xl font-semibold mb-3">Response Time</h3>
          <p className="text-slate-600 dark:text-slate-300">
            We typically respond to all inquiries within 24-48 hours during
            business days. Thank you for your patience!
          </p>
        </div>
      </div>
    </div>
  );
}
