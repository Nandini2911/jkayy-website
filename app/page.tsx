import Navbar from "@/components/common/Navbar";
import FeaturedPerformanceReel from "@/components/sections/home/FeaturedPerformanceReel";
import HeroSection from "@/components/sections/home/HeroSection";
import TourMarqueeSection from "@/components/sections/home/TourMarqueeSection";
import WorldOfJKAYY from "@/components/sections/home/WorldOfJKAYY";


export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white">
      <Navbar />

  <HeroSection />
  <WorldOfJKAYY />
  <TourMarqueeSection />
  <FeaturedPerformanceReel />
 
    </main>
  );
}