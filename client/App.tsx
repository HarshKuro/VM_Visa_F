import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ClientSignup from "./pages/ClientSignup";
import AgentSignup from "./pages/AgentSignup";
import OrganizationSignup from "./pages/OrganizationSignup";
import ClientDashboard from "./pages/ClientDashboard";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/client" element={<ClientSignup />} />
        <Route path="/signup/agent" element={<AgentSignup />} />
        <Route path="/signup/organization" element={<OrganizationSignup />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
