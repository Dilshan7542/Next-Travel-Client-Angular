import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {Subject, Subscription} from "rxjs";
import {TravelArea} from "./travel-area.service";
import {SearchSubject} from "./search.service";
import {TravelService} from "./travel.service";
import {VehicleCalcService} from "./calculation/vehicle-calc.service";
export interface Vehicle{
  brandName:string;
  image:string;
  fee1Day:number;
  fee1KM:number;
  fuel1KM:number;
  seat:number;
}
export interface VehiclePayment{
fee1Day:number,
  fee1KM:number,
  fuel1KM:number,
  vehicleCount?:number,
  vehicleCharge?:number,
  VehicleTotalAmount?:number
}

@Injectable({providedIn:'root'})
export class VehicleService implements OnInit,OnDestroy{
  vehicleList:Vehicle[]=[];
  subscription!:Subscription;
  selectVehicle!:Vehicle;
  vehiclePayment:VehiclePayment={
    vehicleCharge:0,
    vehicleCount:0,
    VehicleTotalAmount:0,
    fee1Day:0,
    fee1KM:0,
    fuel1KM:0
  };

  vehicleCount=0;
  vehicleTotalAmount=0;

  constructor(private vehicleCalc:VehicleCalcService) {
    this.vehicleCalc.initializer(this);
    const selectVehicle=sessionStorage.getItem("selectVehicle");
    if(selectVehicle){
      this.selectVehicle=JSON.parse(selectVehicle);
    }
  }

  ngOnInit(): void {
  }


  initValue(){
    return new Promise<Vehicle[]>((resolve, reject)=>{
      this.vehicleList=[];
      setTimeout(()=>{
        let img="https://imgd.aeplcdn.com/370x208/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg?isig=0&q=80";
        this.vehicleList.push({brandName:"BMW",image:img,fee1Day:250,fee1KM:180,fuel1KM:340,seat:4});
        this.vehicleList.push({brandName:"Audi",image:img,fee1Day:250,fee1KM:180,fuel1KM:340,seat:4});
        this.vehicleList.push({brandName:"Toyota",image:img,fee1Day:250,fee1KM:180,fuel1KM:340,seat:4});
        this.vehicleList.push({brandName:"Lambogini",image:img,fee1Day:250,fee1KM:180,fuel1KM:340,seat:2});
        this.vehicleList.push({brandName:"Szszki",image:img,fee1Day:250,fee1KM:180,fuel1KM:340,seat:4});
        this.vehicleList.push({brandName:"Szszki",image:img,fee1Day:250,fee1KM:180,fuel1KM:340,seat:4});
        resolve(this.vehicleList);
        reject(new Error("Error... Vehicle 504"));
      },2000);
    });
  }
  getAllVehicle(){
    return this.initValue().then(hotelAr=>{
      return new Promise<Vehicle[]>((resolve, reject)=>{
        resolve(this.vehicleList.slice());
        reject(new Error("Error... Vehicle Data Not Fetch...!!!"));
      });
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getVehicleCount(searchSubject:SearchSubject) {
    this.vehicleCount=this.vehicleCalc.getVehicleCount(searchSubject.option,this.selectVehicle.seat);
    return this.vehicleCount;
  }

  vehicleTotal(searchSubject:SearchSubject){
    if(searchSubject){
     this.vehiclePayment=this.vehicleCalc.vehicleTotal(searchSubject);
     return this.vehiclePayment;
    }
    return this.vehiclePayment;
  }
}
