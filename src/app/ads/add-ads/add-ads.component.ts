import { HttpClient } from "@angular/common/http";
import { ValueConverter } from "@angular/compiler/src/render3/view/template";
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { Ad, adImage, Genre } from "../ad.model";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: 'app-add-ads',
  templateUrl: './add-ads.component.html'
})
export class AddAdsComponent implements OnInit{
  ads: Ad[] = []
  genres: Genre[] = [];
  role: string = "";
  showError: boolean = false
  isEdit: boolean = false
  formSingle: FormGroup = null

  isMultyISBN: boolean = false;

  constructor (private http: HttpClient, private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  selectedFile = null;

  ngOnInit() {
    this.role = this.authService.user.value.role;

    this.route.data.subscribe(
      (resData) => {
        this.genres = resData[0];
      }
    )
  }

  formCheck(event) {
    this.formSingle = event
  }

  onSubmitAds() {
    this.formSingle.markAllAsTouched()
    if (this.formSingle.invalid) {
      console.log("INVALIDO");
      return
    } else {
      const formData = new FormData()

      console.log(Object.keys(this.formSingle.value));

      for (const nameValue of Object.keys(this.formSingle.value)) {
        if(this.formSingle.value[nameValue]!== null && this.formSingle.value[nameValue]!== ""){
          switch (nameValue) {
            case "image":
              for (const image of this.formSingle.value['image']) {
                formData.append('images',image, image.name)
              }
              break
            case "genre":
              formData.append('genre_id',this.formSingle.value['genre'][0].id)
              break
            case "quantity":
            case "price":
              if (this.authService.user.value.role === "LIBRERIA") {
                formData.append(nameValue,this.formSingle.value[nameValue])
              }
              break
            default: 
              formData.append(nameValue,this.formSingle.value[nameValue])
              break
          }
        }
      }

      let url = environment.apiUrl + "/api/v1/ads/"
      this.http.post(
        url,
        formData
      ).subscribe(
        resData => {
          this.router.navigate([`/${this.authService.user.value.id}/my-insertion`])
          
        }
      )
    }




    
  }


  @ViewChild('progressBar') progressBarEl: ElementRef
  @ViewChildren('step') stepEl: QueryList<ElementRef>
  onSetStep(id: number) {
    for (let i = 0; i < this.stepEl.length; i++) {
      if (i<=id){
        if (!this.stepEl.get(i).nativeElement['classList'].contains('done')) {
          this.stepEl.get(i).nativeElement['classList'].add('done')
        }
      } else {
        if (this.stepEl.get(i).nativeElement['classList'].contains('done')) {
          this.stepEl.get(i).nativeElement['classList'].remove('done')
        }
      }
      
    }
    this.progressBarEl.nativeElement['value'] = id;
  }

  changeBook(book: {title: string, isbn: string, quantity: number}) {
    this.isbnForm.controls['ISBN'].setValue(book.isbn);
    this.isbnForm.controls['quantity'].setValue(book.quantity);
    this.isEdit=true;
  }

  isbns: string[] = []
  changeStep(id: number) {
    this.stepEl.get(id).nativeElement.click()
    if(id===0) {
      this.ads = []
      this.isbns = []
      this.books = []
      this.formSingle.reset()
    } 
    if(id === 2) {

      this.http.post(
        `${environment.apiUrl}/api/v1/books`,
        {
          "isbns": this.isbns
        }
      ).subscribe(
        (resData: {data}) => {
          console.log(resData);
          for (let i = 0; i < resData.data.length; i++) {
            const img: adImage = {
              id: 0,
              url: resData.data[i].imageLinks.smallThumbnail,
              ad_id: this.authService.user.value.id,
              main: true,
              created_at: null,
              updated_at: null,
              deleted_at: null,
            } 
            this.ads.push(new Ad(
              "S",0,resData.data[i].title,"",resData.data[0].publishedDate,
              resData.data[i].authors[0],1,"15.99","","",this.authService.user.value.id,
              null,[img]
            ))
          }
          
          
        }
      )
    }
  }

  onSubmitMulty() {
    console.log(this.ads);
  }

  onEdit() {
    this.isEdit = true;
    this.showError= false
    this.onSubmitIsbn();
  }

  wrongIsbn: boolean = false
  books: {title: string, isbn: string, quantity: number}[] = []
  @ViewChild('addAdsFormIsbn') isbnForm: NgForm
  onSubmitIsbn() {
    console.log(this.isbnForm);
    let quantity = this.isbnForm.value['quantity'];
    if (quantity === "" || quantity === null || quantity === 0) {
      quantity=1
    }

    for (let i = 0; i < this.books.length; i++) {
      if(this.books[i].isbn === this.isbnForm.value['ISBN']) {
        if (this.isEdit) {
          this.books[i].quantity = quantity
          this.isbnForm.resetForm()
          this.isEdit = false
        } else {
          this.showError = true
        }
        return
      }
    }
    this.isEdit = false

    
    
      this.http.get(
      `${environment.apiUrl}/api/v1/books/checkByIsbn/${this.isbnForm.value['ISBN']}`
      ).subscribe(
        (resData: {data: {title: string}})=> {
          const book:{title: string, isbn: string, quantity: number}  = 
          {title: resData.data.title, isbn: this.isbnForm.value['ISBN'], quantity: quantity} 
          this.books.push(book)
          this.isbns.push(book.isbn);
          this.isbnForm.resetForm()
        },
        error => {
          this.isbnForm.controls['ISBN'].setErrors({'incorrect': true})
        }
      )
    
    
    
    
  }

  errorHandle(errorId: number) { //Creare gestione degli errori
    
  }

}