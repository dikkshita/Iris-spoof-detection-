import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Activity, ShieldAlert, ShieldCheck } from 'lucide-react';
import { getHistory } from '../api/irisApi';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, real: 0, fake: 0 });

  useEffect(() => {
    getHistory().then(records => {
        const total = records.length;
        const real = records.filter(r => r.prediction === 'Real').length;
        const fake = records.filter(r => r.prediction === 'Fake').length;
        setStats({ total, real, fake });
    }).catch(err => {
        console.error("Failed to load history for dashboard", err);
    });
  }, []);

  return (
    <main className="dashboard-page page-content">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="dashboard-header"
      >
        <h1 className="section-title">System Analytics</h1>
        <p className="section-sub">Real-time statistics of biometric scans</p>
      </motion.div>

      <div className="stats-grid">
        <motion.div className="stat-card card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <BarChart3 className="stat-icon" size={32} />
            <div className="stat-info">
              <h3>Total Scans</h3>
              <p className="stat-value">{stats.total}</p>
            </div>
        </motion.div>
        
        <motion.div className="stat-card card real" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <ShieldCheck className="stat-icon" size={32} />
            <div className="stat-info">
              <h3>Authentic Reads</h3>
              <p className="stat-value">{stats.real}</p>
            </div>
        </motion.div>
        
        <motion.div className="stat-card card fake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <ShieldAlert className="stat-icon" size={32} />
            <div className="stat-info">
              <h3>Spoof Attempts</h3>
              <p className="stat-value">{stats.fake}</p>
            </div>
        </motion.div>
      </div>
      
      <motion.div className="chart-placeholder card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
         <Activity size={48} opacity={0.2} />
         <p>Weekly Scan Activity Chart Integration Pending</p>
      </motion.div>

    </main>
  );
}
