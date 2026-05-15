import { motion } from 'framer-motion';
import { History as HistoryIcon, BarChart3, CheckCircle2, XCircle } from 'lucide-react';
import ScanHistory from '../components/ScanHistory';
import './History.css';

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="stat-card card">
      <div className="stat-icon" style={{ color }}>
        <Icon size={22} />
      </div>
      <div>
        <div className="stat-number" style={{ color }}>{value}</div>
        <div className="stat-label-text">{label}</div>
      </div>
    </div>
  );
}

export default function HistoryPage({ history, onClear }) {
  const total = history.length;
  const real = history.filter((h) => h.prediction === 'Real').length;
  const fake = total - real;
  const avgConf = total > 0
    ? (history.reduce((acc, h) => acc + h.confidence, 0) / total).toFixed(1)
    : '—';

  return (
    <main className="history-page">
      <div className="page-content history-inner">
        {/* Header */}
        <motion.div
          className="history-page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="history-page-icon">
            <HistoryIcon size={28} />
          </div>
          <div>
            <h1 className="history-page-title">Scan History</h1>
            <p className="history-page-sub">All iris scans from this session</p>
          </div>
        </motion.div>

        {/* Stats Row */}
        {total > 0 && (
          <motion.div
            className="stats-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatCard icon={BarChart3} label="Total Scans" value={total} color="var(--accent-light)" />
            <StatCard icon={CheckCircle2} label="Authentic" value={real} color="var(--success)" />
            <StatCard icon={XCircle} label="Spoofed" value={fake} color="var(--danger)" />
            <StatCard icon={BarChart3} label="Avg Confidence" value={`${avgConf}%`} color="var(--cyan)" />
          </motion.div>
        )}

        {/* History List */}
        <motion.div
          className="card history-list-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ScanHistory history={history} onClear={onClear} />
        </motion.div>
      </div>
    </main>
  );
}
