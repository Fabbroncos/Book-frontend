import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  // isUser = true;
  id = '0'

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.isUser = !!params;
    //   }
    // )
  }

  onLogout() {
    this.authService.logout()
  }
}
