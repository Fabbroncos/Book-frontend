import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, NgControl, NgForm, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { AuthService } from 'src/app/auth/auth.service'
import { Provinces } from 'src/app/auth/provinces-resolver.service'
import { User } from '../user.model'
import { environment } from 'src/environments/environment.prod'

export interface City {
  id: number
  name: string
}

@Component({
  selector: 'app-edit-user-detail-component',
  templateUrl: './edit-user-detail.component.html',
  styleUrls: ['./edit-user-detail.component.css'],
})
export class EditUserDetailComponent implements OnInit {
  id: number
  user: User
  provinces: Provinces[] = []
  city: City[] = []

  userForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.route.data.subscribe((resData) => {
      this.provinces = resData[0]
      if (resData[1]) {
        this.city = resData[1]
      }
    })
    this.route.params.subscribe((params: Params) => {
      this.id = +params['username']
      this.authService.user.subscribe((user) => {
        this.user = user
        this.initForm()
        // if (this.user.provinceId && this.user.provinceId!==0) {
        // this.http.get(
        //   `${environment.apiUrl}//v1/provinces/${this.user.provinceId}`
        // ).subscribe(
        //   (resData: {message: string, data: []}) => {
        //     this.city = resData.data;
        //     this.userForm.get('city').setValue(this.user.comune_id ? this.city[this.user.comune_id] : [])
        //   }
        // )
        //}
      })
    })
  }

  getItemById(list: any[], id: number) {
    for (let item of list) {
      if (item.id === id) {
        return [item]
      }
    }
  }

  initForm() {
    this.userForm = new FormGroup({
      email: new FormControl(this.user.email ? this.user.email : '', [Validators.required, Validators.email]),
      password: new FormControl({ value: 'password', disabled: true }),
      provinces: new FormControl(
        this.user.comune ? this.getItemById(this.provinces, this.user.comune.province_id) : [],
        Validators.required,
      ),
      city: new FormControl(
        this.user.comune ? this.getItemById(this.city, this.user.comune.id) : [],
        Validators.required,
      ),
      zip_code: new FormControl(this.user.zipCode ? this.user.zipCode : null, [
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(5),
      ]),
      street_address_1: new FormControl(this.user.streetAddress1 ? this.user.streetAddress1 : '', Validators.required),
      street_address_2: new FormControl(this.user.streetAddress2 ? this.user.streetAddress2 : '', Validators.required),
    })
    if (this.user.role === 'LIBRERIA') {
      this.userForm.addControl(
        'libraryname',
        new FormControl(this.user.libraryInfos.name ? this.user.libraryInfos.name : '', Validators.required),
      )
      this.userForm.addControl(
        'description',
        new FormControl(
          this.user.libraryInfos.description ? this.user.libraryInfos.description : '',
          Validators.required,
        ),
      )
      this.userForm.addControl(
        'piva',
        new FormControl(this.user.libraryInfos.piva ? this.user.libraryInfos.piva : '', [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(11),
          Validators.minLength(11),
        ]),
      )
    } else {
      this.userForm.addControl(
        'firstname',
        new FormControl(this.user.userInfos.first_name ? this.user.userInfos.first_name : '', Validators.required),
      )
      this.userForm.addControl(
        'lastname',
        new FormControl(this.user.userInfos.last_name ? this.user.userInfos.last_name : '', Validators.required),
      )
    }

    if (!this.userForm.get('provinces').valid) {
      this.userForm.get('city').disable()
    }

    this.userForm.get('provinces').valueChanges.subscribe((value) => {
      console.log(value)

      this.http
        .get(`${environment.apiUrl}//v1/provinces/${value[0].id}`)
        .subscribe((resData: { message: string; data: [] }) => {
          this.city = resData.data
          this.userForm.get('city').setValue([])
          this.userForm.get('city').enable()
        })
    })
  }

  onSubmit() {
    this.userForm.markAllAsTouched()

    if (this.userForm.valid) {
      console.log(this.userForm)
      delete this.userForm.value.email
      this.userForm.value.comune_id = this.userForm.value.city[0].id
      delete this.userForm.value.city

      this.http.patch(`${environment.apiUrl}//v1/users/${this.user.id}`, this.userForm.value).subscribe(
        (res) => {
          console.log(res)

          this.router.navigate(['/my-profile'])
        },
        (error) => {
          console.log(error)
        },
      )
    }
  }
}
