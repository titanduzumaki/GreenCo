import { useState, useEffect, createContext } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import { MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";

import {
  LayoutDashboard,
  Image,
  FileText,
  Settings,
  Users,
  Lock,
  Menu,
  X,
  LogOut,
  User,
  Upload,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Avatar, AvatarFallback } from "./ui/avatar";
import { useAuthStore } from "@/store/authStore";

export const UnreadContext = createContext();

export default function AdminLayout() {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const { logout, authUser } = useAuthStore();

  // Fetch unread messages for sidebar
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await axios.get(
          "https://greenco-jmk5.onrender.com/api/msg/contacts"
        );
        const unread = res.data.filter((msg) => !msg.read).length;
        setUnreadCount(unread);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/upload", label: "Upload Images", icon: Upload },
    { path: "/admin/gallery", label: "Gallery", icon: Image },
    { path: "/admin/content", label: "Content", icon: FileText },
    { path: "/admin/settings", label: "Settings", icon: Settings },
    { path: "/admin/users", label: "Admin Users", icon: Users },
    { path: "/admin/password", label: "Change Password", icon: Lock },
    { path: "/admin/messages", label: "Messages", icon: MessageSquare },
  ];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">G</span>
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              GreenCo Admin
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>

                {item.path === "/admin/messages" && unreadCount > 0 && (
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        <header className="sticky top-0 z-20 flex items-center justify-between bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 h-16">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-3 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative cursor-pointer h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300">
                      AD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div>
                    <p className="text-sm font-medium">{authUser.role}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {authUser.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/admin/password")}
                  className="cursor-pointer"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/")}
                  className="cursor-pointer"
                >
                  <User className="w-4 h-4 mr-2" />
                  View Website
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 bg-slate-50 dark:bg-slate-950">
          <UnreadContext.Provider value={{ unreadCount, setUnreadCount }}>
            <Outlet />
          </UnreadContext.Provider>
        </main>
      </div>
    </div>
  );
}
