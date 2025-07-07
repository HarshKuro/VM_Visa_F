import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser, UserRole } from "@/contexts/UserContext";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export default function RoleGuard({
  children,
  allowedRoles,
  redirectTo = "/login",
}: RoleGuardProps) {
  const { user, isAuthenticated } = useUser();
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If user role is not in allowed roles, redirect to appropriate dashboard
  if (!allowedRoles.includes(user?.role || null)) {
    // Redirect based on user role
    const redirectPath =
      user?.role === "agent"
        ? "/agent-dashboard"
        : user?.role === "organization"
          ? "/organization-dashboard"
          : "/client-dashboard";

    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}

// Convenience components for specific roles
export function ClientGuard({ children }: { children: ReactNode }) {
  return <RoleGuard allowedRoles={["client"]}>{children}</RoleGuard>;
}

export function AgentGuard({ children }: { children: ReactNode }) {
  return <RoleGuard allowedRoles={["agent"]}>{children}</RoleGuard>;
}

export function OrganizationGuard({ children }: { children: ReactNode }) {
  return <RoleGuard allowedRoles={["organization"]}>{children}</RoleGuard>;
}
