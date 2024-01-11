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
    let hotel:{name:string}={name:"Ananthara Hotel"};
    this.bookingList.push({bookingID:1,hotel:JSON.stringify(hotel),vehicle:`{"brandName":"BMW"}`,travel:`{"location":"Galle"}`,guide:"Gunapala",date:"2023-01-5",time:"08.35",paidValue:3500,paymentStatus:false});
    hotel={name:"JetWin Hotel"};
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

  private initBookingDTO() {
    this.bookingList.map(b=>{
      let hotel:Hotel={tel:"",option:{option1:0,option4:0,option3:0,option2:0},image:"",location:'',email:"",name:b.hotel,starRate:"5"};
      let vehicle:Vehicle={image:"",fuel1KM:0,fee1KM:0,fee1Day:0,seat:0,brandName:b.vehicle};
      let travel:Travel={startDate:"",travelCategory:{travelCategoryID:0,categoryName:""},adult:0,room:0, endDate:"",location:b.travel,children:0};
      this.bookingDTOList.push({
        bookingID:b.bookingID,
        date:b.date,
        time:b.time,
        hotel:hotel,
        vehicle:vehicle,
        guide:"test",
        paidValue:b.paidValue,
        paymentStatus:b.paymentStatus,
        travel:travel
      });
    });
  }
}
