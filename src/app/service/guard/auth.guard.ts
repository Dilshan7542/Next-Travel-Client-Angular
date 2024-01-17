import {Injectable} from "@angular/core";
import {AuthCredential, AuthService} from "../auth/auth.service";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {map, Observable, take, tap} from "rxjs";
import {CustomerService} from "../customer.service";


@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authService:AuthService,private customerService:CustomerService,private router:Router,private activeRouter:ActivatedRoute) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userCredential = sessionStorage.getItem("userCredential");
      let auth = sessionStorage.getItem("Auth");
    this.authService.navigateUrl= state.url;
      if(auth && userCredential){
       const userCredentials=JSON.parse(userCredential);
       this.authService.authCredential=userCredentials;
        this.authService.isLoginUser.next(userCredentials);
        let customer = sessionStorage.getItem("userDetail");
        if(customer)
        this.customerService.customer=JSON.parse(customer);
        return true;
      }else{

        this.router.navigate(["/auth"]);
        return false;
      }
  }

}
