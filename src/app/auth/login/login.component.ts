import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  errorType: string = "";

  onSubmit(authForm: NgForm) {
    if(!authForm.valid) {return;}
    const email = authForm.value.email;
    const password = authForm.value.password;
    this.authService.login(email,password)
    .subscribe(
      loginData => {
        this.router.navigate(['home']);
      },
      error => {
        if(error.error.errorMessage === "account non attivo") { //problema cambiare stringa con error message di davide
          this.errorType = "errorAccountVerified"
        } else {
          this.errorType = "errorEmailPassword"
        }
      }
    );
  }
}