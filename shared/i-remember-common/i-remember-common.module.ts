import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDocumentsPageComponent } from './components/no-documents-page/no-documents-page.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    NoDocumentsPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpModule,
    HttpClientModule,
  ],
  exports: [
    NoDocumentsPageComponent
  ],
})
export class IRememberCommonModule { }
