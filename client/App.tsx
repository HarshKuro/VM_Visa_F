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
import AgentProfileView from "./pages/AgentProfileView";
import AgentProfileEdit from "./pages/AgentProfileEdit";
import UserProfileView from "./pages/UserProfileView";
import UserProfileEdit from "./pages/UserProfileEdit";
import Services from "./pages/Services";
import StudentVisa from "./pages/StudentVisa";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrganizationProfileWizard from "./pages/OrganizationProfileWizard";
import OrganizationDashboard from "./pages/OrganizationDashboard";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "./contexts/UserContext";
import {
  ClientGuard,
  AgentGuard,
  OrganizationGuard,
} from "./components/RoleGuard";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/client" element={<ClientSignup />} />
          <Route path="/signup/agent" element={<AgentSignup />} />
          <Route path="/signup/organization" element={<OrganizationSignup />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/student-visa" element={<StudentVisa />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Client-Only Routes */}
          <Route
            path="/client-dashboard"
            element={
              <ClientGuard>
                <ClientDashboard />
              </ClientGuard>
            }
          />
          <Route
            path="/user-profile-view"
            element={
              <ClientGuard>
                <UserProfileView />
              </ClientGuard>
            }
          />
          <Route
            path="/user-profile-edit"
            element={
              <ClientGuard>
                <UserProfileEdit />
              </ClientGuard>
            }
          />

          {/* Agent-Only Routes */}
          <Route
            path="/agent-profile-completion"
            element={
              <AgentGuard>
                <AgentProfileCompletion />
              </AgentGuard>
            }
          />
          <Route
            path="/agent-profile-step1"
            element={
              <AgentGuard>
                <AgentProfileStep1 />
              </AgentGuard>
            }
          />
          <Route
            path="/agent-profile-step2"
            element={
              <AgentGuard>
                <AgentProfileStep2 />
              </AgentGuard>
            }
          />
          <Route
            path="/agent-profile-step3"
            element={
              <AgentGuard>
                <AgentProfileStep3 />
              </AgentGuard>
            }
          />
          <Route
            path="/agent-profile-step4"
            element={
              <AgentGuard>
                <AgentProfileStep4 />
              </AgentGuard>
            }
          />
          <Route
            path="/agent-dashboard"
            element={
              <AgentGuard>
                <AgentDashboard />
              </AgentGuard>
            }
          />
          <Route
            path="/agent-profile-view"
            element={
              <AgentGuard>
                <AgentProfileView />
              </AgentGuard>
            }
          />
          <Route
            path="/agent-profile-edit"
            element={
              <AgentGuard>
                <AgentProfileEdit />
              </AgentGuard>
            }
          />

          {/* Organization-Only Routes */}
          <Route
            path="/organization-profile-wizard"
            element={
              <OrganizationGuard>
                <OrganizationProfileWizard />
              </OrganizationGuard>
            }
          />
          <Route
            path="/organization-dashboard"
            element={
              <OrganizationGuard>
                <OrganizationDashboard />
              </OrganizationGuard>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
