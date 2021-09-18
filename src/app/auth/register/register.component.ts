import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  isLibrary = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(authForm: NgForm) {
    if(!authForm.valid) {return;}
    const name = authForm.value.name;
    const email = authForm.value.email;
    const password = authForm.value.password;
    const passwordConfirm = authForm.value.passwordConfirm;
    const role = this.isLibrary ? 1 : 2;

    this.authService.register(role,email,password,passwordConfirm)
    .subscribe(
      resData => {
        console.log(resData);
        this.router.navigate(['/home']);
      }
    );
  }

}