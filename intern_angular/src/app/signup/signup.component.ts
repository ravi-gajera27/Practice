import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      let user = {
        uname: form.value.uname,
        email: form.value.email,
        pass: form.value.pass,
      };
      this.authService.signup(user).subscribe((res: Response) => {
        if (res['statusCode'] == 201) {
          localStorage.setItem('token', res['accessToken']);
          this.router.navigate(['/contact']);
        }
      });
    }
  }
}
