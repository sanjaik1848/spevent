'use client';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactForm() {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Message Sent!",
            description: "Thank you for reaching out. We will get back to you shortly.",
        });
        form.reset();
  }

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 bg-motorcycle-dark">
        <div className="container-professional grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
            <div className="space-y-6 sm:space-y-8">
                 <div className="text-left">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">Reach Us</h2>
                    <p className="mt-2 sm:mt-3 text-sm sm:text-base text-white">
                        Have a question or want to start planning your next event? We'd love to hear from you.
                    </p>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg text-white">
                    <div className="flex items-center gap-3 sm:gap-4 group">
                        <div className="w-12 h-12 bg-motorcycle-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-black flex-shrink-0" />
                        </div>
                        <span className="break-words">456 Event Lane, Celebration City, 67890</span>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 group">
                        <div className="w-12 h-12 bg-motorcycle-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-black flex-shrink-0" />
                        </div>
                        <span>(123) 555-0123</span>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 group">
                        <div className="w-12 h-12 bg-motorcycle-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-black flex-shrink-0" />
                        </div>
                        <span className="break-all">contact@spevents.com</span>
                    </div>
                </div>
            </div>
            <div>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8 bg-motorcycle-card p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg card-professional border border-motorcycle-yellow">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-sm sm:text-base text-white">Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your Name" className="text-sm sm:text-base h-10 sm:h-12 bg-motorcycle-card text-white placeholder:text-white/60 border-motorcycle-yellow focus:ring-2 focus:ring-motorcycle-yellow" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-sm sm:text-base text-white">Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your Email" type="email" className="text-sm sm:text-base h-10 sm:h-12 bg-motorcycle-card text-white placeholder:text-white/60 border-motorcycle-yellow focus:ring-2 focus:ring-motorcycle-yellow" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-sm sm:text-base text-white">Your Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="Tell us about your event..."
                                    className="resize-none text-sm sm:text-base min-h-[100px] sm:min-h-[120px] bg-motorcycle-card text-motorcycle-white placeholder:text-motorcycle-white/60 border-motorcycle-yellow focus:ring-2 focus:ring-motorcycle-yellow"
                                    rows={4}
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="text-center">
                            <Button type="submit" size="lg" className="w-full text-sm sm:text-base h-10 sm:h-12 btn-primary">Get in Touch</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    </section>
  );
}
