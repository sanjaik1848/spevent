
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { 
    ChefHat, 
    Leaf, 
    Gem, 
    UtensilsCrossed, 
    Star, 
    Award, 
    Users, 
    Calendar,
    Heart,
    Shield,
    Zap,
    Quote,
    ArrowRight,
    CheckCircle,
    Sparkles
} from "lucide-react";
import { placeholderImages } from "@/lib/placeholder-images";
import TopNavbar from "@/components/TopNavbar";

const teamMembers = [
    {
        name: "Chef Rohan Kapoor",
        role: "Executive Chef & Culinary Director",
        bio: "Award-winning chef with 15+ years of experience in fine dining. Trained in Michelin-starred restaurants across Europe and Asia. Specializes in modern interpretations of traditional cuisines.",
        experience: "15+ Years",
        achievements: ["Michelin Star Experience", "Culinary Awards Winner", "International Recognition"],
        placeholderId: "team-chef"
    },
    {
        name: "Priya Sharma",
        role: "Operations Director & Event Specialist",
        bio: "Master's in Hospitality Management with expertise in luxury event planning. Ensures flawless execution of every event with meticulous attention to detail and exceptional service standards.",
        experience: "12+ Years",
        achievements: ["Luxury Events Expert", "Service Excellence Award", "Client Satisfaction Leader"],
        placeholderId: "team-manager"
    },
    {
        name: "Ankit Desai",
        role: "Sommelier & Beverage Director",
        bio: "Certified sommelier with extensive knowledge of global wine regions. Creates perfect pairings that elevate every dining experience with carefully curated selections from premium vineyards.",
        experience: "10+ Years",
        achievements: ["Certified Sommelier", "Wine Expert", "Perfect Pairings Specialist"],
        placeholderId: "team-sommelier"
    },
];

const values = [
    {
        icon: <Leaf className="w-12 h-12 text-emerald-600" />,
        title: "Premium Quality",
        description: "We source only the finest, freshest ingredients from trusted suppliers and local farms, ensuring every dish meets our exceptional standards.",
        color: "from-emerald-500 to-green-600"
    },
    {
        icon: <UtensilsCrossed className="w-12 h-12 text-amber-600" />,
        title: "Culinary Mastery",
        description: "Our award-winning chefs blend traditional techniques with innovative approaches to create extraordinary culinary experiences.",
        color: "from-amber-500 to-orange-600"
    },
    {
        icon: <Gem className="w-12 h-12 text-blue-600" />,
        title: "Luxury Experience",
        description: "We craft sophisticated atmospheres and deliver impeccable service that transforms every event into an unforgettable celebration.",
        color: "from-blue-500 to-indigo-600"
    },
    {
        icon: <Heart className="w-12 h-12 text-red-500" />,
        title: "Passion & Dedication",
        description: "Every team member is driven by passion for excellence, ensuring your vision becomes a reality with meticulous attention to detail.",
        color: "from-red-500 to-pink-600"
    }
];

const stats = [
    { number: "500+", label: "Events Hosted", icon: <Calendar className="w-8 h-8" /> },
    { number: "98%", label: "Client Satisfaction", icon: <Star className="w-8 h-8" /> },
    { number: "15+", label: "Years Experience", icon: <Award className="w-8 h-8" /> },
    { number: "50+", label: "Team Members", icon: <Users className="w-8 h-8" /> }
];

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Wedding Client",
        content: "SP Events made our wedding absolutely magical. Every detail was perfect, from the exquisite menu to the flawless service. Our guests are still talking about it!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80"
    },
    {
        name: "Michael Chen",
        role: "Corporate Client",
        content: "Professional, innovative, and absolutely exceptional. They transformed our corporate gala into an unforgettable experience that exceeded all expectations.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
    },
    {
        name: "Emily Rodriguez",
        role: "Birthday Celebration",
        content: "From planning to execution, everything was seamless. The team's attention to detail and creative vision made my 40th birthday celebration truly special.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
    }
];

