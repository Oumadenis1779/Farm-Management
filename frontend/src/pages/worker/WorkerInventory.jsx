import React  ,{ useState }  from 'react';
import WorkerSidebar from './WorkerSidebar'; // Check import path and filename
import WorkerNavbar from './WorkerNavbar'; // Check import path and filename

function WorkerInventory() {
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
  return (
    <div>
      <WorkerNavbar />
      <div className="content-container" style={{ marginLeft: '400px', marginTop: '100px', marginRight: '20px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <div className="container">
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
      </div>
      <WorkerSidebar />
    </div>
  );
}

export default WorkerInventory;