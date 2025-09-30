
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import TopNavbar from "@/components/TopNavbar";
import { useToast } from "@/hooks/use-toast";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">Book Your Event</h1>

        {/* Step Indicators */}
        <div className="flex justify-between mb-8">
          {steps.map((label, i) => (
            <div
              key={i}
              className={`flex-1 text-center text-sm ${
                i <= step ? "font-bold text-primary" : "text-gray-500"
              }`}
            >
              {label}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1 mb-8">
            <div className="bg-primary h-1 rounded-full" style={{ width: `${((step) / (steps.length - 1)) * 100}%` }}></div>
        </div>


        {/* Form Steps */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="eventType">Event Type</Label>
                <select
                  id="eventType"
                  className="w-full mt-2 p-2 border rounded-lg"
                  value={formData.eventType}
                  onChange={(e) =>
                    setFormData({ ...formData, eventType: e.target.value })
                  }
                  required
                >
                  <option value="">Select</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Concert">Concert</option>
                </select>
              </div>
              <div>
                <Label htmlFor="date">Event Date</Label>
                <Input
                  id="date"
                  type="date"
                  className="w-full mt-2 p-2 border rounded-lg"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="guests">Number of Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  placeholder="e.g. 150"
                  className="w-full mt-2 p-2 border rounded-lg"
                  value={formData.guests}
                  onChange={(e) =>
                    setFormData({ ...formData, guests: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full mt-2 p-2 border rounded-lg"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full mt-2 p-2 border rounded-lg"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="mb-4 font-semibold">Select Additional Services:</p>
              <div className="grid grid-cols-2 gap-4">
              {["Photography", "Catering", "Decorations", "Music", "Videography", "Entertainment"].map(
                (service) => (
                  <div key={service} className="flex items-center">
                    <Checkbox
                      id={service}
                      checked={formData.services.includes(service)}
                      onCheckedChange={() => toggleService(service)}
                    />
                    <Label htmlFor={service} className="ml-2">
                        {service}
                    </Label>
                  </div>
                )
              )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center p-6 bg-gray-100 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Confirm Your Details</h2>
              <p>
                <strong>Event:</strong> {formData.eventType} on {formData.date}
              </p>
              <p>
                <strong>Guests:</strong> {formData.guests}
              </p>
              <p>
                <strong>Name:</strong> {formData.name} ({formData.email})
              </p>
              <p>
                <strong>Services:</strong>{" "}
                {formData.services.length > 0
                  ? formData.services.join(", ")
                  : "None"}
              </p>
               <p className="text-sm text-gray-500 pt-4">A team member will be in touch shortly to finalize the details.</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            {step > 0 ? (
              <Button
                type="button"
                onClick={back}
                variant="outline"
              >
                Back
              </Button>
            ) : <div></div>}
            {step < steps.length - 1 ? (
              <Button
                type="button"
                onClick={next}
                className="ml-auto"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="ml-auto bg-green-600 hover:bg-green-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Booking"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
