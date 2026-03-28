import HeroSection from "@/app/(auth)/login/hero-section";
import FeaturesSection from "@/app/(auth)/login/features-section";
import Footer from "@/app/(auth)/login/footer";

export default function LoginPage() {
  return (
    <div className="min-h-full bg-background overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
