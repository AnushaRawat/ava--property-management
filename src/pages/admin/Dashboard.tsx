
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-ava-bgLight">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-ava-purple">AVA Society - Admin</h1>
            <p className="text-gray-600">Welcome, {user?.username}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Add Notice</CardTitle>
              <CardDescription>Post updates for residents</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin/add-notice">
                <Button className="w-full bg-ava-purple hover:bg-ava-deepPurple">
                  Manage Notices
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Rental Requests</CardTitle>
              <CardDescription>Manage rental queries</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin/rental-requests">
                <Button className="w-full bg-ava-purple hover:bg-ava-deepPurple">
                  View Requests
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Service Requests</CardTitle>
              <CardDescription>Handle maintenance requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin/service-requests">
                <Button className="w-full bg-ava-purple hover:bg-ava-deepPurple">
                  View Requests
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
              <CardDescription>View resident feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin/view-feedback">
                <Button className="w-full bg-ava-purple hover:bg-ava-deepPurple">
                  View Feedback
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
