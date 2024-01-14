import {Injectable} from "@angular/core";
import {Customer} from "./customer.service";
import {Hotel} from "./hotel.service";
import {Travel} from "./travel.service";
import {Vehicle} from "./vehicle.service";
import {map, Subject, take, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {data} from "autoprefixer";


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
    isPendingBookingUpdate=new Subject<void>();
    pendingBooking:Booking | null=null;
    path=environment.url+"/customer/api/v1/booking";
    bookingListData=new Subject<Booking[]>();

  constructor(private http:HttpClient) {

  }
  getBookedList(){
    return this.http.get<Booking[]>(this.path).pipe(tap(data=>{
             this.bookingList=data;
             this.bookingListData.next(data);
      }));
  }
  cancelPendingBooking(bookingID:number){
      return this.http.delete<void>(this.path+"?bookingID="+bookingID).subscribe(()=>{
              this.getBookedList().subscribe();
              this.pendingBooking=null;
      });
  }
  updatePaidBooking(booking:Booking){
    return this.http.put<Booking>(this.path,booking).pipe(map(data=>{
      if(data){
        return data;
      }else{
        throw new Error("Booking Paid Failed!!");
      }
    }));
  }
  checkPendingBooking(){
    for (let booking of this.bookingList) {
      if(!booking.paymentStatus){
        this.pendingBooking=booking;
        return;
      }
    }
  }

  saveBooking(booking:Booking){
    return this.http.post<Booking>(this.path,booking).pipe(map(data=>{
        if(data){
          return data;
        }else{
          throw new Error("Booking Save Failed!!");
        }
    }));
  }


}
