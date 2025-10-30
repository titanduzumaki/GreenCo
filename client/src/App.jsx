import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PageTransition } from "./components/PageTransition";

// Pages
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { ContactPage } from "./pages/ContactPage";
import { AboutPage } from "./pages/AboutPage";
import Login from "./pages/Login";

// Admin
import AdminLayout from "./components/AdminLayout";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { MediaLibraryPage } from "./pages/admin/MediaLibraryPage";
import UploadImagesPage from "./pages/admin/UploadImagesPage";
import { ContentManagementPage } from "./pages/admin/ContentManagementPage";
import { SiteSettingsPage } from "./pages/admin/SiteSettingsPage";
import { ChangePasswordPage } from "./pages/admin/ChangePasswordPage";
import AdminManagementPage from "./pages/admin/AdminManagementPage";
import { UsersGalleryPage } from "./pages/GalleryPage";
import GalleryPage from "./pages/admin/GalleryPage";

import { Toaster } from "sonner";
import { useAuthStore } from "./store/authStore";
import PageLoader from "./components/PageLoader";

export default function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PublicWrapper>
                <HomePage />
              </PublicWrapper>
            }
          />
          <Route
            path="/services"
            element={
              <PublicWrapper>
                <ServicesPage />
              </PublicWrapper>
            }
          />
          <Route
            path="/gallery"
            element={
              <PublicWrapper>
                <UsersGalleryPage />
              </PublicWrapper>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicWrapper>
                <ContactPage />
              </PublicWrapper>
            }
          />
          <Route
            path="/about"
            element={
              <PublicWrapper>
                <AboutPage />
              </PublicWrapper>
            }
          />

          {/*Auth Routes */}
          <Route
            path="/login"
            element={authUser ? <Navigate to="/admin" /> : <Login />}
          />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/*"
            element={
              authUser ? <AdminLayout /> : <Navigate to="/login" replace />
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="upload" element={<UploadImagesPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="media" element={<MediaLibraryPage />} />
            <Route path="content" element={<ContentManagementPage />} />
            <Route path="settings" element={<SiteSettingsPage />} />
            <Route path="password" element={<ChangePasswordPage />} />
            <Route path="users" element={<AdminManagementPage />} />
          </Route>

          {/* Redirect legacy URL */}
          <Route
            path="/preview_page.html"
            element={<Navigate to="/" replace />}
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* <Toaster /> */}
      </Router>
    </ThemeProvider>
  );
}

// Reusable Public Layout Wrapper (for Header + Footer)
function PublicWrapper({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
