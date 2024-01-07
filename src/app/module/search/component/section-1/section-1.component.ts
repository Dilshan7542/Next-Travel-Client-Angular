import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from "@angular/core";

@Component({
  selector:"section-1",
  templateUrl:"section-1.component.html",
})
export class Section1Component implements OnInit{

    locationList:string[]=["locations","Gampaha","Negombo","Ganemulle","Colombo"];
   @Output() onSelectLocation=new EventEmitter<string>();

  onSelect(selectElement:string) {
    this.onSelectLocation.emit(selectElement);
    sessionStorage.setItem("location",selectElement);
  }

  ngOnInit(): void {
    const location= sessionStorage.getItem("location");
    if(location){
    this.locationList= this.locationList.filter(l=> l!==location);
    this.locationList.unshift(location);
    this.onSelect(location);
    }

  }
}
