import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import BehindTheNameHero from "@/components/sections/About/BehindTheNameHero";
import TheStorySection from "@/components/sections/About/TheStorySection";



export default function About() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white">
      <Navbar />
      <BehindTheNameHero />
      <TheStorySection/>


  <Footer/>
    </main>
  );
}