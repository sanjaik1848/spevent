import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    quote: 'SP Events planned our dream wedding, and it was beyond perfect. Every detail was handled with care and creativity. We couldn\'t have asked for more!',
    name: 'Jessica & Mark',
    role: 'Newlyweds',
    placeholderId: 'testimonial-1'
  },
  {
    quote: 'Our annual corporate conference was a massive success, thanks to the SP Events team. Their professionalism and execution were flawless.',
    name: 'David Chen',
    role: 'CEO, TechCorp',
    placeholderId: 'testimonial-2'
  },
  {
    quote: 'The best birthday party I\'ve ever had! SP Events took my vision and turned it into an epic celebration. Highly recommended for any event.',
    name: 'Sophie Miller',
    role: 'Birthday Client',
    placeholderId: 'testimonial-3'
  },
  {
    quote: 'Outstanding service from start to finish! Our anniversary celebration was magical, and all our guests are still talking about it months later.',
    name: 'Robert & Sarah',
    role: 'Anniversary Couple',
    placeholderId: 'testimonial-4'
  },
  {
    quote: 'Professional, creative, and absolutely reliable. SP Events made our product launch event unforgettable. The attention to detail was remarkable.',
    name: 'Maria Rodriguez',
    role: 'Marketing Director',
    placeholderId: 'testimonial-5'
  },
  {
    quote: 'From planning to execution, everything was seamless. Our graduation party was a huge hit thanks to SP Events\' amazing team and creativity.',
    name: 'Alex Thompson',
    role: 'Graduate',
    placeholderId: 'testimonial-6'
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-secondary text-foreground">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
            Words From Our Clients
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const image = placeholderImages.find(p => p.id === testimonial.placeholderId);
              if(!image) return null;

              return (
                <div key={index} className="p-4 h-full">
                  <Card className="h-full flex flex-col justify-between rounded-lg shadow-lg bg-background border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <CardContent className="flex flex-col p-8 text-center">
                       <div className="flex justify-center mb-4 text-yellow-400">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                       </div>
                       <p className="text-muted-foreground flex-grow text-lg italic">"{testimonial.quote}"</p>
                      <div className="mt-8 flex items-center flex-col gap-4">
                         <Avatar className="h-24 w-24 border-4 border-primary/50">
                           <AvatarImage src={image.imageUrl} alt={image.description} data-ai-hint={image.imageHint} />
                           <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                         </Avatar>
                        <div>
                          <p className="font-semibold text-xl font-serif text-foreground">{testimonial.name}</p>
                          <p className="text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  );
}
