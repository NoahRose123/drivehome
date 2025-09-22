/**
 * Feed Schedule Display Component
 * 
 * Displays feed schedules with weights prominently featured
 * Optimized for the streamlined data structure
 */

import React, { useState, useEffect } from 'react';
import { DataManager } from '../../services/dataManager';
import './FeedScheduleDisplay.css';

export const FeedScheduleDisplay = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    farm: '',
    barn: '',
    status: 'active'
  });
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  // Load schedules on component mount
  useEffect(() => {
    loadSchedules();
  }, [filters]);

  const loadSchedules = async () => {
    try {
      setLoading(true);
      const fetchedSchedules = await DataManager.getFeedSchedules(filters);
      setSchedules(fetchedSchedules);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error loading schedules:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleDeleteSchedule = async (scheduleId, fileName) => {
    if (window.confirm(`Are you sure you want to delete "${fileName}"?`)) {
      try {
        await DataManager.deleteFeedSchedule(scheduleId);
        await loadSchedules(); // Reload the list
        alert('Schedule deleted successfully');
      } catch (err) {
        alert(`Error deleting schedule: ${err.message}`);
      }
    }
  };

  const viewPdf = (fileData, fileName) => {
    if (fileData) {
      window.open(fileData, '_blank');
    } else {
      alert('PDF file not available');
    }
  };

  const downloadPdf = (fileData, fileName) => {
    if (fileData) {
      const link = document.createElement('a');
      link.href = fileData;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('PDF file not available');
    }
  };

  const getFarmColorClass = (farm) => {
    const farmColors = {
      'VAS': 'farm-vas',
      'EDG': 'farm-edg', 
      'APO': 'farm-apo',
      'SIG': 'farm-sig',
      'DFI': 'farm-dfi'
    };
    return farmColors[farm] || 'farm-unknown';
  };

  const formatWeight = (weight) => {
    return weight ? `${weight.toLocaleString()} KG` : 'N/A';
  };

  const getTotalWeight = (deliveryDates) => {
    return deliveryDates.reduce((sum, delivery) => sum + (delivery.weight || 0), 0);
  };

  if (loading) {
    return (
      <div className="feed-schedule-display loading">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading feed schedules...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="feed-schedule-display error">
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          <h3>Error Loading Schedules</h3>
          <p>{error}</p>
          <button onClick={loadSchedules} className="btn btn-primary">
            <i className="fas fa-redo"></i> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="feed-schedule-display">
      {/* Header with controls */}
      <div className="display-header">
        <div className="header-left">
          <h2>
            <i className="fas fa-calendar-alt"></i>
            Feed Schedules ({schedules.length})
          </h2>
        </div>
        
        <div className="header-controls">
          {/* Filters */}
          <div className="filter-controls">
            <select 
              value={filters.farm} 
              onChange={(e) => handleFilterChange('farm', e.target.value)}
              className="select filter-select"
            >
              <option value="">All Farms</option>
              <option value="VAS">VAS - Vassilakos</option>
              <option value="EDG">EDG - Edge</option>
              <option value="APO">APO - Apostolakos</option>
              <option value="SIG">SIG - Sigma</option>
              <option value="DFI">DFI</option>
            </select>
            
            <select 
              value={filters.barn} 
              onChange={(e) => handleFilterChange('barn', e.target.value)}
              className="select filter-select"
            >
              <option value="">All Barns</option>
              <option value="B1">Barn 1</option>
              <option value="B2">Barn 2</option>
              <option value="B3">Barn 3</option>
              <option value="B4">Barn 4</option>
            </select>
          </div>
          
          {/* View mode toggle */}
          <div className="view-toggle">
            <button 
              className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setViewMode('list')}
            >
              <i className="fas fa-list"></i> List
            </button>
            <button 
              className={`btn btn-sm ${viewMode === 'calendar' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setViewMode('calendar')}
            >
              <i className="fas fa-calendar"></i> Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Schedules List */}
      {schedules.length === 0 ? (
        <div className="no-schedules">
          <i className="fas fa-calendar-times"></i>
          <h3>No Feed Schedules Found</h3>
          <p>Upload some PDF schedules to get started.</p>
        </div>
      ) : (
        <div className={`schedules-container ${viewMode}`}>
          {schedules.map((schedule) => (
            <div key={schedule.id} className={`schedule-card ${getFarmColorClass(schedule.farm)}`}>
              {/* Schedule Header */}
              <div className="schedule-header">
                <div className="schedule-info">
                  <div className="location-badge">
                    <i className="fas fa-warehouse"></i>
                    {schedule.location}
                  </div>
                  <h3 className="schedule-title">{schedule.fileName}</h3>
                  <div className="schedule-meta">
                    <span className="upload-date">
                      <i className="fas fa-upload"></i>
                      {schedule.uploadDate ? new Date(schedule.uploadDate).toLocaleDateString() : 'N/A'}
                    </span>
                    <span className="file-size">
                      <i className="fas fa-file-pdf"></i>
                      {DataManager.formatFileSize(schedule.fileSize)}
                    </span>
                  </div>
                </div>
                
                <div className="schedule-summary">
                  <div className="summary-item">
                    <span className="label">Total Deliveries:</span>
                    <span className="value">{schedule.totalDeliveries}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Total Weight:</span>
                    <span className="value weight-highlight">
                      {formatWeight(schedule.totalWeight)}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Average Weight:</span>
                    <span className="value">{formatWeight(schedule.averageWeight)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Dates with Weights */}
              <div className="delivery-dates-section">
                <h4>
                  <i className="fas fa-truck"></i>
                  Delivery Schedule
                </h4>
                
                <div className="delivery-dates-grid">
                  {schedule.deliveryDates.map((delivery, index) => (
                    <div key={index} className="delivery-date-card">
                      <div className="delivery-date">
                        <div className="date-info">
                          <span className="date-day">
                            {delivery.date.toDate ? 
                              delivery.date.toDate().getDate() : 
                              new Date(delivery.date).getDate()
                            }
                          </span>
                          <span className="date-month">
                            {delivery.date.toDate ? 
                              delivery.date.toDate().toLocaleDateString('en-US', { month: 'short' }) :
                              new Date(delivery.date).toLocaleDateString('en-US', { month: 'short' })
                            }
                          </span>
                        </div>
                        <div className="date-details">
                          <span className="date-full">
                            {delivery.formattedDate}
                          </span>
                        </div>
                      </div>
                      
                      <div className="delivery-weight">
                        <div className="weight-display">
                          <span className="weight-value">
                            {formatWeight(delivery.weight)}
                          </span>
                          <span className="weight-label">Delivery Weight</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule Actions */}
              <div className="schedule-actions">
                <button 
                  onClick={() => viewPdf(schedule.fileData, schedule.fileName)}
                  className="btn btn-outline"
                  title="View PDF"
                >
                  <i className="fas fa-eye"></i> View PDF
                </button>
                
                <button 
                  onClick={() => downloadPdf(schedule.fileData, schedule.fileName)}
                  className="btn btn-outline"
                  title="Download PDF"
                >
                  <i className="fas fa-download"></i> Download
                </button>
                
                <button 
                  onClick={() => handleDeleteSchedule(schedule.id, schedule.fileName)}
                  className="btn btn-danger"
                  title="Delete Schedule"
                >
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedScheduleDisplay;
