
import MediaGallery, { MediaItem } from "@/components/MediaGallery";
import TopNavbar from "@/components/TopNavbar";
import { placeholderImages } from "@/lib/placeholder-images";
import { mediaData } from "@/lib/media";

function getCorporateMedia(): MediaItem[] {
    // Get corporate images from placeholder images
    const corporatePlaceholders = placeholderImages
        .filter(item => item.category === "Corporate Events")
        .map(item => ({
            id: item.id,
            type: "image" as const,
            src: item.imageUrl,
            title: item.description,
            category: "Corporate Events"
        }));

    // Get corporate images from media data
    const corporateMedia = mediaData.corporate.items.map((item, index) => ({
        id: `corporate-media-${index}`,
        type: item.type,
        src: item.src,
        title: item.title,
        category: "Corporate Events"
    }));

    return [...corporatePlaceholders, ...corporateMedia];
}

export default function CorporateGalleryPage() {
    const items = getCorporateMedia();

    return (
        <>
            <TopNavbar />
            <main className="py-12">
                <MediaGallery items={items} categoryName="Corporate Events" />
            </main>
        </>
    );
}
