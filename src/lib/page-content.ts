
export interface PageContent {
    hero: {
        title: string;
        subtitle: string;
    };
    about: {
        paragraph: string;
        quote: string;
    };
    promo: {
        title: string;
        paragraph: string;
        stats: {
            events: number;
            satisfaction: number;
            rating: number;
        };
    };
    services: {
        title: string;
        paragraph: string;
    };
    menu: {
        title: string;
        paragraph: string;
    };
    footer: {
        quickLinksTitle: string;
        connectTitle: string;
    };
}


export const defaultContent: PageContent = {
    hero: {
        title: "Crafting Unforgettable Moments",
        subtitle: "From elegant weddings to professional corporate gatherings, we bring your vision to life with precision and style. Experience the magic of perfectly orchestrated events that leave lasting impressions."
    },
    about: {
        paragraph: "At SP Events, we don't just plan events; we craft experiences that tell your story. With over 8 years of expertise in event management, our dedicated team brings creativity, precision, and a touch of magic to every celebration. From intimate gatherings to grand celebrations, we handle every detail with meticulous care, ensuring your special moments become unforgettable memories that last a lifetime.",
        quote: "Turning your dreams into unforgettable memories, one event at a time."
    },
    promo: {
        title: "Ready to Plan Your Dream Event?",
        paragraph: "Let's create something extraordinary together. Our experienced team is ready to bring your vision to life with personalized service, attention to detail, and creative solutions. Contact us today for a free consultation and let's start planning your unforgettable moment.",
        stats: {
            events: 500,
            satisfaction: 99,
            rating: 5,
        }
    },
    services: {
        title: "Our Premium Services",
        paragraph: "We offer a comprehensive range of event planning services, each tailored to deliver an exceptional experience. From concept to execution, our team ensures every detail is perfect. Explore our diverse portfolio of services designed to make your event truly special."
    },
    menu: {
        title: "Culinary Excellence",
        paragraph: "Indulge in our exquisite menu featuring authentic flavors and contemporary cuisine. Our experienced chefs create memorable dining experiences with fresh ingredients, traditional recipes, and innovative presentations that complement your special occasion."
    },
    footer: {
        quickLinksTitle: "Quick Links",
        connectTitle: "Connect With Us",
    }
};
