import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector:"alert-conform",
  templateUrl:"alert-conform.component.html"
})
export class AlertConformComponent{
 @Output() onClose=new EventEmitter<void>();
 @Output() onAction=new EventEmitter<boolean>();
 @Input() message="Do you Want Cancel This ?";
 @Input() header="Warning!!";
  onCloseBtn(){
    this.onClose.emit();
  }

  onActionBtn() {
    this.onAction.emit(true);
  }
}
