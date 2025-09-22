/**
 * Main App Component - Dashboard-First Approach
 * 
 * This is the NEW primary interface that prevents users from feeling "lost"
 * when dealing with hundreds of feed schedules
 */

import React, { useState } from 'react';
import { FeedScheduleDashboard } from './components/Dashboard/FeedScheduleDashboard';
import { BatchUploadForm } from './components/FeedSchedules/BatchUploadForm';
import './App.css';
import './components/ui/ui.css';

export const App = () => {
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard' or 'upload'
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUploadSuccess = () => {
    setUploadSuccess(true);
    // Auto-switch back to dashboard after successful upload
    setTimeout(() => {
      setActiveView('dashboard');
      setUploadSuccess(false);
    }, 3000);
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">🏭</span>
            FlockView Feed Management
          </h1>
          <p className="app-subtitle">
            Streamlined feed schedule management for multiple farms
          </p>
        </div>
      </header>

      {/* NAVIGATION */}
      <nav className="app-navigation">
        <div className="nav-container">
          <button
            className={`nav-button ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveView('dashboard')}
          >
            <span className="nav-icon">📊</span>
            Dashboard
          </button>
          <button
            className={`nav-button ${activeView === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveView('upload')}
          >
            <span className="nav-icon">📁</span>
            Upload Schedules
          </button>
        </div>
      </nav>

      {/* SUCCESS MESSAGE */}
      {uploadSuccess && (
        <div className="success-message">
          <span className="success-icon">✅</span>
          Schedules uploaded successfully! Switching to dashboard...
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="app-main">
        {activeView === 'dashboard' && (
          <FeedScheduleDashboard />
        )}
        
        {activeView === 'upload' && (
          <div className="upload-container">
            <div className="upload-header">
              <h2>Upload Feed Schedules</h2>
              <p>
                Upload multiple PDF schedules at once. The system will automatically 
                extract farm names, barn numbers, delivery dates, and weights.
              </p>
            </div>
            <BatchUploadForm onUploadSuccess={handleUploadSuccess} />
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; 2024 FlockView Feed Management System</p>
          <p className="footer-note">
            Designed for managing hundreds of schedules efficiently
          </p>
        </div>
      </footer>
    </div>
  );
};
