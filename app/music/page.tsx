import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import FeaturedReleaseSection from "@/components/sections/Music/FeaturedRelease";
import ListenEverywhereSection from "@/components/sections/Music/ListenEverywhereSection";
import ListeningRoomSection from "@/components/sections/Music/ListeningRoom";
import NextReleaseSection from "@/components/sections/Music/NextReleaseSection";
import StayConnectedSection from "@/components/sections/Music/StayConnectedSection";
import StreamingStatisticsSection from "@/components/sections/Music/StreamingStatisticsSection";
import { NextBuildContext } from "next/dist/build/build-context";




export default function Music() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white">
      <Navbar />
      <ListeningRoomSection/>
      <FeaturedReleaseSection/>
      <ListenEverywhereSection/>
      <NextReleaseSection/>
      <StayConnectedSection/>
      

  <Footer/>
    </main>
  );
}