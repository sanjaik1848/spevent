
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ChefHat, Leaf, Gem, UtensilsCrossed } from "lucide-react";
import { placeholderImages } from "@/lib/placeholder-images";
import TopNavbar from "@/components/TopNavbar";

const teamMembers = [
    {
        name: "Rohan Kapoor",
        role: "Executive Chef",
        bio: "With a passion for authentic flavors and modern techniques, Chef Rohan crafts culinary masterpieces that tell a story on every plate.",
        placeholderId: "team-chef"
    },
    {
        name: "Priya Sharma",
        role: "Restaurant Manager",
        bio: "Priya ensures every guest experiences flawless service and a warm, welcoming atmosphere from the moment they arrive.",
        placeholderId: "team-manager"
    },
    {
        name: "Ankit Desai",
        role: "Sommelier",
        bio: "Ankit curates our exquisite wine list, perfectly pairing each dish with a selection from the world's finest vineyards.",
        placeholderId: "team-sommelier"
    },
];

const values = [
    {
        icon: <Leaf className="w-10 h-10 text-primary" />,
        title: "Quality Ingredients",
        description: "We source the freshest, highest-quality seasonal ingredients to create dishes that are both delicious and authentic."
    },
    {
        icon: <UtensilsCrossed className="w-10 h-10 text-primary" />,
        title: "Culinary Excellence",
        description: "Our chefs combine traditional methods with contemporary flair to deliver an unforgettable dining experience."
    },
    {
        icon: <Gem className="w-10 h-10 text-primary" />,
        title: "Elegant Ambiance",
        description: "We provide a sophisticated and comfortable setting, perfect for intimate dinners and grand celebrations alike."
    }
]

export default function AboutPage() {
    return (
        <>
        <TopNavbar />
        <main className="py-12 bg-background">
            <div className="container">
                {/* Mission Section */}
                <section className="text-center py-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-4">Our Culinary Philosophy</h1>
                    <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
                        At Gulmohar, we believe dining is an art form. Our philosophy is rooted in a deep respect for ingredients, a passion for culinary innovation, and a commitment to creating moments of pure gastronomic delight for every guest.
                    </p>
                </section>

                {/* Team Section */}
                <section className="py-16 bg-secondary rounded-lg">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground">Meet Our Culinary Artisans</h2>
                         <p className="max-w-2xl mx-auto text-muted-foreground mt-4">The talented individuals dedicated to making your meal extraordinary.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
                        {teamMembers.map(member => {
                            const image = placeholderImages.find(p => p.id === member.placeholderId);
                            if(!image) return null;
                            return (
                                <div key={member.name} className="text-center">
                                    <div className="relative w-48 h-48 mx-auto mb-4">
                                        <Image
                                            src={image.imageUrl}
                                            alt={member.name}
                                            width={400}
                                            height={400}
                                            className="rounded-full object-cover border-4 border-primary"
                                            data-ai-hint={image.imageHint}
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold font-serif">{member.name}</h3>
                                    <p className="text-primary font-medium">{member.role}</p>
                                    <p className="text-muted-foreground mt-2 text-sm">{member.bio}</p>
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground">Why Dine With Us?</h2>
                        <p className="max-w-2xl mx-auto text-muted-foreground mt-4">Our commitment to excellence sets us apart.</p>
                    </div>
                     <div className="grid md:grid-cols-3 gap-12 text-center">
                        {values.map(value => (
                            <div key={value.title} className="flex flex-col items-center">
                                {value.icon}
                                <h3 className="text-2xl font-serif font-bold my-4">{value.title}</h3>
                                <p className="text-muted-foreground">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
        </>
    );
}
