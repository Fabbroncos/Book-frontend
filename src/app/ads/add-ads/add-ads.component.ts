import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { Ad, adImage, Genre } from "../ad.model";

@Component({
  selector: 'app-add-ads',
  templateUrl: './add-ads.component.html'
})
export class AddAdsComponent implements OnInit{
  years: number[] = [];
  genres: Genre[] = [];
  role: string = "";
  // images: File[] = [];
  // imgFile: File;
  filePaths: string[] = [];
  showError: boolean = false
  isEdit: boolean = false

  isMultyISBN: boolean = false;
  
  
  addAdsForm: FormGroup = new FormGroup({
    'title': new FormControl(null,Validators.required),
    'author': new FormControl(null),
    'year': new FormControl(null),
    'publisher': new FormControl(null),
    'genre': new FormControl(null),
    'description': new FormControl(null),
    'image': new FormControl(null),
    'ISBN': new FormControl(null),
    'quantity': new FormControl(null),
    'price': new FormControl(null),
  });

  constructor (private http: HttpClient, private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  selectedFile = null;

  ngOnInit() {
    this.role = this.authService.user.value.role;
    if (this.authService.user.value.role === "LIBRERIA") {
      this.addAdsForm.get('author').setValidators(Validators.required);
      this.addAdsForm.get('year').setValidators(Validators.required);
      this.addAdsForm.get('publisher').setValidators(Validators.required);
      this.addAdsForm.get('genre').setValidators(Validators.required);
      this.addAdsForm.get('description').setValidators(Validators.required);
      this.addAdsForm.get('ISBN').setValidators(Validators.required);
      this.addAdsForm.get('image').setValidators(Validators.required);
      this.addAdsForm.get('quantity').setValidators(Validators.required);
      this.addAdsForm.get('price').setValidators(Validators.required);
      // this.addAdsForm.addControl('quantity', new FormControl(1, Validators.required));
      // this.addAdsForm.addControl('price', new FormControl("", Validators.required));
    } else {
    }


    let startYear = 1900;
    let endYear = new Date().getFullYear();

    for (let i = endYear; i > startYear; i--) {this.years.push(i);}

    this.route.data.subscribe(
      (resData) => {
        this.genres = resData[0];
      }
    )
  }

  // onChange(imgInp, img) {
  //   const [file] = imgInp.files;
  //   this.imgFile = imgInp.files;
  //   // console.log(typeof(imgInp));
  //   // console.log(typeof(img));
  //   // console.log(file);
    
    
  //   if (file) {
  //     // console.log(URL.createObjectURL(file));
  //     // console.log(typeof(URL.createObjectURL(file)));

  //     const urly = URL.createObjectURL(file);
  //     this.images.push(file);
  //     console.log(this.images);
      
  //     img.src = urly;

      
  //   }
    
  // }

  // onFileSelected(event) {
  //   if(event.target.files.length > 0) 
  //    {
  //      console.log(event.target.files[0]);
  //      console.log(event.target.files[0].name);
  //    }
  //  }

  // onImageUrl(image) {
  //   console.log(image);
    
  //   return URL.createObjectURL(image);
  // }
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
    if(id === 2) {

      this.http.post(
        `${this.authService.url}/api/v1/books`,
        {
          "isbns": [this.isbns]
        },
        {
          headers: {
            "Authorization": this.authService.user.value.token
          }
        }
      ).subscribe(
        (resData: {data}) => {
          console.log(resData);
          const img: adImage = {
            id: 0,
            url: resData.data[0].imageLinks.smallThumbnail,
            ad_id: this.authService.user.value.id,
            main: true,
            created_at: null,
            updated_at: null,
            deleted_at: null,
          } 
          this.ads.push(new Ad(
            "S",0,resData.data[0].title,"",resData.data[0].publishedDate,
            resData.data[0].authors[0],1,"15.99","","",this.authService.user.value.id,
            null,[img],false,null,null,null
          ))
          
        }
      )
    }
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
      `${this.authService.url}/api/v1/books/checkByIsbn/${this.isbnForm.value['ISBN']}`,
      {
        headers: {
          "Authorization": this.authService.user.value.token
        }
      }
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

  ads: Ad[] = []

  onSubmit() {
    this.addAdsForm.markAllAsTouched()
    if (this.addAdsForm.invalid) {
      console.log("INVALIDO");
    } else {
      const formData = new FormData()

      console.log(Object.keys(this.addAdsForm.value));

      for (const nameValue of Object.keys(this.addAdsForm.value)) {
        if(this.addAdsForm.value[nameValue]!== null){
          if (nameValue === "image") {
            for (const image of this.addAdsForm.value['image']) {
              formData.append('images',image, image.name)
            }
          } else if (nameValue === "genre"){
            formData.append('genre_id',this.addAdsForm.value['genre'][0].id)
            
          } else if (this.addAdsForm.value[nameValue]!== "") {
            console.log(nameValue);
            
            formData.append(nameValue,this.addAdsForm.value[nameValue])
          }
        }
      }
      
      console.log(formData.get('genre_id'));
      

      // if (this.addAdsForm.value['image']!== null) {
      //   for (const image of this.addAdsForm.value['image']) {
      //     formData.append('images',image, image.name)
      //   }
      // }
      // formData.append('title',this.addAdsForm.value['title'])
      // if (this.addAdsForm.value['genre']!==null){
      //   console.log(this.addAdsForm.value['genre']);
        
      //   formData.append('genre_id',this.addAdsForm.value['genre'][0].id)
      // }
      // formData.append('description',this.addAdsForm.value['description'])
      // formData.append('year',this.addAdsForm.value['year'])
      // formData.append('author',this.addAdsForm.value['author'])
      // formData.append('publisher',this.addAdsForm.value['publisher'])
      // formData.append('ISBN',this.addAdsForm.value['ISBN'])

      let url = this.authService.url + "/api/v1/ads/"

      if (this.authService.user.value.role === "LIBRERIA") {
        formData.append('quantity',this.addAdsForm.value['quantity'])
        formData.append('price',this.addAdsForm.value['price'])
        // url = url + "sell"
      } else {
        // url = url + "search"
      }

      
      console.log(formData.forEach(value=>{console.log(value);
      }));
      


      this.http.post(
        url,
        formData,
        {
          headers: {
            "Authorization": this.authService.userData.value.token,
            
          }
        }
      ).subscribe(
        (resData: 
          {
            message: string,
            data: {
              title: string,
              user_id: number,
              description: string,
              year: string,
              quantity: number,
              price: string,
              isbn: string,
              author: string,
              genre: string,
              publisher: string,
              deleted_at: string,
              id: number,
              hidden: boolean,
              created_at: string,
              updated_at: string
            }  
          }
            ) => {
              console.log(resData);
              // this.router.navigate([`/insertion/${resData.data.user_id}/${resData.data.id}`])
        }
      )

    }
    
    
    
    
    // console.log(this.addBookForm.value['genre'].length);
    
    // for (let i = 0; i < this.addBookForm.value['genre'].length; i++) {
    //   console.log(this.addBookForm.value['genre'][i]);
      
    //   formData.append('genre_id',this.addBookForm.value['genre'][i].id)
    // }

    // formData.append('images',this.addBookForm.value['image'][0])
    // formData.append('images',this.fileToUpload, this.fileToUpload.name)


    
    
    

    
    
    
  }

  // fileToUpload: File = null

  // handleFileInput(files: FileList) {
  //   this.fileToUpload = files.item(0);
  // }

  onCambia() {
    if (this.role === "LIBRERIA") {
      this.role = "ACQUIRENTE"
    } else {
      this.role = "LIBRERIA"

    }
  }

  
  errorHandle(errorId: number) { //Creare gestione degli errori
    
  }

}