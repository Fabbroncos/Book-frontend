import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { City } from "src/app/account/edit-user-detail/edit-user-detail.component";
import { AuthService } from "../auth.service";
import { Provinces } from "../provinces-resolver.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  isLibrary = false;
  provinces: Provinces[] = [];
  cities: City[] = []

  showError: boolean = false
  errors: string

  @ViewChild('userForm') userForm: NgForm
  @ViewChild('libraryForm') libraryForm: NgForm

  constructor(private http: HttpClient, private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(
      provincesData => {
        this.provinces = provincesData[0];
        console.log(this.provinces);
        
      }
    )
  }

  passwordConfirmValidate(form: NgForm) {
    if (form.value['password'] !== form.value['passwordConfirm']) {
      form.controls['passwordConfirm'].setErrors({'incorrect': true})
    } else {
      form.controls['passwordConfirm'].setErrors(null)
    }
  }

  getCity(model) {
    console.log(model);
    
    if(model.value[0]) {
      this.http.get(
        `${this.authService.url}/api/v1/provinces/${model.value[0].id}`
      ).subscribe((citiesData: {data: City[]}) => {
        this.cities = citiesData.data
      })
    } else {
      this.cities = []
    }
  }

  changeForm(isLibrary: boolean){
    
    this.isLibrary= isLibrary;
    this.userForm.controls['province'].setValue([])
    this.libraryForm.controls['province'].setValue([])

    this.userForm.resetForm()
    this.libraryForm.resetForm()
    
  }

  getError(controlName: string) {
    let form: NgForm
    if(this.isLibrary) {
      form = this.libraryForm
    } else {
      form = this.userForm
    }
    if(form) {
      if(form.controls[controlName]) {
        if (form.controls[controlName].touched && form.controls[controlName].invalid) {
          return true
        }
        return false
      }
    }
  }

  errorHandle(controlName: string) {
    let errorText="";
    switch (controlName) {
      case "email":
        errorText = 'Inserisci un email valida'
        break;
      case "password":
        errorText = 'La password deve essere di 6-20 caratteri'
        break;
      case "passwordConfirm":
        errorText = 'Le password non corrispondono'
        break;
      case "library_name":
        errorText = 'Il nome della libreria deve essere di 2-800 caratteri'
        break;
      case "piva":
        errorText = 'La piva deve essere di 11 caratteri'
        break;
      case "description":
        errorText = 'La descrizione deve essere di 10-2000 caratteri'
        break;  
      case "first_name":
        errorText = 'Il nome deve essere di 2-40 caratteri'
        break;
      case "last_name":
        errorText = 'Il cognome deve essere di 2-40 caratteri'
        break;
      case "street_address_1":
        errorText = "L'indirizzo 1 deve essere di 2-500 caratteri"
        break;
      case "street_address_2":
        errorText = "L'indirizzo 2 deve essere di 2-500 caratteri"
        break;
      case "zip_code":
        errorText = "Il CAP deve essere di 3-20 caratteri"
        break;
      default:
        break;
    }
    return errorText;
  }

  onSubmit(authForm: NgForm) {
    console.log(authForm.value);

    if(!authForm.valid) {return;}
    const name = authForm.value.name;
    const email = authForm.value.email;
    const password = authForm.value.password;
    const passwordConfirm = authForm.value.passwordConfirm;
    const role = this.isLibrary ? "LIBRERIA" : "ACQUIRENTE";

    const formValue = authForm.value
    formValue.role = role
    formValue.comune_id = authForm.value.city[0].id
    
    delete formValue.province
    delete formValue.city

    this.authService.register(formValue)
    .subscribe(
      resData => {
        console.log(resData);
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
      }
    );
  }

}