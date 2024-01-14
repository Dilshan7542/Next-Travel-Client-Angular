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


@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authService:AuthService,private router:Router,private activeRouter:ActivatedRoute) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userDetail = sessionStorage.getItem("userCredential");
      let auth = sessionStorage.getItem("Auth");
      if(auth && userDetail){
       const userCredential=JSON.parse(userDetail);
       this.authService.authCredential=userCredential;
        this.authService.isLoginUser.next(userCredential);
        return true;
      }else{
        this.authService.navigateUrl= state.url;
        this.router.navigate(["/auth"]);
        return false;
      }
  }

}
