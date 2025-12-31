# 2026 Vibe Check 🔥

A viral, single-page web application that generates humorous, culture-specific lists of what's "IN" and what's "OUT" for any persona in 2026 using AI.

![2026 Vibe Check](https://img.shields.io/badge/Next.js-15.5.9-black?style=flat-square&logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

- **AI-Powered Generation**: Uses Google Gemini AI to create witty, personalized IN/OUT lists
- **Mobile-First Design**: Responsive editorial "Digital Paper" aesthetic
- **Image Export**: Download your vibe check as a high-quality PNG
- **Social Sharing**: One-click sharing to X/Twitter
- **Zero Friction**: No login, no paywall, instant results

## 🎨 Design

- **Typography**: Playfair Display (serif) + JetBrains Mono (monospace)
- **Color Scheme**: Cream background (#FDFBF7) with green (IN) and red (OUT) accents
- **Style**: Brutalist/Editorial with clean borders and code-like aesthetic

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Google Gemini API key ([Get one here](https://ai.google.dev/))

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd vibecheck2026
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **AI**: Google Gemini (gemini-1.5-flash)
- **Image Export**: html2canvas
- **Validation**: Zod

## 📁 Project Structure

```
vibecheck2026/
├── app/
│   ├── api/generate/     # Gemini AI API route
│   ├── layout.tsx        # Root layout with fonts
│   ├── page.tsx          # Main page component
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── GeneratorForm.tsx # Persona input form
│   ├── ShareCard.tsx     # IN/OUT list card
│   └── Footer.tsx        # Footer component
├── lib/
│   ├── types.ts          # TypeScript types
│   ├── utils.ts          # Utility functions
│   └── image-export.ts   # Image download/share
└── public/               # Static assets
```

## 🎯 Usage

1. **Enter a Persona**: Type any persona (e.g., "Burnt out Developer", "Gym Rat", "Academic Weapon")
2. **Generate**: Click "Reveal My Fate"
3. **View Results**: See your personalized IN/OUT list with AI-generated items
4. **Download**: Save the card as a PNG image
5. **Share**: Post to X/Twitter with one click

## 🔧 Development

### Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key (required)

## 🌟 Key Components

### API Route (`/app/api/generate/route.ts`)
- Handles POST requests with persona input
- Calls Gemini AI with custom system prompt
- Validates response with Zod schema
- Returns structured JSON

### ShareCard (`/components/ShareCard.tsx`)
- Two-column layout (IN/OUT)
- Ref-forwarding for html2canvas
- Fully responsive design
- Only uses SVG elements (no img tags)

### Image Export (`/lib/image-export.ts`)
- High-quality PNG export (2x scale)
- Automatic filename generation
- X/Twitter share integration

## 📝 API Response Format

```typescript
{
  "persona": "Burnt Out Developer",
  "emoji": "🔥",
  "ins": [
    "Touch grass Tuesdays",
    "Declaring email bankruptcy",
    "Rubber duck debugging IRL",
    "Second monitor? Try no monitor",
    "Admitting you use ChatGPT"
  ],
  "outs": [
    "Hustle culture",
    "Weekend deploys",
    "Replying to Slack at 2 AM",
    "Gatekeeping tech stacks",
    "Working through lunch"
  ]
}
```

## 🎨 Customization

### Fonts
Edit `app/layout.tsx` to change fonts:
```typescript
import { Playfair_Display, JetBrains_Mono } from "next/font/google";
```

### Colors
Edit `tailwind.config.ts` to customize the color scheme:
```typescript
colors: {
  cream: "#FDFBF7", // Background
  // Add more custom colors
}
```

### AI Prompt
Edit `app/api/generate/route.ts` to modify the AI's personality and output style.

## 🐛 Troubleshooting

### "Gemini API key not configured"
- Make sure `.env.local` exists in the root directory
- Verify your API key is valid
- Restart the dev server after adding the key

### Image download not working
- Check browser console for errors
- Ensure the ShareCard ref is properly connected
- Try refreshing the page

## 📄 License

This project is open source and available for personal and commercial use.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- AI powered by [Google Gemini](https://ai.google.dev/)

---

**Made with ♥ for the culture** | © 2026 Vibe Check
