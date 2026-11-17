const API_URL = 'https://localhost:7030/api/Employees';
export const getEmployees = async () => {
  try {
    const response = await fetch(API_URL);  
    if (!response.ok) {
        throw new Error('Failed to fetch employees');
    }   
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }         
};
export const addEmployee = async (employee) => {
  try {
    conole.log('Adding employee:', employee);
    const response = await fetch(API_URL, { 
        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
    });
    if (!response.ok) {
        throw new Error('Failed to add employee');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding employee:', error);
    throw error;
  }     
};
export const getEmployeeById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);   
    if (!response.ok) {
        throw new Error('Failed to fetch employee');
    }   
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching employee:', error);
    throw error;
  } 
};
export const updateEmployee = async (id, employee) => {
  try {
    console.log('Updating employee with ID:', id, 'Data:', employee);
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
    }); 
    if (!response.ok) {
        throw new Error('Failed to update employee');
    }
    const data = await response.json();
    return data;
  }
    catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || 'Failed to delete employee');
        }

        // Handle both empty and JSON responses
        const responseText = await response.text();

        return responseText ? JSON.parse(responseText) : null;

    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
};
