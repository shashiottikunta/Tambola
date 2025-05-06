import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
// import { HttpService } from 'src/app/service/http-service/http.service';
// import { UserService } from 'src/app/service/user-service/user-service';
// import { StaticData } from 'src/app/shared/static-data/static-data';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard  {
	constructor(private route: Router, ) {
		
	 }
	// canActivate(
	// 	next: ActivatedRouteSnapshot,
	// 	state: RouterStateSnapshot
	// ): Observable<boolean> | Promise<boolean> | boolean {
	// 	if (localStorage.getItem('access-token')) {
		
	// 		return true;
	// 	} else {
	// 		this.route.navigate(['/login']);
	// 	}
	// }
}
