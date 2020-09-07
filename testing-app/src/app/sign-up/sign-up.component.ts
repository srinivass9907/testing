import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }
  email: string;
  password: string;

  ngOnInit(): void {
  }

  signup() {
    this.auth.signup(this.email, this.password);
    this.email = this.password = '';
  }

}
