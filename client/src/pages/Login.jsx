// import React, { useState } from "react";
// import { Link } from "react-router-dom"; 
// import { useTheme } from "../components/ThemeProvider";

// const Login = () => {
//   const { theme, toggleTheme } = useTheme();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [remember, setRemember] = useState(true);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: hook up to real auth API
//     console.log({ email, password, remember });
//   };

//   return (
//     <section className="min-h-screen w-full flex items-center justify-center py-16 px-4 bg-gradient-to-br from-green-500/10 to-blue-500/10 dark:from-slate-950 dark:to-slate-900">
//       <div className="w-full max-w-3xl grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/10 bg-white/10 dark:bg-input/30 backdrop-blur-md">
        
//         {/* Left panel / brand */}
//         <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-slate-900 to-slate-900 dark:from-slate-950 dark:to-slate-950 text-white">
//           <div>
//             <div className="inline-flex items-center gap-2 mb-8">
//               <span className="w-9 h-9 rounded-xl bg-green-500/20 border border-white/20 grid place-items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-500">
//                   <path d="M5 21a8 8 0 0 1 8-8h2a4 4 0 0 0 4-4V5a2 2 0 0 0-2-2h-4C6.477 3 3 6.477 3 11v6a2 2 0 0 0 2 2Z" />
//                 </svg>
//               </span>
//               <span className="text-lg font-semibold tracking-wide">GreenCo</span>
//             </div>
//             <h1 className="text-3xl lg:text-4xl font-bold leading-none mb-3">Welcome back</h1>
//             <p className="text-white/80">Sign in to access your dashboard and manage your services.</p>
//           </div>
//           <div className="text-xs text-white/70">
//             <p>Secure by design. Your credentials are encrypted in transit.</p>
//           </div>
//         </div>

//         {/* Right panel / form */}
//         <div className="p-8 sm:px-6 lg:px-8 bg-card text-card-foreground">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-semibold">Sign in</h2>
//             <button
//               type="button"
//               onClick={toggleTheme}
//               className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-sm"
//             >
//               <span className="hidden md:inline">{theme === "dark" ? "Dark" : "Light"} mode</span>
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Email input */}
//             <div>
//               <label htmlFor="email" className="block mb-2">Email</label>
//               <div className="relative">
//                 <input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="you@company.com"
//                   required
//                   className="w-full rounded-lg border border-input dark:border-input bg-input-background dark:bg-input/30 px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 placeholder:text-muted-foreground"
//                 />
//                 <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
//                     <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v.4l-10 6-10-6V6Zm0 3.2V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9.2l-9.2 5.52a2 2 0 0 1-2.08 0L2 9.2Z" />
//                   </svg>
//                 </span>
//               </div>
//             </div>

//             {/* Password input */}
//             <div>
//               <label htmlFor="password" className="block mb-2">Password</label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   required
//                   className="w-full rounded-lg border border-input dark:border-input bg-input-background dark:bg-input/30 px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-green-400 placeholder:text-muted-foreground"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md text-sm text-muted-foreground hover:bg-white/10"
//                 >
//                   {showPassword ? "Hide" : "Show"}
//                 </button>
//               </div>
//             </div>

//             {/* Submit button */}
//             <button
//               type="submit"
//               className="w-full py-3 cursor-pointer rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
//             >
//               Sign in
//             </button>

//             {/* Optional signup link */}
//             <p className="text-sm text-muted-foreground text-center">
//               Don’t have an account? <Link to="#" className="text-green-500 hover:underline underline-offset-4">Create one</Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../components/ThemeProvider";

const Login = () => {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ✅ important for cookies
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // ✅ Successful login
    console.log("Logged in user:", data);
    alert("Login successful!");

    // Redirect to admin page
    window.location.href = "/admin";
  } catch (err) {
    console.error("Error logging in:", err);
    alert("Something went wrong. Check console.");
  }
};


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // TODO: hook up to real auth API
  //   console.log({ email, password, remember });
  // };

  return (
    <section className="min-h-screen w-full flex items-center justify-center py-16 px-4 bg-gradient-to-br from-green-500/10 to-blue-500/10 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-3xl grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/10 bg-white/10 dark:bg-input/30 backdrop-blur-md">
        {/* Left panel / brand */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-slate-900 to-slate-900 dark:from-slate-950 dark:to-slate-950 text-white">
          <div>
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-9 h-9 rounded-xl bg-green-500/20 border border-white/20 grid place-items-center">
                {/* leaf icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-green-500"
                >
                  <path d="M5 21a8 8 0 0 1 8-8h2a4 4 0 0 0 4-4V5a2 2 0 0 0-2-2h-4C6.477 3 3 6.477 3 11v6a2 2 0 0 0 2 2Z" />
                </svg>
              </span>
              <span className="text-lg font-semibold tracking-wide">
                GreenCo
              </span>
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Sign in</h2>
            {/* <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="inline-flex items-center gap-2 px-3 py-1.5 cursor-pointer rounded-lg border border-white/10 hover:bg-white/10 transition-colors text-sm"
            >
              <span className="hidden md:inline">
                {theme === "dark" ? "Dark" : "Light"} mode
              </span>
              {theme === "dark" ? (
                // moon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                </svg>
              ) : (
                // sun
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1.5a1 1 0 1 1 2 0V21a1 1 0 0 1-1 1Zm0-18a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1Zm10 8a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1ZM5 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1Zm12.95 6.364a1 1 0 0 1-1.414 0l-1.06-1.061a1 1 0 0 1 1.414-1.414l1.06 1.06a1 1 0 0 1 0 1.415ZM8.52 7.049a1 1 0 0 1-1.414 0L6.05 6a1 1 0 1 1 1.414-1.414l1.06 1.06a1 1 0 0 1-.004 1.403Zm8.43-1.05a1 1 0 0 1 0-1.414l1.061-1.06A1 1 0 1 1 19.826 4.58l-1.06 1.06a1 1 0 0 1-1.415 0ZM6.05 18a1 1 0 0 1 1.414-1.414l1.06 1.06A1 1 0 0 1 7.11 19.06L6.05 18Z" />
                </svg>
              )}
            </button> */}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full rounded-lg border border-input dark:border-input bg-input-background dark:bg-input/30 px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 placeholder:text-muted-foreground"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v.4l-10 6-10-6V6Zm0 3.2V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9.2l-9.2 5.52a2 2 0 0 1-2.08 0L2 9.2Z" />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
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

            {/* <p className="text-sm text-muted-foreground text-center">
              Don’t have an account?{" "}
              <Link
                to="#"
                className="text-green-500 hover:underline underline-offset-4"
              >
                Create one
              </Link>
            </p> */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
