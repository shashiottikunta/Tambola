import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GamesViewComponent } from './games-view/games-view.component';
import { NewGameComponent } from './new-game/new-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { WinnersListComponent } from './winners-list/winners-list.component';
import { HttpInterceptorService } from './core/interceptors/http.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GamesListComponent,
    GamesViewComponent,
    NewGameComponent,
    WinnersListComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
    	preventDuplicates: true,
      maxOpened: 1
    }),
    BrowserAnimationsModule,
    NgbDropdownModule,
    NgxDatatableModule,
    // MatDatepickerModule,
    // MatInputModule,
    // MatNativeDateModule,

  ],
  providers: [  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
