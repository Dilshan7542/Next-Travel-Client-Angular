
import {SearchSubject} from "../search.service";
import {Vehicle, VehiclePayment, VehicleService} from "../vehicle.service";
import {TravelService} from "../travel.service";
import {Injectable} from "@angular/core";
@Injectable({providedIn:"root"})
export class VehicleCalcService{
  vehiclePayment!:VehiclePayment;
  vehicleService!:VehicleService;
  initializer(vehicleService:VehicleService){
    this.vehicleService=vehicleService;
    this.vehiclePayment=this.vehicleService.vehiclePayment;
  }
  constructor(private travelService:TravelService) {

  }

  getVehicleCount(option:{adult:number,child:number,room:number},seat:number) {
    let headCount=option.adult+option.child;
    let countValue=1;
    if((headCount)> seat){
      let count=1;
      while(headCount!==0 && headCount>seat){
        headCount -=seat;
        count++;
      }
      countValue=count;
    }
    return countValue;
  }
  vehicleTotal(searchSubject:SearchSubject){
      const selectVehicle=this.vehicleService.selectVehicle;
      this.vehiclePayment.fee1Day=selectVehicle.fee1Day *this.travelService.countDate(searchSubject.selectDate);
      this.vehiclePayment.fee1KM=selectVehicle.fee1KM * searchSubject.travelArea.fullKM;
      this.vehiclePayment.fuel1KM=selectVehicle.fuel1KM * searchSubject.travelArea.fullKM;
      this.vehiclePayment.vehicleCharge=this.vehiclePayment.fuel1KM+this.vehiclePayment.fee1KM+this.vehiclePayment.fee1Day;
      this.vehiclePayment.vehicleCount=this.getVehicleCount(searchSubject.option,selectVehicle.seat);
      this.vehiclePayment.VehicleTotalAmount=this.vehiclePayment.vehicleCharge*this.vehiclePayment.vehicleCount;
     return this.vehiclePayment;

  }
}
