import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service'
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  token = ''
  profile: User | null = null
  activeMenu = false;
  counter = 0;

  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.login('angelin1@gmail.com','12345')
      .subscribe(rta => {
        this.token = rta.access_token
        console.log('rta login => ', rta)
        this.getprofile()
      })
  }

  getprofile(){
    this.authService.profile(this.token)
    .subscribe(user => {
      this.profile = user
    })
  }
}
