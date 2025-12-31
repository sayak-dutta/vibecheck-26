// Funny personas for random generation
export const funnyPersonas = [
  // Tech & Startup
  "Burnt Out Developer",
  "Crypto Bro",
  "AI Doomer",
  "Web3 Evangelist",
  "Startup Founder on 3rd Pivot",
  "Discord Mod",
  "LinkedIn Influencer",
  "Growth Hacker",
  
  // Lifestyle & Fitness
  "Gym Rat",
  "Yoga Mom",
  "Biohacker",
  "Marathon Runner",
  "CrossFit Cultist",
  "Peloton Addict",
  "Keto Karen",
  "Intermittent Faster",
  
  // Career & Education  
  "Academic Weapon",
  "Toxic Manager",
  "Corporate Climber",
  "Quiet Quitter",
  "Career Switcher",
  "MBA Student",
  "Remote Work Nomad",
  "Freelance Hustler",
  
  // Finance & Money
  "Wall Street Bro",
  "FIRE Movement Believer",
  "Index Fund Purist",
  "Day Trader",
  "NFT Collector",
  "Side Hustle Queen",
  "Dividend Investor",
  
  // Social & Dating
  "Serial Ghoster",
  "Situationship Survivor",
  "Tinder Veteran",
  "Hopeless Romantic",
  "Commitment Phobe",
  "Wedding Planner Bride",
  
  // Internet Culture
  "Chronically Online",
  "Twitter Main Character",
  "Reddit Moderator",
  "TikTok Famous",
  "Instagram Influencer",
  "Twitch Streamer",
  "Newsletter Writer",
  "Podcast Bro",
  
  // Parents & Family
  "Helicopter Parent",
  "Boy Mom",
  "Girl Dad",
  "Wine Mom",
  "Soccer Mom",
  "Exhausted Parent",
  
  // Hobbies & Interests
  "Plant Parent",
  "Sneakerhead",
  "Bookworm",
  "Film Bro",
  "True Crime Junkie",
  "Astrology Girlie",
  "Gamer",
  "Fantasy Football Commissioner"
];

/**
 * Get a random persona
 */
export function getRandomPersona(): string {
  return funnyPersonas[Math.floor(Math.random() * funnyPersonas.length)];
}
