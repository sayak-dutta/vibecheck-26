import React from "react";
import { VibeCheckResult } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ShareCardProps {
  data: VibeCheckResult;
  className?: string;
}

export const ShareCard = React.forwardRef<HTMLDivElement, ShareCardProps>(
  ({ data, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full max-w-2xl mx-auto bg-white border-2 border-black shadow-lg p-8 md:p-12",
          className
        )}
      >
        {/* Header */}
        <div className="text-center mb-8 border-b-2 border-black pb-6">
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-2">
            2026 FORECAST
          </h1>
          <p className="font-mono text-xl md:text-2xl tracking-wide">
            {data.persona} <span className="text-3xl">{data.emoji}</span>
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-8">
          {/* IN Column */}
          <div className="space-y-4">
            <h2 className="font-mono text-sm uppercase tracking-widest font-bold text-emerald-700 mb-4 pb-2 border-b-2 border-emerald-700">
              IN
            </h2>
            <ul className="space-y-3">
              {data.ins.map((item, index) => (
                <li
                  key={index}
                  className="font-mono text-sm md:text-base flex items-start gap-3"
                >
                  <span className="text-emerald-600 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-gray-900">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* OUT Column */}
          <div className="space-y-4">
            <h2 className="font-mono text-sm uppercase tracking-widest font-bold text-red-700 mb-4 pb-2 border-b-2 border-red-700">
              OUT
            </h2>
            <ul className="space-y-3">
              {data.outs.map((item, index) => (
                <li
                  key={index}
                  className="font-mono text-sm md:text-base flex items-start gap-3"
                >
                  <span className="text-red-600 font-bold flex-shrink-0">
                    ✗
                  </span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center border-t-2 border-black pt-6">
          <p className="font-mono text-xs uppercase tracking-widest text-gray-600">
            2026 Vibe Check
          </p>
        </div>
      </div>
    );
  }
);

ShareCard.displayName = "ShareCard";
