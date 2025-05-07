
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useRentalRequests, useMarkRentalRequestHandled } from "@/hooks/api";

const AdminRentalRequests = () => {
  const navigate = useNavigate();
  const { rentalQueries, rentalListings } = useRentalRequests();
  const markHandled = useMarkRentalRequestHandled();

  const handleMarkAsHandled = async (id: string, type: 'query' | 'listing') => {
    try {
      await markHandled(id, type);
    } catch (error) {
      console.error("Failed to mark request as handled:", error);
    }
  };

  return (
    <div className="min-h-screen bg-ava-bgLight">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-ava-purple">Rental Requests</h1>
              <p className="text-gray-600">Manage rental queries and listings</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate("/admin/dashboard")}
              className="border-ava-purple text-ava-purple hover:bg-ava-purple hover:text-white"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Tabs defaultValue="queries" className="bg-white rounded-lg shadow-md p-6">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="queries">Rental Queries</TabsTrigger>
            <TabsTrigger value="listings">Rental Listings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="queries">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-ava-deepPurple">Active Rental Queries</h2>
              
              {rentalQueries.filter(q => !q.handled).length === 0 ? (
                <p className="text-gray-500 text-center py-4">No active rental queries at the moment</p>
              ) : (
                <div className="space-y-4">
                  {rentalQueries
                    .filter(query => !query.handled)
                    .map(query => (
                      <Card key={query.id} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg text-ava-deepPurple">{query.name}</h3>
                              <p className="text-gray-500 text-sm">Requested by: {query.requestedBy}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id={`handled-${query.id}`} 
                                onCheckedChange={() => handleMarkAsHandled(query.id, 'query')}
                              />
                              <label htmlFor={`handled-${query.id}`} className="text-sm font-medium">
                                Mark as Handled
                              </label>
                            </div>
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Flat Size</p>
                              <p>{query.size}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Facing</p>
                              <p>{query.facing}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Budget</p>
                              <p>₹{query.budget}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Type</p>
                              <p>{query.type}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <p className="text-sm font-medium text-gray-500">Contact Email</p>
                            <p>{query.contactEmail}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
              
              {rentalQueries.filter(q => q.handled).length > 0 && (
                <>
                  <h2 className="text-xl font-semibold text-ava-deepPurple mt-8">Handled Rental Queries</h2>
                  <div className="space-y-4">
                    {rentalQueries
                      .filter(query => query.handled)
                      .map(query => (
                        <Card key={query.id} className="overflow-hidden opacity-75">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-lg text-ava-deepPurple">{query.name}</h3>
                                <p className="text-gray-500 text-sm">Requested by: {query.requestedBy}</p>
                              </div>
                              <Badge variant="outline" className="bg-gray-100">Handled</Badge>
                            </div>
                            
                            <Separator className="my-4" />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-gray-500">Flat Size</p>
                                <p>{query.size}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Facing</p>
                                <p>{query.facing}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Budget</p>
                                <p>₹{query.budget}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Type</p>
                                <p>{query.type}</p>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <p className="text-sm font-medium text-gray-500">Contact Email</p>
                              <p>{query.contactEmail}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="listings">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-ava-deepPurple">Active Rental Listings</h2>
              
              {rentalListings.filter(l => !l.handled).length === 0 ? (
                <p className="text-gray-500 text-center py-4">No active rental listings at the moment</p>
              ) : (
                <div className="space-y-4">
                  {rentalListings
                    .filter(listing => !listing.handled)
                    .map(listing => (
                      <Card key={listing.id} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg text-ava-deepPurple">Flat {listing.flatNumber}</h3>
                              <p className="text-gray-500 text-sm">Listed by: {listing.listedBy}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id={`handled-${listing.id}`} 
                                onCheckedChange={() => handleMarkAsHandled(listing.id, 'listing')}
                              />
                              <label htmlFor={`handled-${listing.id}`} className="text-sm font-medium">
                                Mark as Handled
                              </label>
                            </div>
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Expected Rent</p>
                              <p>₹{listing.expectedRent}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Contact Number</p>
                              <p>{listing.contactNumber}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
              
              {rentalListings.filter(l => l.handled).length > 0 && (
                <>
                  <h2 className="text-xl font-semibold text-ava-deepPurple mt-8">Handled Rental Listings</h2>
                  <div className="space-y-4">
                    {rentalListings
                      .filter(listing => listing.handled)
                      .map(listing => (
                        <Card key={listing.id} className="overflow-hidden opacity-75">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-lg text-ava-deepPurple">Flat {listing.flatNumber}</h3>
                                <p className="text-gray-500 text-sm">Listed by: {listing.listedBy}</p>
                              </div>
                              <Badge variant="outline" className="bg-gray-100">Handled</Badge>
                            </div>
                            
                            <Separator className="my-4" />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-gray-500">Expected Rent</p>
                                <p>₹{listing.expectedRent}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Contact Number</p>
                                <p>{listing.contactNumber}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminRentalRequests;
