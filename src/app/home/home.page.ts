import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IRemLoginResponseInterface } from '../login/model/interface/loginResponse.interface';
import { HomePageResolverDataInterface } from './model/interface/home-page-resolver-data.interface';
import { MatrixErrorHandlerService } from 'src/shared/services/matrix-error-handler.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public isAuthenticatedUser: boolean = false;
  public currUser: string = null;
  constructor(private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorHandler: MatrixErrorHandlerService) {

  }

  ngOnInit() {
    // const homePageResolverData: HomePageResolverDataInterface = this.activatedRoute.snapshot.data.homePageResolverData;
    // this.isAuthenticatedUser = homePageResolverData.isAuthenticatedUser;
    // this.currUser = homePageResolverData.currUser;
  }

  ionViewWillEnter() {
    try {
      this.isAuthenticatedUser = this.authService.isAuthenticatedUser();
      if (this.isAuthenticatedUser) {
        const user: IRemLoginResponseInterface = this.authService.getUser();
        if (user) {
          this.currUser = user.authenticatedUserName;
        }
      }

    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  login() {
    try {
      this.router.navigate(['/login']);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
  logout() {
    try {
      this.authService.logout();
      //this.router.navigate(['/home']);
    } catch (error) {
      this.errorHandler.handleError(error);
    }

  }
}
