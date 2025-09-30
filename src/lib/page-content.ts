
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
        subtitle: "From elegant weddings to professional corporate gatherings, we bring your vision to life with precision and style."
    },
    about: {
        paragraph: "At SP Events, we don't just plan events; we craft experiences. Our team is dedicated to bringing your vision to life with creativity, precision, and a touch of magic. We handle every detail, so you can enjoy the moment.",
        quote: "Turning your dreams into unforgettable memories."
    },
    promo: {
        title: "Ready to Plan Your Dream Event?",
        paragraph: "Let's create something extraordinary together. Contact us today for a consultation and let's start planning your unforgettable moment.",
        stats: {
            events: 500,
            satisfaction: 99,
            rating: 5,
        }
    },
    services: {
        title: "Our Services",
        paragraph: "We offer a comprehensive range of event planning services, each tailored to deliver an exceptional experience. Explore what we can do for you."
    },
    menu: {
        title: "A Taste of Tradition",
        paragraph: "Explore the rich and authentic flavors of Tamil Nadu, available for your events."
    },
    footer: {
        quickLinksTitle: "Quick Links",
        connectTitle: "Connect With Us",
    }
};
