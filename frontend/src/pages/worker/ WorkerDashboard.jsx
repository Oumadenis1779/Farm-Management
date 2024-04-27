import React, { useState, useEffect } from 'react';
import WorkerSidebar from './WorkerSidebar'; // Ensure the import path and filename are correct
import WorkerNavbar from './WorkerNavbar'; // Ensure the import path and filename are correct


function WorkerDashboard() {
  // State to store dashboard data
  const [dashboardData, setDashboardData] = useState(null);

  // useEffect to perform GET request when component mounts
  useEffect(() => {
    fetch('http://127.0.0.1:5000/dashboard')
      .then(response => response.json())
      .then(data => {
        // Set the dashboard data to state
        setDashboardData(data);
      })
      .catch(error => {
        // Handle any errors here
        console.error('Error fetching dashboard data:', error);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  // Dummy user data
  const user = {
    avatarUrl: 'https://i.pinimg.com/564x/e8/58/94/e8589424b38a561d93ece194321ebd06.jpg',
    name: 'Didas',
  };

  // Dummy data for cards
  const tasksCompletedPercentage = 75;
  const workersCount = 20;

  // Dummy data for the table (ongoing tasks)
  const ongoingTasks = [
    { id: 1, name: 'Task 1', assignedTo: 'Worker A', status: 'In Progress' },
    { id: 2, name: 'Task 2', assignedTo: 'Worker B', status: 'Pending' },
    // Add more ongoing tasks as needed
  ];

  return (
    <div>
      <WorkerNavbar />
      <div className="content-container" style={{ marginLeft: '400px', marginTop: '100px', marginRight: '20px', backgroundColor: '', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        {/* Logged in message */}
        <div style={{ alignSelf: 'flex-start', marginBottom: '20px' }}>
          <p className="text-muted">Logged in as Worker</p>
        </div>

        {/* Cards Section */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '20px' }}>
          {/* User Card */}
          <div className="card user-card" style={{ width: '10rem', margin: '20px', backgroundColor: '#f8f9fa', textAlign: 'center' }}>
            <img src={user.avatarUrl} className="card-img-top rounded-circle" alt="User Avatar" style={{ width: '100px', height: '100px', alignSelf: 'center' }} />
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
            </div>
          </div>

          {/* Tasks Completed Card */}
          <div className="card" style={{ width: '18rem', margin: '20px', backgroundColor: '#f8f9fa' }}>
            <div className="card-body">
              <h5 className="card-title">Tasks Completed</h5>
              <p className="card-text text-success" style={{ fontSize: '24px', fontWeight: 'bold' }}>{tasksCompletedPercentage}%</p>
            </div>
          </div>

          {/* Workers Count Card */}
          <div className="card" style={{ width: '18rem', margin: '20px', backgroundColor: '#f8f9fa' }}>
            <div className="card-body">
              <h5 className="card-title">Workers</h5>
              <p className="card-text text-success" style={{ fontSize: '24px', fontWeight: 'bold' }}>{workersCount}</p>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div style={{ width: '100%' }}>
          <h1 className="text-success">Ongoing Tasks</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Task Name</th>
              </tr>
            </thead>
            <tbody>
              {ongoingTasks.map(task => (
                <tr key={task.id}>
                  <td>{task.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card containers holding images */}
        <div class="card text-bg-dark">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIjt3WbFuFHlUyZ-c_msrIyawCc_LpOTc1DQ&usqp=CAU" class="card-img" alt="..." />
          <div class="card-img-overlay">
          </div>
        </div>
      </div>
      <WorkerSidebar style={{ zIndex: 0 }} />
    </div>
  );
}

export default WorkerDashboard;