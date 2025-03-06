
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import { FloatingStatusBar } from "./components/game/FloatingStatusBar";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Explore from "./pages/Explore";
import Gym from "./pages/Gym";
import Achievements from "./pages/Achievements";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GameProvider>
      <TooltipProvider>
        <BrowserRouter>
          <div className="pb-20"> {/* Reduced padding to match smaller navigation bar */}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/gym" element={<Gym />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <FloatingStatusBar />
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </GameProvider>
  </QueryClientProvider>
);

export default App;
