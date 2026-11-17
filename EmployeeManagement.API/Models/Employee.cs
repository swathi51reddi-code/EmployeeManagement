namespace EmployeeManagement.API.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string PhoneNumber { get; set; }= string.Empty;
        public string Address { get; set; } 
        public string City { get; set; }
        public string Region { get; set; }
        public string PostalCode { get; set; }= string.Empty;
        public string Department { get; set; } = string.Empty;
        public decimal Salary { get; set; }
        public string Country { get; set; } = string.Empty;
        public int Age { get; set; }
        public bool IsActive { get; set; } = true;

    }
}
