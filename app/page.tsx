"use client";

import { useState, useRef, useEffect } from "react";
import { GeneratorForm, type RoastLevel } from "@/components/GeneratorForm";
import { ShareCard } from "@/components/ShareCard";
import { Footer } from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import type { VibeCheckResult } from "@/lib/types";
import confetti from "canvas-confetti";

export default function Home() {
  const [showCard, setShowCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vibeData, setVibeData] = useState<VibeCheckResult | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Confetti animation
  const fireConfetti = () => {
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#10b981', '#ef4444', '#000000'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#10b981', '#ef4444', '#000000'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  const handleGenerateVibe = async (persona: string, roastLevel: RoastLevel) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ persona, roastLevel }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate vibe check");
      }

      const data: VibeCheckResult = await response.json();
      setVibeData(data);
      setShowCard(true);
      
      // Fire confetti after a short delay
      setTimeout(() => fireConfetti(), 300);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setShowCard(false);
    setError(null);
    setVibeData(null);
  };

  const handleShare = async () => {
    if (!vibeData || !cardRef.current) return;
    
    try {
      const { shareVibeCheck } = await import("@/lib/image-export");
      await shareVibeCheck(cardRef.current, vibeData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to share");
    }
  };

  const handleDownload = async () => {
    if (!vibeData || !cardRef.current) return;
    
    try {
      const { downloadElementAsImage } = await import("@/lib/image-export");
      await downloadElementAsImage(
        cardRef.current,
        `${vibeData.persona.toLowerCase().replace(/\s+/g, "-")}-vibe-check.png`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to download image");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-20">
        {!showCard && !loading ? (
          <div className="w-full max-w-md">
            <GeneratorForm onSubmit={handleGenerateVibe} />
            {error && (
              <div className="mt-4 p-4 border-2 border-red-600 bg-red-50 rounded">
                <p className="font-mono text-sm text-red-700">
                  <span className="font-bold">Error:</span> {error}
                </p>
              </div>
            )}
          </div>
        ) : loading ? (
          <div className="w-full max-w-2xl mx-auto space-y-4">
            <div className="bg-white border-2 border-black p-8 md:p-12">
              <Skeleton className="h-12 w-3/4 mx-auto mb-8" />
              <Skeleton className="h-8 w-1/2 mx-auto mb-8" />
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Skeleton className="h-6 w-16" />
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-5 w-full" />
                  ))}
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-6 w-16" />
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-5 w-full" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-center font-mono text-sm text-gray-600">
              Consulting the crystal ball... ✨
            </p>
          </div>
        ) : vibeData ? (
          <div className="w-full max-w-3xl mx-auto space-y-6">
            <ShareCard ref={cardRef} data={vibeData} />
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
              <button
                onClick={handleReset}
                className="px-6 py-3 font-mono text-sm uppercase tracking-wider font-bold border-2 border-black bg-white hover:bg-gray-100 transition-colors"
              >
                Try Another Persona
              </button>
              <button
                onClick={handleDownload}
                className="px-6 py-3 font-mono text-sm uppercase tracking-wider font-bold bg-black text-white hover:bg-gray-800 transition-colors"
              >
                📥 Download Image
              </button>
              <button
                onClick={handleShare}
                className="px-6 py-3 font-mono text-sm uppercase tracking-wider font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                🚀 Share
              </button>
            </div>
            
            {error && (
              <div className="p-4 border-2 border-red-600 bg-red-50 rounded">
                <p className="font-mono text-sm text-red-700 text-center">
                  {error}
                </p>
              </div>
            )}
          </div>
        ) : null}
      </main>
      
      <Footer />
    </div>
  );
}
