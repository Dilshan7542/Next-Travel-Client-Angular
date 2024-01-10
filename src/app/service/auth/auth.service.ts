import {Injectable} from "@angular/core";
import {map, observable, Observable, Subject, Subscriber, take, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {PreviousRouteService} from "../router/previous-router.service";

export interface AuthCredential{
  username:string,
  password:string
}
@Injectable({
  providedIn:"root"
})
export class AuthService{
  authCredential:Observable<AuthCredential> |null=null;
  isLoginUser=new Subject<boolean>();
  navigateUrl:string="/";
  constructor(private activeRoute:ActivatedRoute,private router:Router) {

  }

  getAuthService(authCredential:AuthCredential){

         let email="dilshan@gmail.com";
         let pwd="1234";
         if(email!==authCredential.username){
           alert("Email Not Valid");
         }else{
           if(pwd!== authCredential.password){
             alert("Password not Valid");
           }else{
             this.authCredential=new Observable((observable:Subscriber<AuthCredential>)=>{
               observable.next(authCredential);
             });

            this.navigate();
            this.isLoginUser.next(true);
           }
         }
  }


  private navigate() {
          this.router.navigate([this.navigateUrl]);
  }
  logOut(){
    this.authCredential=null;
    this.navigateUrl="/";
    this.navigate();
    this.isLoginUser.next(false);
  }
}
