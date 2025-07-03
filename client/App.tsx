import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ClientSignup from "./pages/ClientSignup";
import AgentSignup from "./pages/AgentSignup";
import OrganizationSignup from "./pages/OrganizationSignup";
import ClientDashboard from "./pages/ClientDashboard";
import AgentProfileCompletion from "./pages/AgentProfileCompletion";
import AgentProfileStep1 from "./pages/AgentProfileStep1";
import AgentProfileStep2 from "./pages/AgentProfileStep2";
import AgentProfileStep3 from "./pages/AgentProfileStep3";
import AgentProfileStep4 from "./pages/AgentProfileStep4";
import AgentDashboard from "./pages/AgentDashboard";
import Services from "./pages/Services";
import StudentVisa from "./pages/StudentVisa";
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
        <Route
          path="/agent-profile-completion"
          element={<AgentProfileCompletion />}
        />
        <Route path="/agent-profile-step1" element={<AgentProfileStep1 />} />
        <Route path="/agent-profile-step2" element={<AgentProfileStep2 />} />
        <Route path="/agent-profile-step3" element={<AgentProfileStep3 />} />
        <Route path="/agent-profile-step4" element={<AgentProfileStep4 />} />
        <Route path="/agent-dashboard" element={<AgentDashboard />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/student-visa" element={<StudentVisa />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
