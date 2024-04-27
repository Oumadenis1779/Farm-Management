import React, { useState } from 'react';
import AdmSidebar from './adminsidebar';
import AdmNavbar from './AdminNavbar';
import './admin.css';

function AdminInv() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [formData, setFormData] = useState({
    item: '',
    category: '',
    quantity: '',
    units: '',
    cost: '',
    supplier: '',
    purchaseDate: '',
    expiryDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInventoryItem = {
      ...formData,
      id: inventoryItems.length + 1 // Generate unique id for the new item
    };
    setInventoryItems([...inventoryItems, newInventoryItem]);
    setFormData({
      item: '',
      category: '',
      quantity: '',
      units: '',
      cost: '',
      supplier: '',
      purchaseDate: '',
      expiryDate: ''
    });
  };

  return (
    <div>
      <AdmNavbar />
      <div className="content-container" style={{ marginLeft: '400px', marginTop: '100px', marginRight: '20px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <form className="row g-3" onSubmit={handleSubmit} style={{ borderRadius: '20px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginTop: '20px', padding: '20px' }}>
          <h2>Create Inventory</h2>
          <div className="col-md-4">
            <label htmlFor="item" className="form-label">Item</label>
            <input type="text" className="form-control smaller-input" id="item" name="item" value={formData.item} onChange={handleInputChange} />
          </div>
          <div className="col-md-4">
            <label htmlFor="category" className="form-label">Category</label>
            <input type="text" className="form-control smaller-input" id="category" name="category" value={formData.category} onChange={handleInputChange} />
          </div>
          <div className="col-md-4">
            <label htmlFor="quantity" className="form-label">Quantity</label>
            <input type="text" className="form-control smaller-input" id="quantity" name="quantity" value={formData.quantity} onChange={handleInputChange} />
          </div>
          <div className="col-md-4">
            <label htmlFor="units" className="form-label">Units of Measurement</label>
            <input type="text" className="form-control smaller-input" id="units" name="units" value={formData.units} onChange={handleInputChange} />
          </div>
          <div className="col-md-4">
            <label htmlFor="cost" className="form-label">Unit Cost</label>
            <input type="text" className="form-control smaller-input" id="cost" name="cost" value={formData.cost} onChange={handleInputChange} />
          </div>
          <div className="col-md-4">
            <label htmlFor="supplier" className="form-label">Supplier</label>
            <select id="supplier" className="form-select smaller-input" name="supplier" value={formData.supplier} onChange={handleInputChange}>
              <option selected>Choose...</option>
              <option>Supplier 1</option>
              <option>Supplier 2</option>
              {/* Add options for other suppliers */}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="purchaseDate" className="form-label">Purchase Date</label>
            <input type="text" className="form-control smaller-input" id="purchaseDate" name="purchaseDate" value={formData.purchaseDate} onChange={handleInputChange} />
          </div>
          <div className="col-md-4">
            <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
            <input type="text" className="form-control smaller-input" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} />
          </div>
          <div className="col-md-4">
            <label htmlFor="addInventory" className="form-label">-----</label>
            <button type="submit" className="btn btn-success smaller-input">Add Inventory</button>
          </div>
        </form>
        <h1 className="text-success">Inventory Table</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Item</th>
              <th scope="col">Category</th>
              <th scope="col">Quantity</th>
              <th scope="col">Units of Measurement</th>
              <th scope="col">Unit Cost</th>
              <th scope="col">Supplier</th>
              <th scope="col">Purchase Date</th>
              <th scope="col">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map(item => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.item}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{item.units}</td>
                <td>{item.cost}</td>
                <td>{item.supplier}</td>
                <td>{item.purchaseDate}</td>
                <td>{item.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdmSidebar />
    </div>
  );
}

export default AdminInv;
