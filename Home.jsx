import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import ScanPanel from '../components/ScanPanel';
import ScanHistory from '../components/ScanHistory';
import './Home.css';

export default function Home({ history, onScanComplete, onClearHistory }) {
  return (
    <main className="home-page">
      <HeroSection />
      <ScanPanel onScanComplete={onScanComplete} />

      {/* Inline history teaser on home */}
      {history.length > 0 && (
        <section className="home-history-section">
          <div className="page-content">
            <div className="card">
              <ScanHistory history={history.slice(0, 5)} onClear={onClearHistory} />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
