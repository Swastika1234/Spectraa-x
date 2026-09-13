import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CircleAlert,
  Activity,
  Pause,
  Play,
  Radio,
  RotateCcw,
  ScanLine,
  Signal,
  ShieldCheck,
  Target,
  Zap,
} from "lucide-react";

const initialHistory = [
  {
    id: "SCAN-004",
    mode: "Adaptive",
    coverage: "94%",
    duration: "02:41",
    signals: 18,
    status: "Completed",
  },
  {
    id: "SCAN-003",
    mode: "Wideband",
    coverage: "87%",
    duration: "04:18",
    signals: 14,
    status: "Completed",
  },
  {
    id: "SCAN-002",
    mode: "Focused",
    coverage: "76%",
    duration: "01:52",
    signals: 9,
    status: "Completed",
  },
];

const signalResults = [
  {
    id: "SIG-021",
    frequency: "2.41 GHz",
    strength: "-42 dBm",
    type: "Digital",
    confidence: "96%",
    level: "HIGH",
  },
  {
    id: "SIG-022",
    frequency: "5.80 GHz",
    strength: "-51 dBm",
    type: "Unknown",
    confidence: "81%",
    level: "MEDIUM",
  },
  {
    id: "SIG-023",
    frequency: "915 MHz",
    strength: "-58 dBm",
    type: "Telemetry",
    confidence: "91%",
    level: "LOW",
  },
  {
    id: "SIG-024",
    frequency: "433 MHz",
    strength: "-64 dBm",
    type: "Digital",
    confidence: "88%",
    level: "LOW",
  },
];

