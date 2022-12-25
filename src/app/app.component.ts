import { Component, NgModule, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'

import { AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'book-project'

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin()
  }

  onChange(color: number, input: NgModule) {
    console.log(color)
    console.log(input)
    document.documentElement.style.setProperty(`--primary-color`, '#555555' + '')
  }

  onSubmit(form: NgForm) {
    console.log(form.value.attributes)
    for (const nameValue of Object.keys(form.value)) {
      if (form.value[nameValue] !== '') {
        document.documentElement.style.setProperty(`--${nameValue}`, '#' + `${form.value[nameValue]}`)
      }
    }
  }
}
