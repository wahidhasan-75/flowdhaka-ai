import { Bike, BusFront } from "lucide-react";
import { ModuleCard } from "@/components/module-card";
import { SectionHeader } from "@/components/section-header";

export default function ModulesPage() {
  return (
    <section className="section-space">
      <div className="page-shell">
        <SectionHeader
          eyebrow="Modules"
          title="Explore the two major product modules"
          description="Both products follow the same software-first logic, but solve different sides of Dhaka mobility: stop-level bus decision support and stand-level rickshaw congestion control."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <ModuleCard
            title="SmartStop AI"
            description="Location-aware stop display, passenger app, operator dashboard, and admin-only enforcement intelligence."
            href="/smartstop"
            badge="Bus module"
            icon={<BusFront className="h-6 w-6" />}
          />
          <ModuleCard
            title="RickshawFlow AI"
            description="Separate stand display and AI control room with virtual signals, risk scoring, CCTV-style monitoring, and intervention logic."
            href="/rickshawflow"
            badge="Rickshaw module"
            icon={<Bike className="h-6 w-6" />}
          />
        </div>
      </div>
    </section>
  );
}
