
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useFeedback } from "@/hooks/api";

const AdminViewFeedback = () => {
  const navigate = useNavigate();
  const { feedback } = useFeedback();

  return (
    <div className="min-h-screen bg-ava-bgLight">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-ava-purple">Feedback</h1>
              <p className="text-gray-600">View resident feedback and suggestions</p>
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
          <h2 className="text-xl font-semibold mb-6 text-ava-deepPurple">Resident Feedback</h2>
          
          {feedback.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No feedback submitted yet</p>
          ) : (
            <div className="space-y-6">
              {feedback.map(item => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-ava-deepPurple">
                          Feedback from Flat {item.flatNumber}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Submitted by: {item.submittedBy} • 
                          {format(new Date(item.timestamp), " MMMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-line">{item.feedbackText}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminViewFeedback;
