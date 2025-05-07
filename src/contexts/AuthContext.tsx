
import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  username: string;
  role: "tenant" | "admin";
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string, role: "tenant" | "admin") => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("ava_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string, role: "tenant" | "admin"): Promise<boolean> => {
    // Mock login - in a real app, this would make an API call
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, any username/password will work
      // In a real app, validate credentials against backend
      const user: User = {
        id: `user-${Date.now()}`,
        username,
        role
      };
      
      setUser(user);
      localStorage.setItem("ava_user", JSON.stringify(user));
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ava_user");
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin"
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
