import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http-service/http.service';
import { NotificationService } from '../services/notification-service/notification.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Subscription, interval, switchMap } from 'rxjs';
import { WebsocketService } from '../services/websocket.service';
export class Page {
  pageSize: any;
  limit: any;
  skip:any
  count: any;
  pageNumber: any;
  orderBy: any;
  orderDir: any;
}
@Component({
  selector: 'app-games-view',
  templateUrl: './games-view.component.html',
  styleUrls: ['./games-view.component.css']
})

export class GamesViewComponent {
  selected = [];
  sizeList = [5, 10, 15, 20, 30, 50, 100];
  myTimeSheetsPageSize=10;
  submitEvent: any;
  @ViewChild(DatatableComponent)
  ngxDatatable!: DatatableComponent;
  totalCount:any;
  myGameListPage: Page = {
    pageSize: 10,
    limit: 10,
    skip: '',
    count: 0,
    pageNumber: 0,
    orderBy: '',
    orderDir: 'desc'
  }; 
  showGenerate:Boolean = false;
  @ViewChild('addPlayerData') addPlayerDataModel: any;
  @ViewChild('ticketData') ticketDataModel: any;
  ticketDataNew: any = [];
  addPlayerForm: FormGroup;
  gameId: any;
  plyersList: any = []
  winnersList: any;
  NumbersList: any;
  numbers: number[] = [];
  NumbersLeft: any = [];
  allNumbers:any =[];
  NumbersPicked :any=[];
  showButton: boolean = true;
  status: any;
  number: any;
  messages: string[] = [];
  messageSubscription!: Subscription;
  randomNumber: any;

  constructor(private fb: FormBuilder, private websocketService: WebsocketService,private route: ActivatedRoute, private router: Router, private httpService: HttpService, private notify: NotificationService,) {
    this.addPlayerForm = this.fb.group({
      name: '',
      number: ''
    })



  }


  getNumbers(){
    this.httpService.doGet(`numbers/${this.gameId}`).subscribe((response: any) => {
      this.NumbersLeft = response.numbers_left;
      this.NumbersPicked = response.numbers_picked;
      this.allNumbers = response.all_numbers;
      console.log(this.NumbersPicked);      
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params)
      this.gameId = params.get('id');
      console.log(this.gameId)

      localStorage.setItem('gameId', this.gameId);
      console.log(params.get('status'))
      if (params.get('status') === 'Live') {
        this.showButton = false;
        this.showGenerate = true;
      }else if(params.get('status') === 'Active'){
        this.showButton = true;
        this.showGenerate = false;
      }
    
    });
    this.fetchWinnersListPeriodically();
    this.getWinnersList()

    this.getPlayers();
    this.getNumbers();
   // this.getWinnersList();
    this.messageSubscription = this.websocketService.getMessages().subscribe((message: any) => {
      console.log(message)
      this.messages.push(message.data);
    });
  }
  getPlayers() {
      this.httpService.doGet(`players/${this.gameId}?offset=${Number(this.myGameListPage.pageNumber+1)}&limit=${Number(this.myGameListPage.pageSize)}&orderDir=${this.myGameListPage.orderDir}&orderBy=${this.myGameListPage.orderBy}`).subscribe((result) => {
      this.plyersList = result.players;
      this.totalCount = result.total_players;
    })
  }

  endGame(){

  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

 
  

  setMySheetsPage(pageInfo: { offset: any; }): void {
    console.log(pageInfo)
    if(this.submitEvent?.type === 'click'){
      this.myGameListPage.pageNumber = pageInfo.offset;
      this.getPlayers();
    }else{
      this.myGameListPage.pageNumber = pageInfo.offset;
      this.getPlayers();
    }

  
  }

  sortMyTimeSheetCallback(sortInfo: {
    sorts: { dir: string; prop: string }[];
    column: {};
    prevValue: string;
    newValue: string;
  }) {
    this.myGameListPage.orderDir = sortInfo.sorts[0].dir;
    this.myGameListPage.orderBy = sortInfo.sorts[0].prop;
    this.ngxDatatable.offset = this.myGameListPage.pageNumber;
    this.getPlayers();
  }

  viewGame(id:any, status:any){
    this.router.navigate(['/view-game', id, status]);
  }

  onPageMyTimeSheetSizeChange(event: any): void {
    if(this.submitEvent?.type === 'click'){
      this.myGameListPage.pageNumber = 0;
      this.myGameListPage.pageSize = event.target.value;
      this.myGameListPage.limit = event.target.value;
      this.getPlayers();
    }else{
      this.myGameListPage.pageNumber = 0;
      this.myGameListPage.pageSize = event.target.value;
      this.myGameListPage.limit = event.target.value;
      this.getPlayers();
    }

  
  }




  hideModal() {
    this.addPlayerDataModel.hide();
  }
  showModal() {
    this.addPlayerDataModel.show();
    this.addPlayerForm.reset();
  }

  hideModalTicket() {
    this.ticketDataModel.hide();
  }
  showModalTicket() {
    this.ticketDataModel.show();
  }

  submit() {
    let payload = {
      "client_id":localStorage.getItem('clientID'),
      "game_id": this.gameId,
      "name": this.addPlayerForm.get('name')?.value,
      "phone": this.addPlayerForm.get('number')?.value,
      "time_zone":"+05:30"
    }
    this.httpService.doPost('players', payload).subscribe((response: any) => {
      if (response) {
        this.notify.showSucessNotification('', response.message)
        this.hideModal();
        this.getPlayers();

      } else {
        this.notify.showErrorNotification('', 'Failure')
      }

    })
  }

  generateNumber() {
    const randomIndex = Math.floor(Math.random() * this.NumbersLeft.length);
    this.randomNumber = this.NumbersLeft[randomIndex];
  
  }

  submitNumber(){
    let payload = {
      "game_id": this.gameId,
      "number": this.randomNumber ?this.randomNumber : this.number
    }
    this.httpService.doUpdate('numbers', payload).subscribe((response: any) => {
      if(response){
        // this.notify.showSucessNotification('', response.message)
        this.getNumbers();
        this.randomNumber = null;
      }else{
        this.notify.showErrorNotification('', 'Failure')
      }

    })


  }

  startnewGame(type: any) {
    let payload = {
      "game_id": this.gameId,
       "status": type === 'start' ? "Live" :"Inactive"
    }
    this.httpService.doUpdate(`change-game-status/`, payload).subscribe((response: any) => {
      if (response.message) {
        this.notify.showSucessNotification('', response.message);
        this.showButton = false;
        this.showGenerate = true;
        if(response.message === 'Game stopped successfully'){
          this.router.navigate(['/games-list']);
        }
      } else {
        this.notify.showErrorNotification('', response.errorMessage)
      }

    })
  }

  viewTicket(ticketData: any) {
   // this.getWinnersList();
    this.showModalTicket();
    console.log(ticketData)
    this.ticketDataNew = ticketData?.ticket?.ticket;

  }

  getWinnersList() {
    this.httpService.doGet(`winners/${this.gameId}`).subscribe((response: any) => {
      this.winnersList = response.winners

    })
  }


  fetchWinnersListPeriodically(): Subscription {
    return interval(5000) // 5000 milliseconds = 5 seconds
      .pipe(
        switchMap(() => this.httpService.doGet(`winners/${this.gameId}`))
      )
      .subscribe((response: any) => {
        this.winnersList = response.winners;
      });
  }

}
