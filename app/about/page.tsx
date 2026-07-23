import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import AdventureExplorationSection from "@/components/sections/About/AdventureExplorationSection";
import BehindTheNameHero from "@/components/sections/About/BehindTheNameHero";
import BeyondTheDecks from "@/components/sections/About/BeyondTheDecks";
import EntrepreneurSection from "@/components/sections/About/Entrepreneursection";
import FitnessDisciplineSection from "@/components/sections/About/FitnessDisciplineSection";
import JourneyTimeline from "@/components/sections/About/JourneyTimeline";
import TheArtistSection from "@/components/sections/About/TheArtistsection";
import TheStorySection from "@/components/sections/About/TheStorySection";
import VisionSection from "@/components/sections/About/VisionSection";



export default function About() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white">
      <Navbar />
      <BehindTheNameHero />
      <TheStorySection/>
  <TheArtistSection enterFrom="right" />
  <FitnessDisciplineSection/>
  <AdventureExplorationSection />
  <EntrepreneurSection/>

  <BeyondTheDecks/>

  <JourneyTimeline/>
  <VisionSection/>

  <Footer/>
    </main>
  );
}