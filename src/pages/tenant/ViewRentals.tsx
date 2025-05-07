
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const ViewRentals = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const rentalListings = JSON.parse(localStorage.getItem("ava_rental_listings") || "[]");

  return (
    <div className="min-h-screen bg-ava-bgLight">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-ava-purple">Available Rentals</h1>
              <p className="text-gray-600">Browse rental options in our society</p>
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

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6">
          {rentalListings.length > 0 ? (
            rentalListings.map((listing: any) => (
              <Card key={listing.id}>
                <CardHeader>
                  <CardTitle>Flat {listing.flatNumber}</CardTitle>
                  <CardDescription>Monthly Rent: ₹{listing.expectedRent}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Contact:</span> {listing.contactNumber}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-gray-500">No rental listings available at the moment</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default ViewRentals;
