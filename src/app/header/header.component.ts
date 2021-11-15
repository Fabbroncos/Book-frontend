import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  isLibrary = false;

  id: number;
  private userSub: Subscription;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userSub = this.authService.userData
    .subscribe(userData => {
      this.isAuthenticated = !!userData;
      if (this.isAuthenticated) {
        this.isLibrary = userData.role === "LIBRERIA";
        this.id = userData.id;
      }
    })
  }

  onSubmit(searchForm: NgForm) {
    console.log(searchForm.value);
    
    const searchString: string = searchForm.value['search'];
    if (searchForm.value['search'] === "") {
      this.router.navigate(['/insertion']);
    } else {
      this.router.navigate(['/insertion'], {queryParams: {title: searchForm.value['search']}});
    }
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  @ViewChild('dropdown') dropdown: ElementRef
  onLogout() {
    this.authService.logout();
    this.dropdown.nativeElement['classList'].remove('show')
    this.router.navigate(["/home"])
  }
  
}