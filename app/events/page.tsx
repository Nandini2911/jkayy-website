import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import DarkVenueAtmosphere from "@/components/sections/Events/DarkVenueAtmosphere";
import TheExperience from "@/components/sections/Events/Experiencesection";
import PerformanceArchive from "@/components/sections/Events/PerformanceArchive";
import SecretDropSection from "@/components/sections/Events/SecretDropSection";
import BookJkayySection from "@/components/sections/home/BookJKAYYCTA";




export default function Events() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white">
      <Navbar />
<DarkVenueAtmosphere/>
<PerformanceArchive/>
<TheExperience/>
<SecretDropSection/>
<BookJkayySection/>
  <Footer/>
    </main>
  );
}