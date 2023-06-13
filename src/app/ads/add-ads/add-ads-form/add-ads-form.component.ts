import { HttpClient } from '@angular/common/http'
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/auth/auth.service'
import { Genre } from '../../ad.model'
import { environment } from 'src/environments/environment.prod'

@Component({
  selector: 'app-add-ads-form-component',
  templateUrl: './add-ads-form.component.html',
  styleUrls: ['./add-ads-form.component.css'],
})
export class AddAdsFormComponent implements OnInit {
  role: string = ''
  years: number[] = []
  @Input('genres') genres: Genre[] = []

  addAdsForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    author: new FormControl(null),
    year: new FormControl(null),
    publisher: new FormControl(null),
    genre: new FormControl(null),
    description: new FormControl(null),
    image: new FormControl(null),
    ISBN: new FormControl({value: null, disabled: true}),
    quantity: new FormControl(null),
    price: new FormControl(null),
  })
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  @Output() formChangeEvent = new EventEmitter<FormGroup>()

  ngOnInit() {
    this.role = this.authService.user.value.role
    this.formChangeEvent.emit(this.addAdsForm)

    let startYear = 1900
    let endYear = new Date().getFullYear()

    for (let i = endYear; i > startYear; i--) {
      this.years.push(i)
    }

    if (this.role === 'LIBRERIA') {
      this.addAdsForm.get('author').setValidators(Validators.required)
      this.addAdsForm.get('year').setValidators(Validators.required)
      this.addAdsForm.get('publisher').setValidators(Validators.required)
      this.addAdsForm.get('genre').setValidators(Validators.required)
      this.addAdsForm.get('description').setValidators(Validators.required)
      this.addAdsForm.get('ISBN').setValidators(Validators.required)
      this.addAdsForm.get('image').setValidators(Validators.required)
      this.addAdsForm.get('quantity').setValidators(Validators.required)
      this.addAdsForm.get('price').setValidators(Validators.required)

      this.addAdsForm.updateValueAndValidity()
      console.log(this.addAdsForm)
    }

    this.addAdsForm.valueChanges.subscribe((formValue) => {
      console.log(formValue)

      this.formChangeEvent.emit(this.addAdsForm)
    })
  }

  onSubmit() {
    this.addAdsForm.markAllAsTouched()
    if (this.addAdsForm.invalid) {
      console.log('INVALIDO')
      return
    } else {
      const formData = new FormData()

      console.log(Object.keys(this.addAdsForm.value))

      for (const nameValue of Object.keys(this.addAdsForm.value)) {
        if (this.addAdsForm.value[nameValue] !== null) {
          if (nameValue === 'image') {
            for (const image of this.addAdsForm.value['image']) {
              formData.append('images', image, image.name)
            }
          } else if (nameValue === 'genre') {
            console.log(this.addAdsForm.value['genre']);
            let genres = []
            for(let genre of this.addAdsForm.value['genre']) {
              console.log(genre);
              genres.push(genre.id);
            }
            
            formData.append('genres', genres.toString())
          } else if (this.addAdsForm.value[nameValue] !== '') {
            console.log(nameValue)

            formData.append(nameValue, this.addAdsForm.value[nameValue])
          }
        }
      }
      
      
      if (this.authService.user.value.role === 'LIBRERIA') {
        formData.append('quantity', this.addAdsForm.value['quantity'])
        formData.append('price', this.addAdsForm.value['price'])
      }

      

      // let url = this.authService.user.value.role === "LIBRERIA" ? environment.apiUrl + "/api/v1/ads/sell" : environment.apiUrl + "/api/v1/ads/search"
      // this.http.post(
      //   url,
      //   formData
      // ).subscribe(
      //   resData => {
      //     this.router.navigate([`/${this.authService.user.value.id}/my-insertion`])

      //   }
      // )
    }
  }
}
