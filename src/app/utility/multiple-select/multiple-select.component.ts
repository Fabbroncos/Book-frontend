import { Component, ElementRef, forwardRef, HostListener, Input, OnInit, Optional, Self, ViewChild } from "@angular/core";
import { ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component ({
  selector: 'app-multiple-select-component',
  templateUrl: './multiple-select.component.html',
  styleUrls: ['./multiple-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultipleSelectComponent),
      multi: true
    }
  ]
})
export class MultipleSelectComponent implements OnInit, ControlValueAccessor{
  @Input() list;
  @Input() stringAttribute: string;
  @Input() multiple: boolean = false;
  @Input() form: FormControl = new FormControl;
  disabled = false;

  

  defaultText = "Scegli tra le seguenti...";

  valueText: String = this.defaultText;
  value: any[] = [];
  isMultiple = false;

  ngOnInit() {
    this.isMultiple = this.multiple;
    console.log(this.form);
    
  }

  setOptionText(item: any) {
    switch (typeof(item)) {
      case "object":
        return(item[this.stringAttribute].toString())
      default:
        return item;
    }
  }

  onToggleCheck(item: string ,event: Event) {
    if (this.isMultiple) {
      event.stopPropagation();
      if (this.value.includes(item)) {
        const id = this.value.indexOf(item);
        this.value.splice(id,1);
      } else {
        this.value.push(item);
        this.value.sort();
      }
    } else {
      this.value = [item];
    }
    this.onChange(this.value);
    if (this.value.length === 0) {
      this.valueText = this.defaultText
    } else {
      let list: String[] =[];
      for (const item of this.value) {
        list.push(this.setOptionText(item));
      }
      this.valueText = list.join(", ");
      
    }
  }

  @ViewChild('dropdownElement') dropdownElement: ElementRef;
  @ViewChild('toggleElement') toggleElement: ElementRef;
  @HostListener('window:scroll',['$event']) // for window scroll events
  onScroll() {
    const list: NamedNodeMap = this.dropdownElement.nativeElement["attributes"];
    for (let i = 0; i < list.length; i++) {
      if (list.item(i).name === "x-placement") {
        if (list.item(i).value === "top-start") {
          this.toggleElement.nativeElement["classList"].add("dropup")
        } else {
          this.toggleElement.nativeElement["classList"].remove("dropup")
        }
      }
    }
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: any[]): void {
    this.value = value;
    this.onChange(this.value);
    if (this.value===null) {this.valueText = this.defaultText; return}    
    if (this.value.length=0) {
      this.valueText = this.defaultText
    } else {
      let list: String[] =[];
      for (const item of this.value) {
        list.push(this.setOptionText(item));
      }
      this.valueText = list.join(", ");
      
    }
    
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    console.log(isDisabled);
    
    this.disabled = isDisabled;
  }

  isIncluded(item): boolean {
    if (this.value!== null){
      if (this.value.includes(item)){return true}
    }
    return false
  }
}