const employees = [
      { id: 1, name: 'John Doe', age: 30, department: 'IT', salary: 50000, specialization: 'Javascript' },
      { id: 2, name: 'Alice Smith', age: 28, department: 'HR', salary: 45000, specialization: 'Letras' },
      { id: 3, name: 'Bob Johnson', age: 35, department: 'Finance', salary: 60000, specialization: 'Credito' },
      { id: 4, name: 'Mike Johnson', age: 40, department: 'IT', salary: 80000, specialization: 'PHP' },
      //... Mais registros de funcionários podem ser adicionados aqui
    ];

// Função para exibir todos os funcionários
function displayEmployees() {
    const totalEmployees = employees
        .map(employee => `<p>${employee.id}: ${employee.name} - ${employee.department} - $${employee.salary}</p>`)
        .join('');
    document.getElementById('employeesDetails').innerHTML = totalEmployees;
}

function calculateTotalSalaries() {
      const totalSalaries = employees.reduce((acc, employee) => acc + employee.salary, 0);
      alert(`Total Salaries: $${totalSalaries}`);
    }

function displayHREmployees() {
     const hrEmployees = employees.filter(employee => employee.department === 'HR');
      const hrEmployeesDisplay = hrEmployees.map((employee, index) => `<p>${employee.id}: ${employee.name}: ${employee.name} - ${employee.department} - $${employee.salary}</p>`).join('');
      document.getElementById('employeesDetails').innerHTML = hrEmployeesDisplay;
}

function findEmployeeById(employeeId) {
      const foundEmployee = employees.find(employee => employee.id === employeeId);
      if (foundEmployee) {
      document.getElementById('employeesDetails').innerHTML =`<p>${foundEmployee.id}: ${foundEmployee.name}: ${foundEmployee.name} - ${foundEmployee.department} - $${foundEmployee.salary}</p>`;
      }
      else{
        document.getElementById('employeesDetails').innerHTML = 'nenhum funcionário foi encontrado com este ID';
       }
}

function findspecialization(specialization) {
    const foundspecialization = employees.find(employee => employee.specialization === specialization);
    if (foundspecialization) {
    document.getElementById('employeesDetails').innerHTML =`<p>${foundspecialization.specialization}: ${foundspecialization.name}: ${foundspecialization.name} - ${foundspecialization.department} - $${foundspecialization.salary}</p>`;
    }
    else{
      document.getElementById('employeesDetails').innerHTML = 'nenhum especilização encontrada';
     }
}
