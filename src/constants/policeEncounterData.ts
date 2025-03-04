
import { PoliceEncounter } from "../types/game";

export const POLICE_ENCOUNTERS: PoliceEncounter[] = [
  {
    id: "roadblock",
    title: "Police Roadblock",
    description: "You've encountered a police roadblock on the road. The officers look suspicious of your vehicle.",
    options: [
      {
        text: "Try to bribe the officer",
        outcome: "bribe",
        successChance: 0.7,
        heatChange: -20,
        moneyChange: -1000,
        energyCost: 0
      },
      {
        text: "Floor it and try to escape",
        outcome: "flee",
        successChance: 0.5,
        heatChange: 15,
        moneyChange: 0,
        energyCost: 2,
        requiredAttribute: {
          type: "speed",
          value: 10
        }
      },
      {
        text: "Act normal and cooperate",
        outcome: "surrender",
        successChance: 0.3,
        heatChange: -5,
        moneyChange: 0,
        energyCost: 0
      }
    ]
  },
  {
    id: "undercover",
    title: "Undercover Operation",
    description: "An undercover officer has approached you pretending to be a buyer. You spot his badge partially hidden under his jacket.",
    options: [
      {
        text: "Fight your way out",
        outcome: "fight",
        successChance: 0.4,
        heatChange: 25,
        moneyChange: 0,
        energyCost: 5,
        requiredAttribute: {
          type: "strength",
          value: 12
        }
      },
      {
        text: "Run away quickly",
        outcome: "flee",
        successChance: 0.6,
        heatChange: 10,
        moneyChange: 0,
        energyCost: 3,
        requiredAttribute: {
          type: "speed",
          value: 8
        }
      },
      {
        text: "Deny everything and bluff",
        outcome: "surrender",
        successChance: 0.5,
        heatChange: 0,
        moneyChange: 0,
        energyCost: 0
      }
    ]
  },
  {
    id: "raid",
    title: "Hotel Room Raid",
    description: "Police are raiding the hotel where you're staying! You hear them breaking down doors in the hallway.",
    options: [
      {
        text: "Hide your stash and act innocent",
        outcome: "surrender",
        successChance: 0.4,
        heatChange: -10,
        moneyChange: 0,
        energyCost: 0
      },
      {
        text: "Escape through the window",
        outcome: "flee",
        successChance: 0.5,
        heatChange: 5,
        moneyChange: 0,
        energyCost: 4,
        requiredAttribute: {
          type: "defense",
          value: 7
        }
      },
      {
        text: "Offer a massive bribe",
        outcome: "bribe",
        successChance: 0.6,
        heatChange: -30,
        moneyChange: -2500,
        energyCost: 0
      }
    ]
  },
  {
    id: "informant",
    title: "Informant Betrayal",
    description: "One of your contacts has informed on you. Police officers are waiting for you at your usual meeting spot.",
    options: [
      {
        text: "Confront the officers",
        outcome: "fight",
        successChance: 0.3,
        heatChange: 20,
        moneyChange: 0,
        energyCost: 6,
        requiredAttribute: {
          type: "strength",
          value: 15
        }
      },
      {
        text: "Slip away unnoticed",
        outcome: "flee",
        successChance: 0.7,
        heatChange: 0,
        moneyChange: 0,
        energyCost: 3,
        requiredAttribute: {
          type: "speed",
          value: 12
        }
      },
      {
        text: "Negotiate with the authorities",
        outcome: "surrender",
        successChance: 0.4,
        heatChange: -15,
        moneyChange: -1500,
        energyCost: 0
      }
    ]
  }
];
