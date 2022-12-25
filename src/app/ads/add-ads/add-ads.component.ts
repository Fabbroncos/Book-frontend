import { HttpClient } from '@angular/common/http'
import { ValueConverter } from '@angular/compiler/src/render3/view/template'
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core'
import { FormControl, FormGroup, NgForm, NgModel, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from 'src/app/auth/auth.service'
import { Ad, adImage, Genre } from '../ad.model'
import { environment } from 'src/environments/environment.prod'
import { of } from 'rxjs'

@Component({
  selector: 'app-add-ads',
  templateUrl: './add-ads.component.html',
  styleUrls: ['./add-ads.component.css'],
})
export class AddAdsComponent implements OnInit {
  ads: Ad[] = []
  genres: Genre[] = []
  role: string = ''
  showError: boolean = false
  isEdit: boolean = false
  formSingle: FormGroup = null
  errorIsbn: string[] = []

  isMultyISBN: boolean = false

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  selectedFile = null

  ngOnInit() {
    this.role = this.authService.user.value.role
    this.route.data.subscribe((resData) => {
      this.genres = resData[0]
    })
  }

  formCheck(event) {
    this.formSingle = event
  }

  //Submit per singola inserzione
  onSubmitAds() {
    this.formSingle.markAllAsTouched()
    if (this.formSingle.invalid) {
      console.log('INVALIDO')
      return
    } else {
      const formData = new FormData()

      console.log(Object.keys(this.formSingle.value))

      for (const nameValue of Object.keys(this.formSingle.value)) {
        if (this.formSingle.value[nameValue] !== null && this.formSingle.value[nameValue] !== '') {
          switch (nameValue) {
            case 'image':
              for (const image of this.formSingle.value['image']) {
                formData.append('images', image, image.name)
              }
              break
            case 'genre':
              formData.append('genre_id', this.formSingle.value['genre'][0].id)
              break
            case 'quantity':
            case 'price':
              if (this.authService.user.value.role === 'LIBRERIA') {
                formData.append(nameValue, this.formSingle.value[nameValue])
              }
              break
            default:
              formData.append(nameValue, this.formSingle.value[nameValue])
              break
          }
        }
      }

      let url =
        this.authService.user.value.role === 'LIBRERIA'
          ? environment.apiUrl + '/api/v1/ads/sell'
          : environment.apiUrl + '/api/v1/ads/search'
      console.log(formData)

      this.http.post(url, formData).subscribe((resData) => {
        this.router.navigate([`/${this.authService.user.value.id}/my-insertion`])
      })
    }
  }

  @ViewChild('progressBar') progressBarEl: ElementRef
  @ViewChildren('step') stepEl: QueryList<ElementRef>
  onSetStep(id: number) {
    for (let i = 0; i < this.stepEl.length; i++) {
      if (i <= id) {
        if (!this.stepEl.get(i).nativeElement['classList'].contains('done')) {
          this.stepEl.get(i).nativeElement['classList'].add('done')
        }
      } else {
        if (this.stepEl.get(i).nativeElement['classList'].contains('done')) {
          this.stepEl.get(i).nativeElement['classList'].remove('done')
        }
      }
    }
    this.progressBarEl.nativeElement['value'] = id
  }

  changeBook(book: { title: string; isbn: string; quantity: number; price: number }) {
    this.isbnForm.controls['ISBN'].setValue(book.isbn)
    this.isbnForm.controls['quantity'].setValue(book.quantity)
    this.isbnForm.controls['price'].setValue(book.price)
    this.isEdit = true
  }

  isbns: string[] = []
  adsForms: FormGroup[] = []
  changeStep(id: number) {
    this.stepEl.get(id).nativeElement.click()
    if (id === 0) {
      this.ads = []
      this.isbns = []
      this.books = []
      this.formSingle.reset()
    }
    if (id === 1) {
      this.ads = []
    }
    if (id === 2) {
      console.log(this.books)

      this.http
        .post(`${environment.apiUrl}/api/v1/books`, {
          isbns: this.isbns,
        })
        .subscribe((resData: { data }) => {
          console.log(resData)

          for (let i = 0; i < resData.data.length; i++) {
            let img: adImage = null
            console.log(resData.data[i].imageLinks)

            if (resData.data[i].imageLinks) {
              img = {
                id: 0,
                url: resData.data[i].imageLinks ? resData.data[i].imageLinks.thumbnail : null,
                ad_id: this.authService.user.value.id,
                main: true,
                created_at: null,
                updated_at: null,
                deleted_at: null,
              }
            }
            this.adsForms.push(
              new FormGroup({
                title: new FormControl(resData.data[i].title ? resData.data[i].title : '', Validators.required),
                author: new FormControl(resData.data[i].authors ? resData.data[i].authors : '', Validators.required),
                publisher: new FormControl(
                  resData.data[i].publisher ? resData.data[i].publisher : '',
                  Validators.required,
                ),
                year: new FormControl(
                  resData.data[i].publishedDate ? resData.data[i].publishedDate : '',
                  Validators.required,
                ),
                isbn: new FormControl({ value: this.isbns[i], disabled: true }, Validators.required),
                price: new FormControl(0, Validators.required),
                quantity: new FormControl(0, Validators.required),
                description: new FormControl('', Validators.required),
                image: new FormControl(img !== null ? [img] : [], Validators.required),
              }),
            )
          }

          for (let i = 0; i < resData.data.length; i++) {
            let img: adImage = null
            if (resData.data[i].imageLinks) {
              img = {
                id: 0,
                url: resData.data[i].imageLinks ? resData.data[i].imageLinks.thumbnail : null,
                ad_id: this.authService.user.value.id,
                main: true,
                created_at: null,
                updated_at: null,
                deleted_at: null,
              }
            }

            // const img2: adImage = {
            //   id: 2,
            //   url: "https://images-na.ssl-images-amazon.com/images/I/81dLwWRGPML.jpg",
            //   ad_id: this.authService.user.value.id,
            //   main: true,
            //   created_at: null,
            //   updated_at: null,
            //   deleted_at: null,
            // }
            this.ads.push(
              new Ad(
                'S',
                0,
                resData.data[i].title,
                '',
                resData.data[0].publishedDate,
                resData.data[i].authors ? resData.data[i].authors[0] : '',
                this.books[i].quantity,
                this.books[i].price.toString(),
                this.isbns[i],
                '',
                this.authService.user.value.id,
                null,
                resData.data[i].imageLinks ? [img] : null,
              ),
            )

            console.log(this.ads)
          }
        })
    }
  }

  getFormControl(form: FormGroup) {
    if (form) {
      form.addControl('libraryname', new FormControl(null, Validators.required))
    }
    console.log(form)

    return form
  }

  setFirstImage(ad: Ad, imageId: number) {
    console.log(ad)

    const image: adImage = ad.images[imageId]
    ad.images.splice(imageId, 1)
    ad.images.unshift(image)
    console.log(ad)
  }

  checkAds(ad: Ad) {
    for (const nameValue of Object.keys(ad)) {
      if (ad[nameValue] === null || (nameValue !== 'description' && ad[nameValue] === '')) {
        return true
      }
    }
    return false
  }

  listErrorAds(form: NgForm) {
    const listError = []
    form.control.markAllAsTouched()
    for (const value of Object.keys(form.controls)) {
      console.log(form.controls[value])

      if (form.controls[value].status === 'INVALID') {
        switch (value) {
          case 'year':
            listError.push('Anno di pubblicazione mancante')
            break
          case 'author':
            listError.push("Nome dell'autore mancante")
            break
          case 'quantity':
            listError.push('Quantità di libri a disposizione mancante')
            break
          case 'price':
            listError.push('Prezzo mancante')
            break
          case 'publisher':
            listError.push('Casa editrice mancante')
            break
          case 'images':
            listError.push('Immagine libro mancante')
            break
          case 'genre':
            listError.push('Genere del libro mancante')
            break
        }
      }
    }

    return listError
  }

  valueCheck(form: NgForm, adsValue: string) {
    if (form.controls[adsValue]) {
      if (form.controls[adsValue].status === 'VALID') {
        return true
      }
    }
    return false

    //   if(form.controls[adsValue].status === "INVALID") {
    //     switch (adsValue) {
    //       case 'year':
    //         return 'Anno di pubblicazione mancante'
    //         break;
    //       case 'author':
    //         return "Nome dell'autore mancante"
    //         break;
    //       case 'quantity':
    //         return 'Quantità di libri a disposizione mancante'
    //         break;
    //       case 'price':
    //         return 'Prezzo mancante'
    //         break;
    //       case 'publisher':
    //         return 'Casa editrice mancante'
    //         break;
    //       case 'images':
    //         return 'Immagine libro mancante'
    //         break;
    //       case 'genre':
    //         return 'Genere del libro mancante'
    //         break;
    //     }
    //   }

    // return form.controls[adsValue].value
  }

  onSubmitMulty() {
    for (let ad of this.ads) {
      const formData = new FormData()

      console.log(Object.keys(ad))

      for (const nameValue of Object.keys(ad)) {
        if (ad[nameValue] === null) {
          console.log(nameValue + ' ' + ad[nameValue])
          return
        }
      }

      for (const nameValue of Object.keys(ad)) {
        console.log(nameValue + ' ' + ad[nameValue])

        if (ad[nameValue] !== null && ad[nameValue] !== '') {
          switch (nameValue) {
            case 'images':
              console.log(ad['images'])

              if (ad['images']) {
                for (const image of ad['images']) {
                  // formData.append('images',image, image.name)
                  console.log(image)
                }
              }
              break
            // case "genre":
            //   // formData.append('genre_id',ad['genre'][0].id)
            //   break
            // case "quantity":
            // case "price":
            //   if (this.authService.user.value.role === "LIBRERIA") {
            //     // formData.append(nameValue,ad[nameValue])
            //   }
            //   break
            // default:
            //   formData.append(nameValue,ad[nameValue])
            //   break
          }
        }
      }

      // let url = this.authService.user.value.role === "LIBRERIA" ? environment.apiUrl + "/api/v1/ads/sell" : environment.apiUrl + "/api/v1/ads/search"
      // console.log(formData);

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

  onEdit() {
    this.isEdit = true
    this.showError = false
    this.onSubmitIsbn()
  }

  wrongIsbn: boolean = false
  books: { title: string; isbn: string; quantity: number; price: number }[] = []
  @ViewChild('addAdsFormIsbn') isbnForm: NgForm
  onSubmitIsbn() {
    console.log(this.isbnForm)
    let quantity = this.isbnForm.value['quantity']
    if (quantity === '' || quantity === null || quantity === 0) {
      quantity = 1
    }

    let price = this.isbnForm.value['price']
    if (price === null || price === 0) {
      price = ''
    }

    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].isbn === this.isbnForm.value['ISBN']) {
        if (this.isEdit) {
          this.books[i].quantity = quantity
          this.books[i].price = price
          this.isbnForm.resetForm()
          this.isEdit = false
        } else {
          this.showError = true
        }
        return
      }
    }
    this.isEdit = false

    this.http.get(`${environment.apiUrl}/api/v1/books/checkByIsbn/${this.isbnForm.value['ISBN']}`).subscribe(
      (resData: { data: { title: string } }) => {
        console.log(resData)

        const book: { title: string; isbn: string; quantity: number; price: number } = {
          title: resData.data.title,
          isbn: this.isbnForm.value['ISBN'],
          quantity: quantity,
          price: price,
        }
        this.books.push(book)
        this.isbns.push(book.isbn)
        this.isbnForm.resetForm()
      },
      (error) => {
        console.log(error)

        this.isbnForm.controls['ISBN'].setErrors({ incorrect: true })
      },
    )
  }

  getImageUrl(ad: Ad) {
    console.log(ad.images)
    if (ad.images) {
      return ad.images[0].url
    }
    return '../assets/no_image.png'
  }

  toggleOpenAd(container: Element, adItem: Element, errorList: Element) {
    if (container.classList.contains('col-12')) {
      adItem.classList.remove('ads-item-edit')
      adItem.classList.add('ads-item')
      container.classList.remove('col-12')
      container.classList.add('col-6')
      // errorList.classList.remove("d-block");
      // errorList.classList.add("d-none");
    } else {
      adItem.classList.remove('ads-item')
      adItem.classList.add('ads-item-edit')
      container.classList.remove('col-6')
      container.classList.add('col-12')
      // errorList.classList.remove("d-none");
      // errorList.classList.add("d-block");
    }
  }

  checkForm(form: NgForm) {
    // form.control.markAllAsTouched()
    console.log(this.adsForms)
  }

  @ViewChildren('adsform') adsform: QueryList<NgForm>
  check() {
    console.log(this.adsform.toArray())
    for (const adForm of this.adsform.toArray()) {
      this.checkForm(adForm)
    }
  }

  onSubmitIsbnList(form: NgForm) {
    const list = form.value['ISBN']
    const isbnArray = list.match(/[a-zA-Z]+|[0-9]+/g)

    for (let isbn of isbnArray) {
      this.http.get(`${environment.apiUrl}/api/v1/books/checkByIsbn/${isbn}`).subscribe(
        (resData: { data: { title: string } }) => {
          console.log(resData)

          const book: { title: string; isbn: string; quantity: number; price: number } = {
            title: resData.data.title,
            isbn: isbn,
            quantity: 0,
            price: 0,
          }
          this.books.push(book)
          this.isbns.push(book.isbn)
          this.isbnForm.resetForm()
        },
        (error) => {
          console.log(error)
          this.errorIsbn.push(isbn)
          // const book:{title: string, isbn: string, quantity: number,price: number}  =
          // {title: `isbn non trovato o errato` , isbn: isbn, quantity: 0, price: 0}
          // this.books.push(book)
          // this.isbnForm.controls['ISBN'].setErrors({'incorrect': true})
        },
      )
    }
  }

  errorHandle(errorId: number) {
    //Creare gestione degli errori
  }
}
