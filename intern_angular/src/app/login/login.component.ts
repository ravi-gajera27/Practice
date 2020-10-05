import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let user = {
        email: form.value.email,
        pass: form.value.pass,
      };
      this.authService.login(user).subscribe((res: Response) => {
        if (res['statusCode'] == 200) {
          localStorage.setItem('token', res['accessToken']);
          this.router.navigate(['/contact']);
        }
      });
    }
  }
}

