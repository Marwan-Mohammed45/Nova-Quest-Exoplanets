// pages/Dashboard.js
import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    { title: 'Total Users', value: '12,426', change: '+12%', icon: '👥' },
    { title: 'Revenue', value: '$24,826', change: '+8%', icon: '💰' },
    { title: 'Orders', value: '1,248', change: '+5%', icon: '📦' },
    { title: 'Growth', value: '32.4%', change: '+15%', icon: '📈' }
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'placed an order', time: '2 min ago' },
    { user: 'Sarah Smith', action: 'registered', time: '5 min ago' },
    { user: 'Mike Johnson', action: 'completed payment', time: '10 min ago' },
    { user: 'Emily Brown', action: 'updated profile', time: '15 min ago' }
  ];

  return (
    <div className="dashboard">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-change positive">{stat.change}</div>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-title">{stat.title}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="chart-section">
          <div className="section-header">
            <h3>Revenue Chart</h3>
            <select className="period-selector">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="chart-placeholder">
            [Revenue Chart Area]
            <div className="chart-bars">
              {[40, 60, 75, 50, 80, 90, 70].map((height, i) => (
                <div key={i} className="chart-bar" style={{ height: `${height}%` }}></div>
              ))}
            </div>
          </div>
        </div>

        <div className="activities-section">
          <div className="section-header">
            <h3>Recent Activities</h3>
          </div>
          <div className="activities-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-avatar">👤</div>
                <div className="activity-content">
                  <div className="activity-text">
                    <strong>{activity.user}</strong> {activity.action}
                  </div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;