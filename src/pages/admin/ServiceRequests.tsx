
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useServiceRequests, useMarkServiceRequestHandled } from "@/hooks/api";

const AdminServiceRequests = () => {
  const navigate = useNavigate();
  const { serviceRequests } = useServiceRequests();
  const markHandled = useMarkServiceRequestHandled();

  const getServiceLabel = (type: string) => {
    const types: Record<string, string> = {
      plumbing: "Plumbing",
      ac_fridge: "AC/Fridge Repair",
      appliance: "Appliance Repair",
      mason: "Mason Work",
      carpenter: "Carpenter"
    };
    return types[type] || type;
  };

  const getTimeSlotLabel = (slot: string) => {
    const slots: Record<string, string> = {
      morning: "Morning (9AM - 12PM)",
      afternoon: "Afternoon (12PM - 3PM)",
      evening: "Evening (3PM - 6PM)"
    };
    return slots[slot] || slot;
  };

  const handleMarkAsHandled = async (id: string) => {
    try {
      await markHandled(id);
    } catch (error) {
      console.error("Failed to mark request as handled:", error);
    }
  };

  const activeRequests = serviceRequests.filter(request => !request.handled);
  const handledRequests = serviceRequests.filter(request => request.handled);

  return (
    <div className="min-h-screen bg-ava-bgLight">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-ava-purple">Service Requests</h1>
              <p className="text-gray-600">Manage maintenance and repair requests</p>
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-ava-deepPurple">Active Service Requests</h2>
          
          {activeRequests.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No active service requests at the moment</p>
          ) : (
            <div className="space-y-4">
              {activeRequests.map(request => (
                <Card key={request.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-ava-deepPurple">
                          {getServiceLabel(request.serviceType)}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Requested by: {request.requestedBy} (Flat {request.flatNumber})
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`handled-${request.id}`} 
                          onCheckedChange={() => handleMarkAsHandled(request.id)}
                        />
                        <label htmlFor={`handled-${request.id}`} className="text-sm font-medium">
                          Mark as Handled
                        </label>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Preferred Date</p>
                        <p>{format(new Date(request.date), "MMMM d, yyyy")}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Preferred Time</p>
                        <p>{getTimeSlotLabel(request.timeSlot)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {handledRequests.length > 0 && (
            <>
              <h2 className="text-xl font-semibold text-ava-deepPurple mt-8">Handled Service Requests</h2>
              <div className="space-y-4 mt-4">
                {handledRequests.map(request => (
                  <Card key={request.id} className="overflow-hidden opacity-75">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg text-ava-deepPurple">
                            {getServiceLabel(request.serviceType)}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            Requested by: {request.requestedBy} (Flat {request.flatNumber})
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-gray-100">Handled</Badge>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Preferred Date</p>
                          <p>{format(new Date(request.date), "MMMM d, yyyy")}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Preferred Time</p>
                          <p>{getTimeSlotLabel(request.timeSlot)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminServiceRequests;
