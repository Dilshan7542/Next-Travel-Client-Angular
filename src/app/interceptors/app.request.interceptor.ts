import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer, CustomerService} from "../service/customer.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AppRequestInterceptor implements HttpInterceptor{

  constructor(private customerService:CustomerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth= sessionStorage.getItem("Auth");
   if(auth){
   const customer= sessionStorage.getItem("userDetail");
      if(customer){
        this.customerService.customer=JSON.parse(customer);
      }
    let httpHeaders = new HttpHeaders({
      Authorization:auth,
      "X-Requested-With":"XMLHttpRequest"
    });
    let httpRequest = req.clone({headers:httpHeaders});
    return next.handle(httpRequest);

   }
   return next.handle(req);
  }

}
