import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ManageAccountsPage } from './pages/ManageAccountsPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { ActivityFormPage } from './pages/ActivityFormPage';
import { ActivityDetailPage } from './pages/ActivityDetailPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { DocumentPreviewPage } from './pages/DocumentPreviewPage';
import { DocumentDistributionPage } from './pages/DocumentDistributionPage';
import { FileManagementPage } from './pages/FileManagementPage';
import { AMIRecapPage } from './pages/AMIRecapPage';
import { AMIActivityDetailPage } from './pages/AMIActivityDetailPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { Toaster } from './components/ui/sonner';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect administrator to manage-accounts (no dashboard for admin)
  // But only if they ONLY have administrator role (no other roles)
  if (user.roles.includes('administrator') && user.roles.length === 1 && window.location.pathname === '/dashboard') {
    return <Navigate to="/manage-accounts" replace />;
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-accounts"
        element={
          <ProtectedRoute>
            <ManageAccountsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/activities"
        element={
          <ProtectedRoute>
            <ActivitiesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/activities/new"
        element={
          <ProtectedRoute>
            <ActivityFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/activities/:id/edit"
        element={
          <ProtectedRoute>
            <ActivityFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/activities/:id"
        element={
          <ProtectedRoute>
            <ActivityDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents"
        element={
          <ProtectedRoute>
            <DocumentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents/:id/preview"
        element={
          <ProtectedRoute>
            <DocumentPreviewPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/document-distribution"
        element={
          <ProtectedRoute>
            <DocumentDistributionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/file-management"
        element={
          <ProtectedRoute>
            <FileManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ami-recap"
        element={
          <ProtectedRoute>
            <AMIRecapPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ami-recap/activity/:id"
        element={
          <ProtectedRoute>
            <AMIActivityDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function AppWithProviders() {
  const { user } = useAuth();

  return (
    <NotificationProvider userRoles={user?.roles}>
      <AppRoutes />
      <Toaster />
    </NotificationProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppWithProviders />
      </AuthProvider>
    </BrowserRouter>
  );
}
