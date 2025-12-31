"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { getRandomPersona } from "@/lib/personas";

export type RoastLevel = "wholesome" | "ruthless";

interface GeneratorFormProps {
  onSubmit: (persona: string, roastLevel: RoastLevel) => void;
}

export function GeneratorForm({ onSubmit }: GeneratorFormProps) {
  const [persona, setPersona] = useState("");
  const [roastLevel, setRoastLevel] = useState<RoastLevel>("ruthless");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedPersona = persona.trim();
    
    if (trimmedPersona.length < 3) {
      return;
    }
    
    onSubmit(trimmedPersona, roastLevel);
  };

  const handleRandomPersona = () => {
    setPersona(getRandomPersona());
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center space-y-4 mb-8">
        <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight">
          2026 Vibe Check
        </h1>
        <p className="font-mono text-sm md:text-base text-gray-600 max-w-sm mx-auto">
          Discover what&apos;s IN and OUT for your unique persona in 2026
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Roast Level Toggle */}
        <div className="space-y-3">
          <label className="font-mono text-sm uppercase tracking-wider font-bold">
            Spiciness Level
          </label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg">
            <button
              type="button"
              onClick={() => setRoastLevel("wholesome")}
              className={`px-4 py-2 font-mono text-sm uppercase tracking-wider font-bold rounded-md transition-all ${
                roastLevel === "wholesome"
                  ? "bg-white shadow-sm text-emerald-700"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              😇 Wholesome
            </button>
            <button
              type="button"
              onClick={() => setRoastLevel("ruthless")}
              className={`px-4 py-2 font-mono text-sm uppercase tracking-wider font-bold rounded-md transition-all ${
                roastLevel === "ruthless"
                  ? "bg-white shadow-sm text-red-700"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              💀 Ruthless
            </button>
          </div>
        </div>

        {/* Persona Input */}
        <div className="space-y-2">
          <label htmlFor="persona" className="font-mono text-sm uppercase tracking-wider font-bold">
            Your Persona
          </label>
          <div className="flex gap-2">
            <Input
              id="persona"
              type="text"
              placeholder="e.g. Burnt out Developer"
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
              className="flex-1 font-mono text-base h-12 border-2 border-black focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-gray-600"
              required
              minLength={3}
            />
            <Button
              type="button"
              onClick={handleRandomPersona}
              variant="outline"
              className="h-12 px-4 border-2 border-black hover:bg-gray-100"
              title="Surprise Me!"
            >
              <Sparkles className="h-5 w-5" />
            </Button>
          </div>
          <p className="font-mono text-xs text-gray-500">
            {roastLevel === "wholesome" 
              ? "✨ Get encouraging, aspirational vibes" 
              : "🔥 Get brutally honest, spicy takes"}
          </p>
        </div>

        <Button
          type="submit"
          className="w-full h-12 font-mono uppercase tracking-wider font-bold text-base bg-black hover:bg-gray-800 text-white border-2 border-black"
        >
          Reveal My Fate
        </Button>
      </form>
    </div>
  );
}
