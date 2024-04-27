import React from 'react';
import { Link } from 'react-router-dom';

function WkSidebar() {
  return (
    <div className='sidebar' style={{ width: '350px', borderRight: '3px solid #ccc', height: '100vh', position: 'fixed', top: 0, left: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#fff' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <button className="btn btn-primary d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">Toggle offcanvas</button>
        <div className="offcanvas-lg offcanvas-end"  tabIndex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasResponsiveLabel">Responsive offcanvas</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
          </div>
          <Link to="/" className="navbar-brand"><img src="https://i.ibb.co/NTtQKqZ/logo.png" alt="logo" className='logo' style={{ maxWidth: '250px', maxHeight: '250px' }}></img></Link> 
          <div className="d-flex flex-column align-items-center">
            <ul className="list-unstyled">
              <li className='dash' style={{ marginBottom: '50px', marginTop:'150px' }}>
                <Link to="/WorkerDashboard"><img src="https://i.ibb.co/QjSNC0g/Group-10.png" alt="Group-10" style={{ maxWidth: '200px', maxHeight: '200px' }} border="0"></img></Link>
              </li>
              <li style={{ marginBottom: '50px' }}>
                <Link to="/WorkerTasksTable"><img src="https://i.ibb.co/ZWrKG4j/Group-11.png" alt="Group-11" style={{ maxWidth: '160px', maxHeight: '200px' }} border="0"></img></Link>
              </li>
              <li style={{ marginBottom: '50px' }}>
                <Link to="/WorkerInventory"><img src="https://i.ibb.co/vHwYCL0/Group-17.png" alt="Group-17" style={{ maxWidth: '200px', maxHeight: '150px' }} border="0"></img></Link>
              </li>
              <li style={{ marginBottom: '50px' }}>
                <Link to="/WorkerReport"><img src="https://i.ibb.co/Kr9jtYt/Group-13.png" alt="Group-13" style={{ maxWidth: '160px', maxHeight: '150px' }} border="0"></img></Link>
              </li>
              <li style={{ marginBottom: '50px' }}>
                <Link to="/settings"><img src="https://i.ibb.co/6PT6Q2w/Group-16.png" alt="Group-16" style={{ maxWidth: '200px', maxHeight: '150px' }}  border="0"></img></Link>
              </li>
              
            </ul>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center',marginLeft: '20px', marginBottom: '50px' }}>
        <img src="https://i.ibb.co/2dTwyRN/Group-9.png" alt="Group-9" style={{ maxWidth: '300px', maxHeight: '300px' }} border="0"/>
      </div>
      </div> 
    </div>
  );
}

export default WkSidebar;