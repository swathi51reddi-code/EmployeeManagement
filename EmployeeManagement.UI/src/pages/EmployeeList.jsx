
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEmployees } from "../services/employeeService";
import "../App.css";
import {deleteEmployee} from "../services/employeeService";
import {FaEdit, FaTrash,FaUserPlus} from 'react-icons/fa';
function EmployeeList() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const loadEmployees = async () => {
        try {
            setLoading(true);
            const data = await getEmployees();
            setEmployees(data);
            setError("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const filteredEmployees = employees.filter(emp =>
        `${emp.name} ${emp.email} ${emp.city}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const handleEdit = (id) => {
        alert("Edit Employee ID: " + id);
    };

const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
        await deleteEmployee(id);

        // Remove employee from grid
        setEmployees(prevEmployees =>
            prevEmployees.filter(employee => employee.id !== id)
        );
        alert("Employee deleted successfully!");

    } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete employee.");
    }
};

    return (
        <div className="dashboard">

            <aside className="sidebar">
                <h2 className="logo">EMS</h2>
                <p className="sidebar-title">EMPLOYEE SYSTEM</p>

                <nav>
                    <Link to="/" className="nav-link active">
                        ▦ Dashboard
                    </Link>

                    <Link to="/" className="nav-link">
                        ♙ Employee List
                    </Link>

                    <Link to="/add-employee" className="nav-link">
                    <FaUserPlus/>
                        Add Employee
                    </Link>
                </nav>

                <div className="sidebar-footer">
                    Employee Management
                    <small>Version 1.0</small>
                </div>
            </aside>

            <main className="main-content">

                <header className="topbar">
                    <div>
                        <h1>Employee Management Dashboard</h1>
                        <p>Manage your employees in one place</p>
                    </div>

                    <div className="admin-profile">
                        <span className="avatar">A</span>
                        <span>Admin</span>
                    </div>
                </header>

                <section className="stats">

                    <div className="stat-card">
                        <span>Total Employees</span>
                        <h2>{employees.length}</h2>
                        <small>Registered employees</small>
                    </div>

                    <div className="stat-card">
                        <span>Filtered Results</span>
                        <h2>{filteredEmployees.length}</h2>
                        <small>Matching employees</small>
                    </div>

                    <div className="stat-card">
                        <span>System Status</span>
                        <h2 className="status-active">Active</h2>
                        <small>Employee API connected</small>
                    </div>

                </section>

                <section className="employee-section">

                    <div className="section-header">
                        <div>
                            <h2>Employee List</h2>
                            <p>View and manage all employee records</p>
                        </div>

                        <Link
                            to="/add-employee"
                            className="add-btn" title="Add New Employee"
                        >
                            <FaUserPlus /> 
                        </Link>
                    </div>

                    <div className="table-toolbar">

                        <input
                            type="text"
                            placeholder="Search by name, email or city..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <button
                            className="refresh-btn"
                            onClick={loadEmployees}
                        >
                            ↻ Refresh
                        </button>

                    </div>

                    {loading ? (
                        <p className="message">Loading employees...</p>
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : (

                        <div className="table-wrapper">

                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>EMPLOYEE NAME</th>
                                        <th>EMAIL</th>
                                        <th>PHONE</th>
                                        <th>CITY</th>
                                        <th>REGION</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {filteredEmployees.length > 0 ? (

                                        filteredEmployees.map(emp => (

                                            <tr key={emp.id}>
                                                <td>#{emp.id}</td>
                                                <td className="employee-name">
                                                    {emp.name}
                                                </td>
                                                <td>{emp.email}</td>
                                                <td>{emp.phone}</td>
                                                <td>{emp.city}</td>
                                                <td>{emp.region}</td>

                                                <td>
                                                    <div className="actions">

                                                        <Link
                                                            to={`/edit-employee/${emp.id}`}
                                                            className="edit-btn" title="Edit Employee"
                                                        >
                                                            <FaEdit/>
                                                            
                                                        </Link>

                                                        <button
                                                            className="delete-btn"
                                                            onClick={() => handleDelete(emp.id)}
                                                            title="Delete Employee"
                                                        >
                                                            <FaTrash/>
                                                            
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>

                                        ))

                                    ) : (

                                        <tr>
                                            <td colSpan="7" className="empty">
                                                No employees found
                                            </td>
                                        </tr>

                                    )}

                                </tbody>
                            </table>

                        </div>

                    )}

                </section>

                <footer className="footer">
                    © 2026 Employee Management System
                </footer>

            </main>

        </div>
    );
}

export default EmployeeList;
