import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        panel: "var(--panel)",
        line: "var(--line)",
        cyan: "var(--cyan)",
        cyanSoft: "var(--cyan-soft)",
        greenSignal: "var(--green-signal)",
        yellowSignal: "var(--yellow-signal)",
        redSignal: "var(--red-signal)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(105, 210, 255, 0.08), 0 20px 60px rgba(0,0,0,0.35)",
        signalGreen: "0 0 40px rgba(53, 214, 111, 0.35)",
        signalYellow: "0 0 40px rgba(246, 204, 72, 0.35)",
        signalRed: "0 0 40px rgba(255, 91, 91, 0.35)",
      },
      backgroundImage: {
        "grid-fade": "radial-gradient(circle at top, rgba(0,194,255,0.12), transparent 38%), linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(255,255,255,0))",
      },
      animation: {
        pulseSlow: "pulse 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
