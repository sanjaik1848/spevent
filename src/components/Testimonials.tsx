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
    <section id="testimonials" className="py-16 md:py-24 bg-motorcycle-dark text-white">
      <div className="container-professional">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-motorcycle-heading font-bold bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent animate-fade-in">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-lg text-white mt-4 max-w-2xl mx-auto animate-fade-in">
            Don't just take our word for it. Hear from the clients whose dreams we've brought to life.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {testimonials.map((testimonial, index) => {
              const image = placeholderImages.find(p => p.id === testimonial.placeholderId);
              if(!image) return null;

              return (
                <div key={index} className="p-2 md:p-4 h-full group">
                  <Card className="h-full flex flex-col justify-between rounded-3xl shadow-lg bg-motorcycle-card border-motorcycle-yellow/30 hover:shadow-2xl hover:-translate-y-4 hover:scale-105 transition-all duration-500 card-professional">
                    <CardContent className="flex flex-col p-3 md:p-6 text-center">
                       <div className="flex justify-center mb-3 md:mb-4 text-motorcycle-yellow group-hover:animate-pulse">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 md:w-5 md:h-5 fill-current group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: `${i * 100}ms` }} />)}
                       </div>
                       <p className="text-white flex-grow text-sm md:text-lg italic animate-fade-in">"{testimonial.quote}"</p>
                      <div className="mt-4 md:mt-8 flex items-center flex-col gap-2 md:gap-4">
                         <Avatar className="h-12 w-12 md:h-16 md:w-16 border-2 md:border-4 border-motorcycle-yellow/50 group-hover:border-motorcycle-yellow group-hover:scale-110 transition-all duration-300 rounded-full overflow-hidden">
                           <AvatarImage src={image.imageUrl} alt={image.description} data-ai-hint={image.imageHint} />
                           <AvatarFallback className="bg-motorcycle-yellow text-black text-sm md:text-base">{testimonial.name.charAt(0)}</AvatarFallback>
                         </Avatar>
                        <div>
                          <p className="font-semibold text-sm md:text-xl font-motorcycle-heading text-white group-hover:text-gradient transition-colors duration-300">{testimonial.name}</p>
                          <p className="text-white text-xs md:text-base group-hover:text-white transition-colors duration-300">{testimonial.role}</p>
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
