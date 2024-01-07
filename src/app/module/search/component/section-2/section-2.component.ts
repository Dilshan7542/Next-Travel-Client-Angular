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
  dateFormGroup=new FormGroup({
    start:new FormControl(null),
    end:new FormControl(null),
  });
  minDate=new Date();

  ngOnInit(): void {

  }

  onDateChange() {
   let start= this.dateFormGroup.get('start')?.value;
   let end= this.dateFormGroup.get('end')?.value;
    this.dateEmitter.emit({start:this.formatDate(start),end:this.formatDate(end)})
  }
  formatDate(value:any){
    if(value){
   return  formatDate(value!,"YYY-MM-dd","en");
    }
    return null;
  }
}
