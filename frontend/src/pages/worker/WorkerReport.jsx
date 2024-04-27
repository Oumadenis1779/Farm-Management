import React, { useState, useEffect } from 'react';
import WorkerSidebar from './WorkerSidebar'; // Ensure the import path and filename are correct
import WorkerNavbar from './WorkerNavbar'; // Ensure the import path and filename are correct

function WorkerReport() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch reports data from backend API
    fetchReports();
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  const fetchReports = async () => {
    try {
      // Fetch reports data from backend API
      const response = await fetch('your-backend-api-endpoint');
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }
      const data = await response.json();
      // Update state with fetched reports data
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div>
      <WorkerNavbar />
      <div className="content-container" style={{ marginLeft: '400px', marginTop: '100px', marginRight: '20px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2>Reports</h2>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Worker Name</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.workerName}</td>
                <td>{report.report}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <WorkerSidebar />
    </div>
  );
}

export default WorkerReport;
