
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAddNotice } from "@/hooks/api";

const AdminAddNotice = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const addNotice = useAddNotice();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content) {
      toast({
        title: "Error",
        description: "Please fill all the required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await addNotice({
        title,
        content,
        date: new Date().toISOString()
      });
      
      toast({
        title: "Success",
        description: "Notice has been added successfully",
      });
      
      navigate("/admin/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add notice. Please try again.",
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
              <h1 className="text-2xl font-bold text-ava-purple">Add Notice</h1>
              <p className="text-gray-600">Post updates for society members</p>
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

      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-ava-deepPurple">Create New Notice</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Notice Title</Label>
              <Input
                id="title"
                placeholder="Enter notice title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Notice Content</Label>
              <Textarea
                id="content"
                placeholder="Enter notice content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate("/admin/dashboard")}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-ava-purple hover:bg-ava-deepPurple"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Post Notice"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminAddNotice;
