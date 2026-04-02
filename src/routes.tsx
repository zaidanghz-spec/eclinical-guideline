import { createBrowserRouter, Outlet } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "sonner";
import { ProtectedRoute } from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { PublicRoute } from "./components/PublicRoute";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import AnamnesisPage from "./pages/AnamnesisPage";
import GuidedAnamnesisPage from "./pages/GuidedAnamnesisPage";
import OrganSystemPage from "./pages/OrganSystemPage";
import EmergencyPage from "./pages/EmergencyPage";
import PathwayPage from "./pages/PathwayPage";
import PathwayChecklistPage from "./pages/PathwayChecklistPage";
import PathwayListPage from "./pages/PathwayListPage";
import DynamicPathwayPage from "./pages/DynamicPathwayPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import PathwayHistoryPage from "./pages/PathwayHistoryPage";
import { WhitelistPage } from "./pages/WhitelistPage";
import NotFound from "./pages/NotFound";

function RootErrorBoundary() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-red-200 p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <h1 className="text-2xl text-gray-900 mb-2">Something went wrong</h1>
        <p className="text-gray-600 text-sm mb-6">An unexpected error occurred. Please try again.</p>
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full px-4 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            Refresh Page
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/login';
            }}
            className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear Cache & Login
          </button>
        </div>
      </div>
    </div>
  );
}

function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "landing",
        element: (
          <ProtectedRoute>
            <LandingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "anamnesis",
        element: (
          <ProtectedRoute>
            <AnamnesisPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "anamnesis-guided",
        element: (
          <ProtectedRoute>
            <GuidedAnamnesisPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "pathways",
        element: (
          <ProtectedRoute>
            <PathwayListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "pathway-checklist/:diseaseId",
        element: (
          <ProtectedRoute>
            <PathwayChecklistPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "pathway-dynamic/:diseaseId",
        element: (
          <ProtectedRoute>
            <DynamicPathwayPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "organ-system",
        element: (
          <ProtectedRoute>
            <OrganSystemPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "emergency",
        element: (
          <ProtectedRoute>
            <EmergencyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "pathway/:diseaseId",
        element: (
          <ProtectedRoute>
            <PathwayPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin-dashboard",
        element: (
          <AdminRoute>
            <AdminDashboardPage />
          </AdminRoute>
        ),
      },
      {
        path: "history",
        element: (
          <ProtectedRoute>
            <PathwayHistoryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "whitelist",
        element: (
          <ProtectedRoute>
            <AdminRoute>
              <WhitelistPage />
            </AdminRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);