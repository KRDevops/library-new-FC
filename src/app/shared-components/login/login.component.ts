import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class LoginComponent implements OnInit {



  loginForm: FormGroup;
  loading = false;
  submitted = false;
  err = false;

  email: String;
  password: String;
  userId: number
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)]],
    });
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    // console.log(this.loginForm.value);
    // var reqObj1 = {
    //   "email": this.loginForm.value.email,
    //   "password": this.loginForm.value.password
    // };

    this.http
      .post('http://13.233.140.75:7770/library/users/login', this.loginForm.value)

      .subscribe((res: any) => {
        const keys = Object.keys(res);
        console.log(keys);
        console.log(res.status, res.message);
        // alert(res['message'])
        if (res.statusCode == 200) {
          alert('Sucess');
          this.showSuccess();
        } else if (res.statusCode == 401) {
          alert('Invalid credentials');
        }
        localStorage.setItem("userId", res['userId']);

        console.log(localStorage.setItem("userId", res['userId']));
        console.log(localStorage.getItem("userId"));
        console.log(localStorage.setItem("email", res['email']));
        console.log(localStorage.getItem("email"));
        this.router.navigate(['/list']);

      }, (err) => {
        this.err = true;
        console.log("rerror", err)
        // alert(err.message);
      });
  }



  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Login Message', detail: 'Login success' });
  }

}
