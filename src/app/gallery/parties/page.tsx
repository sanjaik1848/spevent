
import MediaGallery, { MediaItem } from "@/components/MediaGallery";
import TopNavbar from "@/components/TopNavbar";
import { placeholderImages } from "@/lib/placeholder-images";
import { mediaData } from "@/lib/media";

function getPartiesMedia(): MediaItem[] {
    // Get party images from placeholder images
    const partyPlaceholders = placeholderImages
        .filter(item => item.category === "Private Parties")
        .map(item => ({
            id: item.id,
            type: "image" as const,
            src: item.imageUrl,
            title: item.description,
            category: "Private Parties"
        }));

    // Get party images from media data
    const partyMedia = mediaData.parties.items.map((item, index) => ({
        id: `party-media-${index}`,
        type: item.type,
        src: item.src,
        title: item.title,
        category: "Private Parties"
    }));

    return [...partyPlaceholders, ...partyMedia];
}

export default function PartiesGalleryPage() {
    const items = getPartiesMedia();

    return (
        <>
            <TopNavbar />
            <main className="py-12">
                <MediaGallery items={items} categoryName="Private Parties" />
            </main>
        </>
    );
}
