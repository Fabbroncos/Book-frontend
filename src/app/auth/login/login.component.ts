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

  showError: boolean = false;

  onSubmit(authForm: NgForm) {
    if(!authForm.valid) {return;}
    const email = authForm.value.email;
    const password = authForm.value.password;
    this.authService.login(email,password)
    .subscribe(
      resData => {
        this.router.navigate(['home']);
      },
      error => {
        this.showError = true
        console.log(error);
        
      }
    );
  }
}