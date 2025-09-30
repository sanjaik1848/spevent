
import MediaGallery, { MediaItem } from "@/components/MediaGallery";
import TopNavbar from "@/components/TopNavbar";
import { placeholderImages } from "@/lib/placeholder-images";
import { mediaData } from "@/lib/media";

function getConcertsMedia(): MediaItem[] {
    // Get entertainment images from placeholder images
    const entertainmentPlaceholders = placeholderImages
        .filter(item => item.category === "Entertainment")
        .map(item => ({
            id: item.id,
            type: "image" as const,
            src: item.imageUrl,
            title: item.description,
            category: "Entertainment"
        }));

    // Get entertainment images from media data
    const entertainmentMedia = mediaData.entertainment.items.map((item, index) => ({
        id: `entertainment-media-${index}`,
        type: item.type,
        src: item.src,
        title: item.title,
        category: "Entertainment"
    }));

    return [...entertainmentPlaceholders, ...entertainmentMedia];
}

export default function ConcertsGalleryPage() {
    const items = getConcertsMedia();
    
    return (
        <>
            <TopNavbar />
            <main className="py-12">
                <MediaGallery items={items} categoryName="Entertainment" />
            </main>
        </>
    );
}
