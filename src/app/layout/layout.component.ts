import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http-service/http.service';
import { NotificationService } from '../services/notification-service/notification.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  clientsList  :any =[];
  selectedClientName:any;
  selectedClientId: number | null = null;
  dropdownOpen: boolean = false;
  constructor( private router:Router,  private httpService: HttpService,
    private notify: NotificationService,) {

     }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getClients(){
    this.httpService.doGet('clients').subscribe((response: any) => {
      this.clientsList = response.clients
      this.getClientNameWithDelay();

      console.log(this.clientsList)

    })
  }


    ngOnInit(): void {
      this.getClients();

    }

    gettingClientName(){
      const selectedId = localStorage.getItem('clientID');
      console.log(selectedId)
      console.log(this.clientsList)
      if (selectedId) {
        console.log(selectedId)
        console.log(this.clientsList)
        const selectedClient = this.clientsList.find((client: { id: string; }) => client.id === selectedId);
        if (selectedClient) {
          this.selectedClientName = selectedClient.name;
          console.log('Selected Client Name:', selectedClient);
        }
      }
    }
  

    getClientNameWithDelay() {
      setTimeout(() => {
        this.gettingClientName();
      }, 500); 
    }

    selectClient(clientId:any){
      localStorage.setItem('clientID', clientId);
      window.location.reload();

    }
}
