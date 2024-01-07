import {Component, EventEmitter, Output} from "@angular/core";

export interface Option{
  adult:number;
  child:number;
  room:number;
}
@Component({
  selector:"section-3",
  templateUrl:"section-3.component.html",
  styleUrls:["section-3.component.scss"]
})
export  class Section3Component{
 @Output() optionEmitter=new EventEmitter<Option>();
  isOptionSection=false;
  adultValue=0;
  childValue=0;
  roomValue=0;
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
    this.optionEmitter.emit({adult:this.adultValue,child:this.childValue,room:this.roomValue});

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
