import {inject, Injectable} from "@angular/core";
import {map, observable, Observable, Subject, Subscriber, take, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {PreviousRouteService} from "../router/previous-router.service";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {Customer, CustomerService} from "../customer.service";

export interface AuthCredential{
  username:string,
  password:string
}
@Injectable({
  providedIn:"root"
})
export class AuthService{
  authCredential:AuthCredential | null=null;
  isLoginUser=new Subject<AuthCredential>();
  navigateUrl:string="/";
  path=environment.url+"/customer/api/v1/customer";
  constructor(private activeRoute:ActivatedRoute,private router:Router,private http:HttpClient) {

  }

validUserDetail(authCredential:AuthCredential){

  return   this.searchByEmailUser(authCredential).pipe(tap((err)=>{
      if(err instanceof HttpErrorResponse){
          if(err.status !==401){
            throw new Error(err.error);
          }
      }
      this.authCredential=authCredential;

      sessionStorage.setItem("userCredential",JSON.stringify(authCredential));
      sessionStorage.setItem("Auth",err.headers.get("Authorization")!);
      this.isLoginUser.next(authCredential);
      this.navigate();
    }));

}

searchByEmailUser(authCredential:AuthCredential){

     return  this.http.get<Customer>(this.path+"/search/email/"+authCredential.username,{
       headers:{
         "Authorization":"Basic " + window.btoa(authCredential.username + ':' + authCredential.password),
         "X-Requested-With":"XMLHttpRequest"
       }
       ,observe:"response"});

}
  private navigate() {
          this.router.navigate([this.navigateUrl]);
  }
  logOut(){
    this.authCredential=null;
    this.navigateUrl="/home";
    sessionStorage.clear();
    this.navigate();


  }
}
