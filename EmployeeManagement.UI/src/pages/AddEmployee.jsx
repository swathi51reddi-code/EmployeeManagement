import {useState,useEffect} from 'react';
import { addEmployee } from '../services/employeeService';  
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        phonenumber: '',
        department: '',
        age: '',
        city: ''
    });
    const [error, setError] = useState('');
    const [saving, setSaving] = useState('');
    const navigate = useNavigate(); 
    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
        
    };

    const handleSubmit = async (e) => {    
        e.preventDefault(); 
        setSaving(true);
        setError('');
        try {
            await addEmployee(employee); 
            navigate('/'); 
        } catch (err) {
            setError('Failed to add employee. Please try again.');
        } finally {
            setSaving(false);
        }
    };
    return (
        <div className="form-page">
            <div className="form-header">
                <div>
                    <h1>Add Employee</h1>
                    <p>Enter employee information below</p>
                </div>

                <button
                    className="back-btn"
                    onClick={() => navigate("/")}
                >
                    ← Back to Employees
                </button>
            </div>
            <form className="employee-form" onSubmit={handleSubmit}>
                <h2>Personal Information</h2>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Employee Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={employee.name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            required
                        />
                     </div>   
                    <div className="form-group">
                        <label>Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={employee.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone *</label>
                        <input
                            type="text"
                            name="phone"
                            value={employee.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number *</label>
                        <input
                            type="text"
                            name="phonenumber"
                            value={employee.phonenumber}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Department *</label>
                        <input
                            type="text"
                            name="department"
                            value={employee.department}
                            onChange={handleChange}
                            placeholder="Enter department"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Age *</label>
                        <input
                            type="number"
                            name="age"
                            value={employee.age}
                            onChange={handleChange}
                            placeholder="Enter age"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Salary *</label>
                        <input  
                            type="text"
                            name="salary"
                            value={employee.salary}
                            onChange={handleChange}
                            placeholder="Enter salary"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Country *</label>
                        <input
                            type="text"
                            name="country"
                            value={employee.country}
                            onChange={handleChange}
                            placeholder="Enter country"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>City *</label>
                        <input
                            type="text"
                            name="city"
                            value={employee.city}
                            onChange={handleChange}
                            placeholder="Enter city"
                            required
                        />
                    </div>   
                    <div className="form-group">
                        <label>Address *</label>
                        <input
                            type="text"
                            name="address"
                            value={employee.address}
                            onChange={handleChange}
                            placeholder="Enter address"
                            required
                        />
                    </div>    
                    <div className="form-group">
                        <label>Region *</label>
                        <input
                            type="text"
                            name="region"
                            value={employee.region}
                            onChange={handleChange}
                            placeholder="Enter region"
                            required
                        />
                    </div> 
                    <div className="form-group">
                        <label>Postal Code *</label>
                        <input
                            type="text" 
                            name="postalCode"
                            value={employee.postalCode}
                            onChange={handleChange} 
                            placeholder="Enter postal code"
                            required
                        />

                    </div>
                    <div className="form-actions">
                        <button type="submit" disabled={saving}>
                            {saving ? 'Saving...' : 'Add Employee'} 
                            </button>
                            </div>
                </div>
            </form>
        </div>
    );
}
export default AddEmployee;