function SmartScan({ onBack }) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState("Adaptive");
  const [scanComplete, setScanComplete] = useState(false);
  const [history, setHistory] = useState(initialHistory);
  const [scanCount, setScanCount] = useState(0);

  // Animated scan progress
  useEffect(() => {
    if (!scanning) return;

    const interval = setInterval(() => {
      setProgress((previous) => {
        if (previous >= 100) {
          clearInterval(interval);
          setScanning(false);
          setScanComplete(true);
          setScanCount((count) => count + 1);

          return 100;
        }

        return previous + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [scanning]);

  const startScan = () => {
    if (scanning) {
      setScanning(false);
      return;
    }

    if (progress >= 100) {
      setProgress(0);
      setScanComplete(false);
    }

    setScanning(true);
  };

  const resetScan = () => {
    setScanning(false);
    setProgress(0);
    setScanComplete(false);
  };

  const coverage = useMemo(() => {
    return Math.min(100, Math.round(progress * 0.94));
  }, [progress]);

  const detectedSignals = useMemo(() => {
    return Math.min(
      signalResults.length,
      Math.floor(progress / 25)
    );
  }, [progress]);

  const statusText = scanning
    ? "SCAN IN PROGRESS"
    : scanComplete
    ? "SCAN COMPLETE"
    : "SCANNER READY";

  return (
    <div className="min-h-screen bg-[#03070b] text-slate-200">

      {/* =====================================================
          HEADER
      ====================================================== */}

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
              Smart Scan
            </h1>

          </div>

        </div>

        <div className="flex items-center gap-2">

          <span
            className={`h-2 w-2 rounded-full ${
              scanning
                ? "animate-pulse bg-cyan-400"
                : scanComplete
                ? "bg-emerald-400"
                : "bg-slate-500"
            }`}
          />

          <span className="hidden text-[9px] tracking-widest text-slate-500 sm:block">
            {statusText}
          </span>

        </div>

      </header>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="p-5 md:p-8">

        {/* PAGE INTRO */}

        <div className="mb-6">

          <p className="text-[9px] tracking-[0.3em] text-cyan-500">
            INTELLIGENT SCANNING
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">
            Spectrum Scan Control
          </h2>

          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Configure and monitor a simulated spectrum scanning
            environment.
          </p>

        </div>

        {/* =====================================================
            LIVE METRICS
        ====================================================== */}

        <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <MetricCard
            icon={<Activity size={17} />}
            label="SCAN PROGRESS"
            value={`${progress}%`}
          />

          <MetricCard
            icon={<Signal size={17} />}
            label="SIGNALS DETECTED"
            value={detectedSignals}
          />

          <MetricCard
            icon={<Target size={17} />}
            label="COVERAGE"
            value={`${coverage}%`}
          />

          <MetricCard
            icon={<ShieldCheck size={17} />}
            label="ENVIRONMENT"
            value="SIMULATED"
          />

        </div>

        {/* =====================================================
            CONFIG + VISUALIZATION
        ====================================================== */}

        <div className="grid gap-5 xl:grid-cols-3">

          {/* ===================================================
              CONFIGURATION
          ==================================================== */}

          <section className="rounded-2xl border border-cyan-500/10 bg-[#060b11] p-5">

            <div className="flex items-center gap-2">

              <ScanLine
                size={17}
                className="text-cyan-400"
              />

              <h3 className="text-sm font-semibold text-white">
                Scan Configuration
              </h3>

            </div>

            <div className="mt-6 space-y-5">

              {/* MODE */}

              <div>

                <label className="text-[9px] tracking-widest text-slate-600">
                  SCAN MODE
                </label>

                <select
                  value={mode}
                  disabled={scanning}
                  onChange={(e) => {
                    setMode(e.target.value);
                    setScanComplete(false);
                  }}
                  className="mt-2 w-full rounded-lg border border-slate-800 bg-[#04080d] px-3 py-3 text-xs text-slate-300 outline-none transition focus:border-cyan-400/40 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option>Adaptive</option>
                  <option>Wideband</option>
                  <option>Focused</option>
                </select>

              </div>

              {/* PROFILES */}

              <div>

                <label className="text-[9px] tracking-widest text-slate-600">
                  SCAN PROFILE
                </label>

                <div className="mt-2 grid grid-cols-2 gap-2">

                  <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-3">

                    <Radio
                      size={15}
                      className="text-cyan-400"
                    />

                    <p className="mt-2 text-[10px] text-slate-300">
                      Spectrum
                    </p>

                    <p className="mt-1 text-[8px] text-slate-600">
                      Environment mapping
                    </p>

                  </div>

                  <div className="rounded-lg border border-slate-800 bg-[#04080d] p-3">

                    <Signal
                      size={15}
                      className="text-slate-500"
                    />

                    <p className="mt-2 text-[10px] text-slate-500">
                      Signal Analysis
                    </p>

                    <p className="mt-1 text-[8px] text-slate-700">
                      Pattern analysis
                    </p>

                  </div>

                </div>

              </div>

              {/* CONFIG STATUS */}

              <div className="rounded-lg border border-slate-800 bg-[#04080d] p-4">

                <div className="flex justify-between">

                  <span className="text-[9px] text-slate-600">
                    SELECTED MODE
                  </span>

                  <span className="text-[9px] text-cyan-400">
                    {mode}
                  </span>

                </div>

                <div className="mt-3 flex justify-between">

                  <span className="text-[9px] text-slate-600">
                    ENVIRONMENT
                  </span>

                  <span className="text-[9px] text-emerald-400">
                    SIMULATED
                  </span>

                </div>

                <div className="mt-3 flex justify-between">

                  <span className="text-[9px] text-slate-600">
                    SESSION
                  </span>

                  <span className="text-[9px] text-slate-400">
                    S-X01
                  </span>

                </div>

              </div>

              {/* ACTION BUTTONS */}

              <div className="flex gap-2">

                <button
                  onClick={startScan}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-xs font-semibold transition ${
                    scanning
                      ? "border border-amber-400/30 bg-amber-400/10 text-amber-400 hover:bg-amber-400/15"
                      : "bg-cyan-400 text-[#031016] hover:bg-cyan-300"
                  }`}
                >

                  {scanning ? (
                    <>
                      <Pause size={15} />
                      PAUSE SCAN
                    </>
                  ) : (
                    <>
                      <Play size={15} />
                      {scanComplete
                        ? "RUN AGAIN"
                        : "START SCAN"}
                    </>
                  )}

                </button>

                <button
                  onClick={resetScan}
                  className="rounded-lg border border-slate-800 px-4 text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-400"
                >
                  <RotateCcw size={15} />
                </button>

              </div>

            </div>

          </section>

          {/* ===================================================
              VISUALIZATION
          ==================================================== */}

          <section className="rounded-2xl border border-cyan-500/10 bg-[#060b11] p-5 xl:col-span-2">

            <div className="flex items-center justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <Activity
                    size={17}
                    className="text-cyan-400"
                  />

                  <h3 className="text-sm font-semibold text-white">
                    Spectrum Visualization
                  </h3>

                </div>

                <p className="mt-1 text-[10px] text-slate-600">
                  Simulated signal activity
                </p>

              </div>

              <span className="rounded-md border border-cyan-400/20 px-2 py-1 text-[8px] text-cyan-400">
                {mode.toUpperCase()}
              </span>

            </div>

            {/* GRAPH */}

            <div className="relative mt-5 h-[300px] overflow-hidden rounded-xl border border-cyan-500/10 bg-[#03070b]">

              {/* GRID */}

              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(34,211,238,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.15) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* CENTER LINE */}

              <div className="absolute left-0 right-0 top-1/2 h-px bg-cyan-400/10" />

              {/* SIGNAL BARS */}

              <div className="absolute inset-x-5 bottom-8 flex h-52 items-end gap-1">

                {Array.from({ length: 55 }).map(
                  (_, index) => {

                    const base =
                      15 +
                      ((index * 17) % 55);

                    const peak =
                      index % 5 === 0
                        ? 25
                        : index % 9 === 0
                        ? 18
                        : 0;

                    const animatedBoost =
                      scanning
                        ? Math.random() * 20
                        : 0;

                    const height = Math.min(
                      95,
                      base + peak + animatedBoost
                    );

                    return (
                      <div
                        key={index}
                        className={`flex-1 rounded-t transition-all duration-300 ${
                          index % 9 === 0
                            ? "bg-cyan-300/70"
                            : "bg-cyan-400/40"
                        }`}
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    );
                  }
                )}

              </div>

              {/* SCANNING LINE */}

              {scanning && (
                <div className="absolute bottom-0 top-0 w-px animate-[scanline_2s_linear_infinite] bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
              )}

              {/* COMPLETE BADGE */}

              {scanComplete && (
                <div className="absolute right-4 top-4 flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-3 py-2">

                  <CheckCircle2
                    size={13}
                    className="text-emerald-400"
                  />

                  <span className="text-[9px] text-emerald-400">
                    SCAN COMPLETE
                  </span>

                </div>
              )}

              {/* LABELS */}

              <div className="absolute bottom-2 left-5 text-[8px] text-slate-700">
                LOW FREQUENCY
              </div>

              <div className="absolute bottom-2 right-5 text-[8px] text-slate-700">
                HIGH FREQUENCY
              </div>

            </div>

            {/* PROGRESS */}

            <div className="mt-5">

              <div className="mb-2 flex justify-between">

                <span className="text-[9px] tracking-widest text-slate-600">
                  SCAN PROGRESS
                </span>

                <span className="text-xs font-semibold text-cyan-400">
                  {progress}%
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-900">

                <div
                  className="h-full rounded-full bg-cyan-400 transition-all duration-150"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>

          </section>

        </div>

        {/* =====================================================
            SCAN RESULTS
        ====================================================== */}

        {scanComplete && (
          <section className="mt-5 overflow-hidden rounded-2xl border border-cyan-500/10 bg-[#060b11]">

            <div className="flex items-center justify-between border-b border-cyan-500/10 px-5 py-4">

              <div>

                <div className="flex items-center gap-2">

                  <Zap
                    size={16}
                    className="text-cyan-400"
                  />

                  <h3 className="text-sm font-semibold text-white">
                    Scan Results
                  </h3>

                </div>

                <p className="mt-1 text-[10px] text-slate-600">
                  Detected signal patterns from simulated scan
                </p>

              </div>

              <span className="rounded-md bg-emerald-400/10 px-2 py-1 text-[8px] text-emerald-400">
                {detectedSignals} DETECTED
              </span>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[750px] text-left">

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
                      PRIORITY
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {signalResults
                    .slice(0, detectedSignals)
                    .map((signal) => (

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

                          <PriorityBadge
                            level={signal.level}
                          />

                        </td>

                      </tr>

                    ))}

                </tbody>

              </table>

            </div>

          </section>
        )}

        {/* =====================================================
            HISTORY
        ====================================================== */}

        <section className="mt-5 overflow-hidden rounded-2xl border border-cyan-500/10 bg-[#060b11]">

          <div className="border-b border-cyan-500/10 px-5 py-4">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-sm font-semibold text-white">
                  Scan History
                </h3>

                <p className="mt-1 text-[10px] text-slate-600">
                  Recent simulated scan sessions
                </p>

              </div>

              <span className="text-[9px] text-slate-600">
                SESSION {scanCount > 0 ? scanCount : "—"}
              </span>

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px] text-left">

              <thead>

                <tr className="border-b border-slate-800 text-[9px] tracking-widest text-slate-600">

                  <th className="px-5 py-4">
                    SCAN ID
                  </th>

                  <th className="px-5 py-4">
                    MODE
                  </th>

                  <th className="px-5 py-4">
                    COVERAGE
                  </th>

                  <th className="px-5 py-4">
                    SIGNALS
                  </th>

                  <th className="px-5 py-4">
                    DURATION
                  </th>

                  <th className="px-5 py-4">
                    STATUS
                  </th>

                </tr>

              </thead>

              <tbody>

                {history.map((scan) => (

                  <tr
                    key={scan.id}
                    className="border-b border-slate-800/60 transition hover:bg-cyan-400/[0.02]"
                  >

                    <td className="px-5 py-4 text-xs text-cyan-400">
                      {scan.id}
                    </td>

                    <td className="px-5 py-4 text-xs text-slate-400">
                      {scan.mode}
                    </td>

                    <td className="px-5 py-4 text-xs text-slate-400">
                      {scan.coverage}
                    </td>

                    <td className="px-5 py-4 text-xs text-slate-400">
                      {scan.signals}
                    </td>

                    <td className="px-5 py-4 text-xs text-slate-400">
                      {scan.duration}
                    </td>

                    <td className="px-5 py-4">

                      <span className="flex items-center gap-2 text-[9px] text-emerald-400">

                        <CheckCircle2 size={12} />

                        {scan.status}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

        {/* =====================================================
            DEMO NOTICE
        ====================================================== */}

        <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-400/10 bg-amber-400/[0.03] p-4">

          <CircleAlert
            size={16}
            className="mt-0.5 shrink-0 text-amber-400"
          />

          <div>

            <p className="text-[10px] font-medium text-amber-400">
              SIMULATION MODE
            </p>

            <p className="mt-1 text-[9px] leading-relaxed text-slate-600">
              Spectrum activity and detection results shown here
              are synthetic data for the SPECTRA-X demonstration
              interface.
            </p>

          </div>

        </div>

      </main>
    </div>
  );
}

/* ============================================================
   METRIC CARD
============================================================ */

function MetricCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-cyan-500/10 bg-[#060b11] p-4">

      <div className="flex items-center justify-between">

        <div className="rounded-lg border border-cyan-400/10 bg-cyan-400/5 p-2 text-cyan-400">
          {icon}
        </div>

        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

      </div>

      <p className="mt-4 text-[8px] tracking-[0.2em] text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-xl font-semibold text-white">
        {value}
      </p>

    </div>
  );
}

/* ============================================================
   PRIORITY BADGE
============================================================ */

function PriorityBadge({ level }) {
  const styles =
    level === "HIGH"
      ? "bg-red-400/10 text-red-400"
      : level === "MEDIUM"
      ? "bg-amber-400/10 text-amber-400"
      : "bg-cyan-400/10 text-cyan-400";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded px-2 py-1 text-[8px] ${styles}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {level}
    </span>
  );
}

export default SmartScan;