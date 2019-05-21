import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ListPage } from './list.page';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IRememberCommonModule } from 'src/shared/i-remember-common/i-remember-common.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListPage
      }
    ]),
    IRememberCommonModule
  ],
  declarations: [ListPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ListPageModule { }