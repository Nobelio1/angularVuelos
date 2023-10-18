import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Vuelos } from 'src/app/interfaces/vuelos.interface';
import { VuelosService } from 'src/app/services/vuelos.service';

@Component({
  selector: 'app-crear-vuelo',
  templateUrl: './crear-vuelo.component.html',
  styleUrls: ['./crear-vuelo.component.css'],
})
export class CrearVueloComponent implements OnInit {
  form: FormGroup;
  dataSource!: MatTableDataSource<any>;
  paginator: any;
  sort: any;
  id: number | undefined;
  operacion: string = 'Crear Vuelo';

  constructor(
    private fb: FormBuilder,
    private vuelosService: VuelosService,
    private router: Router,
    private arouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      horainicio: ['', Validators.required],
      horafin: ['', Validators.required],
      partida: ['', Validators.required],
      destino: ['', Validators.required],
    });
    this.dataSource = new MatTableDataSource();
    this.id = Number(arouter.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar Vuelo';
      this.getClienteId(this.id!);
    }
  }

  getClienteId(id: number) {
    this.vuelosService.getVuelosId(id).subscribe((data: Vuelos[]) => {
      if (data.length > 0) {
        console.log(data[0]);
        const vuelo = data[0];
        this.form.patchValue({
          horainicio: vuelo.horainicio,
          horafin: vuelo.horafin,
          partida: vuelo.partida,
          destino: vuelo.destino,
        });
      }
    });
  }

  cargarCliente() {
    this.vuelosService.getVuelos().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  agregarUsuario() {
    const vuelo: Vuelos = {
      horainicio: this.form.value.horainicio,
      horafin: this.form.value.horafin,
      partida: this.form.value.partida,
      destino: this.form.value.destino,
    };

    if (this.id !== 0) {
      this.vuelosService.updateCliente(this.id!, vuelo).subscribe(() => {
        console.log('Actulizado con exito');
      });
    } else {
      this.vuelosService.agregarVuelo(vuelo).subscribe(() => {
        console.log('Ingresado con Exito');
      });
    }

    this.cargarCliente();
    this.router.navigate(['/dashboard']);
  }
}
