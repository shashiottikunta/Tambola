import { Component } from '@angular/core';
import { HttpService } from '../services/http-service/http.service';
import { NotificationService } from '../services/notification-service/notification.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  currentUrl:any;
  constructor(
    private httpService: HttpService,
    private notify: NotificationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });


    const currentUrl =  window.location.host + window.location.pathname;
    this.currentUrl = 'client1.tambola.com'
    if (this.currentUrl.includes('client')) {
      this.currentUrl =''
    } else {
      console.log('Client is not in URL');
      this.currentUrl =''

    }

  }

  submit() {
    let payload = {
      "email": this.loginForm.get('email')?.value,
      "password": this.loginForm.get('password')?.value,
      "clientName": this.currentUrl
    };

    this.httpService.doPost('login', payload).subscribe((response: any) => {
      if (response.errorMessage) {
        this.notify.showErrorNotification('', response.errorMessage);

      } else {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('userName', response.username);
        localStorage.setItem('email', response.email);
        localStorage.setItem('role', response.role);
        localStorage.setItem('clientID', response.client_id);

        this.notify.showSucessNotification('', 'Success');
        this.router.navigate(['/games-list']);
      }
    });
  }
}
