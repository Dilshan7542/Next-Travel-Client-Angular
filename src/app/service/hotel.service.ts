import {Injectable, OnInit} from "@angular/core";
import {Subject} from "rxjs";
export interface Hotel{
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
  onSelectElement:Subject<Hotel>=new Subject();
  selectHotelValue!:Hotel;
  constructor() {
  }

  ngOnInit(): void {
    console.log("service Init");
   setTimeout(this.initValue,1500);
  }
  initValue(){
    this.hotelList=[];
  return new Promise<Hotel[]>((resolve, reject)=>{
    let img="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/a1/9c/80/essentia-luxury-hotel.jpg?w=700&h=-1&s=1";
    this.hotelList.push({name:"Dilshan",image:img,email:"dilshan@gmail.com",location:"Gampaha",tel:"0752277759",starRate:"45"});
    this.hotelList.push({name:"Hashan",image:img,email:"dilshan@gmail.com",location:"Gampaha",tel:"0752277759",starRate:"45"});
    this.hotelList.push({name:"Iressha",image:img,email:"dilshan@gmail.com",location:"Gampaha",tel:"0752277759",starRate:"45"});
    this.hotelList.push({name:"Punsara",image:img,email:"dilshan@gmail.com",location:"Gampaha",tel:"0752277759",starRate:"45"});
      setTimeout(()=>{
        resolve(this.hotelList);
      },1500);
    });
  }
  getAllHotel() {
   return this.initValue().then(data=>{
   return  new Promise<Hotel[]>((resolve, reject) =>{
        resolve(this.hotelList.slice());
        reject.bind(new Error("Data Not Fetch..."))
    });

   });
  }

}
