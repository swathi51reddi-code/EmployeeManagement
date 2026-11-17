using EmployeeManagement.API.Data;
using EmployeeManagement.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace EmployeeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController: ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public EmployeesController(ApplicationDbContext context)
        {
            _context = context;
        }
        //Get Employees
        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            var employees = await _context.Employees.Where(x=>x.IsActive).ToListAsync();

            return Ok(employees);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            var employee = await _context.Employees
                .FindAsync(id);

            if (employee == null)
                return NotFound();

            return Ok(employee);
        }
        // POST: api/employees
        [HttpPost]
        public async Task<IActionResult> CreateEmployee(Employee employee)
        {
            _context.Employees.Add(employee);

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetEmployee),
                new { id = employee.Id , IsActive = employee.IsActive},
                
                employee
            );
        }

        // PUT: api/employees/1
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(
            int id, Employee employee)
        {
            if (id != employee.Id)
                return BadRequest();

            var stremployee = await _context.Employees.FindAsync(id);

            if (stremployee == null)
                return NotFound();

            stremployee.Name = employee.Name;
            stremployee.Email = employee.Email;
            stremployee.Phone = employee.Phone;
            stremployee.PhoneNumber = employee.PhoneNumber;
            stremployee.Department = employee.Department;
            stremployee.Age = employee.Age;
            stremployee.Salary = employee.Salary;
            stremployee.Address = employee.Address;
            stremployee.City = employee.City;
            stremployee.PostalCode = employee.PostalCode;
            stremployee.Country = employee.Country;
            stremployee.Region = employee.Region;
            await _context.SaveChangesAsync();

            return Ok(stremployee);
        }

        // DELETE: api/employees/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
                return NotFound();

            // _context.Employees.Remove(employee);
            employee.IsActive = false;
            await _context.SaveChangesAsync();

            return Ok("Employee deactivated successfully"); 
        }
    }
}
