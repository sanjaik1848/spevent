
import Gallery from "@/components/Gallery";
import TopNavbar from "@/components/TopNavbar";

export default function GalleryPage() {
    return (
        <>
            <TopNavbar />
            <main className="py-12">
                <Gallery />
            </main>
        </>
    );
}
