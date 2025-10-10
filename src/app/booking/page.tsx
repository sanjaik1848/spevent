
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import TopNavbar from "@/components/TopNavbar";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem } from "@/lib/animations";

const steps = ["Event Details", "Guest Info", "Services", "Confirmation"];

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    eventType: "",
    date: "",
    guests: "",
    services: [] as string[],
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Save booking to localStorage instead of Firebase
      if (typeof window !== 'undefined') {
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const newBooking = {
          ...formData,
          id: Date.now().toString(),
          status: "Pending",
          createdAt: new Date().toISOString(),
        };
        bookings.push(newBooking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
      }
      
      toast({
        title: "Booking Submitted!",
        description: "Thank you! We've received your request and will be in touch shortly.",
      });
    } catch (error) {
      console.error("Error saving booking: ", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <TopNavbar />
    <div className="min-h-screen flex flex-col items-center justify-center bg-motorcycle-dark py-12 px-4">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="w-full max-w-2xl bg-motorcycle-card rounded-3xl shadow-professional-lg p-8 card-professional border border-motorcycle-yellow"
      >
        <motion.h1 
          whileHover={{ scale: 1.05 }}
          className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent"
        >
          Book Your Event
        </motion.h1>

        {/* Step Indicators */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex justify-between mb-8"
        >
          {steps.map((label, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ scale: 1.1 }}
              className={`flex-1 text-center text-sm transition-all duration-300 ${
                i <= step ? "font-bold text-motorcycle-yellow" : "text-white/60"
              }`}
            >
              {label}
            </motion.div>
          ))}
        </motion.div>
        <div className="w-full bg-motorcycle-white/20 rounded-full h-1 mb-8 overflow-hidden">
            <motion.div 
              className="bg-motorcycle-yellow h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((step) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
        </div>


        {/* Form Steps */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div 
              key="step-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="eventType" className="text-white">Event Type</Label>
                <select
                  id="eventType"
                  className="w-full mt-2 p-2 border border-motorcycle-yellow rounded-lg bg-motorcycle-card text-white focus:ring-2 focus:ring-motorcycle-yellow"
                  value={formData.eventType}
                  onChange={(e) =>
                    setFormData({ ...formData, eventType: e.target.value })
                  }
                  required
                >
                  <option value="" className="bg-motorcycle-card text-white">Select</option>
                  <option value="Wedding" className="bg-motorcycle-card text-white">Wedding</option>
                  <option value="Corporate" className="bg-motorcycle-card text-white">Corporate</option>
                  <option value="Birthday" className="bg-motorcycle-card text-white">Birthday</option>
                  <option value="Concert" className="bg-motorcycle-card text-white">Concert</option>
                </select>
              </div>
              <div>
                <Label htmlFor="date" className="text-white">Event Date</Label>
                <Input
                  id="date"
                  type="date"
                  className="w-full mt-2 p-2 border border-motorcycle-yellow rounded-lg bg-motorcycle-card text-white focus:ring-2 focus:ring-motorcycle-yellow"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div 
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="guests" className="text-white">Number of Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  placeholder="Number"
                  className="w-full mt-2 p-2 border border-motorcycle-yellow rounded-lg bg-motorcycle-card text-white placeholder:text-white/60 focus:ring-2 focus:ring-motorcycle-yellow"
                  value={formData.guests}
                  onChange={(e) =>
                    setFormData({ ...formData, guests: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="name" className="text-white">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full mt-2 p-2 border border-motorcycle-yellow rounded-lg bg-motorcycle-card text-white placeholder:text-white/60 focus:ring-2 focus:ring-motorcycle-yellow"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  className="w-full mt-2 p-2 border border-motorcycle-yellow rounded-lg bg-motorcycle-card text-white placeholder:text-white/60 focus:ring-2 focus:ring-motorcycle-yellow"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-4 font-semibold text-motorcycle-white">Select Additional Services:</p>
              <div className="grid grid-cols-2 gap-4">
              {["Photography", "Catering", "Decorations", "Music", "Videography", "Entertainment"].map(
                (service) => (
                  <div key={service} className="flex items-center">
                    <Checkbox
                      id={service}
                      checked={formData.services.includes(service)}
                      onCheckedChange={() => toggleService(service)}
                      className="border-motorcycle-yellow"
                    />
                    <Label htmlFor={service} className="ml-2 text-motorcycle-white">
                        {service}
                    </Label>
                  </div>
                )
              )}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 text-center p-6 bg-motorcycle-card rounded-lg border border-motorcycle-yellow card-professional"
            >
              <h2 className="text-2xl font-bold mb-4 text-motorcycle-white">Confirm Your Details</h2>
              <p className="text-motorcycle-white/90">
                <strong className="text-motorcycle-yellow">Event:</strong> {formData.eventType} on {formData.date}
              </p>
              <p className="text-motorcycle-white/90">
                <strong className="text-motorcycle-yellow">Guests:</strong> {formData.guests}
              </p>
              <p className="text-motorcycle-white/90">
                <strong className="text-motorcycle-yellow">Name:</strong> {formData.name} ({formData.email})
              </p>
              <p className="text-motorcycle-white/90">
                <strong className="text-motorcycle-yellow">Services:</strong>{" "}
                {formData.services.length > 0
                  ? formData.services.join(", ")
                  : "None"}
              </p>
               <p className="text-sm text-motorcycle-white/70 pt-4">A team member will be in touch shortly to finalize the details.</p>
            </motion.div>
          )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            {step > 0 ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="button"
                  onClick={back}
                  variant="outline"
                  className="border-2 border-motorcycle-yellow text-motorcycle-white bg-motorcycle-card hover:bg-motorcycle-yellow hover:text-black transition-all duration-300 font-semibold shadow-lg"
                >
                  ← Back
                </Button>
              </motion.div>
            ) : <div></div>}
            {step < steps.length - 1 ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="button"
                  onClick={next}
                  className="ml-auto btn-primary transition-all duration-300 shadow-lg hover:shadow-2xl font-semibold"
                >
                  Next →
                </Button>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  className="ml-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white transition-all duration-300 shadow-lg hover:shadow-2xl font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "✓ Submit Booking"}
                </Button>
              </motion.div>
            )}
          </div>
        </form>
      </motion.div>
    </div>
    </>
  );
}
