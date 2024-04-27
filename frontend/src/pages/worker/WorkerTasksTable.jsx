import React, { useState } from "react";
import WorkerNavbar from './WorkerNavbar';
import WorkerSidebar from './WorkerSidebar';

const WorkerTasks = () => {
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
  return (
    <div>
      <WorkerNavbar />
      <div className="content-container" style={{ marginLeft: '400px', marginTop: '100px', marginRight: '20px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
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
      <WorkerSidebar />
    </div>
  );
}

export default WorkerTasks;
