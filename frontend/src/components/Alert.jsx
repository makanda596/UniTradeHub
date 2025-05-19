import React, { useEffect } from 'react';
import { AdminAuthStore } from '../utilis/admin';

const Alert = () => {
    const { alerts, loading, error, fetchAlerts } = AdminAuthStore();

  useEffect(() => {
     fetchAlerts();
  }, []);

  return (
    <div className="space-y-3 p-4">
      <h2 className="text-xl font-semibold">System Alerts</h2>

      {loading && <p>Loading alerts...</p>}
      {error && <p className="text-red-500">{error}</p>}
 
      {!loading && alerts.length === 0 && (
        <p className="text-gray-600">No alerts at the moment.</p>
      )}

      {alerts.map((alert, index) => (
        <div
          key={index}
          className="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded shadow"
        >
          <p className="text-sm text-gray-800">{alert.message}</p>
          <p className="text-xs text-gray-500">
            {new Date(alert.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Alert;
