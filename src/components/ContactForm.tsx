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
    <section id="contact" className="py-16 md:py-24 bg-background">
        <div className="container grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
                 <div className="text-left">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Reach Us</h2>
                    <p className="mt-3 text-muted-foreground">
                        Have a question or want to start planning your next event? We'd love to hear from you.
                    </p>
                </div>
                <div className="space-y-4 text-lg text-foreground">
                    <div className="flex items-center gap-4">
                        <MapPin className="w-6 h-6 text-primary" />
                        <span>456 Event Lane, Celebration City, 67890</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Phone className="w-6 h-6 text-primary" />
                        <span>(123) 555-0123</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Mail className="w-6 h-6 text-primary" />
                        <span>contact@spevents.com</span>
                    </div>
                </div>
            </div>
            <div>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-secondary p-8 rounded-lg shadow-lg">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
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
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="you@example.com" {...field} />
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
                                <FormLabel>Your Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="Tell us about your event..."
                                    className="resize-none"
                                    rows={5}
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="text-center">
                            <Button type="submit" size="lg" className="w-full">Get in Touch</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    </section>
  );
}
