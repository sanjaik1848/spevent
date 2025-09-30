
import MediaGallery, { MediaItem } from "@/components/MediaGallery";
import TopNavbar from "@/components/TopNavbar";
import { placeholderImages } from "@/lib/placeholder-images";
import { mediaData } from "@/lib/media";

function getWeddingMedia(): MediaItem[] {
    // Get wedding images from placeholder images
    const weddingPlaceholders = placeholderImages
        .filter(item => item.category === "Weddings")
        .map(item => ({
            id: item.id,
            type: "image" as const,
            src: item.imageUrl,
            title: item.description,
            category: "Weddings"
        }));

    // Get wedding images from media data
    const weddingMedia = mediaData.weddings.items.map((item, index) => ({
        id: `wedding-media-${index}`,
        type: item.type,
        src: item.src,
        title: item.title,
        category: "Weddings"
    }));

    return [...weddingPlaceholders, ...weddingMedia];
}

export default function WeddingsGalleryPage() {
    const items = getWeddingMedia();

    return (
        <>
            <TopNavbar />
            <main className="py-12">
                <MediaGallery items={items} categoryName="Weddings" />
            </main>
        </>
    );
}
