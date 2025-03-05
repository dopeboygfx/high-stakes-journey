
import { PoliceEncounter } from "../types/game";

export const POLICE_ENCOUNTERS: PoliceEncounter[] = [
  {
    id: "roadblock",
    title: "Police Roadblock",
    description: "You've encountered a police roadblock. Officers are checking all vehicles passing through.",
    options: [
      {
        text: "Try to talk your way out",
        outcome: "surrender",
        successChance: 0.7,
        heatChange: -10,
        moneyChange: 0,
        energyCost: 1,
      },
      {
        text: "Offer a bribe ($500)",
        outcome: "bribe",
        successChance: 0.6,
        heatChange: -20,
        moneyChange: -500,
        energyCost: 0,
      },
      {
        text: "Turn around and flee",
        outcome: "flee",
        successChance: 0.4,
        heatChange: -5,
        moneyChange: 0,
        energyCost: 2,
        requiredAttribute: {
          type: "speed",
          value: 10
        }
      }
    ]
  },
  {
    id: "undercover",
    title: "Undercover Officer",
    description: "An undercover police officer has been following you and now approaches.",
    options: [
      {
        text: "Claim innocence",
        outcome: "surrender",
        successChance: 0.5,
        heatChange: -5,
        moneyChange: 0,
        energyCost: 1,
      },
      {
        text: "Bribe the officer ($800)",
        outcome: "bribe",
        successChance: 0.7,
        heatChange: -25,
        moneyChange: -800,
        energyCost: 0,
      },
      {
        text: "Fight and escape",
        outcome: "fight",
        successChance: 0.35,
        heatChange: -15,
        moneyChange: 0,
        energyCost: 3,
        requiredAttribute: {
          type: "strength",
          value: 15
        }
      }
    ]
  },
  {
    id: "raid",
    title: "Police Raid",
    description: "Police are conducting a raid in the area. They've spotted you and are approaching.",
    options: [
      {
        text: "Cooperate and act normal",
        outcome: "surrender",
        successChance: 0.4,
        heatChange: -5,
        moneyChange: 0,
        energyCost: 1,
      },
      {
        text: "Major bribe ($1500)",
        outcome: "bribe",
        successChance: 0.8,
        heatChange: -40,
        moneyChange: -1500,
        energyCost: 0,
      },
      {
        text: "Create a diversion and slip away",
        outcome: "flee",
        successChance: 0.5,
        heatChange: -10,
        moneyChange: 0,
        energyCost: 2,
        requiredAttribute: {
          type: "defense",
          value: 12
        }
      }
    ]
  },
  {
    id: "k9_unit",
    title: "K9 Unit Patrol",
    description: "A police officer with a drug-sniffing dog is patrolling the area.",
    options: [
      {
        text: "Stay calm and walk by",
        outcome: "surrender",
        successChance: 0.3,
        heatChange: 0,
        moneyChange: 0,
        energyCost: 1,
      },
      {
        text: "Distract the officer ($300)",
        outcome: "bribe",
        successChance: 0.6,
        heatChange: -15,
        moneyChange: -300,
        energyCost: 0,
      },
      {
        text: "Run before they notice you",
        outcome: "flee",
        successChance: 0.55,
        heatChange: -10,
        moneyChange: 0,
        energyCost: 3,
        requiredAttribute: {
          type: "speed",
          value: 18
        }
      }
    ]
  }
];
