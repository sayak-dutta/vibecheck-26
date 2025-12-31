export function Footer() {
  return (
    <footer className="w-full py-8 mt-16 border-t-2 border-black">
      <div className="container mx-auto px-4 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-gray-600">
          Built with{" "}
          <span className="text-red-600" aria-label="love">
            ♥
          </span>{" "}
          for the culture
        </p>
        <p className="font-mono text-xs text-gray-500 mt-2">
          © 2026 Vibe Check. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
