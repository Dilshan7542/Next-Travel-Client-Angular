import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AlertComponent} from "./components/alert/alert.component";
import {MatButtonModule} from "@angular/material/button";
import {AlertConformComponent} from "./components/alert-conform/alert-conform.component";

@NgModule({
  declarations:[
    AlertComponent,
    AlertConformComponent
  ],
  imports: [CommonModule, MatButtonModule],
  exports: [CommonModule, AlertComponent, AlertConformComponent]
})
export class SharedModule{

}
