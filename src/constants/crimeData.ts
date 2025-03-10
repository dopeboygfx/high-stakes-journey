
import { Crime } from "../types/game";

export const CRIMES: Crime[] = [
  {
    id: "badge_car",
    name: "Badge a Car",
    description: "Vandalize a car with spray paint",
    nerveRequired: 1,
    moneyGain: 10,
    expGain: 50,
    requiresMastery: true,
    successRate: 0.95,
    cooldown: 30000, // 30 seconds
  },
  {
    id: "pickpocket_granny",
    name: "Pickpocket a Granny",
    description: "Take advantage of the elderly",
    nerveRequired: 1,
    moneyGain: 15,
    expGain: 50,
    requiresMastery: true,
    successRate: 0.92,
    cooldown: 30000,
  },
  {
    id: "shoplift_small",
    name: "Shoplift Small Store",
    description: "Steal from a mom & pop shop",
    nerveRequired: 1,
    moneyGain: 20,
    expGain: 50,
    requiresMastery: true,
    successRate: 0.90,
    cooldown: 45000,
  },
  {
    id: "pickpocket_fruiterer",
    name: "Pickpocket Fruiterer",
    description: "Steal from a fruit seller",
    nerveRequired: 2,
    moneyGain: 30,
    expGain: 50,
    successRate: 0.88,
    cooldown: 45000,
  },
  {
    id: "mug_tramp",
    name: "Mug a Tramp",
    description: "Rob a homeless person",
    nerveRequired: 2,
    moneyGain: 75,
    expGain: 50,
    successRate: 0.85,
    cooldown: 60000,
  },
  {
    id: "mug_whore",
    name: "Mug a Sex Worker",
    description: "Rob someone on the streets",
    nerveRequired: 2,
    moneyGain: 90,
    expGain: 50,
    successRate: 0.82,
    cooldown: 60000,
  },
  {
    id: "shoplift_electronics",
    name: "Shoplift Electronics Store",
    description: "Steal gadgets worth selling",
    nerveRequired: 2,
    moneyGain: 100,
    expGain: 50,
    successRate: 0.80,
    cooldown: 120000, // 2 minutes
  },
  {
    id: "shoplift_jewelry",
    name: "Shoplift Jewelry Store",
    description: "Steal valuable jewelry",
    nerveRequired: 3,
    moneyGain: 175,
    expGain: 76,
    successRate: 0.75,
    cooldown: 300000, // 5 minutes
  },
  {
    id: "mug_teenager",
    name: "Mug a Teenager",
    description: "Rob a young person",
    nerveRequired: 3,
    moneyGain: 175,
    expGain: 76,
    successRate: 0.78,
    cooldown: 240000, // 4 minutes
  },
  {
    id: "mug_working_man",
    name: "Mug a Working Man",
    description: "Rob someone coming from work",
    nerveRequired: 4,
    moneyGain: 300,
    expGain: 103,
    successRate: 0.72,
    cooldown: 300000, // 5 minutes
  },
  {
    id: "mug_pimp",
    name: "Mug a Pimp",
    description: "Rob a dangerous individual",
    nerveRequired: 4,
    moneyGain: 350,
    expGain: 103,
    successRate: 0.70,
    cooldown: 360000, // 6 minutes
  },
  {
    id: "lottery_scam",
    name: "Run a Lottery Scam",
    description: "Trick someone into a fake lottery",
    nerveRequired: 5,
    moneyGain: 500,
    expGain: 130,
    successRate: 0.68,
    cooldown: 600000, // 10 minutes
  },
  {
    id: "holdup_store",
    name: "Hold Up Small Store",
    description: "Rob a store at gunpoint",
    nerveRequired: 5,
    moneyGain: 600,
    expGain: 130,
    successRate: 0.65,
    cooldown: 900000, // 15 minutes
  },
  {
    id: "holdup_post",
    name: "Hold Up Post Office",
    description: "Rob a post office",
    nerveRequired: 6,
    moneyGain: 700,
    expGain: 157,
    successRate: 0.62,
    cooldown: 1800000, // 30 minutes
  },
  {
    id: "rob_house",
    name: "Rob a House",
    description: "Break into and rob a residential home",
    nerveRequired: 10,
    moneyGain: 1250,
    expGain: 270,
    successRate: 0.60,
    cooldown: 3600000, // 1 hour
  },
  {
    id: "stalk_denver",
    name: "Stalk the Denver Broncos",
    description: "Follow and extort a football player",
    nerveRequired: 11,
    moneyGain: 1400,
    expGain: 299,
    cityRestriction: "denver",
    successRate: 0.58,
    cooldown: 7200000, // 2 hours
  },
  {
    id: "insurance_scam",
    name: "Insurance Scam",
    description: "Run a complex insurance fraud",
    nerveRequired: 12,
    moneyGain: 1500,
    expGain: 328,
    successRate: 0.55,
    cooldown: 10800000, // 3 hours
  },
  {
    id: "drug_deal",
    name: "Major Drug Deal",
    description: "Arrange a high-stakes drug transaction",
    nerveRequired: 15,
    moneyGain: 2000,
    expGain: 420,
    successRate: 0.50,
    cooldown: 14400000, // 4 hours
  },
  {
    id: "vandalize_cathedral",
    name: "Vandalize Cathedral Square",
    description: "Deface a historical landmark",
    nerveRequired: 18,
    moneyGain: 2400,
    expGain: 514,
    cityRestriction: "sacramento",
    successRate: 0.48,
    cooldown: 18000000, // 5 hours
  },
  {
    id: "steal_vw",
    name: "Steal a VW Beetle",
    description: "Steal a modest car",
    nerveRequired: 20,
    moneyGain: 2500,
    expGain: 580,
    successRate: 0.45,
    cooldown: 21600000, // 6 hours
  },
  {
    id: "steal_mercedes",
    name: "Steal a Mercedes C320",
    description: "Steal a luxury vehicle",
    nerveRequired: 25,
    moneyGain: 3000,
    expGain: 750,
    successRate: 0.42,
    cooldown: 28800000, // 8 hours
  },
  {
    id: "assault_schmidt",
    name: "Assault Shirley Schmidt",
    description: "Attack a well-known local figure",
    nerveRequired: 28,
    moneyGain: 4500,
    expGain: 856,
    cityRestriction: "boston",
    successRate: 0.40,
    cooldown: 36000000, // 10 hours
  },
  {
    id: "credit_fraud",
    name: "Credit Card Fraud",
    description: "Run a sophisticated credit card scam",
    nerveRequired: 30,
    moneyGain: 4000,
    expGain: 930,
    successRate: 0.38,
    cooldown: 43200000, // 12 hours
  },
  {
    id: "steal_palace",
    name: "Steal From Palace Of The Governors",
    description: "Rob a government building",
    nerveRequired: 32,
    moneyGain: 4150,
    expGain: 1004,
    cityRestriction: "santa_fe",
    successRate: 0.35,
    cooldown: 57600000, // 16 hours
  },
  {
    id: "hack_university",
    name: "Hack Into Grand Canyon University",
    description: "Digital heist of university systems",
    nerveRequired: 35,
    moneyGain: 4250,
    expGain: 1120,
    cityRestriction: "phoenix",
    successRate: 0.32,
    cooldown: 64800000, // 18 hours
  },
  {
    id: "vandalize_observatory",
    name: "Vandalize The Lick Observatory",
    description: "Damage scientific equipment",
    nerveRequired: 35,
    moneyGain: 4250,
    expGain: 1120,
    cityRestriction: "san_jose",
    successRate: 0.32,
    cooldown: 64800000, // 18 hours
  },
  {
    id: "vandalize_museum",
    name: "Vandalize the Rail-road Museum",
    description: "Damage historical artifacts",
    nerveRequired: 36,
    moneyGain: 4400,
    expGain: 1159,
    cityRestriction: "carson_city",
    successRate: 0.30,
    cooldown: 72000000, // 20 hours
  },
  {
    id: "assault_officer",
    name: "Assault a Police Officer",
    description: "Attack law enforcement",
    nerveRequired: 40,
    moneyGain: 4500,
    expGain: 1320,
    successRate: 0.25,
    cooldown: 86400000, // 24 hours
  },
  {
    id: "bomb_threat",
    name: "Bomb Threat Lenox Square Security",
    description: "Make a serious terroristic threat",
    nerveRequired: 45,
    moneyGain: 4750,
    expGain: 1530,
    cityRestriction: "atlanta",
    successRate: 0.22,
    cooldown: 100800000, // 28 hours
  },
  {
    id: "rob_van",
    name: "Rob An Armoured Bank Van",
    description: "Intercept a cash transport",
    nerveRequired: 50,
    moneyGain: 5000,
    expGain: 1750,
    successRate: 0.20,
    cooldown: 115200000, // 32 hours
  },
  {
    id: "kidnap_banker",
    name: "Kidnap a Bank Worker",
    description: "Abduct and ransom a banker",
    nerveRequired: 60,
    moneyGain: 7000,
    expGain: 2220,
    successRate: 0.18,
    cooldown: 129600000, // 36 hours
  },
  {
    id: "rob_bank",
    name: "Rob a Bank",
    description: "Execute a bank robbery",
    nerveRequired: 75,
    moneyGain: 10000,
    expGain: 3000,
    requiresMastery: true,
    successRate: 0.15,
    cooldown: 172800000, // 48 hours
  },
  {
    id: "rob_federal",
    name: "Rob The Federal Reserve Bank of Chicago",
    description: "The ultimate bank heist",
    nerveRequired: 80,
    moneyGain: 14000,
    expGain: 3570,
    cityRestriction: "chicago",
    successRate: 0.10,
    cooldown: 259200000, // 72 hours
  },
  {
    id: "rob_lauder",
    name: "Rob The Lauder Museum",
    description: "Steal priceless art",
    nerveRequired: 85,
    moneyGain: 15500,
    expGain: 3870,
    cityRestriction: "amityville",
    successRate: 0.08,
    cooldown: 345600000, // 96 hours
  },
  {
    id: "rig_election",
    name: "Rig an Election",
    description: "Manipulate democratic processes",
    nerveRequired: 90,
    moneyGain: 18000,
    expGain: 4200,
    cityRestriction: "st_louis",
    successRate: 0.07,
    cooldown: 432000000, // 120 hours
  },
  {
    id: "assault_prison",
    name: "Assault a Prison Worker",
    description: "Attack a prison guard",
    nerveRequired: 100,
    moneyGain: 8000,
    expGain: 1800,
    successRate: 0.15,
    cooldown: 172800000, // 48 hours
  },
  {
    id: "meth_lab",
    name: "Run a Meth Lab",
    description: "Manufacture highly illegal drugs",
    nerveRequired: 110,
    moneyGain: 24000,
    expGain: 4840,
    cityRestriction: "compton",
    successRate: 0.05,
    cooldown: 518400000, // 144 hours
  },
  {
    id: "letter_scam",
    name: "Run a 419 Letter Scam",
    description: "Operate an advanced fraud scheme",
    nerveRequired: 125,
    moneyGain: 45000,
    expGain: 6250,
    cityRestriction: "las_vegas",
    successRate: 0.04,
    cooldown: 604800000, // 168 hours
  },
  {
    id: "mass_ecstasy",
    name: "Mass Produce Ecstasy",
    description: "Large-scale drug manufacturing operation",
    nerveRequired: 150,
    moneyGain: 60000,
    expGain: 8250,
    cityRestriction: "miami",
    successRate: 0.03,
    cooldown: 691200000, // 192 hours
  },
];

// Filter crimes based on player level and city
export const getAvailableCrimes = (
  playerLevel: number, 
  currentCity: string
): Crime[] => {
  return CRIMES.filter(crime => {
    // Check level requirement if it exists
    if (crime.requiredLevel && playerLevel < crime.requiredLevel) {
      return false;
    }
    
    // Check city restriction if it exists
    if (crime.cityRestriction && crime.cityRestriction !== currentCity) {
      return false;
    }
    
    return true;
  });
};
