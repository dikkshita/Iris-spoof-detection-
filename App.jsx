import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import HistoryPage from './pages/History';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import './App.css';

export default function App() {
  const [scanHistory, setScanHistory] = useState([]);

  const handleScanComplete = (result) => {
    setScanHistory((prev) => [result, ...prev].slice(0, 50));
  };

  const handleClearHistory = () => setScanHistory([]);

  return (
    <div className="app-container">
      {/* Animated background */}
      <div className="bg-grid" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              history={scanHistory}
              onScanComplete={handleScanComplete}
              onClearHistory={handleClearHistory}
            />
          }
        />
        <Route
          path="/history"
          element={
            <HistoryPage
              history={scanHistory}
              onClear={handleClearHistory}
            />
          }
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/settings"
          element={<Settings />}
        />
      </Routes>
    </div>
  );
}
