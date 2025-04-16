
import { PoliceEncounter } from "../../types/game";
import { POLICE_ENCOUNTERS } from "../../constants/policeEncounterData";

// Generate a random police encounter based on heat and wanted level
export const generatePoliceEncounter = (heat: number, wantedLevel: number) => {
  const encounterChance = (heat / 200) + (wantedLevel * 0.05);
  
  if (Math.random() < encounterChance) {
    // Select a random encounter
    return POLICE_ENCOUNTERS[Math.floor(Math.random() * POLICE_ENCOUNTERS.length)];
  }
  
  return null;
};
