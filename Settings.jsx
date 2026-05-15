import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Bell, Moon, Sun, DownloadCloud, Lock, Database } from 'lucide-react';
import './Settings.css';

export default function Settings() {
  const [theme, setTheme] = useState('dark');
  const [autoSave, setAutoSave] = useState(true);
  const [strictMode, setStrictMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [localCache, setLocalCache] = useState(false);

  return (
    <main className="settings-page page-content">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="settings-header">
        <h1 className="section-title">System Configuration</h1>
        <p className="section-sub">Manage your biometric security preferences</p>
      </motion.div>

      <div className="settings-grid">
        {/* Appearance */}
        <motion.div className="settings-card card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="card-header">
            <Sun className="setting-icon" size={24} />
            <h2>Appearance</h2>
          </div>
          <div className="setting-row">
            <div className="setting-info">
              <h3>Dark Mode</h3>
              <p>Toggle deep space dark mode</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={theme === 'dark'} onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
              <span className="slider round"></span>
            </label>
          </div>
        </motion.div>

        {/* Security / Engine */}
        <motion.div className="settings-card card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="card-header">
            <Shield className="setting-icon" size={24} />
            <h2>Analysis Engine</h2>
          </div>
          <div className="setting-row">
            <div className="setting-info">
              <h3>Strict Mode</h3>
              <p>Flag scans with &lt; 80% confidence as spoof</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={strictMode} onChange={() => setStrictMode(!strictMode)} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="setting-row">
            <div className="setting-info">
              <h3>Auto-Save Reports</h3>
              <p>Automatically generate PDF on every scan</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={autoSave} onChange={() => setAutoSave(!autoSave)} />
              <span className="slider round"></span>
            </label>
          </div>
        </motion.div>

        {/* Data & Privacy */}
        <motion.div className="settings-card card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="card-header">
            <Database className="setting-icon" size={24} />
            <h2>Data & Privacy</h2>
          </div>
          <div className="setting-row">
            <div className="setting-info">
              <h3>Local Caching</h3>
              <p>Cache biometrics locally for faster history</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={localCache} onChange={() => setLocalCache(!localCache)} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="setting-row">
            <div className="setting-info">
              <h3>Telemetry</h3>
              <p>Send anonyous AI performance metrics</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
              <span className="slider round"></span>
            </label>
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div className="settings-card card highlight" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <Lock className="setting-icon success" size={24} />
            <div className="system-status-info">
              <h2>System Secured</h2>
              <p>ResNet50 Biometric Engine v1.0.0 via FastAPI</p>
              <button className="btn outline mt-4" onClick={() => alert('Wiping Database...')}>Purge All Data</button>
            </div>
        </motion.div>
      </div>
    </main>
  );
}
