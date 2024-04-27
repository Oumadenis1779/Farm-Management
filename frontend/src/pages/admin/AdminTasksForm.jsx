import React, { useState } from "react";
import AdmSidebar from './adminsidebar';
import AdmNavbar from './AdminNavbar';
import './admin.css';


const AdminTasks = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    assignedTo: '',
    category: '',
    priority: '',
    status: '',
    dueDate: ''
  });

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, formData]);
    setFormData({
      assignedTo: '',
      category: '',
      priority: '',
      status: '',
      dueDate: ''
    });
    toggleOverlay();
  };

  return (
    <div>
      <AdmNavbar />
      <div className="content-container" style={{ marginLeft: '400px', marginTop: '100px', marginRight: '20px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
        <h1 className="text-black">Admin Tasks</h1>
        <button className="btn btn-success" onClick={toggleOverlay}>New Task</button>
        {showOverlay && (
          <div className="overlay">
            <div className="overlay-content">
              <h3>Add New Task</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="assignedTo" className="form-label">Assigned To</label>
                  <input type="text" className="form-control" id="assignedTo" name="assignedTo" value={formData.assignedTo} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <input type="text" className="form-control" id="category" name="category" value={formData.category} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="priority" className="form-label">Priority</label>
                  <input type="text" className="form-control" id="priority" name="priority" value={formData.priority} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <input type="text" className="form-control" id="status" name="status" value={formData.status} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="dueDate" className="form-label">Due Date</label>
                  <input type="date" className="form-control" id="dueDate" name="dueDate" value={formData.dueDate} onChange={handleChange} />
                </div>
                <div>
                  <button type="submit" className="btn btn-success" style={{ marginRight: '60px' }}>Submit</button>
                  <button type="button" className="btn btn-secondary" onClick={toggleOverlay}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Assigned To</th>
              <th scope="col">Category</th> 
              <th scope="col">Priority</th>
              <th scope="col">Status</th>
              <th scope="col">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{task.assignedTo}</td>
                <td>{task.category}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td>{task.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdmSidebar />
    </div>
  );
}

export default AdminTasks;
