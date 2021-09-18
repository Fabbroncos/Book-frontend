import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent {

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if(!form.valid) {return;}
    const password = form.value.password;
    const newPassword = form.value.newPassword;
    const newPasswordConfirm = form.value.newPasswordConfirm;

    this.authService.changePassword(password,newPassword,newPasswordConfirm).subscribe(
      resData => {
        this.router.navigate(['/insertion']);
      }
    );
  }

}