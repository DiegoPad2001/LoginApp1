import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/services/layout.service';
import { CookieService } from 'src/app/services/cookie.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  showMenu: boolean = false;
  items: MenuItem[] | undefined;


  constructor(
    private readonly layoutService: LayoutService,
    private router: Router,
    private cookieService: CookieService
  ) {
    router.events.subscribe((val) => {
      // see also
      console.log(val instanceof NavigationEnd)
      this.showMenu = false;
  });
  }

  ngOnInit() {
       this.subscription =
      this.layoutService.showMenu$.subscribe(showMenu => {

      this.showMenu = showMenu;
    });
      this.items = [
        {
          separator: true
      },
        {
            label: 'Administración',
            items: [
                {
                  label: 'Usuarios',
                  icon: 'pi pi-user',
                  routerLink: ['/consulta-usuarios']
              },
              {
                label: 'Reglas de Negocio',
                icon: 'pi pi-cog',
                routerLink: ['/reglas-negocio']
            }
            ]
        },
          {
              separator: true
          },
          {
              label: 'Competitividad',
              items: [
                  {
                    label: 'Seguimiento',
                    icon: 'pi pi-chart-line',
                    routerLink: ['/dashboard-seguimiento']
                },
                  {
                      label: 'Cambiar Precios',
                      icon: 'pi pi-dollar',
                      routerLink: ['/cambio-precios']
                  },
                  {
                      label: 'Mis Folios',
                      icon: 'pi pi-copy',
                      routerLink: ['/seguimiento-folios']
                  }
              ]
          },

          {
              separator: true
          }
      ];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



  setMyCookie(): void {
    this.cookieService.setCookie('myCookie', '123', 2);
  }

  getMyCookie(): void {
    const value = this.cookieService.getCookie('myCookie');
    console.log('Cookie Value: ', value);
  }

  deleteMyCookie(): void {
    this.cookieService.deleteCookie('myCookie');
  }


}
