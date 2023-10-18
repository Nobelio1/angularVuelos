import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent implements OnInit {
  form: FormGroup;
  dataSource!: MatTableDataSource<any>;
  paginator: any;
  sort: any;
  id: number | undefined;
  operacion: string = 'Crear Cliente';

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private arouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      nacionalidad: ['', Validators.required],
    });
    this.dataSource = new MatTableDataSource();
    this.id = Number(arouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar Cliente';
      this.getClienteId(this.id!);
    }
  }

  getClienteId(id: number) {
    this.clienteService.getClienteId(id).subscribe((data: Cliente[]) => {
      if (data.length > 0) {
        console.log(data[0]);
        const cliente = data[0];
        this.form.patchValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          dni: cliente.dni,
          nacionalidad: cliente.nacionalidad,
        });
      }
    });
  }

  cargarCliente() {
    this.clienteService.getCliente().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  agregarUsuario() {
    const user: Cliente = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      dni: this.form.value.dni,
      nacionalidad: this.form.value.nacionalidad,
    };

    if (this.id !== 0) {
      this.clienteService.updateCliente(this.id!, user).subscribe(() => {
        console.log('Actulizado con exito');
      });
    } else {
      this.clienteService.agregarUsuario(user).subscribe(() => {
        console.log('Ingresado con Exito');
      });
    }

    this.cargarCliente();
    this.router.navigate(['/dashboard/usuarios']);
  }
}
