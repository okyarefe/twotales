import HeroSection from "@/app/login/hero-section";
import FeaturesSection from "@/app/login/features-section";
import Footer from "@/app/login/Footer";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
