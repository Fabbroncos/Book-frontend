import { Component, EventEmitter, forwardRef, HostBinding, HostListener, Input, OnChanges, OnInit, Output } from '@angular/core'
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, NgForm, Validators } from '@angular/forms'
import { Ad, Genre } from '../../ad.model'
import { environment } from 'src/environments/environment.prod'

@Component({
  selector: 'app-add-ad-item-form',
  templateUrl: './app-add-ad-item-form.component.html',
  styleUrls: ['./app-add-ad-item-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddAdItemFormComponent),
      multi: true,
    },
  ],
})
export class AddAdItemFormComponent implements OnInit, ControlValueAccessor, OnChanges {

  @Input('ad') ad: Ad = null
  @Input('genres') genres: Genre[] = []

  id = 0
  imagePreview = []
  touched = false
  imageFile: File[] = []
  isOpen = false

  years: number[] = []

  adForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    author: new FormControl(null, Validators.required),
    year: new FormControl(null, Validators.required),
    publisher: new FormControl(null, Validators.required),
    genre: new FormControl(null, Validators.required),
    description: new FormControl(null),
    image: new FormControl([], Validators.required),
    ISBN: new FormControl({value: null, disabled: true}, Validators.required),
    quantity: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
  })

  @HostBinding('class') className = 'col-6';
  @Output() formChangeEvent = new EventEmitter<FormGroup>()


  async ngOnChanges() {
    console.log(this.ad);
    if (this.ad) {
      const date = this.ad.year.toString().split(/[. \-/_]/);
      for (const num in date) {
        if (num.length === 4) {
          this.ad.year = parseInt(num)
        }
      }
    }
    if (this.ad) {
      
      this.adForm.get('title').setValue(this.ad.title)
      this.adForm.get('author').setValue(this.ad.author)
      // this.adForm.get('year').setValue(this.ad.year)
      this.adForm.get('publisher').setValue(this.ad.publisher)
      // this.adForm.get('genre').setValue(this.ad.genres)
      this.adForm.get('description').setValue(this.ad.description)
      this.adForm.get('ISBN').setValue(this.ad.isbn)
      this.adForm.get('quantity').setValue(this.ad.quantity)
      this.adForm.get('price').setValue(this.ad.price)
      for(const image of this.ad.images) {
        this.imagePreview.push(image.url)
        const response = await fetch(image.url);
        // here image is url/location of image
        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', {type: blob.type});
        this.imageFile.push(file)

      }
      this.adForm.get('image').setValue(this.imageFile !== null ? this.imageFile : [])
      
    }
  }

  ngOnInit(): void {
    const startYear = 1850
    const endYear = new Date().getFullYear()

    

    for (let i = endYear; i > startYear; i--) {
      this.years.push(i)
    }

    if (this.ad) {
      
      this.adForm.get('title').setValue(this.ad.title)
      this.adForm.get('author').setValue(this.ad.author)
      // this.adForm.get('year').setValue(this.ad.year)
      this.adForm.get('publisher').setValue(this.ad.publisher)
      // this.adForm.get('genre').setValue(this.ad.genres)
      this.adForm.get('description').setValue(this.ad.description)
      this.adForm.get('image').setValue(this.ad.images)
      this.adForm.get('ISBN').setValue(this.ad.isbn)

      this.adForm.get('quantity').setValue(this.ad.quantity)
      this.adForm.get('price').setValue(this.ad.price)
    }
  }

  getUrl() {
    if (this.ad && this.ad.images != null && this.ad.images[0]) {
      return this.ad.images[0].url
    } else {
      return '../assets/no_image.png'
    }
  }

  onRemove(id: number) {
    this.imageFile.splice(id,1)
    this.imagePreview.splice(id,1)

    this.onChange(this.imageFile)
    
  }
  onRemoveTarget(event) {
    event.target.value = ''
  }

  onChangeInput(event) {
    const file = (event.target as HTMLInputElement).files[0]
    this.imageFile.push(file)
    this.onChange(this.imageFile)
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview.push(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  writeValue(value: any[]): void {
    if (!value) {
      return
    }
    this.imageFile = value
    this.onChange(this.imageFile)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    // this.disabled = isDisabled;
  }

  onChange: any = () => {}
  onTouched: any = () => {}

  setText() {}

  @HostListener('window:focus', ['$event'])
  onFocus(event) {
    if (this.touched && this.imageFile.length === 0) {
      this.onTouched()
    }
  }

  toggleOpenAd(container: Element) {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.className = 'col-12'
    } else {
      this.className = 'col-6'
    }
    
    if (container.classList.contains('ad-item')) {
      container.classList.remove('ad-item')
      container.classList.add('ad-item-edit')
    //   container.classList.remove('col-12')
    //   container.classList.add('col-6')
    //   // errorList.classList.remove("d-block");
    //   // errorList.classList.add("d-none");
    } else {
      container.classList.remove('ad-item-edit')
      container.classList.add('ad-item')
    //   container.classList.remove('col-6')
    //   container.classList.add('col-12')
    //   // errorList.classList.remove("d-none");
    //   // errorList.classList.add("d-block");
    }
  }

  checkForm() {
    // form.control.markAllAsTouched()
    console.log(this.adForm)
    console.log(this.imagePreview)
  }
}
