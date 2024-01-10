import {Component, OnInit} from "@angular/core";
import {Vehicle, VehicleService} from "../../../../../service/vehicle.service";
import {ChildService} from "../child.service";




@Component({
  selector:"vehicle-component",
  templateUrl:"vehicle.component.html",
  styleUrls:["vehicle.component.scss"],

})
export class VehicleComponent implements OnInit{
    isLoading=false;
    vehicleList:Vehicle[]=[];
  constructor(private childService:ChildService,private vehicleService:VehicleService) {  }

  onSelect(vehicle:Vehicle,inputElement: HTMLInputElement, parent: HTMLElement) {
    this.childService.onSelect(inputElement,parent);
    this.vehicleService.selectVehicleValue=vehicle;
    sessionStorage.setItem("selectVehicle",JSON.stringify(vehicle));
  }

  ngOnInit(): void {
    this.isLoading=true;
    this.vehicleService.getAllVehicle().then(vehicleList=>{
      this.vehicleList=vehicleList;
      this.isLoading=false;
    });
  }
}
