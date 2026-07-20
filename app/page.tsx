import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import BehindTheDecksSection from "@/components/sections/home/BehindTheDeckssection";
import BookJkayySection from "@/components/sections/home/BookJKAYYCTA";
import FeaturedPerformanceReel from "@/components/sections/home/FeaturedPerformanceReel";
import HeroSection from "@/components/sections/home/HeroSection";
import JKAYYQuoteSection from "@/components/sections/home/JKAYYQuoteSection";
import LatestReleasesSection from "@/components/sections/home/LatestReleasesSection";
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
  <JKAYYQuoteSection />
  <LatestReleasesSection/>
  <BehindTheDecksSection/>
  <BookJkayySection/>
  <Footer/>
    </main>
  );
}