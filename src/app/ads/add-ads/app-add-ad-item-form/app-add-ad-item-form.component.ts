import { Component, forwardRef, HostListener, OnInit } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-add-ad-item-form',
  templateUrl: './app-add-ad-item-form.component.html',
  styleUrls: ['./app-add-ad-item-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddAdItemFormComponent),
      multi: true
    }
  ]
})
export class AddAdItemFormComponent implements OnInit, ControlValueAccessor {

  constructor() { }

  id = 0;
  imagePreview = [];
  form: FormGroup = null;
  touched: boolean = false;
  imageFile: File[] = [];


  ngOnInit(): void {
  }

  onRemoveTarget(event) {
    event.target.value = "";
  }

  onChangeInput(event) {
    console.log(event);
    const file = (event.target as HTMLInputElement).files[0];
    this.imageFile.push(file);
    this.onChange(this.imageFile);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview.push(reader.result as string);
      console.log(this.imagePreview);
    }
    reader.readAsDataURL(file)
  }

  writeValue(value: any[]): void {
    if (!value) {return}
    this.imageFile = value;
    this.onChange(this.imageFile);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // this.disabled = isDisabled;
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  setText() {

  }

  @HostListener('window:focus', ['$event'])
  onFocus(event) {
    if (this.touched && this.imageFile.length === 0) {
      this.onTouched();
    }
  }

  
}
