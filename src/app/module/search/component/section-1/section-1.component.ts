import {Component, ElementRef, EventEmitter, Output} from "@angular/core";

@Component({
  selector:"section-1",
  templateUrl:"section-1.component.html",
})
export class Section1Component{
    locationList:string[]=["Gampaha","Negombo","Ganemulle","Colombo"];
   @Output() onSelectLocation=new EventEmitter<string>();

  onSelect(selectElement:string) {
    this.onSelectLocation.emit(selectElement);
  }
}
