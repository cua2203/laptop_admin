import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {HttpRequestService} from "../../../services/http-request.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  myForm: FormGroup;

  constructor(

    private toastr: ToastrService,
    private router: Router,
    private cookieService: CookieService,
    private httpRequestService:HttpRequestService
  ) {
    this.myForm = new FormGroup({
      email: new FormControl('phamcua@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('cua12345', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  loginWithGoogle() {
    window.location.href = 'http://14.225.212.180:3000/auth/google';
  }


  onSubmit() {

    let data = this.myForm.value;
    this.httpRequestService.post('user/login', data).subscribe({
      next: (data: any) => {
        console.log('Data:', data);
        if(data.rs == 0){
          this.toastr.info('Tài khoản hoặc mật khẩu không đúng');
        }
        this.cookieService.set('token', data.token);
        this.cookieService.set('user_data', data);
        this.toastr.success('Đăng nhập thành công', 'Success');
        this.router.navigate(['/']);
      },
      error: (err: Error) => {
        this.toastr.error('Tài khoản hoặc mật khẩu không đúng', 'Error');
        console.error(err);
      }
    });
  }
}
