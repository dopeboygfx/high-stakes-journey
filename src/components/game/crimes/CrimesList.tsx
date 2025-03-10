
import React, { useState } from "react";
import { Crime } from "../../../types/game";
import { CrimeCard } from "./CrimeCard";
import { Input } from "../../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Search, AlertTriangle } from "lucide-react";

type CrimesListProps = {
  crimes: Crime[];
  playerNerve: number;
  playerLevel: number;
  currentCity: string;
  onCommitCrime: (crimeId: string) => void;
};

export const CrimesList = ({
  crimes,
  playerNerve,
  playerLevel,
  currentCity,
  onCommitCrime
}: CrimesListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter and sort crimes
  const filteredCrimes = crimes
    .filter(crime => {
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          crime.name.toLowerCase().includes(searchLower) ||
          crime.description.toLowerCase().includes(searchLower)
        );
      }
      
      // Apply tab filter
      if (activeTab === "all") return true;
      if (activeTab === "available") {
        return playerNerve >= crime.nerveRequired;
      }
      if (activeTab === "city") {
        return !crime.cityRestriction || crime.cityRestriction === currentCity;
      }
      
      return true;
    })
    .sort((a, b) => a.nerveRequired - b.nerveRequired);
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search crimes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="city">This City</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {filteredCrimes.length === 0 ? (
        <div className="text-center py-6 border border-dashed rounded-lg">
          <AlertTriangle className="w-8 h-8 mx-auto text-muted-foreground" />
          <p className="text-sm text-muted-foreground mt-2">No crimes match your filters</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredCrimes.map(crime => (
            <CrimeCard
              key={crime.id}
              crime={crime}
              playerNerve={playerNerve}
              playerLevel={playerLevel}
              onCommit={onCommitCrime}
              isCityRestricted={!!crime.cityRestriction && crime.cityRestriction !== currentCity}
            />
          ))}
        </div>
      )}
    </div>
  );
};
