/**
 * Feed Schedule Dashboard - AGGREGATED VIEW
 * 
 * This is a COMPLETELY NEW APPROACH for managing hundreds of schedules
 * Instead of showing individual files, it aggregates and visualizes data
 * to prevent users from feeling "lost" with large volumes
 */

import React, { useState, useEffect } from 'react';
import { DataManager } from '../../services/dataManager';
import './FeedScheduleDashboard.css';

export const FeedScheduleDashboard = () => {
  const [aggregatedData, setAggregatedData] = useState({
    farms: {},
    timeline: [],
    summary: {
      totalSchedules: 0,
      totalDeliveries: 0,
      totalWeight: 0,
      activeFarms: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [selectedFarm, setSelectedFarm] = useState('all');
  const [selectedBarn, setSelectedBarn] = useState('all');
  const [viewMode, setViewMode] = useState('overview'); // 'overview', 'timeline', 'details'
  const [dateRange, setDateRange] = useState('30'); // days ahead

  useEffect(() => {
    loadAggregatedData();
  }, [dateRange]);

  const loadAggregatedData = async () => {
    try {
      setLoading(true);
      const schedules = await DataManager.getFeedSchedules();
      
      // AGGREGATE DATA BY FARM/BARN
      const farms = {};
      const timeline = [];
      let totalSchedules = 0;
      let totalDeliveries = 0;
      let totalWeight = 0;
      const activeFarms = new Set();

      schedules.forEach(schedule => {
        const farmKey = schedule.farm;
        const barnKey = schedule.barn;
        const locationKey = `${farmKey}-${barnKey}`;

        // Initialize farm data
        if (!farms[farmKey]) {
          farms[farmKey] = {
            name: farmKey,
            barns: {},
            totalDeliveries: 0,
            totalWeight: 0,
            scheduleCount: 0,
            upcomingDeliveries: 0
          };
        }

        // Initialize barn data
        if (!farms[farmKey].barns[barnKey]) {
          farms[farmKey].barns[barnKey] = {
            name: barnKey,
            deliveries: [],
            totalWeight: 0,
            scheduleCount: 0,
            upcomingDeliveries: 0
          };
        }

        // Add schedule data
        farms[farmKey].scheduleCount++;
        farms[farmKey].barns[barnKey].scheduleCount++;
        totalSchedules++;

        // Process deliveries
        schedule.deliveryDates.forEach(delivery => {
          const deliveryDate = new Date(delivery.date);
          const today = new Date();
          const daysUntilDelivery = Math.ceil((deliveryDate - today) / (1000 * 60 * 60 * 24));

          // Add to timeline
          timeline.push({
            date: delivery.date,
            farm: farmKey,
            barn: barnKey,
            weight: delivery.weight,
            daysUntil: daysUntilDelivery,
            location: locationKey
          });

          // Update totals
          totalDeliveries++;
          totalWeight += delivery.weight;
          farms[farmKey].totalDeliveries++;
          farms[farmKey].totalWeight += delivery.weight;
          farms[farmKey].barns[barnKey].totalWeight += delivery.weight;
          farms[farmKey].barns[barnKey].deliveries.push(delivery);

          // Count upcoming deliveries
          if (daysUntilDelivery >= 0 && daysUntilDelivery <= parseInt(dateRange)) {
            farms[farmKey].upcomingDeliveries++;
            farms[farmKey].barns[barnKey].upcomingDeliveries++;
          }

          activeFarms.add(farmKey);
        });
      });

      // Sort timeline by date
      timeline.sort((a, b) => new Date(a.date) - new Date(b.date));

      setAggregatedData({
        farms,
        timeline,
        summary: {
          totalSchedules,
          totalDeliveries,
          totalWeight,
          activeFarms: activeFarms.size
        }
      });

    } catch (error) {
      console.error('Error loading aggregated data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredTimeline = () => {
    let filtered = aggregatedData.timeline;
    
    if (selectedFarm !== 'all') {
      filtered = filtered.filter(item => item.farm === selectedFarm);
    }
    
    if (selectedBarn !== 'all') {
      filtered = filtered.filter(item => item.barn === selectedBarn);
    }

    return filtered;
  };

  const getUpcomingDeliveries = () => {
    return getFilteredTimeline().filter(item => 
      item.daysUntil >= 0 && item.daysUntil <= parseInt(dateRange)
    );
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Aggregating your feed schedule data...</p>
      </div>
    );
  }

  return (
    <div className="feed-schedule-dashboard">
      {/* HEADER WITH SUMMARY CARDS */}
      <div className="dashboard-header">
        <h1>Feed Schedule Dashboard</h1>
        <div className="summary-cards">
          <div className="summary-card total-schedules">
            <div className="card-icon">📄</div>
            <div className="card-content">
              <div className="card-value">{aggregatedData.summary.totalSchedules}</div>
              <div className="card-label">Total Schedules</div>
            </div>
          </div>
          
          <div className="summary-card total-deliveries">
            <div className="card-icon">🚚</div>
            <div className="card-content">
              <div className="card-value">{aggregatedData.summary.totalDeliveries}</div>
              <div className="card-label">Total Deliveries</div>
            </div>
          </div>
          
          <div className="summary-card total-weight">
            <div className="card-icon">⚖️</div>
            <div className="card-content">
              <div className="card-value">{formatWeight(aggregatedData.summary.totalWeight)}</div>
              <div className="card-label">Total Weight</div>
            </div>
          </div>
          
          <div className="summary-card active-farms">
            <div className="card-icon">🏭</div>
            <div className="card-content">
              <div className="card-value">{aggregatedData.summary.activeFarms}</div>
              <div className="card-label">Active Farms</div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS AND CONTROLS */}
      <div className="dashboard-controls">
        <div className="filter-group">
          <label>Farm:</label>
          <select 
            value={selectedFarm} 
            onChange={(e) => setSelectedFarm(e.target.value)}
            className="select filter-select"
          >
            <option value="all">All Farms</option>
            {Object.keys(aggregatedData.farms).map(farm => (
              <option key={farm} value={farm}>{farm}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Barn:</label>
          <select 
            value={selectedBarn} 
            onChange={(e) => setSelectedBarn(e.target.value)}
            className="select filter-select"
          >
            <option value="all">All Barns</option>
            {selectedFarm !== 'all' && aggregatedData.farms[selectedFarm] && 
              Object.keys(aggregatedData.farms[selectedFarm].barns).map(barn => (
                <option key={barn} value={barn}>{barn}</option>
              ))
            }
          </select>
        </div>

        <div className="filter-group">
          <label>View:</label>
          <select 
            value={viewMode} 
            onChange={(e) => setViewMode(e.target.value)}
            className="select filter-select"
          >
            <option value="overview">Overview</option>
            <option value="timeline">Timeline</option>
            <option value="details">Details</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Days Ahead:</label>
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="select filter-select"
          >
            <option value="7">7 Days</option>
            <option value="14">14 Days</option>
            <option value="30">30 Days</option>
            <option value="60">60 Days</option>
          </select>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="dashboard-content">
        {viewMode === 'overview' && (
          <div className="overview-view">
            {/* FARM SUMMARY CARDS */}
            <div className="farm-summary-grid">
              {Object.values(aggregatedData.farms).map(farm => (
                <div key={farm.name} className={`farm-summary-card ${getFarmColorClass(farm.name)}`}>
                  <div className="farm-header">
                    <h3>{farm.name}</h3>
                    <span className="farm-stats">
                      {farm.scheduleCount} schedules • {farm.totalDeliveries} deliveries
                    </span>
                  </div>
                  
                  <div className="farm-weight">
                    <div className="weight-display">
                      <span className="weight-value">{formatWeight(farm.totalWeight)}</span>
                      <span className="weight-label">Total Weight</span>
                    </div>
                  </div>

                  <div className="farm-barns">
                    <h4>Barns:</h4>
                    <div className="barn-list">
                      {Object.values(farm.barns).map(barn => (
                        <div key={barn.name} className="barn-item">
                          <span className="barn-name">{barn.name}</span>
                          <span className="barn-deliveries">{barn.deliveries.length} deliveries</span>
                          <span className="barn-weight">{formatWeight(barn.totalWeight)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {farm.upcomingDeliveries > 0 && (
                    <div className="upcoming-alert">
                      ⚠️ {farm.upcomingDeliveries} upcoming deliveries in next {dateRange} days
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {viewMode === 'timeline' && (
          <div className="timeline-view">
            <h3>Delivery Timeline (Next {dateRange} Days)</h3>
            <div className="timeline-container">
              {getUpcomingDeliveries().map((delivery, index) => (
                <div key={index} className={`timeline-item ${getFarmColorClass(delivery.farm)}`}>
                  <div className="timeline-date">
                    <div className="date-main">{formatDate(delivery.date)}</div>
                    <div className="date-days">
                      {delivery.daysUntil === 0 ? 'Today' : 
                       delivery.daysUntil === 1 ? 'Tomorrow' : 
                       `${delivery.daysUntil} days`}
                    </div>
                  </div>
                  
                  <div className="timeline-location">
                    <div className="location-farm">{delivery.farm}</div>
                    <div className="location-barn">Barn {delivery.barn}</div>
                  </div>
                  
                  <div className="timeline-weight">
                    <div className="weight-display">
                      <span className="weight-value">{formatWeight(delivery.weight)}</span>
                      <span className="weight-label">Delivery Weight</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {getUpcomingDeliveries().length === 0 && (
                <div className="no-deliveries">
                  <p>No upcoming deliveries in the next {dateRange} days</p>
                </div>
              )}
            </div>
          </div>
        )}

        {viewMode === 'details' && (
          <div className="details-view">
            <h3>Detailed Schedule Information</h3>
            <p>This view would show individual schedule details when needed.</p>
            <p>Click on any farm card above to drill down into specific schedules.</p>
          </div>
        )}
      </div>
    </div>
  );
};
