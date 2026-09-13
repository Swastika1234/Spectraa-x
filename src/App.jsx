import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Bell,
  ChevronRight,
  CircleDot,
  Crosshair,
  Gauge,
  LayoutDashboard,
  Radio,
  ScanLine,
  Settings,
  Shield,
  Signal,
  Target,
  Wifi,
} from "lucide-react";

import SmartScan from "./pages/SmartScan";
import SignalIntelligence from "./pages/SignalIntelligence";
import Analytics from "./pages/Analytics";

const signals = [
  {
    id: "SIG-001",
    frequency: "2.41 GHz",
    strength: "-42 dBm",
    type: "Digital",
    confidence: "96%",
  },
  {
    id: "SIG-002",
    frequency: "5.80 GHz",
    strength: "-51 dBm",
    type: "Unknown",
    confidence: "81%",
  },
  {
    id: "SIG-003",
    frequency: "915 MHz",
    strength: "-58 dBm",
    type: "Telemetry",
    confidence: "91%",
  },
  {
    id: "SIG-004",
    frequency: "433 MHz",
    strength: "-64 dBm",
    type: "Digital",
    confidence: "88%",
  },
];

function App() {
  const [page, setPage] = useState("dashboard");

  // ================= SMART SCAN =================
  if (page === "scan") {
    return (
      <SmartScan
        onBack={() => setPage("dashboard")}
      />
    );
  }

  // ================= SIGNAL INTELLIGENCE =================
  if (page === "signals") {
    return (
      <SignalIntelligence
        onBack={() => setPage("dashboard")}
      />
    );
  }

  // ================= ANALYTICS =================
  if (page === "analytics") {
    return (
      <Analytics
        onBack={() => setPage("dashboard")}
      />
    );
  }

  // ================= DASHBOARD =================
  return (
    <div className="min-h-screen bg-[#03070b] text-slate-200">

      <div className="flex min-h-screen">

        {/* =========================================================
            SIDEBAR
        ========================================================= */}

        <aside className="hidden w-64 shrink-0 border-r border-cyan-500/10 bg-[#050a10] lg:block">

          {/* LOGO */}

          <div className="flex h-20 items-center border-b border-cyan-500/10 px-6">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-400/10">

                <Radio
                  size={20}
                  className="text-cyan-400"
                />

              </div>

              <div>

                <h1 className="font-bold tracking-[0.18em] text-cyan-400">
                  SPECTRA-X
                </h1>

                <p className="text-[8px] tracking-[0.25em] text-slate-600">
                  INTELLIGENCE SYSTEM
                </p>

              </div>

            </div>

          </div>

          {/* NAVIGATION */}

          <div className="p-4">

            <p className="mb-3 px-3 text-[9px] font-semibold tracking-[0.3em] text-slate-600">
              COMMAND
            </p>

            {/* COMMAND CENTER */}

            <SidebarItem
              icon={<LayoutDashboard size={17} />}
              label="Command Center"
              active={page === "dashboard"}
              onClick={() => setPage("dashboard")}
            />

            {/* SMART SCAN */}

            <SidebarItem
              icon={<ScanLine size={17} />}
              label="Smart Scan"
              active={page === "scan"}
              onClick={() => setPage("scan")}
            />

            {/* SIGNAL INTELLIGENCE */}

            <SidebarItem
              icon={<Signal size={17} />}
              label="Signal Intelligence"
              active={page === "signals"}
              onClick={() => setPage("signals")}
            />

            {/* ANALYTICS */}

            <SidebarItem
              icon={<BarChart3 size={17} />}
              label="Analytics"
              active={page === "analytics"}
              onClick={() => setPage("analytics")}
            />

            {/* SYSTEM */}

            <p className="mb-3 mt-8 px-3 text-[9px] font-semibold tracking-[0.3em] text-slate-600">
              SYSTEM
            </p>

            {/* ALERTS */}

            <SidebarItem
              icon={<Bell size={17} />}
              label="Alerts"
              badge="03"
              onClick={() => {}}
            />

            {/* CONFIGURATION */}

            <SidebarItem
              icon={<Settings size={17} />}
              label="Configuration"
              onClick={() => {}}
            />

          </div>

          {/* SYSTEM STATUS */}

          <div className="absolute bottom-5 left-4 w-56 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03] p-4">

            <div className="flex items-center gap-2">

              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <span className="text-xs font-medium text-emerald-400">
                SYSTEM OPERATIONAL
              </span>

            </div>

            <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-800">

              <div className="h-full w-[94%] bg-emerald-400/70" />

            </div>

            <p className="mt-2 text-[9px] text-slate-600">
              Uptime 99.98% • Node S-X01
            </p>

          </div>

        </aside>

        {/* =========================================================
            MAIN
        ========================================================= */}

        <main className="min-w-0 flex-1">

          {/* TOP BAR */}

          <header className="flex h-20 items-center justify-between border-b border-cyan-500/10 bg-[#050a10]/80 px-5 backdrop-blur-xl md:px-8">

            <div>

              <p className="text-[9px] tracking-[0.35em] text-cyan-500">
               SmartScan-EW
              </p>

              <h2 className="mt-1 text-lg font-semibold text-white">
                Command Center
              </h2>

            </div>

            <div className="flex items-center gap-3">

              {/* NETWORK */}

              <div className="hidden items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2 sm:flex">

                <Wifi
                  size={14}
                  className="text-emerald-400"
                />

                <span className="text-[10px] text-slate-400">
                  NETWORK STABLE
                </span>

              </div>

              {/* NOTIFICATION */}

              <button className="relative rounded-lg border border-slate-800 bg-slate-900/50 p-2.5">

                <Bell size={17} />

                <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-400" />

              </button>

            </div>

          </header>

          {/* CONTENT */}

          <div className="p-5 md:p-8">

            {/* PAGE TITLE */}

            <div className="mb-6">

              <p className="text-[9px] tracking-[0.35em] text-cyan-500">
                COMMAND INTERFACE
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-white">
                Spectrum Command Center
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Real-time simulated spectrum monitoring environment
              </p>

            </div>

            {/* STATUS CARDS */}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              <StatCard
                icon={<ScanLine size={18} />}
                title="ACTIVE SCANS"
                value="04"
                footer="2 scanning"
              />

              <StatCard
                icon={<Signal size={18} />}
                title="SIGNALS DETECTED"
                value="128"
                footer="+12 last hour"
              />

              <StatCard
                icon={<Gauge size={18} />}
                title="SPECTRUM LOAD"
                value="67%"
                footer="Within threshold"
              />

              <StatCard
                icon={<Shield size={18} />}
                title="SYSTEM STATUS"
                value="SECURE"
                footer="All systems normal"
              />

            </div>

            {/* RADAR + ALERTS */}

            <div className="mt-5 grid gap-5 xl:grid-cols-3">

              {/* RADAR */}

              <section className="overflow-hidden rounded-2xl border border-cyan-500/10 bg-[#060b11] xl:col-span-2">

                <div className="flex items-center justify-between border-b border-cyan-500/10 px-5 py-4">

                  <div>

                    <div className="flex items-center gap-2">

                      <Crosshair
                        size={16}
                        className="text-cyan-400"
                      />

                      <h3 className="text-sm font-semibold text-white">
                        Spectrum Activity
                      </h3>

                    </div>

                    <p className="mt-1 text-[10px] text-slate-600">
                      Real-time signal environment
                    </p>

                  </div>

                  <div className="flex items-center gap-2">

                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />

                    <span className="text-[9px] tracking-widest text-cyan-400">
                      LIVE
                    </span>

                  </div>

                </div>

                <div className="relative flex h-[390px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08),transparent_55%)]">

                  <div className="absolute h-[310px] w-[310px] rounded-full border border-cyan-400/10" />

                  <div className="absolute h-[230px] w-[230px] rounded-full border border-cyan-400/10" />

                  <div className="absolute h-[150px] w-[150px] rounded-full border border-cyan-400/10" />

                  <div className="absolute h-[70px] w-[70px] rounded-full border border-cyan-400/10" />

                  <div className="absolute h-px w-[310px] bg-cyan-400/10" />

                  <div className="absolute h-[310px] w-px bg-cyan-400/10" />

                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute h-[155px] w-px origin-bottom bg-gradient-to-t from-cyan-400 to-transparent"
                  />

                  <SignalPoint top="29%" left="67%" />

                  <SignalPoint top="57%" left="31%" />

                  <SignalPoint top="42%" left="59%" />

                  <SignalPoint top="69%" left="61%" />

                  <div className="z-10 flex h-7 w-7 items-center justify-center rounded-full border border-cyan-400/50 bg-cyan-400/10">

                    <CircleDot
                      size={12}
                      className="text-cyan-300"
                    />

                  </div>

                  <div className="absolute bottom-5 left-5 text-[9px] text-slate-600">
                    CENTER NODE: S-X01
                  </div>

                  <div className="absolute bottom-5 right-5 text-[9px] text-slate-600">
                    RANGE: SIMULATED
                  </div>

                </div>

              </section>

              {/* ALERTS */}

              <section className="rounded-2xl border border-cyan-500/10 bg-[#060b11]">

                <div className="flex items-center justify-between border-b border-cyan-500/10 px-5 py-4">

                  <div className="flex items-center gap-2">

                    <Bell
                      size={16}
                      className="text-amber-400"
                    />

                    <h3 className="text-sm font-semibold text-white">
                      Recent Alerts
                    </h3>

                  </div>

                  <span className="rounded-md bg-red-400/10 px-2 py-1 text-[9px] text-red-400">
                    03 ACTIVE
                  </span>

                </div>

                <div className="divide-y divide-slate-800/70">

                  <Alert
                    level="HIGH"
                    title="Unclassified Signal"
                    time="02 min ago"
                  />

                  <Alert
                    level="MEDIUM"
                    title="Spectrum Density Increase"
                    time="08 min ago"
                  />

                  <Alert
                    level="LOW"
                    title="New Signal Pattern"
                    time="14 min ago"
                  />

                </div>

                <button className="flex w-full items-center justify-between px-5 py-4 text-[10px] text-cyan-400 transition hover:bg-cyan-400/[0.03]">

                  VIEW ALL ALERTS

                  <ChevronRight size={13} />

                </button>

              </section>

            </div>

            {/* SIGNAL TABLE */}

            <section className="mt-5 overflow-hidden rounded-2xl border border-cyan-500/10 bg-[#060b11]">

              <div className="flex items-center justify-between border-b border-cyan-500/10 px-5 py-4">

                <div>

                  <div className="flex items-center gap-2">

                    <Activity
                      size={16}
                      className="text-cyan-400"
                    />

                    <h3 className="text-sm font-semibold text-white">
                      Detected Signals
                    </h3>

                  </div>

                  <p className="mt-1 text-[10px] text-slate-600">
                    Latest simulated spectrum observations
                  </p>

                </div>

                <button
                  onClick={() => setPage("signals")}
                  className="rounded-lg border border-cyan-500/20 px-3 py-2 text-[9px] tracking-widest text-cyan-400 transition hover:bg-cyan-400/5"
                >
                  OPEN INTELLIGENCE
                </button>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full min-w-[700px] text-left">

                  <thead>

                    <tr className="border-b border-slate-800 text-[9px] tracking-widest text-slate-600">

                      <th className="px-5 py-4">
                        SIGNAL ID
                      </th>

                      <th className="px-5 py-4">
                        FREQUENCY
                      </th>

                      <th className="px-5 py-4">
                        STRENGTH
                      </th>

                      <th className="px-5 py-4">
                        TYPE
                      </th>

                      <th className="px-5 py-4">
                        CONFIDENCE
                      </th>

                      <th className="px-5 py-4">
                        STATUS
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {signals.map((signal) => (

                      <tr
                        key={signal.id}
                        className="border-b border-slate-800/60 transition hover:bg-cyan-400/[0.02]"
                      >

                        <td className="px-5 py-4 text-xs font-medium text-cyan-400">
                          {signal.id}
                        </td>

                        <td className="px-5 py-4 text-xs text-slate-300">
                          {signal.frequency}
                        </td>

                        <td className="px-5 py-4 text-xs text-slate-400">
                          {signal.strength}
                        </td>

                        <td className="px-5 py-4 text-xs text-slate-400">
                          {signal.type}
                        </td>

                        <td className="px-5 py-4 text-xs text-slate-300">
                          {signal.confidence}
                        </td>

                        <td className="px-5 py-4">

                          <span className="inline-flex items-center gap-1.5 text-[9px] text-emerald-400">

                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                            MONITORED

                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </section>

          </div>

        </main>

      </div>

    </div>
  );
}

/* =============================================================
   SIDEBAR ITEM
============================================================= */

function SidebarItem({
  icon,
  label,
  active = false,
  badge,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-xs transition ${
        active
          ? "border border-cyan-400/10 bg-cyan-400/10 text-cyan-300"
          : "text-slate-500 hover:bg-slate-900 hover:text-slate-200"
      }`}
    >

      {icon}

      <span>{label}</span>

      {badge && (
        <span className="ml-auto rounded bg-red-400/10 px-1.5 py-0.5 text-[8px] text-red-400">
          {badge}
        </span>
      )}

    </button>
  );
}

/* =============================================================
   STAT CARD
============================================================= */

function StatCard({
  icon,
  title,
  value,
  footer,
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-cyan-500/10 bg-[#060b11] p-5"
    >

      <div className="flex items-center justify-between">

        <div className="rounded-lg border border-cyan-400/10 bg-cyan-400/5 p-2 text-cyan-400">
          {icon}
        </div>

        <span className="text-[8px] tracking-widest text-emerald-400">
          ● LIVE
        </span>

      </div>

      <p className="mt-5 text-[9px] tracking-[0.2em] text-slate-600">
        {title}
      </p>

      <div className="mt-1 flex items-end justify-between">

        <p className="text-2xl font-semibold text-white">
          {value}
        </p>

        <span className="text-[9px] text-slate-600">
          {footer}
        </span>

      </div>

    </motion.div>
  );
}

/* =============================================================
   SIGNAL POINT
============================================================= */

function SignalPoint({
  top,
  left,
}) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.7, 1],
        opacity: [1, 0.4, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
      style={{
        top,
        left,
      }}
      className="absolute h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
    />
  );
}

/* =============================================================
   ALERT
============================================================= */

function Alert({
  level,
  title,
  time,
}) {
  const levelClass =
    level === "HIGH"
      ? "text-red-400 bg-red-400/10"
      : level === "MEDIUM"
      ? "text-amber-400 bg-amber-400/10"
      : "text-cyan-400 bg-cyan-400/10";

  return (
    <div className="p-5 transition hover:bg-slate-900/30">

      <div className="flex items-center justify-between">

        <span
          className={`rounded px-2 py-1 text-[8px] ${levelClass}`}
        >
          {level}
        </span>

        <span className="text-[9px] text-slate-700">
          {time}
        </span>

      </div>

      <p className="mt-3 text-xs text-slate-300">
        {title}
      </p>

      <div className="mt-2 flex items-center gap-1 text-[9px] text-slate-600">

        <Target size={11} />

        Monitoring environment

      </div>

    </div>
  );
}

export default App;