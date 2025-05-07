import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Main Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

// Tenant/Owner Pages
import TenantDashboard from "./pages/tenant/Dashboard";
import TenantServices from "./pages/tenant/Services";
import TenantRentals from "./pages/tenant/Rentals";
import TenantFeedback from "./pages/tenant/Feedback";
import ViewRentals from "./pages/tenant/ViewRentals";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAddNotice from "./pages/admin/AddNotice";
import AdminRentalRequests from "./pages/admin/RentalRequests";
import AdminServiceRequests from "./pages/admin/ServiceRequests";
import AdminViewFeedback from "./pages/admin/ViewFeedback";

// Auth Guards
import PrivateRoute from "./components/auth/PrivateRoute";
import AdminRoute from "./components/auth/AdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Tenant/Owner Routes */}
            <Route path="/tenant" element={<PrivateRoute />}>
              <Route path="dashboard" element={<TenantDashboard />} />
              <Route path="services" element={<TenantServices />} />
              <Route path="rentals" element={<TenantRentals />} />
              <Route path="feedback" element={<TenantFeedback />} />
              <Route path="view-rentals" element={<ViewRentals />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="add-notice" element={<AdminAddNotice />} />
              <Route path="rental-requests" element={<AdminRentalRequests />} />
              <Route path="service-requests" element={<AdminServiceRequests />} />
              <Route path="view-feedback" element={<AdminViewFeedback />} />
            </Route>
            
            {/* Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
