import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy{
  isUserLogin=false;
  constructor(private authService:AuthService,private router:Router) {
  }

  logOut(){
    this.authService.logOut();
  }
  authNavigate() {
    this.authService.navigateUrl=this.router.url;
  }
  ngOnInit(): void {
    this.authService.isLoginUser.subscribe(auth=>{
      this.isUserLogin=auth;
    });
  }

  ngOnDestroy(): void {
    console.log("header Destroyed!!!");
  }
}
