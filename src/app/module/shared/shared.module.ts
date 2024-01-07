import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AlertComponent} from "./components/alert/alert.component";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations:[
    AlertComponent
  ],
  imports: [CommonModule, MatButtonModule],
  exports: [CommonModule, AlertComponent]
})
export class SharedModule{

}
