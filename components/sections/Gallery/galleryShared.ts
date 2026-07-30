import { Cormorant_Garamond, Manrope } from "next/font/google";

export const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const premiumEase = [0.16, 1, 0.3, 1] as const;

export type GalleryImageItem = {
  type: "image";
  src: string;
  alt: string;
  label: string;
};

export type GalleryVideoItem = {
  type: "video";
  src: string;
  poster: string;
  alt: string;
  label: string;
};

export type GalleryMediaItem =
  | GalleryImageItem
  | GalleryVideoItem;

export const REEL_URL = "/videos/jkayy-2026-showreel.mp4";

/*
  IMAGE ITEM:
  {
    type: "image",
    src: "/images/photo.webp",
    alt: "Description",
    label: "Performance",
  }

  VIDEO ITEM:
  {
    type: "video",
    src: "/videos/video.mp4",
    poster: "/images/video-poster.webp",
    alt: "Description",
    label: "Live Reel",
  }
*/
export const galleryImages: GalleryMediaItem[] = [
  {
    type: "image",
    src: "/images/featured-reel-poster.JPG",
    alt: "JKAYY performing live on stage",
    label: "Live Performance",
  },
  {
    type: "image",
    src: "/images/chica.webp",
    alt: "Crowd during a JKAYY live performance",
    label: "Crowd Energy",
  },

  // VIDEO 01 — replace this path with your real video
  {
    type: "video",
    src: "https://res.cloudinary.com/dl9zkv77/video/upload/v1784724758/jkayyofficial_12_w4nzbe.mp4",
    poster:"poster_img",
    alt: "JKAYY live performance reel",
    label: "Live Reel",
  },

  {
    type: "image",
    src: "/images/about3.webp",
    alt: "JKAYY performing from the DJ booth",
    label: "DJ Booth",
  },
  {
    type: "image",
    src: "/images/about2.webp",
    alt: "JKAYY backstage before a performance",
    label: "Backstage",
  },
  {
    type: "image",
    src: "/images/jkgym2.webp",
    alt: "JKAYY training at the gym",
    label: "Discipline",
  },
  {
    type: "image",
    src: "/images/ad4.jpg",
    alt: "JKAYY travelling between performances",
    label: "On The Move",
  },
  {
    type: "image",
    src: "/images/afterrmatch.png",
    alt: "JKAYY at AfterMatch",
    label: "AfterMatch",
  },

  // VIDEO 02 — replace with your real file and poster
  {
    type: "video",
    src: "https://res.cloudinary.com/dl9zkv77/video/upload/v1784805159/hy.press_eqtxj2.mp4",
   poster:"poster_img",
    alt: "JKAYY performing under stage lights",
    label: "Performance Film",
  },

  {
    type: "video",
    src: "https://res.cloudinary.com/dl9zkv77/video/upload/v1784537173/jkayyofficial_2_h963q1.mp4",
    poster:"poster_img",
    alt: "JKAYY performing under stage lights",
    label: "Live Performance",
  },
  {
    type: "image",
    src: "/images/jkgallery.jpg",
    alt: "Audience enjoying the music",
    label: "Crowd Energy",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dl9zkv77/video/upload/v1784724961/jkayyofficial_14_odimnt.mp4",
  poster:"poster_img",
    alt: "Close view of JKAYY at the decks",
    label: "Behind The Decks",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dl9zkv77/video/upload/v1784792815/reels__1784541648840_ola4l6.mp4",
    poster:"poster_img",
    alt: "Backstage portrait of JKAYY",
    label: "Backstage",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dl9zkv77/video/upload/v1784537175/jkayyofficial_4_sdexiy.mp4",
    poster:"poster_img",
    alt: "JKAYY travelling for a show",
    label: "Travel",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dl9zkv77/video/upload/v1784791995/adventure-drone_lkd1aj.mp4",
    poster:"poster_img",
    alt: "Backstage portrait of JKAYY",
    label: "Backstage",
  },

  // VIDEO 03 — replace with your real file and poster
  {
    type: "video",
    src: "https://res.cloudinary.com/dl9zkv77/video/upload/v1784635508/jkayyofficial_9_fyhuq8.mp4",
    poster:"poster_img",
    alt: "A backstage JKAYY video moment",
    label: "Backstage Film",
  },

 

 
  {
    type: "image",
    src: "/images/chica.webp",
    alt: "JKAYY preparing backstage",
    label: "Before The Show",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dl9zkv77/video/upload/v1784180733/2e39652c-6c4f-4c82-94a4-8b982d3ce785_m2vatb.mp4",
    poster:"",
    alt: "JKAYY performing during a large production",
    label: "Main Stage",
  },
  {
    type: "image",
    src: "/images/ad8.jpg",
    alt: "JKAYY during a travel moment",
    label: "Between Cities",
  },
];

export const heroImages = galleryImages.slice(0, 10);

export const particles = [
  { left: "8%", top: "16%", size: 2, duration: 8, delay: 0.2 },
  { left: "18%", top: "72%", size: 1, duration: 10, delay: 1.1 },
  { left: "31%", top: "26%", size: 2, duration: 9, delay: 0.7 },
  { left: "44%", top: "83%", size: 1, duration: 11, delay: 1.6 },
  { left: "57%", top: "13%", size: 1, duration: 8, delay: 0.9 },
  { left: "69%", top: "68%", size: 2, duration: 12, delay: 0.4 },
  { left: "82%", top: "22%", size: 1, duration: 9, delay: 1.3 },
  { left: "92%", top: "78%", size: 2, duration: 10, delay: 0.6 },
] as const;