export default function AboutPage() {
    return (
        <>
        <TopNavbar />
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden bg-motorcycle-dark">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,211,45,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
                </div>
                
                <div className="container-professional relative z-10">
                    <div className="text-center text-white">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20 card-professional group hover:scale-105 transition-all duration-500">
                            <Sparkles className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-sm font-medium">Excellence Since 2008</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                            Crafting Extraordinary
                            <span className="block bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">Experiences</span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12">
                            Where culinary artistry meets unparalleled service. We transform your vision into unforgettable moments that exceed every expectation.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
                                <Link href="/booking">
                                    Start Your Journey
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-2xl">
                                <Link href="/gallery">View Our Work</Link>
                            </Button>
                        </div>
                    </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-motorcycle-dark">
                <div className="container-professional">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 card-professional">
                                    <div className="text-white w-6 h-6">
                                        {stat.icon}
                                    </div>
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                                <div className="text-white font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-motorcycle-dark">
                <div className="container-professional">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20 card-professional group hover:scale-105 transition-all duration-500">
                            <Users className="w-4 h-4 text-motorcycle-yellow group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-sm font-medium text-white">Our Expert Team</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-serif bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent mb-6">
                            Meet Our <span className="text-gradient">Master Craftspeople</span>
                        </h2>
                        <p className="text-xl text-white max-w-3xl mx-auto">
                            The passionate professionals who bring your vision to life with unmatched expertise and dedication.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => {
                            const image = placeholderImages.find(p => p.id === member.placeholderId);
                            if(!image) return null;
                            return (
                                <Card key={member.name} className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 card-professional rounded-3xl">
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={image.imageUrl}
                                            alt={member.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            data-ai-hint={image.imageHint}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Award className="w-4 h-4 text-yellow-500" />
                                                    <span className="text-sm font-semibold text-gray-900">{member.experience}</span>
                                                </div>
                                                <div className="flex flex-wrap gap-1">
                                                    {member.achievements.map((achievement, i) => (
                                                        <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                                            {achievement}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold font-serif text-white mb-2">{member.name}</h3>
                                        <p className="text-motorcycle-yellow font-semibold mb-3">{member.role}</p>
                                        <p className="text-white leading-relaxed">{member.bio}</p>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-motorcycle-dark">
                <div className="container-professional">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20 card-professional group hover:scale-105 transition-all duration-500">
                            <Shield className="w-4 h-4 text-motorcycle-yellow group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-sm font-medium text-white">Our Core Values</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-serif bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent mb-6">
                            What Sets Us <span className="text-gradient">Apart</span>
                        </h2>
                        <p className="text-xl text-white max-w-3xl mx-auto">
                            The principles that guide everything we do, ensuring exceptional experiences every time.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {values.map((value, index) => (
                            <Card key={value.title} className="group text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 card-professional rounded-3xl">
                                    <CardContent className="p-3 md:p-6">
                                    <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${value.color} rounded-full mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 card-professional`}>
                                        {value.icon}
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold font-serif text-white mb-3 md:mb-4">{value.title}</h3>
                                    <p className="text-white text-sm md:text-base leading-relaxed">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-motorcycle-dark">
                <div className="container-professional">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20 card-professional group hover:scale-105 transition-all duration-500">
                            <Quote className="w-4 h-4 text-motorcycle-yellow group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-sm font-medium text-white">Client Testimonials</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-serif bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent mb-6">
                            What Our <span className="text-gradient">Clients Say</span>
                        </h2>
                        <p className="text-xl text-white max-w-3xl mx-auto">
                            Don't just take our word for it. Hear from the clients whose dreams we've brought to life.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 card-professional rounded-3xl">
                                    <CardContent className="p-3 md:p-6">
                                    <div className="flex items-center gap-1 md:gap-2 mb-3 md:mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 md:w-5 md:h-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <blockquote className="text-white text-sm md:text-base leading-relaxed mb-4 md:mb-6 italic">
                                        "{testimonial.content}"
                                    </blockquote>
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden flex-shrink-0">
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                width={40}
                                                height={40}
                                                className="w-full h-full object-cover object-center"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white text-sm md:text-base">{testimonial.name}</div>
                                            <div className="text-xs md:text-sm text-white">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-motorcycle-dark relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,211,45,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
                </div>
                
                <div className="container-professional relative z-10">
                    <div className="text-center text-white max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-bold font-serif mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                            Ready to Create Something
                            <span className="block bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">Extraordinary?</span>
                        </h2>
                        <p className="text-xl text-white mb-12 leading-relaxed">
                            Let's transform your vision into an unforgettable experience. Our team is ready to bring your dreams to life with unmatched expertise and passion.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Button asChild size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-2xl">
                                <Link href="/booking">
                                    <Calendar className="w-5 h-5 mr-2" />
                                    Book Your Event
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-4 text-lg font-semibold rounded-2xl">
                                <Link href="/contact">
                                    <Zap className="w-5 h-5 mr-2" />
                                    Get In Touch
                                </Link>
                            </Button>
                        </div>
                        
                        <div className="mt-12 flex items-center justify-center gap-8 text-white">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-motorcycle-yellow" />
                                <span>Free Consultation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-motorcycle-yellow" />
                                <span>Custom Planning</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-motorcycle-yellow" />
                                <span>24/7 Support</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            </section>
        </main>
        </>
    );
}
