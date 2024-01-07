import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector:"alert-component",
  templateUrl:"alert.component.html",
  styles:[`
    main{
      z-index: 10000;
    }
    section{
      z-index: 15000;
    }
  `]
})
export class AlertComponent{
 @Input() message="";
 @Input() header="";
 @Output() onClose=new EventEmitter<void>();
  onCloseBtn(){
    this.onClose.emit();
  }
}
