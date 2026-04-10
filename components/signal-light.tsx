"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SignalState } from "@/lib/types";

const toneClasses: Record<SignalState, string> = {
  green: "bg-greenSignal shadow-signalGreen",
  yellow: "bg-yellowSignal shadow-signalYellow",
  red: "bg-redSignal shadow-signalRed",
};

export function SignalLight({ signal, size = "lg" }: { signal: SignalState; size?: "sm" | "md" | "lg" }) {
  const sizing = size === "sm" ? "h-16 w-16" : size === "md" ? "h-20 w-20" : "h-24 w-24";

  return (
    <div className="signal-ring">
      <motion.div
        animate={{ scale: [1, 1.04, 1], opacity: [0.9, 1, 0.92] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className={cn("relative z-10 rounded-full", sizing, toneClasses[signal])}
      />
    </div>
  );
}
