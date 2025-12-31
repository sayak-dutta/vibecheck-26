import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { VibeCheckResultSchema } from "@/lib/types";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || ""
);

// System prompts for different roast levels
const TONE_PROMPTS = {
  wholesome: `You are a supportive trend forecaster for 2026. Generate encouraging, aspirational lists that focus on growth and positive change. The user will provide a specific persona. You must generate a list of 5 things that are 'IN' (healthy habits, growth mindset, positive trends) and 5 things that are 'OUT' (self-limiting beliefs, unhealthy patterns).

The tone should be uplifting, encouraging, and wholesome. Keep items short (under 6 words).

You must return ONLY valid JSON in this exact format (no markdown, no code blocks, just pure JSON):
{
  "persona": "The User's Input Persona",
  "ins": ["item1", "item2", "item3", "item4", "item5"],
  "outs": ["item1", "item2", "item3", "item4", "item5"],
  "emoji": "✨"
}

Choose an appropriate positive emoji that represents the vibe of this persona.`,

  ruthless: `You are a viral trend forecaster for 2026. The user will provide a specific persona. You must generate a list of 5 things that are 'IN' (trending, cool, healthy, or ironically funny) and 5 things that are 'OUT' (cringe, dated, unhealthy) for that specific persona.

The tone should be witty, slightly roasting, brutally honest, and specific to internet culture. Use Gen Z slang. Be cynical and call out their questionable life choices. Keep items short (under 6 words). 

You must return ONLY valid JSON in this exact format (no markdown, no code blocks, just pure JSON):
{
  "persona": "The User's Input Persona",
  "ins": ["item1", "item2", "item3", "item4", "item5"],
  "outs": ["item1", "item2", "item3", "item4", "item5"],
  "emoji": "🔥"
}

Choose an appropriate emoji that represents the slightly roasted vibe of this persona.`,
};

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const { persona, roastLevel = "ruthless" } = await request.json();

    if (!persona || typeof persona !== "string" || persona.trim().length < 3) {
      return NextResponse.json(
        { error: "Persona must be at least 3 characters long" },
        { status: 400 }
      );
    }

    if (roastLevel !== "wholesome" && roastLevel !== "ruthless") {
      return NextResponse.json(
        { error: "Invalid roast level. Must be 'wholesome' or 'ruthless'" },
        { status: 400 }
      );
    }

    // Check for API key
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    // Get generative model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      generationConfig: {
        temperature: roastLevel === "ruthless" ? 1.2 : 0.9, // Spicier for ruthless
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });

    // Generate content with appropriate tone
    const systemPrompt = TONE_PROMPTS[roastLevel as keyof typeof TONE_PROMPTS];
    const prompt = `${systemPrompt}\n\nPersona: "${persona.trim()}"`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response - remove markdown code blocks if present
    let cleanedText = text.trim();
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/^```json\n/, "").replace(/\n```$/, "");
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```\n/, "").replace(/\n```$/, "");
    }

    // Parse JSON response
    let parsedData;
    try {
      parsedData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Failed to parse AI response:", cleanedText);
      return NextResponse.json(
        { error: "AI returned invalid format. Please try again." },
        { status: 500 }
      );
    }

    // Validate with Zod
    const validatedData = VibeCheckResultSchema.parse(parsedData);

    return NextResponse.json(validatedData);
  } catch (error) {
    console.error("Error generating vibe check:", error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Failed to generate vibe check" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
