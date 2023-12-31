import {Component, EventEmitter} from '@angular/core';

import {AuthService} from './services/auth.service'
import {UsersService} from './services/users.service'
import {FilesService} from "./services/files.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgRTA = ''
  showImg = true;
  token = ''
  statusDetail: 'loading' | 'succes' | 'init' | 'error' = 'init'

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private filesService: FilesService
  ) {
  }

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService.create({
      "email": "angelin1@gmail.com",
      "name": "angel",
      "password": "12345",
      "role": "admin",
      "avatar": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.jYkeFOZmc9yTz6xKUji13wAAAA%26pid%3DApi&f=1&ipt=f6708a44505a8e3d3cd3534f2039869704fd7722548bc575f0f115e3126eded8&ipo=images"
    })
      .subscribe(rta => {
        console.log('rta create user=> ', rta)
      })
  }

  login() {
    this.authService.login('angelin1@gmail.com', '12345')
      .subscribe(rta => {
        console.log('rta login => ', rta.access_token)
        this.token = rta.access_token
      })
  }

  getProfile() {
    this.authService.profile()
      .subscribe(profile => {
        console.log('profile => ', profile)
      })
  }

  downloadPDF() {
    return this.filesService.getFile('my-pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
      .subscribe()
  }

  onUpload(event: Event) {
    this.statusDetail = 'loading'
    const element = event.target as HTMLInputElement
    const file = element.files?.item(0)

    if (file) {
      this.filesService.uploadFile(file)
        .subscribe(rta => {
          this.imgRTA = rta.location
          this.statusDetail = 'succes'
        })
    }

  }
}
