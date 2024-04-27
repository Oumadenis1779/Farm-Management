import React, { useState } from 'react';
import AdmSidebar from './adminsidebar';
import AdmNavbar from './AdminNavbar';

function AdminReport() {
  const [formData, setFormData] = useState({
    workerName: '',
    report: ''
  });

  const [reports, setReports] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      id: reports.length + 1,
      workerName: formData.workerName,
      report: formData.report
    };
    setReports([...reports, newReport]);
    setFormData({
      workerName: '',
      report: ''
    });
  };

  return (
    <div>
      <AdmNavbar />
      <div className="content-container" style={{ marginLeft: '400px', marginTop: '100px', marginRight: '20px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          <h2>Add Report</h2>
          <div className="mb-3">
            <label htmlFor="workerName" className="form-label">Worker Name</label>
            <input type="text" className="form-control" id="workerName" name="workerName" value={formData.workerName} onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="report" className="form-label">Report</label>
            <textarea className="form-control" id="report" name="report" value={formData.report} onChange={handleInputChange}></textarea>
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
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
      <AdmSidebar style={{ zIndex: 0 }} />
    </div>
  );
}

export default AdminReport;
