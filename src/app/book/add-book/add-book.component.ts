import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { Genre } from "../book.service";
import { GenreResolverService } from "../genre-resolver.service";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html'
})
export class AddBookComponent implements OnInit{
  years: number[] = [];
  genres: Genre[] = [];
  // images: File[] = [];
  // imgFile: File;
  filePaths: string[] = [];
  
  
  addAdsForm: FormGroup = new FormGroup({
    'title': new FormControl("",Validators.required),
    'author': new FormControl(""),
    'year': new FormControl([]),
    'publisher': new FormControl(""),
    'genre': new FormControl([]),
    'description': new FormControl(""),
    'image': new FormControl([]),
    'isbn': new FormControl([])
  });

  constructor (private http: HttpClient, private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  selectedFile = null;

  ngOnInit() {
    console.log("cia");
    if (this.authService.user.value.role === "LIBRERIA") {
      this.addAdsForm.get('author').setValidators(Validators.required);
      this.addAdsForm.get('year').setValidators(Validators.required);
      this.addAdsForm.get('publisher').setValidators(Validators.required);
      this.addAdsForm.get('genre').setValidators(Validators.required);
      this.addAdsForm.get('description').setValidators(Validators.required);
      this.addAdsForm.get('isbn').setValidators(Validators.required);
      this.addAdsForm.get('image').setValidators(Validators.required);
      this.addAdsForm.addControl('quantity', new FormControl(1));
      this.addAdsForm.addControl('price', new FormControl("", Validators.required));
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

  onSubmit() {
    this.addAdsForm.markAllAsTouched()
    if (this.addAdsForm.invalid) {
      console.log("INVALIDO");
    } else {
      const formData = new FormData()
      for (const image of this.addAdsForm.value['image']) {
        formData.append('images',image, image.name)
      }
      formData.append('title',this.addAdsForm.value['title'])
      formData.append('genre_id',this.addAdsForm.value['genre'][0].id)
      formData.append('description',this.addAdsForm.value['description'])
      formData.append('year',this.addAdsForm.value['year'])
      formData.append('author',this.addAdsForm.value['author'])
      formData.append('publisher',this.addAdsForm.value['publisher'])
      formData.append('isbn',this.addAdsForm.value['isbn'])

      let url = "http://" + this.authService.url + "/api/v1/ads/"

      if (this.authService.user.value.role === "LIBRERIA") {
        formData.append('quantity',this.addAdsForm.value['quantity'])
        formData.append('price',this.addAdsForm.value['price'])
        url = url + "sell"
      } else {
        url = url + "search"
      }

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
              author: string,
              created_at: string,
              deleted_at: string,
              description: string, 
              genre: string,
              hidden: boolean,
              id: number,
              publisher: string,
              title: string,
              updated_at: string,
              user_id: number,
              year: string
            }  
          }
            ) => {
              console.log(resData);
              this.router.navigate([`/insertion/${resData.data.user_id}/${resData.data.id}`])
        }
      )

    }

    console.log(this.addAdsForm.value);
    console.log(this.filePaths);
    console.log(this.addAdsForm.value['title']);
    
    
    
    
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

}