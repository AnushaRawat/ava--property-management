
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSubmitServiceRequest } from "@/hooks/api";

const serviceTypes = [
  { value: "plumbing", label: "Plumbing" },
  { value: "ac_fridge", label: "AC/Fridge Repair" },
  { value: "appliance", label: "Appliance Repair" },
  { value: "mason", label: "Mason Work" },
  { value: "carpenter", label: "Carpenter" }
];

const TenantServices = () => {
  const [flatNumber, setFlatNumber] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const submitRequest = useSubmitServiceRequest();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!flatNumber || !serviceType || !date || !timeSlot) {
      toast({
        title: "Error",
        description: "Please fill all the required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await submitRequest({
        flatNumber,
        serviceType, 
        date: date.toISOString(),
        timeSlot,
        requestedBy: user?.username || "Unknown"
      });
      
      toast({
        title: "Success",
        description: "Your service request has been submitted successfully",
      });
      
      navigate("/tenant/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit service request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ava-bgLight">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-ava-purple">Services</h1>
              <p className="text-gray-600">Request maintenance and repairs</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate("/tenant/dashboard")}
              className="border-ava-purple text-ava-purple hover:bg-ava-purple hover:text-white"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-ava-deepPurple">Request a Service</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type</Label>
              <Select onValueChange={setServiceType} value={serviceType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="flatNumber">Flat Number</Label>
              <Input
                id="flatNumber"
                placeholder="Enter your flat number"
                value={flatNumber}
                onChange={(e) => setFlatNumber(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Preferred Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeSlot">Preferred Time</Label>
              <Select onValueChange={setTimeSlot} value={timeSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12PM - 3PM)</SelectItem>
                  <SelectItem value="evening">Evening (3PM - 6PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-ava-purple hover:bg-ava-deepPurple"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TenantServices;
