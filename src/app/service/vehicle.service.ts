import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {Subject, Subscription, tap} from "rxjs";
import {SearchSubject} from "./search.service";
import {VehicleCalcService} from "./calculation/vehicle-calc.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
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
  vehicleCategoryListData=new Subject<Vehicle[]>();
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

 // vehicleCount=0; summery include


  constructor(private vehicleCalc:VehicleCalcService,private http:HttpClient ) {
    this.vehicleCalc.initializer(this);
    const selectVehicle=sessionStorage.getItem("selectVehicle");
    if(selectVehicle){
      this.selectVehicle=JSON.parse(selectVehicle);
    }
  }

  ngOnInit(): void {
  }



  getAllVehicle(){
    return this.http.get<Vehicle[]>(environment.url+"/vehicle/api/v1/vehicle/brand/all").pipe(tap(data=>{
        this.vehicleList=data;
        this.vehicleCategoryListData.next(data);
      }));
  }
  getAllVehicleByCategory(categoryID:number){
     return  this.http.get<Vehicle[]>(environment.url+"/vehicle/api/v1/vehicle/brand/search/category/"+categoryID).pipe(tap(data=>{
       this.vehicleList=data;
       this.vehicleCategoryListData.next(data);
     }));

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
/*  getVehicleCount(searchSubject:SearchSubject) { summery include
    this.vehicleCount=this.vehicleCalc.getVehicleCount(searchSubject.option,this.selectVehicle.seat);
    return this.vehicleCount;
  }*/

  vehicleTotal(searchSubject:SearchSubject){
    if(searchSubject){
     this.vehiclePayment=this.vehicleCalc.vehicleTotal(searchSubject);
     return this.vehiclePayment;
    }
    return this.vehiclePayment;
  }
}
