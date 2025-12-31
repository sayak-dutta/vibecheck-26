import { z } from "zod";

// VibeCheckResult type definition
export interface VibeCheckResult {
  persona: string;
  ins: string[];
  outs: string[];
  emoji: string;
}

// Zod schema for validation
export const VibeCheckResultSchema = z.object({
  persona: z.string().min(1, "Persona is required"),
  ins: z.array(z.string()).length(5, "Must have exactly 5 IN items"),
  outs: z.array(z.string()).length(5, "Must have exactly 5 OUT items"),
  emoji: z.string().emoji("Must be a valid emoji"),
});
