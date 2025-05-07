
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useSubmitRentalListing, useSubmitRentalQuery } from "@/hooks/api";

const TenantRentals = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const submitListing = useSubmitRentalListing();
  const submitQuery = useSubmitRentalQuery();
  
  // Listing form state
  const [flatNumber, setFlatNumber] = useState("");
  const [flatCode, setFlatCode] = useState("");
  const [expectedRent, setExpectedRent] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isSubmittingListing, setIsSubmittingListing] = useState(false);
  
  // Query form state
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [facing, setFacing] = useState("");
  const [budget, setBudget] = useState("");
  const [type, setType] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [isSubmittingQuery, setIsSubmittingQuery] = useState(false);
  
  const handleListingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!flatNumber || !flatCode || !expectedRent || !contactNumber) {
      toast({
        title: "Error",
        description: "Please fill all the required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmittingListing(true);
    
    try {
      await submitListing({
        flatNumber,
        flatCode,
        expectedRent: parseFloat(expectedRent),
        contactNumber,
        listedBy: user?.username || "Unknown"
      });
      
      toast({
        title: "Success",
        description: "Your flat has been listed for rent successfully",
      });
      
      // Reset form
      setFlatNumber("");
      setFlatCode("");
      setExpectedRent("");
      setContactNumber("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to list your flat. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingListing(false);
    }
  };
  
  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !size || !facing || !budget || !type || !contactEmail) {
      toast({
        title: "Error",
        description: "Please fill all the required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmittingQuery(true);
    
    try {
      await submitQuery({
        name,
        size,
        facing,
        budget,
        type,
        contactEmail,
        requestedBy: user?.username || "Unknown"
      });
      
      toast({
        title: "Success",
        description: "Your rental query has been submitted successfully",
      });
      
      // Reset form
      setName("");
      setSize("");
      setFacing("");
      setBudget("");
      setType("");
      setContactEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit rental query. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingQuery(false);
    }
  };

  return (
    <div className="min-h-screen bg-ava-bgLight">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-ava-purple">Rentals</h1>
              <p className="text-gray-600">List or find rental properties</p>
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

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs defaultValue="list">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="list">List Your Flat</TabsTrigger>
              <TabsTrigger value="query">Rental Query</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              <h2 className="text-xl font-semibold mb-6 text-ava-deepPurple">Enlist Your Flat for Rent</h2>
              <form onSubmit={handleListingSubmit} className="space-y-4">
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
                  <Label htmlFor="flatCode">Flat Code (Secret Key)</Label>
                  <Input
                    id="flatCode"
                    type="password"
                    placeholder="Enter your flat code"
                    value={flatCode}
                    onChange={(e) => setFlatCode(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expectedRent">Expected Monthly Rent (₹)</Label>
                  <Input
                    id="expectedRent"
                    type="number"
                    placeholder="Enter expected rent"
                    value={expectedRent}
                    onChange={(e) => setExpectedRent(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    placeholder="Enter your contact number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-ava-purple hover:bg-ava-deepPurple"
                  disabled={isSubmittingListing}
                >
                  {isSubmittingListing ? "Submitting..." : "List Your Flat"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="query">
              <h2 className="text-xl font-semibold mb-6 text-ava-deepPurple">Submit a Rental Query</h2>
              <form onSubmit={handleQuerySubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="size">Size</Label>
                  <Select onValueChange={setSize} value={size}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select flat size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1BHK">1 BHK</SelectItem>
                      <SelectItem value="2BHK">2 BHK</SelectItem>
                      <SelectItem value="3BHK">3 BHK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="facing">Facing</Label>
                  <Select onValueChange={setFacing} value={facing}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="North">North</SelectItem>
                      <SelectItem value="South">South</SelectItem>
                      <SelectItem value="East">East</SelectItem>
                      <SelectItem value="West">West</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (₹)</Label>
                  <Input
                    id="budget"
                    placeholder="Enter your budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select onValueChange={setType} value={type}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select furnishing type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SemiFurnished">Semi Furnished</SelectItem>
                      <SelectItem value="FullyFurnished">Fully Furnished</SelectItem>
                      <SelectItem value="UltraFurnished">Ultra Furnished</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="Enter your email address"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-ava-purple hover:bg-ava-deepPurple"
                  disabled={isSubmittingQuery}
                >
                  {isSubmittingQuery ? "Submitting..." : "Submit Query"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default TenantRentals;
