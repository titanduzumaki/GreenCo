import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../components/ThemeProvider";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Login request (cookie will be set)
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important for sending/receiving cookie
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login response:", data, "Status:", res.status);

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // 2️⃣ Fetch user data (JWT read automatically from cookie)
      const userRes = await fetch("http://localhost:3001/api/auth/me", {
        credentials: "include",
      });

      const userData = await userRes.json();
      console.log("User data response:", userData, "Status:", userRes.status);

      if (userRes.ok) {
        setUser(userData);
        alert("Login successful!");
        navigate("/admin");
      } else {
        alert(userData.message || "Failed to fetch user data");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert("Something went wrong. Check console.");
    }
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center py-16 px-4 bg-gradient-to-br from-green-500/10 to-blue-500/10 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-3xl grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/10 bg-white/10 dark:bg-input/30 backdrop-blur-md">
        {/* Left panel / brand */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-slate-900 to-slate-900 dark:from-slate-950 dark:to-slate-950 text-white">
          <div>
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-9 h-9 rounded-xl bg-green-500/20 border border-white/20 grid place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-green-500"
                >
                  <path d="M5 21a8 8 0 0 1 8-8h2a4 4 0 0 0 4-4V5a2 2 0 0 0-2-2h-4C6.477 3 3 6.477 3 11v6a2 2 0 0 0 2 2Z" />
                </svg>
              </span>
              <span className="text-lg font-semibold tracking-wide">GreenCo</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold leading-none mb-3">
              Welcome back
            </h1>
            <p className="text-white/80">
              Sign in to access your dashboard and manage your services.
            </p>
          </div>
          <div className="text-xs text-white/70">
            <p>Secure by design. Your credentials are encrypted in transit.</p>
          </div>
        </div>

        {/* Right panel / form */}
        <div className="p-8 sm:px-6 lg:px-8 bg-card text-card-foreground">
          <h2 className="text-xl font-semibold mb-6">Sign in</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full rounded-lg border border-input dark:border-input bg-input-background dark:bg-input/30 px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-lg border border-input dark:border-input bg-input-background dark:bg-input/30 px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-green-400 placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md text-sm text-muted-foreground hover:bg-white/10"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 cursor-pointer rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
