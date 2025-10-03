import Hero from "@/components/Hero";
import TopNavbar from "@/components/TopNavbar";
import Services from "@/components/Services";
import GalleryPreview from "@/components/GalleryPreview";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Promo from "@/components/Promo";
import ImageSlideshow from "@/components/ImageSlideshow";
import { defaultContent } from "@/lib/page-content";
import type { PageContent } from "@/lib/page-content";

// This is the main website page
export default async function WebsitePage() {
  const content: PageContent = defaultContent;

         return (
           <>
             <Hero content={content?.hero} />
             <TopNavbar />
             <main className="bg-gray-50">
        <Promo content={content?.promo} />
        <ImageSlideshow />
        <Services />
        <About content={content?.about} />
        <GalleryPreview />
        <Testimonials />
      </main>
    </>
  );
}
