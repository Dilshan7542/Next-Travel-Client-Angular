import {Injectable} from "@angular/core";
import {Customer} from "./customer.service";
import {Hotel} from "./hotel.service";
import {Travel} from "./travel.service";
import {Vehicle} from "./vehicle.service";


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
export interface BookingDTO {
  bookingID?:number;
  date:string;
  time:string;
  hotel:Hotel;
  travel:Travel;
  vehicle:Vehicle;
  guide:string;
  paidValue:number;
  paymentStatus:boolean;
  customer?:Customer;
}

@Injectable({
  providedIn:"root"
})
export class BookingService {
    bookingList:Booking[]=[];

    pendingBooking:Booking | null=null;


  bookingDTOList:BookingDTO[]=[]; // testing....
  constructor() {
    let hotel:{name:string,option:number}={name:"Ananthara Hotel",option:2500};
    this.bookingList.push({bookingID:1,hotel:JSON.stringify(hotel),vehicle:`{"brandName":"BMW"}`,travel:`{"location":"Galle","room":5,"vehicleCount":4}`,guide:"Gunapala",date:"2023-01-5",time:"08.35",paidValue:3500,paymentStatus:true});
    hotel={name:"JetWin Hotel",option:1000};
    this.bookingList.push({bookingID:2,hotel:JSON.stringify(hotel),vehicle:`{"brandName":"BMW"}`,travel:`{"location":"Galle"}`,guide:"Danapala",date:"2023-01-5",time:"08.35",paidValue:3500,paymentStatus:true});
    this.bookingList.push({bookingID:3,hotel:`{"name":"ABC Hotel"}`,vehicle:`{"brandName":"BMW"}`,travel:`{"location":"Galle"}`,guide:"Danapala",date:"2023-01-5",time:"08.35",paidValue:3500,paymentStatus:true});
    this.bookingList.push({bookingID:4,hotel:`{"name":"Galadari Hotel"}`,vehicle:`{"brandName":"BMW"}`,travel:`{"location":"Galle"}`,guide:"Danapala",date:"2023-01-5",time:"08.35",paidValue:3500,paymentStatus:true});
    this.bookingList.push({bookingID:5,hotel:`{"name":"Hilton Hotel"}`,vehicle:`{"brandName":"BMW"}`,travel:`{"location":"Galle"}`,guide:"Danapala",date:"2023-01-5",time:"08.35",paidValue:3500,paymentStatus:true});

  }
  getBookedList(){


return new Promise<Booking[]>((resolve, reject)=>{
  setTimeout(()=>{
  resolve(this.bookingList);

  },2000);


});
  }
  checkPendingBooking(){
    this.bookingList.map(booking =>{
      if(!booking.paymentStatus){
        this.pendingBooking=booking;
      }
    });
  }
  removePendingBooking(){
    this.pendingBooking=null;
  }
  saveBooking(booking:Booking){
    return new Promise<Booking>((resolve, reject)=>{
      this.bookingList.push(booking);
      resolve(booking);
    });
  }


}
