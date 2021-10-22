import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {

  // Empleados
  employees: any[] = [];
  allEmployees: any[] = [];
  constructor(private admin: AdminService, private userService: UserService) { }

  ngOnInit(): void {
    this.admin.getEmployess().subscribe((data: any) => {
      this.employees = data.users;
      this.allEmployees = data.users;
    });
  }

  // Filtrar empleados
  searchEmployees(value: string){
    const lowerValue = value;

    if (value === ''){
      this.employees = this.allEmployees;
      console.log(this.employees);
    }else {
      this.employees = this.allEmployees.filter((employee) =>
        employee.ci.toString().includes(lowerValue) ||
        employee.nombre.toString().includes(lowerValue) ||
        employee.depto.toString().includes(lowerValue)
      );
      console.log(this.employees);
    }
  }

}

