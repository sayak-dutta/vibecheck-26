import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock data for development
export const mockVibeCheckData = {
  persona: "Burnt Out Developer",
  emoji: "🔥",
  ins: [
    "Touch grass Tuesdays",
    "Declaring email bankruptcy",
    "Rubber duck debugging IRL",
    "Second monitor? Try no monitor",
    "Admitting you use ChatGPT"
  ],
  outs: [
    "Hustle culture",
    "Weekend deploys",
    "Replying to Slack at 2 AM",
    "Gatekeeping tech stacks",
    "Working through lunch"
  ]
};
