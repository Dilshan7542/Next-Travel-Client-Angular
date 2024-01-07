import {Component, EventEmitter, OnInit, Output} from "@angular/core";

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
export  class Section3Component implements OnInit{
  @Output() optionEmitter=new EventEmitter<Option>();
  isOptionSection=false;
  optionValue:Option={adult:1,child:0,room:1};
  ngOnInit(): void {
     const option= sessionStorage.getItem("options");
     if(option){
     this.optionValue=JSON.parse(option);
     this.onChangeOption(this.optionValue);
     }
  }
  onCloseOptionSection() {
    this.isOptionSection=!this.isOptionSection;
  }

  valueIncrement(name:string,type:boolean) {
    switch (name){
      case "ADULT":
        this.optionValue.adult=this.optionBarRoute(type,this.optionValue.adult,15);
        break;
      case "CHILD":
        this.optionValue.child=this.optionBarRoute(type,this.optionValue.child);
        break;
      case "ROOM":
        this.optionValue.child=this.optionBarRoute(type,this.optionValue.child)
        break;
      default:
        throw new Error("invalid name input");
    }
    this.onChangeOption({ adult:this.optionValue.adult,child:this.optionValue.child,room:this.optionValue.room});
  }
  onChangeOption(option:Option){
    this.optionEmitter.emit(option);
    sessionStorage.setItem("options",JSON.stringify(option));
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
