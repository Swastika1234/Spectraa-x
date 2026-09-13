import {
  Activity,
  ArrowLeft,
  BarChart3,
  Gauge,
  Radio,
  Shield,
  Signal,
  TrendingUp,
} from "lucide-react";

const frequencyData = [
  { label: "433 MHz", value: 42 },
  { label: "868 MHz", value: 58 },
  { label: "915 MHz", value: 74 },
  { label: "2.4 GHz", value: 91 },
  { label: "5.8 GHz", value: 67 },
];

const signalTypes = [
  { type: "Digital", count: 48 },
  { type: "Telemetry", count: 31 },
  { type: "Unknown", count: 19 },
  { type: "Control", count: 14 },
];

function Analytics({ onBack }) {
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
              SMARTSCAN-EV
            </p>

            <h1 className="mt-1 text-lg font-semibold text-white">
              Analytics
            </h1>
          </div>

        </div>

        <div className="flex items-center gap-2">

          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

          <span className="text-[9px] tracking-widest text-emerald-400">
            ANALYTICS ONLINE
          </span>

        </div>

      </header>

      {/* CONTENT */}
      <main className="p-5 md:p-8">

        {/* TITLE */}
        <div className="mb-6">

          <p className="text-[9px] tracking-[0.3em] text-cyan-500">
            SYSTEM ANALYTICS
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">
            Spectrum Intelligence Analytics
          </h2>

          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Monitor simulated spectrum activity, signal distribution,
            detection trends and system performance.
          </p>

        </div>

        {/* STAT CARDS */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <AnalyticsCard
            icon={<Signal size={18} />}
            title="TOTAL SIGNALS"
            value="128"
            change="+12.4%"
          />

          <AnalyticsCard
            icon={<Activity size={18} />}
            title="AVG SIGNAL STRENGTH"
            value="-54 dBm"
            change="+4.2%"
          />

          <AnalyticsCard
            icon={<Gauge size={18} />}
            title="SPECTRUM UTILIZATION"
            value="67%"
            change="+8.7%"
          />

          <AnalyticsCard
            icon={<Shield size={18} />}
            title="DETECTION ACCURACY"
            value="94.8%"
            change="+2.1%"
          />

        </div>

        {/* MAIN ANALYTICS GRID */}
        <div className="mt-5 grid gap-5 xl:grid-cols-3">

          {/* FREQUENCY CHART */}
          <section className="rounded-2xl border border-cyan-500/10 bg-[#060b11] p-5 xl:col-span-2">

            <div className="flex items-center justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <BarChart3
                    size={17}
                    className="text-cyan-400"
                  />

                  <h3 className="text-sm font-semibold text-white">
                    Frequency Distribution
                  </h3>

                </div>

                <p className="mt-1 text-[10px] text-slate-600">
                  Relative signal activity across monitored bands
                </p>

              </div>

              <span className="rounded-md border border-cyan-400/20 px-2 py-1 text-[8px] text-cyan-400">
                LIVE DATA
              </span>

            </div>

            {/* BARS */}
            <div className="mt-8 space-y-5">

              {frequencyData.map((item) => (

                <div key={item.label}>

                  <div className="mb-2 flex items-center justify-between">

                    <span className="text-[10px] text-slate-400">
                      {item.label}
                    </span>

                    <span className="text-[10px] text-cyan-400">
                      {item.value}%
                    </span>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-900">

                    <div
                      className="h-full rounded-full bg-cyan-400 transition-all duration-700"
                      style={{
                        width: `${item.value}%`,
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </section>

          {/* SIGNAL TYPES */}
          <section className="rounded-2xl border border-cyan-500/10 bg-[#060b11] p-5">

            <div className="flex items-center gap-2">

              <Radio
                size={17}
                className="text-cyan-400"
              />

              <h3 className="text-sm font-semibold text-white">
                Signal Classification
              </h3>

            </div>

            <p className="mt-1 text-[10px] text-slate-600">
              Detected signal categories
            </p>

            <div className="mt-7 space-y-4">

              {signalTypes.map((item) => (

                <div
                  key={item.type}
                  className="rounded-xl border border-slate-800 bg-[#04080d] p-4"
                >

                  <div className="flex items-center justify-between">

                    <span className="text-xs text-slate-300">
                      {item.type}
                    </span>

                    <span className="text-sm font-semibold text-cyan-400">
                      {item.count}
                    </span>

                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-900">

                    <div
                      className="h-full rounded-full bg-cyan-400/70"
                      style={{
                        width: `${Math.min(item.count * 2, 100)}%`,
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </section>

        </div>

        {/* PERFORMANCE */}
        <section className="mt-5 rounded-2xl border border-cyan-500/10 bg-[#060b11] p-5">

          <div className="flex items-center justify-between">

            <div>

              <div className="flex items-center gap-2">

                <TrendingUp
                  size={17}
                  className="text-cyan-400"
                />

                <h3 className="text-sm font-semibold text-white">
                  Detection Performance
                </h3>

              </div>

              <p className="mt-1 text-[10px] text-slate-600">
                Simulated system performance over the current session
              </p>

            </div>

            <span className="text-[9px] text-emerald-400">
              STABLE
            </span>

          </div>

          {/* PERFORMANCE GRAPH */}
          <div className="relative mt-6 h-[220px] overflow-hidden rounded-xl border border-cyan-500/10 bg-[#03070b]">

            {/* GRID */}

            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(34,211,238,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.15) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* GRAPH LINE */}

            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 1000 220"
              preserveAspectRatio="none"
            >

              <polyline
                fill="none"
                stroke="rgba(34,211,238,0.9)"
                strokeWidth="3"
                points="
                  0,165
                  100,150
                  200,158
                  300,120
                  400,135
                  500,105
                  600,112
                  700,82
                  800,95
                  900,55
                  1000,65
                "
              />

            </svg>

            <div className="absolute bottom-3 left-4 text-[8px] text-slate-700">
              T-60 MIN
            </div>

            <div className="absolute bottom-3 right-4 text-[8px] text-slate-700">
              CURRENT
            </div>

          </div>

        </section>

        {/* SYSTEM SUMMARY */}
        <div className="mt-5 grid gap-4 md:grid-cols-3">

          <SummaryCard
            title="SCAN EFFICIENCY"
            value="91.6%"
            subtitle="Optimal"
          />

          <SummaryCard
            title="SIGNAL PROCESSING"
            value="18.4 ms"
            subtitle="Average latency"
          />

          <SummaryCard
            title="SYSTEM HEALTH"
            value="99.98%"
            subtitle="Operational"
          />

        </div>

      </main>
    </div>
  );
}

/* =========================================================
   ANALYTICS CARD
========================================================= */

function AnalyticsCard({
  icon,
  title,
  value,
  change,
}) {
  return (
    <div className="rounded-2xl border border-cyan-500/10 bg-[#060b11] p-5">

      <div className="flex items-center justify-between">

        <div className="rounded-lg border border-cyan-400/10 bg-cyan-400/5 p-2 text-cyan-400">
          {icon}
        </div>

        <span className="text-[9px] text-emerald-400">
          {change}
        </span>

      </div>

      <p className="mt-5 text-[9px] tracking-[0.2em] text-slate-600">
        {title}
      </p>

      <p className="mt-1 text-2xl font-semibold text-white">
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div className="rounded-2xl border border-cyan-500/10 bg-[#060b11] p-5">

      <p className="text-[9px] tracking-[0.2em] text-slate-600">
        {title}
      </p>

      <div className="mt-3 flex items-end justify-between">

        <p className="text-xl font-semibold text-white">
          {value}
        </p>

        <span className="text-[9px] text-emerald-400">
          {subtitle}
        </span>

      </div>

    </div>
  );
}

export default Analytics;