
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNotices } from "@/hooks/api";

const TenantDashboard = () => {
  const { user, logout } = useAuth();
  const { notices } = useNotices();

  return (
    <div className="min-h-screen bg-ava-bgLight">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-ava-purple">AVA Society</h1>
            <p className="text-gray-600">Hi, {user?.username}</p>
          </div>
          <Button 
            variant="outline"
            onClick={logout}
            className="border-ava-purple text-ava-purple hover:bg-ava-purple hover:text-white"
          >
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Notices & Events</CardTitle>
                <CardDescription>Latest updates from the society</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notices.length > 0 ? (
                    notices.map((notice) => (
                      <div key={notice.id} className="border rounded-lg p-4 bg-white">
                        <h3 className="font-semibold text-lg text-ava-deepPurple">{notice.title}</h3>
                        <p className="text-gray-600 text-sm">{new Date(notice.date).toLocaleDateString()}</p>
                        <Separator className="my-2" />
                        <p>{notice.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No notices at the moment</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Access society services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Link to="/tenant/services">
                    <Button className="w-full bg-ava-purple hover:bg-ava-deepPurple">
                      Request Services
                    </Button>
                  </Link>
                  <Link to="/tenant/rentals">
                    <Button className="w-full bg-ava-purple hover:bg-ava-deepPurple">
                      Rental Information
                    </Button>
                  </Link>
                  <Link to="/tenant/view-rentals">
                    <Button className="w-full bg-ava-purple hover:bg-ava-deepPurple">
                      View Rental Options
                    </Button>
                  </Link>
                  <Link to="/tenant/feedback">
                    <Button className="w-full bg-ava-purple hover:bg-ava-deepPurple">
                      Submit Feedback
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TenantDashboard;
