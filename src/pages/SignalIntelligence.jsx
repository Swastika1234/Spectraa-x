import { useMemo, useState } from "react";
import {
  Activity,
  ArrowLeft,
  BarChart3,
  Radio,
  Search,
  Signal,
  Shield,
  Target,
  Wifi,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const signalData = [
  {
    id: "SIG-001",
    frequency: "2.41 GHz",
    strength: "-42 dBm",
    type: "Digital",
    confidence: 96,
    status: "Monitored",
    source: "Unknown Device",
  },
  {
    id: "SIG-002",
    frequency: "5.80 GHz",
    strength: "-51 dBm",
    type: "Unknown",
    confidence: 81,
    status: "Analyzing",
    source: "Unclassified",
  },
  {
    id: "SIG-003",
    frequency: "915 MHz",
    strength: "-58 dBm",
    type: "Telemetry",
    confidence: 91,
    status: "Monitored",
    source: "Telemetry Pattern",
  },
  {
    id: "SIG-004",
    frequency: "433 MHz",
    strength: "-64 dBm",
    type: "Digital",
    confidence: 88,
    status: "Monitored",
    source: "Digital Pattern",
  },
  {
    id: "SIG-005",
    frequency: "1.28 GHz",
    strength: "-47 dBm",
    type: "Unknown",
    confidence: 74,
    status: "Analyzing",
    source: "Unclassified",
  },
];

function SignalIntelligence({ onBack }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredSignals = useMemo(() => {
    return signalData.filter((signal) => {
      const matchesSearch =
        signal.id.toLowerCase().includes(search.toLowerCase()) ||
        signal.frequency.toLowerCase().includes(search.toLowerCase()) ||
        signal.type.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || signal.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <div className="min-h-screen bg-[#03070b] text-slate-200">

      {/* HEADER */}
      <header className="flex h-20 items-center justify-between border-b border-cyan-500/10 bg-[#050a10] px-5 md:px-8">

        <div className="flex items-center gap-4">

          <button
            onClick={onBack}
            className="rounded-lg border border-slate-800 p-2 text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-400"
          >
            <ArrowLeft size={17} />
          </button>

          <div>
            <p className="text-[9px] tracking-[0.35em] text-cyan-500">
              SPECTRUM INTELLIGENCE
            </p>

            <h1 className="mt-1 text-lg font-semibold text-white">
              Signal Intelligence
            </h1>
          </div>

        </div>

        <div className="flex items-center gap-2">

          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

          <span className="text-[9px] tracking-widest text-slate-500">
            INTELLIGENCE ENGINE ONLINE
          </span>

        </div>

      </header>

      {/* CONTENT */}
      <main className="p-5 md:p-8">

        <div className="mb-6">

          <p className="text-[9px] tracking-[0.3em] text-cyan-500">
            SIGNAL ANALYSIS
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">
            Signal Intelligence Center
          </h2>

          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Analyze detected spectrum activity and review simulated signal
            classifications.
          </p>
        
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <InfoCard
            icon={<Signal size={18} />}
            title="TOTAL SIGNALS"
            value="128"
            subtitle="Detected today"
          />

          <InfoCard
            icon={<Target size={18} />}
            title="CLASSIFIED"
            value="94"
            subtitle="73.4% confidence"
          />

          <InfoCard
            icon={<Zap size={18} />}
            title="HIGH ACTIVITY"
            value="12"
            subtitle="Requires review"
          />

          <InfoCard
            icon={<Shield size={18} />}
            title="THREAT STATUS"
            value="NORMAL"
            subtitle="No confirmed threat"
          />

        </div>

        {/* ACTIVITY GRAPH */}
        <section className="mt-5 rounded-2xl border border-cyan-500/10 bg-[#060b11] p-5">

          <div className="flex items-center justify-between">

            <div>

              <div className="flex items-center gap-2">
                <Activity size={17} className="text-cyan-400" />

                <h3 className="text-sm font-semibold text-white">
                  Signal Activity
                </h3>
              </div>

              <p className="mt-1 text-[10px] text-slate-600">
                Simulated spectrum activity over time
              </p>

            </div>

            <span className="rounded-md border border-emerald-400/20 px-2 py-1 text-[8px] text-emerald-400">
              LIVE
            </span>

          </div>

          <div className="relative mt-5 h-52 overflow-hidden rounded-xl border border-cyan-500/10 bg-[#03070b]">

            {/* GRID */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(34,211,238,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.15) 1px, transparent 1px)",
                backgroundSize: "45px 45px",
              }}
            />

            {/* GRAPH */}
            <div className="absolute inset-x-5 bottom-5 flex h-40 items-end gap-1">

              {Array.from({ length: 65 }).map((_, index) => {

                const height =
                  15 +
                  ((index * 23) % 60) +
                  (index % 8 === 0 ? 20 : 0);

                return (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{
                      height: `${Math.min(height, 92)}%`,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.01,
                    }}
                    className="flex-1 rounded-t bg-cyan-400/50"
                  />
                );
              })}

            </div>

            <div className="absolute bottom-2 left-5 text-[8px] text-slate-700">
              TIME → 
            </div>

          </div>

        </section>

        {/* SIGNAL TABLE */}
        <section className="mt-5 overflow-hidden rounded-2xl border border-cyan-500/10 bg-[#060b11]">

          {/* TABLE HEADER */}
          <div className="flex flex-col gap-4 border-b border-cyan-500/10 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="flex items-center gap-2">
                <Radio size={16} className="text-cyan-400" />

                <h3 className="text-sm font-semibold text-white">
                  Detected Signal Intelligence
                </h3>
              </div>

              <p className="mt-1 text-[10px] text-slate-600">
                Signal classification and confidence analysis
              </p>

            </div>
          
            {/* SEARCH */}
            <div className="flex gap-2">

              <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-[#04080d] px-3">

                <Search size={14} className="text-slate-600" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search signal..."
                  className="w-36 bg-transparent py-2 text-xs text-slate-300 outline-none placeholder:text-slate-700"
                />

              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-lg border border-slate-800 bg-[#04080d] px-3 text-xs text-slate-400 outline-none"
              >
                <option>All</option>
                <option>Digital</option>
                <option>Unknown</option>
                <option>Telemetry</option>
              </select>

            </div>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px] text-left">

              <thead>

                <tr className="border-b border-slate-800 text-[9px] tracking-widest text-slate-600">

                  <th className="px-5 py-4">SIGNAL ID</th>
                  <th className="px-5 py-4">FREQUENCY</th>
                  <th className="px-5 py-4">STRENGTH</th>
                  <th className="px-5 py-4">TYPE</th>
                  <th className="px-5 py-4">CONFIDENCE</th>
                  <th className="px-5 py-4">SOURCE</th>
                  <th className="px-5 py-4">STATUS</th>

                </tr>

              </thead>

              <tbody>

                {filteredSignals.map((signal) => (

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

                    <td className="px-5 py-4">

                      <span className="rounded-md bg-cyan-400/10 px-2 py-1 text-[9px] text-cyan-400">
                        {signal.type}
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-800">

                          <div
                            className="h-full rounded-full bg-cyan-400"
                            style={{
                              width: `${signal.confidence}%`,
                            }}
                          />

                        </div>

                        <span className="text-[10px] text-slate-400">
                          {signal.confidence}%
                        </span>

                      </div>

                    </td>

                    <td className="px-5 py-4 text-xs text-slate-500">
                      {signal.source}
                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={`inline-flex items-center gap-1.5 text-[9px] ${
                          signal.status === "Analyzing"
                            ? "text-amber-400"
                            : "text-emerald-400"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            signal.status === "Analyzing"
                              ? "bg-amber-400"
                              : "bg-emerald-400"
                          }`}
                        />

                        {signal.status.toUpperCase()}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {filteredSignals.length === 0 && (

            <div className="flex flex-col items-center justify-center py-16">

              <Wifi size={25} className="text-slate-700" />

              <p className="mt-3 text-xs text-slate-500">
                No matching signals found
              </p>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

function InfoCard({ icon, title, value, subtitle }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-cyan-500/10 bg-[#060b11] p-5"
    >

      <div className="flex items-center justify-between">

        <div className="rounded-lg border border-cyan-400/10 bg-cyan-400/5 p-2 text-cyan-400">
          {icon}
        </div>

        <BarChart3 size={14} className="text-slate-700" />

      </div>

      <p className="mt-5 text-[9px] tracking-[0.2em] text-slate-600">
        {title}
      </p>

      <p className="mt-1 text-2xl font-semibold text-white">
        {value}
      </p>

      <p className="mt-1 text-[9px] text-slate-600">
        {subtitle}
      </p>

    </motion.div>
  );
}

export default SignalIntelligence;