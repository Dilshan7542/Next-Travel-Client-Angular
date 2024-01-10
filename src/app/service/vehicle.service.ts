import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {Subject, Subscription} from "rxjs";
export interface Vehicle{
  brandName:string;
  image:string;
  fee1Day:number;
  fee1KM:number;
  fuel1KM:number;
  seat:number;
}


@Injectable({providedIn:'root'})
export class VehicleService implements OnInit,OnDestroy{
  vehicleList:Vehicle[]=[];
  subscription!:Subscription;
 vehicleCharge=0;
  vehicleCount=0;
  selectVehicleValue!:Vehicle;
  vehicleTotalAmount=0;
  constructor() {
  console.log("vehicle service init....");
    const selectVehicle=sessionStorage.getItem("selectVehicle");
    if(selectVehicle){
      this.selectVehicleValue=JSON.parse(selectVehicle);
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
  vehicleTotal(){
   this.vehicleTotalAmount=this.selectVehicleValue.fee1Day;
   this.vehicleTotalAmount +=this.selectVehicleValue.fee1KM;
   this.vehicleTotalAmount +=this.selectVehicleValue.fuel1KM;
   this.vehicleTotalAmount +=this.selectVehicleValue.fee1KM;
   this.vehicleCharge=this.vehicleTotalAmount;
   this.vehicleTotalAmount *=this.vehicleCount;
   return this.vehicleTotalAmount;
  }
}
