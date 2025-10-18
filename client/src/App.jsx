import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ThemeProvider } from "./components/ThemeProvider";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

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

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Pages with Header & Footer */}
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                <Header />
                <main>
                  <HomePage />
                </main>
                <Footer />
              </div>
            }
          />
          <Route
            path="/services"
            element={
              <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                <Header />
                <main>
                  <ServicesPage />
                </main>
                <Footer />
              </div>
            }
          />
          <Route
            path="/gallery"
            element={
              <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                <Header />
                <main>
                  <UsersGalleryPage />
                </main>
                <Footer />
              </div>
            }
          />
          <Route
            path="/contact"
            element={
              <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                <Header />
                <main>
                  <ContactPage />
                </main>
                <Footer />
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                <Header />
                <main>
                  <AboutPage />
                </main>
                <Footer />
              </div>
            }
          />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes WITHOUT Header & Footer */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="upload" element={<UploadImagesPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="media" element={<MediaLibraryPage />} />
            <Route path="content" element={<ContentManagementPage />} />
            <Route path="settings" element={<SiteSettingsPage />} />
            <Route path="password" element={<ChangePasswordPage />} />
            <Route path="users" element={<AdminManagementPage />} />
          </Route>

          {/* Redirect legacy preview_page.html */}
          <Route
            path="/preview_page.html"
            element={<Navigate to="/" replace />}
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
