import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GamesViewComponent } from './games-view/games-view.component';
import { NewGameComponent } from './new-game/new-game.component';
import { WinnersListComponent } from './winners-list/winners-list.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [{path:'',redirectTo:'login',pathMatch:'full'},{path:'login',component:LoginComponent},


{path:'',component:LayoutComponent,
children: [
  {path:'games-list',component:GamesListComponent}, {path:'game-view',component:GamesViewComponent}, 
  {path:'winners-list',component:WinnersListComponent}, {path:'view-game/:id/:status',component:GamesViewComponent}]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
