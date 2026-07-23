import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import DarkVenueAtmosphere from "@/components/sections/Events/DarkVenueAtmosphere";




export default function Events() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white">
      <Navbar />
<DarkVenueAtmosphere/>
  <Footer/>
    </main>
  );
}