import {Injectable, OnInit} from "@angular/core";
import {Subject} from "rxjs";
export interface Hotel{
  hotelID?:string;
  name:string;
  image:string;
  email:string;
  location:string;
  starRate:string;
  tel:string;
  option?:{option1:number,option2:number,option3:number,option4:number};
}
@Injectable({providedIn:"root"})
export class HotelService implements OnInit{
  hotelList:Hotel[]=[];
  selectHotel!:Hotel;
  hotelAmount=0;
  selectHotelOption=0;
  roomCount=1;

  constructor() {
   const selectHotel= sessionStorage.getItem("selectHotel");
    if(selectHotel){
      this.selectHotel=JSON.parse(selectHotel);
    }
  }

  ngOnInit(): void {
    console.log("service Init");
   setTimeout(this.initValue,1500);
  }
  initValue(){
    this.hotelList=[];
  return new Promise<Hotel[]>((resolve, reject)=>{
    let img="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/a1/9c/80/essentia-luxury-hotel.jpg?w=700&h=-1&s=1";
    this.hotelList.push({name:"Dilshan",image:img,email:"dilshan@gmail.com",location:"Gampaha",tel:"0752277759",starRate:"45",option:{option1:1000,option2:1500,option3:2000,option4:2500}});
    this.hotelList.push({name:"Hashan",image:img,email:"dilshan@gmail.com",location:"Gampaha",tel:"0752277759",starRate:"45",option:{option1:1000,option2:1500,option3:2000,option4:2500}});
    this.hotelList.push({name:"Iressha",image:img,email:"dilshan@gmail.com",location:"Gampaha",tel:"0752277759",starRate:"45",option:{option1:1000,option2:1500,option3:2000,option4:2500}});
    this.hotelList.push({name:"Punsara",image:img,email:"dilshan@gmail.com",location:"Gampaha",tel:"0752277759",starRate:"45",option:{option1:1000,option2:1500,option3:2000,option4:2500}});
      setTimeout(()=>{
        resolve(this.hotelList);
      },1500);
    });
  }
  getAllHotel() {
   return  new Promise<Hotel[]>((resolve, reject) =>{
        resolve(this.hotelList.slice());
        reject.bind(new Error("Data Not Fetch..."))
    });

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
