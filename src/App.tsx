
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { GameProvider } from "./context/GameContext";
import Index from "./pages/Index";
import City from "./pages/City";
import VehicleShop from "./pages/VehicleShop";
import Market from "./pages/Market";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/city/:cityId" element={<City />} />
          <Route path="/city/:cityId/vehicle-shop" element={<VehicleShop />} />
          <Route path="/market" element={<Market />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </GameProvider>
  );
}

export default App;
