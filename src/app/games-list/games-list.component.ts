import { Component, ViewChild } from '@angular/core';
import { HttpService } from '../services/http-service/http.service';
import { NotificationService } from '../services/notification-service/notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe, PlatformLocation } from '@angular/common';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpParams } from '@angular/common/http';
import { DatatableComponent } from '@swimlane/ngx-datatable';
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
  providers:[DatePipe],
   selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent {
  @ViewChild('addGameData') addGameDataModal: any;

  gamesList: any[] = []; 
  selected = [];
  sizeList = [5, 10, 15, 20, 30, 50, 100];
  myTimeSheetsPageSize=10;
  submitEvent: any;
  @ViewChild(DatatableComponent)
  ngxDatatable!: DatatableComponent;
  selectedDate: any;
  selectedTime:any;
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
  addGameForm :FormGroup;



  constructor(private httpService: HttpService, private notify: NotificationService, private fb:FormBuilder, private location: PlatformLocation,
    private router:Router, config: NgbPaginationConfig, private datePipe: DatePipe) {
      this.addGameForm = this.fb.group({
        startDate:'',
        startTime:'',
        endDate:'',
        endTime:''

      })
    
      
    }

    getAllGames() {
        this.httpService.doGet(`all-games/${localStorage.getItem('clientID')}?offset=${Number(this.myGameListPage.pageNumber+1)}&limit=${Number(this.myGameListPage.pageSize)}&orderDir=${this.myGameListPage.orderDir}&orderBy=${this.myGameListPage.orderBy}`).subscribe((result) => {
          this.gamesList = result.games;
          this.totalCount = result.total_games;
        });
    }

    setMySheetsPage(pageInfo: { offset: any; }): void {
      console.log(pageInfo)
      if(this.submitEvent?.type === 'click'){
        this.myGameListPage.pageNumber = pageInfo.offset;
        this.getAllGames();
      }else{
        this.myGameListPage.pageNumber = pageInfo.offset;
        this.getAllGames();
      }
  
    
    }


    onPageMyTimeSheetSizeChange(event: any): void {
      if(this.submitEvent?.type === 'click'){
        this.myGameListPage.pageNumber = 0;
        this.myGameListPage.pageSize = event.target.value;
        this.myGameListPage.limit = event.target.value;
        this.getAllGames();
      }else{
        this.myGameListPage.pageNumber = 0;
        this.myGameListPage.pageSize = event.target.value;
        this.myGameListPage.limit = event.target.value;
        this.getAllGames();
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
      this.getAllGames();
    }

    openModel(){
      this.addGameDataModal.show();

    }
    closeModel(){
      this.addGameForm.reset();
      this.addGameDataModal.hide();

    }
    

    

  
    ngOnInit(): void {
      this.getAllGames();

      

    }

    formatDateTime(date: string, time: string): string {
      const dateTime = new Date(`${date} ${time}`);
      return this.datePipe.transform(dateTime, 'yyyy-MM-dd HH:mm:ss') || '';
    }
  

    newGame(): void {
      console.log(this.addGameForm.value);
    
      const startDate = this.addGameForm.value.startDate;
      const startTime = this.addGameForm.value.startTime;

      const endDate = this.addGameForm.value.endDate;
      const endTime = this.addGameForm.value.endTime;
    
      const registrationOpenTime = this.formatDateTime(startDate, startTime);
      const registrationEndTime =  this.formatDateTime(endDate, endTime);
      let payload = {
        clientId: localStorage.getItem('clientID'),
        registrationOpenTime: registrationOpenTime,
        registrationCloseTime: registrationEndTime, 
      };
    
      this.httpService.doPost('games', payload).subscribe((response: any) => {
        if (response) {
          this.notify.showSucessNotification('', response.message);
          this.closeModel();
          this.getAllGames();
        } else {
          this.notify.showErrorNotification('', 'Failure');
        }
      });
    }
    
    viewGame(id:any, status:any){
      this.router.navigate(['/view-game', id, status]);
    }

}
