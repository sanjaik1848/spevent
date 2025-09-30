// Professional Event Management Media Gallery

export const mediaData = {
    weddings: {
        name: "Weddings",
        items: [
            { type: "image" as const, src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", title: "Luxury Wedding Reception" },
            { type: "image" as const, src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80", title: "Elegant Wedding Ceremony" },
            { type: "image" as const, src: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=800&q=80", title: "Wedding Reception Setup" },
        ]
    },
    corporate: {
        name: "Corporate Events",
        items: [
            { type: "image" as const, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", title: "Professional Conference" },
            { type: "image" as const, src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80", title: "Business Networking Event" },
            { type: "image" as const, src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80", title: "Product Launch Event" },
        ]
    },
    parties: {
        name: "Private Parties",
        items: [
            { type: "image" as const, src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80", title: "Luxury Birthday Celebration" },
            { type: "image" as const, src: "https://images.unsplash.com/photo-1485801602374-14f7620a2333?w=800&q=80", title: "Anniversary Celebration" },
            { type: "image" as const, src: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=800&q=80", title: "Graduation Party" },
        ]
    },
    galas: {
        name: "Galas & Fundraisers",
        items: [
            { type: "image" as const, src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80", title: "Charity Gala Dinner" },
            { type: "image" as const, src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80", title: "Awards Ceremony" },
            { type: "image" as const, src: "https://images.unsplash.com/photo-1485801602374-14f7620a2333?w=800&q=80", title: "Fundraising Event" },
        ]
    },
    entertainment: {
        name: "Entertainment",
        items: [
            { type: "image" as const, src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80", title: "Live Music Concert" },
            { type: "image" as const, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", title: "Theater Performance" },
            { type: "image" as const, src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80", title: "Cultural Event" },
        ]
    }
};

export type MediaItem = {
    id: string;
    type: "image" | "video";
    src: string;
    title: string;
    category: string;
};
