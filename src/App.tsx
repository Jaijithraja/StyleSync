import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import PageTransition from './components/PageTransition';
import ProtectedRoute from './components/ProtectedRoute';
import TwinklingStars from './components/TwinklingStars';
import Index from "./pages/Index";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Catalogue from "./pages/Catalogue";
import Randomise from "./pages/Randomise";
import Starred from "./pages/Starred";
import Planner from "./pages/Planner";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import BoardView from "./pages/BoardView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Global background stars (behind pages) */}
          <TwinklingStars count={18} className="z-0" />
          {/* Animated routes wrapper */}
          <div className="relative z-10">
            <AnimatedRoutes />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Splash /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><SignUp /></PageTransition>} />
        <Route path="/home" element={<ProtectedRoute><PageTransition><Home /></PageTransition></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><PageTransition><Chat /></PageTransition></ProtectedRoute>} />
        <Route path="/catalogue" element={<ProtectedRoute><PageTransition><Catalogue /></PageTransition></ProtectedRoute>} />
        <Route path="/randomise" element={<ProtectedRoute><PageTransition><Randomise /></PageTransition></ProtectedRoute>} />
        <Route path="/starred" element={<ProtectedRoute><PageTransition><Starred /></PageTransition></ProtectedRoute>} />
        <Route path="/boards/:id" element={<ProtectedRoute><PageTransition><BoardView /></PageTransition></ProtectedRoute>} />
        <Route path="/planner" element={<ProtectedRoute><PageTransition><Planner /></PageTransition></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><PageTransition><Profile /></PageTransition></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><PageTransition><Settings /></PageTransition></ProtectedRoute>} />
        {/* Legacy route - redirect or keep for testing */}
        <Route path="/index" element={<PageTransition><Index /></PageTransition>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}
