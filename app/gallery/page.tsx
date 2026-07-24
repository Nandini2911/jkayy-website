import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import BookJKAYY from "@/components/sections/Gallery/BookJKAYY";
import FeaturedReel from "@/components/sections/Gallery/FeaturedReel";
import GalleryCollection from "@/components/sections/Gallery/GalleryCollection";
import GalleryHero from "@/components/sections/Gallery/GalleryHero";




export default function Gallery() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white">
      <Navbar />
      <GalleryHero/>
      <GalleryCollection />
      <FeaturedReel />
      <BookJKAYY />
    

  <Footer/>
    </main>
  );
}