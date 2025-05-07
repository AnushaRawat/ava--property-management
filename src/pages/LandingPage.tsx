
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-ava-bgLight to-white">
      {/* Hero Section with Background Image */}
      <div 
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-6xl font-bold mb-4 text-white tracking-tight">
            <span className="text-ava-lightPurple">AVA</span> Society
          </h1>
          <p className="text-xl text-white mb-8">Modern living, simplified management</p>
          <Link to="/login">
            <Button className="bg-ava-purple hover:bg-ava-deepPurple text-white px-8 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105">
              Login to Portal
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Login Button in Top Corner */}
      <div className="absolute top-4 right-4">
        <Link to="/login">
          <Button className="bg-white hover:bg-ava-bgLight text-ava-purple hover:text-ava-deepPurple border border-ava-purple px-4 py-2 rounded-md transition duration-200">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
