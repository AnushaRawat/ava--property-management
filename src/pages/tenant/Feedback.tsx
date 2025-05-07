
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useSubmitFeedback } from "@/hooks/api";

const TenantFeedback = () => {
  const [flatNumber, setFlatNumber] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const submitFeedback = useSubmitFeedback();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!flatNumber || !feedback) {
      toast({
        title: "Error",
        description: "Please fill all the required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await submitFeedback({
        flatNumber,
        feedbackText: feedback,
        submittedBy: user?.username || "Unknown",
        timestamp: new Date().toISOString()
      });
      
      toast({
        title: "Success",
        description: "Your feedback has been submitted successfully",
      });
      
      navigate("/tenant/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
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
              <h1 className="text-2xl font-bold text-ava-purple">Feedback</h1>
              <p className="text-gray-600">Share your suggestions or concerns</p>
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
          <h2 className="text-xl font-semibold mb-6 text-ava-deepPurple">Submit Feedback</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Enter your feedback, suggestions, or concerns"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[150px]"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-ava-purple hover:bg-ava-deepPurple"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TenantFeedback;
