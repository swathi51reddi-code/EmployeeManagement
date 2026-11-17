import {useState,useEffect } from 'react';
import { updateEmployee } from '../services/employeeService';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeById } from '../services/employeeService';

function EditEmployee() {
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        name: '',   
        email: '',
        phone: '',
        phoneNumber: '',
        department: '',
        age: '',
        city: '',
        region: '',
        postalCode: '',
        salary: '',
        country: '',
        address: ''
    });
    const[loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const employeeData = await getEmployeeById(id);
                setEmployee({
                    id: id || '',
                    name: employeeData.name || '',
                    email: employeeData.email || '',
                    phone: employeeData.phone || '',    
                    phoneNumber: employeeData.phoneNumber || '',
                    department: employeeData.department || '',
                    age: employeeData.age || '',
                    city: employeeData.city || '',
                    address: employeeData.address || '',
                    region: employeeData.region || '',
                    postalCode: employeeData.postalCode || '', 
                    salary: employeeData.salary || '', 
                    country: employeeData.country || '',
                });
            } catch (error) {
                setError('Error fetching employee data');
            }
            finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);
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
        await updateEmployee(id, employee)
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                setError('Failed to update employee. Please try again.');
            })
            .finally(() => {
                setSaving(false);
            }); 

        }
        if (loading) {
            return <div>Loading...</div>;
        }
        return (
            <div className="form-page">
                <div className="form-header">
                    <div>
                        <h1>Edit Employee</h1>
                        <p>Update employee information below</p>
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
                   {[
                    ['name', 'Employee Name *', 'text', 'Enter full name'],
                    ['email', 'Email *', 'email', 'Enter email address'],
                    ['phone', 'Phone *', 'text', 'Enter phone number'],   
                    ['phoneNumber', 'Phone Number *', 'text', 'Enter phone number'],
                    ['department', 'Department *', 'text', 'Enter department'],
                    ['age', 'Age *', 'number', 'Enter age'],
                    ['salary', 'Salary *', 'number', 'Enter salary'],
                    ['country', 'Country *', 'text', 'Enter country'],
                    ['city', 'City *', 'text', 'Enter city'],
                    ['address', 'Address *', 'text', 'Enter address'],
                    ['region', 'Region *', 'text', 'Enter region'],
                    ['postalCode', 'Postal Code *', 'text', 'Enter postal code'],
                   ].map(([name, label, type, placeholder]) => (
                    <div className="form-group" key={name}>
                        <label htmlFor={name}>{label}</label>
                        <input
                            type={type}
                            id={name}
                            name={name}
                            value={employee[name]}
                            onChange={handleChange}
                            placeholder={placeholder}
                        />
                    </div>
                   ))} 
                </div>
                {error && <p className="error">{error}</p>}
                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </button>
                    <button type="submit" disabled={saving} className="save-btn">
                        {saving ? 'Saving...' : 'Update Employee'}
                    </button>   
                </div>
            </form>
        </div>
    );
}
export default EditEmployee;                