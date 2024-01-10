import {Injectable} from "@angular/core";
import {Customer} from "./customer.service";
import {TravelCategory} from "./travel.service";

export interface Booking {
  bookingID?:number;
  date:string;
  time:string;
  hotel:string;
  travel:string;
  vehicle:string;
  guide:string;
  paidValue:number;
  paymentStatus:boolean;
  customer?:Customer;
}
export interface Travel{
  travelID?:number;
  location:string;
  startDate:string;
  endDate:string;
  adult:number;
  children:number;
  room:number;
  travelCategory:TravelCategory;
}
@Injectable({
  providedIn:"root"
})
export class BookingService {
    bookingList:Booking[]=[];
  constructor() {
  }
  getBookedList(){
    this.bookingList.push({bookingID:1,hotel:"Ananthara Hotel",vehicle:"BMW",travel:"Galle",guide:"true",date:"2023-01-5",time:"08.35",paidValue:3500,paymentStatus:false});
    this.bookingList.push({bookingID:2,hotel:"JetWin Hotel",vehicle:"BMW",travel:"Colombo",guide:"true",date:"2023-01-5",time:"08.35",paidValue:3500,paymentStatus:true});
    this.bookingList.push({bookingID:3,hotel:"Awandra Hotel",vehicle:"BMW",travel:"Gampaha",guide:"true",date:"2023-01-5",time:"08.35",paidValue:3500,paymentStatus:true});
    this.bookingList.push({bookingID:4,hotel:"Galadari Hotel",vehicle:"BMW",travel:"Mathara",guide:"true",date:"2023-01-5",time:"08.35",paidValue:3500,paymentStatus:true});
    this.bookingList.push({bookingID:5,hotel:"Hiltion Hotel",vehicle:"BMW",travel:"Fambulle",guide:"true",date:"2023-01-5",time:"08.35",paidValue:3500,paymentStatus:true});
return new Promise<Booking[]>((resolve, reject)=>{
  resolve(this.bookingList);


});
  }
}
