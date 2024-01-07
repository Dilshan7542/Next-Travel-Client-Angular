import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {formatDate} from "@angular/common";


@Component({
  selector:"section-2",
  templateUrl:"section-2.component.html",
  styleUrls:["section-2.component.scss"]
})
export class Section2Component implements OnInit{
@Output()  dateEmitter=new EventEmitter<{start:string|null,end:string|null}>();
  dateFormGroup!:FormGroup;
  minDate=new Date();

  ngOnInit(): void {
   const selectDate= sessionStorage.getItem("selectDate");
   let start:null | string=null;
   let end:null | string=null;
   if(selectDate){
     const selectDateObj:{start:string|null,end:string|null}=JSON.parse(selectDate);
      start=selectDateObj.start;
      end=selectDateObj.end;
      this.onChangeValue({start:start,end:end});
   }
   this.dateFormGroup=new FormGroup({
     start:new FormControl(start),
     end:new FormControl(end),
   });
  }

  onDateChange() {
   let start= this.dateFormGroup.get('start')?.value;
   let end= this.dateFormGroup.get('end')?.value;
   this.onChangeValue({start:this.formatDate(start),end:this.formatDate(end)});
  }
  onChangeValue(selectDate:{start:string|null,end:string|null}){
    this.dateEmitter.emit(selectDate);
   sessionStorage.setItem("selectDate",JSON.stringify(selectDate));
  }
  formatDate(value:any){
    if(value){
   return  formatDate(value!,"YYY-MM-dd","en");
    }
    return null;
  }
}
