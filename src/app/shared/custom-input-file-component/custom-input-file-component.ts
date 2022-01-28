import { Component, ElementRef, forwardRef, HostListener, Input, OnInit, Optional, Self, ViewChild } from "@angular/core";
import { ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component ({
  selector: 'app-custom-input-file-component',
  templateUrl: './custom-input-file-component.html',
  styleUrls: ['./custom-input-file-component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputFileComponent),
      multi: true
    }
  ]
})
export class CustomInputFileComponent implements OnInit, ControlValueAccessor{
  @Input() form: FormControl = new FormControl;
  disabled = false;
  touched = false;

  value: File[] = []; //filePaths
  
  defaultText = "Aggiungi un immagine...";

  // valueText: String = this.defaultText;
  // value: any[] = [];
  isMultiple = false;

  ngOnInit() {
    this.value.length
  }

  @HostListener('click')
  onClick() {
    this.touched = true;
  }

  @HostListener('window:focus', ['$event'])
  onFocus(event) {
    if (this.touched && this.value.length === 0) {
      this.onTouched();
    }
  }

  onRemove(id: number) {
    console.log(this.value);
    this.value.splice(id,1)
    this.imagePreview.splice(id,1)
    console.log(this.value);
    

    this.onChange(this.value)
    
  }

  onRemoveTarget(e) {
    e.target.value = "";
    console.log(e.target.value);
    
  }

  setText() {
    let valueText: string = this.defaultText
    if (this.value.length !== 0) {
      valueText = ""
      this.value.forEach(
        (item,i)=> {
          if (i===0){
            valueText = item.name
          } else {
            valueText = valueText + ", " + item.name
          }
      })
    }
    return valueText
  }


  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: any[]): void {
    if (!value) {return}
    this.value = value;
    this.onChange(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  imagePreview: string[] = []

  onChangeInput(event) {
    const file = (event.target as HTMLInputElement).files[0];
    // const reader = new FileReader();
    // reader.onload = () => {
      this.value.push(file);
      console.log(file);
      
      
      // if (this.value.length===1) {
      //   this.valueText = file.name 
      // } else {
      //   this.valueText = this.valueText + ", " + file.name;
      // }
      
    this.onChange(this.value);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview.push(reader.result as string);
    }
    reader.readAsDataURL(file)
  }

  // imagePreview(file: File): string {
    
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     return reader.result as string
  //   }
  //   reader.readAsDataURL(file)
  // }
}