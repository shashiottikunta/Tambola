import { Component } from '@angular/core';
import { HttpService } from '../services/http-service/http.service';
import { NotificationService } from '../services/notification-service/notification.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-winners-list',
  templateUrl: './winners-list.component.html',
  styleUrls: ['./winners-list.component.css']
})
export class WinnersListComponent {
  numbers: number[] = [];
   
  constructor(private httpService: HttpService, private notify: NotificationService, private fb:FormBuilder,
    private router:Router)  {
    this.generateNumbers();
  }

  generateNumbers() {
    for (let i = 1; i <= 100; i++) {
      this.numbers.push(i);
    }
  }

  get numbersChunks(): number[][] {
    const chunkSize = 10;
    const resultArray = [];
    for (let i = 0; i < this.numbers.length; i += chunkSize) {
      resultArray.push(this.numbers.slice(i, i + chunkSize));
    }

    return resultArray;
  }

}
