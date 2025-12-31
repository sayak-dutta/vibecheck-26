import html2canvas from "html2canvas";
import type { VibeCheckResult } from "./types";

/**
 * Downloads an HTML element as a PNG image
 */
export async function downloadElementAsImage(
  element: HTMLElement,
  filename: string = "2026-vibe-check.png"
): Promise<void> {
  try {
    // Generate canvas from element
    const canvas = await html2canvas(element, {
      backgroundColor: "#FDFBF7", // Cream background
      scale: 2, // Higher quality (2x resolution)
      logging: false,
      useCORS: true,
      allowTaint: true,
    });

    // Convert to blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, "image/png");
    });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    // Cleanup
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image. Please try again.");
  }
}

/**
 * Generates a canvas blob from an HTML element
 */
async function generateImageBlob(element: HTMLElement): Promise<Blob> {
  const canvas = await html2canvas(element, {
    backgroundColor: "#FDFBF7",
    scale: 2,
    logging: false,
    useCORS: true,
    allowTaint: true,
  });

  return new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
    }, "image/png");
  });
}

/**
 * Shares the vibe check using native share (mobile) or falls back to download + X
 */
export async function shareVibeCheck(
  element: HTMLElement | null,
  data: VibeCheckResult
): Promise<void> {
  const appUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shareText = `My 2026 forecast: ${data.ins[0]} is IN. ${data.outs[0]} is OUT. ${data.emoji}\n\nWhat's your vibe?`;
  
  // Try Web Share API first (mobile)
  if (element && navigator.share && navigator.canShare) {
    try {
      const blob = await generateImageBlob(element);
      const file = new File([blob], `${data.persona}-vibe-check.png`, { 
        type: "image/png" 
      });
      
      // Check if we can share files
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "2026 Vibe Check",
          text: shareText,
        });
        return;
      }
    } catch (error) {
      console.log("Native share failed, falling back to download + X", error);
    }
  }

  // Fallback: Download image + open X with text
  if (element) {
    await downloadElementAsImage(
      element, 
      `${data.persona.toLowerCase().replace(/\s+/g, "-")}-vibe-check.png`
    );
  }
  
  // Open X with compelling text
  const twitterText = `${shareText}\n\n${appUrl}\n\n(I just downloaded my vibe check - attaching it now! 📸)`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`;
  
  window.open(twitterUrl, "_blank", "noopener,noreferrer");
}

/**
 * Opens X/Twitter share dialog with dynamic text
 */
export function shareOnX(data: VibeCheckResult): void {
  const appUrl = typeof window !== "undefined" ? window.location.origin : "";
  const text = `My 2026 forecast: ${data.ins[0]} is IN. ${data.outs[0]} is OUT. ${data.emoji}\n\nWhat's your vibe? ${appUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  
  window.open(twitterUrl, "_blank", "noopener,noreferrer");
}

