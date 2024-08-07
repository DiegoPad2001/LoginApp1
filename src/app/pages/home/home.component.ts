import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  appSelected=false;

    
  constructor(
    private readonly layoutService: LayoutService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.layoutService.hideNavbar();
  }

  ngOnInit(){
    this.layoutService.showMenu();
  }
  
  showNavbar(){
    console.log("show navbar");
    this.layoutService.showNavbar();

  }



  setMyCookie(): void {
    this.cookieService.setCookie('myCookie', Math.floor((Math.random() * 100) + 1).toString(), 2);
  }




}
