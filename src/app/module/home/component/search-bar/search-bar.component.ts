import {Component} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector:"search-bar-component",
  templateUrl:"search-bar.component.html",
  styleUrls:["search-bar.component.scss"]
})
export class SearchBarComponent{
  isOptionSection=false;
  adultValue=0;
  childValue=0;
  roomValue=0;
    dateRange!:FormGroup;
    minDate=new Date();
  protected readonly Date = Date;

  onCloseOptionSection() {
    this.isOptionSection=!this.isOptionSection;
  }

  valueIncrement(name:string,type:boolean) {
        switch (name){
          case "ADULT":
          this.adultValue=this.optionBarRoute(type,this.adultValue,15);
            break;
          case "CHILD":
            this.childValue=this.optionBarRoute(type,this.childValue);
            break;
          case "ROOM":
           this.roomValue=this.optionBarRoute(type,this.roomValue)
            break;
          default:
            throw new Error("invalid name input");
        }

  }
optionBarRoute(type:boolean,value:number,endValue?:number){
    const end:number=endValue===undefined ? 10:endValue;
  type ? value++:value--;
  if(value>end){
    value=0;
  }
  if(value<0){
    value=end;
  }
  return value;
}
}
