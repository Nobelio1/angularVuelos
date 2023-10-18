import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VuelosComponent } from './vuelos/vuelos.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ReportesComponent } from './reportes/reportes.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { CrearVueloComponent } from './inicio/crear-vuelo/crear-vuelo.component';

const routes: Routes = [
  {
    path: '',
    component: VuelosComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'crear-usuario', component: CrearUsuarioComponent },
      { path: 'crear-usuario/:id', component: CrearUsuarioComponent },
      { path: 'crear-vuelo', component: CrearVueloComponent },
      { path: 'crear-vuelo/:id', component: CrearVueloComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
