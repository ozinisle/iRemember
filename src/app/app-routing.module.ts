import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditNoteResolver } from './edit-note/edit-note.resolver';
import { ViewNoteResolver } from './view-note/view-note.resolver';
import { AuthGuardService } from 'src/shared/services/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterPageModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'forgot-password',
    loadChildren: './forgot-password/forgot-password.module#ForgotPasswordPageModule'
  },
  {
    path: 'view-note',
    loadChildren: './view-note/view-note.module#ViewNotePageModule',
    resolve: {
      viewNoteResolverData: ViewNoteResolver
    },
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit-note',
    loadChildren: './edit-note/edit-note.module#EditNotePageModule',
    resolve: {
      editNoteResolverData: EditNoteResolver
    },
    canActivate: [AuthGuardService]
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
