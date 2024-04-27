import React, { useState } from 'react';
import AdmSidebar from './adminsidebar';
import AdmNavbar from './AdminNavbar';

const WorkersTable = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    position: ''
  });

  // State for worker data
  const [workers, setWorkers] = useState([
    { id: 1, name: 'John Doe', age: 30, phone: '123-456-7890', email: 'john@example.com', position: 'Supervisor' },
    { id: 2, name: 'Jane Smith', age: 28, phone: '234-567-8901', email: 'jane@example.com', position: 'Worker' },
    // Add more worker data as needed
  ]);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newWorker = {
      id: workers.length + 1,
      ...formData
    };
    setWorkers([...workers, newWorker]);
    setFormData({
      name: '',
      age: '',
      phone: '',
      email: '',
      position: ''
    });
  };

  return (
    <div>
      <AdmNavbar />
      <div className="content-container" style={{ marginLeft: '400px', marginTop: '100px', marginRight: '20px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        {/* Form for adding worker information */}
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          <h2>Add Worker</h2>
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <label htmlFor="age" className="form-label">Age</label>
              <input type="text" className="form-control" id="age" name="age" value={formData.age} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="text" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <label htmlFor="position" className="form-label">Position</label>
              <input type="text" className="form-control" id="position" name="position" value={formData.position} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <label htmlFor="addWorker" className="form-label">-----</label>
              <button type="submit" className="btn btn-success">Add Worker</button>
            </div>
          </div>
        </form>

        {/* Table of workers */}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {workers.map(worker => (
              <tr key={worker.id}>
                <td>{worker.id}</td>
                <td>{worker.name}</td>
                <td>{worker.age}</td>
                <td>{worker.phone}</td>
                <td>{worker.email}</td>
                <td>{worker.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdmSidebar />
    </div>
  );
};

export default WorkersTable;
