
import { Link, useParams } from "react-router-dom";
import { VehicleShop as VehicleShopComponent } from "../components/game/VehicleShop";

const VehicleShop = () => {
  const { cityId } = useParams();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Vehicle Shop</h1>
          <Link
            to={`/city/${cityId}`}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Back to City
          </Link>
        </div>
        <VehicleShopComponent />
      </div>
    </div>
  );
};

export default VehicleShop;
