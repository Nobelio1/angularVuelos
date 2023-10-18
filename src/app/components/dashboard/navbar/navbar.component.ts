import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/interfaces/menu.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menu: Menu[] = [];

  constructor(private menuService: MenuService) {}
  ngOnInit(): void {
    this.cargarMenu();
  }

  cargarMenu() {
    this.menuService.getMenu().subscribe((data) => {
      this.menu = data;
    });
  }
}
