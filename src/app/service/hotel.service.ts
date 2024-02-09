import {Injectable, OnInit} from "@angular/core";
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
export interface Hotel{
  hotelID?:number;
  name:string;
  image:string;
  email:string;
  location:string;
  starRate:string;
  tel:string;
  selectOption?:number;
  hotelOption?:{option1:number,option2:number,option3:number,option4:number}[];
}
@Injectable({providedIn:"root"})
export class HotelService implements OnInit{
  hotelList:Hotel[]=[];
  copyHotelList:Hotel[]=[];
  selectHotel!:Hotel;
  hotelDataList=new Subject<Hotel[]>();
  onSelectLocation="";
  hotelAmount=0;
  selectHotelOption=0;
  roomCount=1;

  constructor(private http:HttpClient) {
   const selectHotel= sessionStorage.getItem("selectHotel");
    if(selectHotel){
      this.selectHotel=JSON.parse(selectHotel);
    }
  }

  ngOnInit(): void {

  }

  getAllHotel() {
   return this.http.get<Hotel[]>(environment.url+"/hotel/api/v1/hotel/all").pipe(tap(data=>{
     this.hotelList=data;
    this.searchByLocation(this.onSelectLocation);
   }));

  }
  searchByLocation(location:string){
    this.onSelectLocation=location;
    const list:Hotel[]=[];
    for (let hotel of this.hotelList) {
          if(hotel.location===location){
            list.push(hotel);
          }
    }
    this.copyHotelList=list;
    this.hotelDataList.next(list);
    return list;
  }
  hotelTotal(countDay:number){
    this.hotelAmount=this.roomCount*this.selectHotelOption * countDay;
    return this.hotelAmount;
  }
 getHotelAmount(room:number,hotelOption:number,countDay:number){
    this.roomCount=room;
    this.selectHotelOption=hotelOption;
  return this.hotelTotal(countDay);
  }

}
